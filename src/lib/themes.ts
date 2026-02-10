export interface Theme {
  name: string;
  colors: {
    '--color-background': string;
    '--color-surface': string;
    '--color-text': string;
    '--color-primary': string;
    '--color-secondary': string;
    '--color-accent': string;
    '--color-muted': string;
  };
}

export const themes: Record<string, Theme> = {
  dracula: {
    name: 'Dracula',
    colors: {
      '--color-background': '#282a36',
      '--color-surface': '#44475a',
      '--color-text': '#f8f8f2',
      '--color-primary': '#bd93f9', // Purple
      '--color-secondary': '#ff79c6', // Pink
      '--color-accent': '#8be9fd', // Cyan
      '--color-muted': '#6272a4', // Comment
    },
  },
  nord: {
    name: 'Nord',
    colors: {
      '--color-background': '#2e3440',
      '--color-surface': '#3b4252',
      '--color-text': '#d8dee9',
      '--color-primary': '#88c0d0', // Frost
      '--color-secondary': '#81a1c1', // Frost Dark
      '--color-accent': '#ebcb8b', // Aurora Yellow
      '--color-muted': '#4c566a', // Polar Night light
    },
  },
  lavander: {
    name: 'Lavander',
    colors: {
      '--color-background': '#e6e6fa', // Lavender
      '--color-surface': '#f3f3fc',
      '--color-text': '#2d2a4a', // Dark Purple
      '--color-primary': '#7b68ee', // Medium Slate Blue
      '--color-secondary': '#9370db', // Medium Purple
      '--color-accent': '#ff69b4', // Hot Pink
      '--color-muted': '#a8a8a8',
    },
  },
  wisteria: {
    name: 'Wisteria',
    colors: {
      '--color-background': '#c9a0dc', // Wisteria
      '--color-surface': '#dcb4ec',
      '--color-text': '#1a0b2e', // Very dark purple
      '--color-primary': '#5e2a84', // Deep Purple
      '--color-secondary': '#9b59b6', // Amethyst
      '--color-accent': '#f1c40f', // Sun flower (contrast)
      '--color-muted': '#7f8c8d',
    },
  },
  coffee: {
    name: 'Coffee',
    colors: {
      '--color-background': '#2b211e', // Dark coffee
      '--color-surface': '#3d2f2b', // Lighter coffee
      '--color-text': '#e0d6c8', // Cream
      '--color-primary': '#d4a373', // Latte
      '--color-secondary': '#a98467', // Mocha
      '--color-accent': '#6f4e37', // Coffee Bean
      '--color-muted': '#8c7b75',
    },
  },
  midnight: {
    name: 'Midnight',
    colors: {
      '--color-background': '#0f172a', // Slate 900
      '--color-surface': '#1e293b', // Slate 800
      '--color-text': '#f1f5f9', // Slate 100
      '--color-primary': '#38bdf8', // Sky 400
      '--color-secondary': '#818cf8', // Indigo 400
      '--color-accent': '#f472b6', // Pink 400
      '--color-muted': '#64748b', // Slate 500
    },
  },
  night: {
    name: 'Night',
    colors: {
      '--color-background': '#000000',
      '--color-surface': '#121212',
      '--color-text': '#e0e0e0',
      '--color-primary': '#ffffff',
      '--color-secondary': '#333333',
      '--color-accent': '#666666',
      '--color-muted': '#444444',
    },
  },
};
