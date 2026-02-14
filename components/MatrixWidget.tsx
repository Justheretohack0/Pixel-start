import React, { useEffect, useRef } from "react";

interface MatrixWidgetProps {
    options?: {
        speed: number;
        fade: number;
        charSet: 'numbers' | 'latin' | 'mixed';
        charFlux: number;
        glow: boolean;
        fontSize: number;
    };
    speed?: number;
}

type Cell = {
    val: string;
    isHead: boolean;
};

export const MatrixWidget: React.FC<MatrixWidgetProps> = ({ options, speed = 50 }) => {
    const activeSpeed = options?.speed ?? speed;
    const charMode = options?.charSet ?? 'mixed';
    const fade = options?.fade ?? 0.05;
    const glow = options?.glow ?? true;
    const fontSize = options?.fontSize ?? 16;

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const matrixRef = useRef<Cell[][]>([]);
    const lengthRef = useRef<number[]>([]);
    const spacesRef = useRef<number[]>([]);
    const updatesRef = useRef<number[]>([]);
    const countRef = useRef<number>(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = container.clientWidth;
        let height = container.clientHeight;

        canvas.width = width;
        canvas.height = height;

        const colWidth = fontSize;

        let cols = Math.floor(width / colWidth);
        let rows = Math.floor(height / fontSize);

        // Trail length derived from fade:
        // fade is 0.01..0.3. Lower = longer trails.
        // We invert so that 0.01 -> very long trails, 0.3 -> very short trails.
        // Map to a multiplier for the length array.
        const trailMultiplier = Math.max(0.3, (1 - fade * 3));

        const getChar = () => {
            if (charMode === 'numbers') {
                return String.fromCharCode(0x30 + Math.floor(Math.random() * 10));
            } else if (charMode === 'latin') {
                const set = Math.random() < 0.5 ? 0x41 : 0x61;
                return String.fromCharCode(set + Math.floor(Math.random() * 26));
            }
            const r = Math.random();
            if (r < 0.5) {
                return String.fromCharCode(0x30 + Math.floor(Math.random() * 10));
            } else {
                const set = Math.random() < 0.5 ? 0x41 : 0x61;
                return String.fromCharCode(set + Math.floor(Math.random() * 26));
            }
        };

        const initMatrix = () => {
            const newMatrix: Cell[][] = [];
            for (let r = 0; r < rows; r++) {
                const rowCells: Cell[] = [];
                for (let c = 0; c < cols; c++) {
                    rowCells.push({ val: ' ', isHead: false });
                }
                newMatrix.push(rowCells);
            }
            matrixRef.current = newMatrix;

            const newLength: number[] = [];
            const newSpaces: number[] = [];
            const newUpdates: number[] = [];

            for (let j = 0; j < cols; j++) {
                newSpaces[j] = Math.floor(Math.random() * rows) + 1;
                newLength[j] = Math.floor((Math.random() * (rows - 3) + 3) * trailMultiplier);
                newUpdates[j] = Math.floor(Math.random() * 3) + 1;
            }

            lengthRef.current = newLength;
            spacesRef.current = newSpaces;
            updatesRef.current = newUpdates;
        };

        const resizeObserver = new ResizeObserver(() => {
            width = container.clientWidth;
            height = container.clientHeight;
            canvas.width = width;
            canvas.height = height;

            const newCols = Math.floor(width / colWidth);
            const newRows = Math.floor(height / fontSize);

            if (newCols !== cols || newRows !== rows) {
                cols = newCols;
                rows = newRows;
                initMatrix();
            }
        });

        resizeObserver.observe(container);
        initMatrix();

        let animationId: number;
        let lastTime = 0;

        let cachedColors = { bg: '#000', fg: '#fff', accent: '#0f0' };

        const updateColors = () => {
            const style = getComputedStyle(document.documentElement);
            cachedColors = {
                bg: style.getPropertyValue("--color-bg").trim() || '#000',
                fg: style.getPropertyValue("--color-fg").trim() || '#fff',
                accent: style.getPropertyValue("--color-accent").trim() || '#0f0'
            };
        };

        updateColors();

        const themeObserver = new MutationObserver(() => {
            updateColors();
        });

        themeObserver.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['style', 'class', 'data-theme']
        });

        const render = (timestamp: number) => {
            animationId = requestAnimationFrame(render);

            const dt = timestamp - lastTime;
            const interval = Math.max(20, 120 - activeSpeed);
            if (dt < interval) return;
            lastTime = timestamp;

            const matrix = matrixRef.current;
            const length = lengthRef.current;
            const spaces = spacesRef.current;
            const updates = updatesRef.current;

            if (!matrix.length || rows < 2) return;

            countRef.current++;
            if (countRef.current > 4) countRef.current = 1;

            for (let j = 0; j < cols; j++) {
                if (countRef.current > updates[j]) {
                    // Shift column down
                    for (let r = rows - 1; r > 0; r--) {
                        matrix[r][j] = { ...matrix[r - 1][j] };
                    }

                    // New content at row 0
                    if (spaces[j] > 0) {
                        matrix[0][j] = { val: ' ', isHead: false };
                        spaces[j]--;
                    } else {
                        if (length[j] > 0) {
                            matrix[0][j] = { val: getChar(), isHead: false };
                            length[j]--;
                        } else {
                            matrix[0][j] = { val: ' ', isHead: false };
                            spaces[j] = Math.floor(Math.random() * rows) + 1;
                            length[j] = Math.floor((Math.random() * (rows - 3) + 3) * trailMultiplier);
                        }
                    }

                    // Mark heads
                    for (let r = rows - 1; r >= 0; r--) {
                        const cell = matrix[r][j];
                        if (cell.val !== ' ') {
                            const below = (r + 1 < rows) ? matrix[r + 1][j] : { val: ' ' };
                            cell.isHead = (below.val === ' ');

                            if (!cell.isHead && Math.random() < 0.05) {
                                cell.val = getChar();
                            }
                        }
                    }
                }
            }

            // Draw
            const { bg, fg, accent } = cachedColors;
            ctx.font = `bold ${fontSize}px "JetBrains Mono", monospace`;
            ctx.textBaseline = 'top';

            ctx.fillStyle = bg;
            ctx.fillRect(0, 0, width, height);

            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    const cell = matrix[r][c];
                    if (cell.val !== ' ') {
                        const x = c * colWidth;
                        const y = r * fontSize;

                        if (cell.isHead) {
                            ctx.fillStyle = fg;
                        } else {
                            ctx.fillStyle = accent;
                            if (glow && Math.random() < 0.15) {
                                ctx.shadowBlur = 6;
                                ctx.shadowColor = accent;
                            }
                        }

                        ctx.fillText(cell.val, x, y);
                        ctx.shadowBlur = 0;
                    }
                }
            }
        };

        animationId = requestAnimationFrame(render);
        return () => {
            cancelAnimationFrame(animationId);
            resizeObserver.disconnect();
            themeObserver.disconnect();
        };
    }, [activeSpeed, charMode, fade, glow, fontSize]);

    return (
        <div ref={containerRef} className="w-full h-full bg-[var(--color-bg)] overflow-hidden rounded relative">
            <canvas ref={canvasRef} className="block w-full h-full" />
        </div>
    );
};
