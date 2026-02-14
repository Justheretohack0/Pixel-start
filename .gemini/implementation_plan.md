# TUI Dashboard — Audit & Improvement Report

## ✅ All Changes Completed — TypeScript compiles clean (0 errors)

---

## Feature Work (User Requests)

### 1. Pipes Widget - Thick Characters
- `─│┌┐└┘` → `━┃┏┓┗┛` (heavy box-drawing)
- Max pipes: 6 → **10**
- **File**: `PipesWidget.tsx`

### 2. ASCII-Styled Sliders
- New `AsciiSlider` component: `[████░░░░░░]`
- Replaced all 7 native `<input type="range">` sliders
- Click-to-set, scroll-wheel, **keyboard (arrow keys)**, ARIA attributes
- **File**: `Settings.tsx`

### 3. Font Size Controls
- Matrix "Letter Size" slider (8–32px)
- Pipes "Pipe Size" slider (8–32px)
- **Files**: `Settings.tsx`, `MatrixWidget.tsx`, `PipesWidget.tsx`, `App.tsx`

---

## Bug Fixes

### B1. ✅ MatrixWidget fontSize shadowing
- `const fontSize = 16` inside useEffect shadowed the prop → removed

### B2. ✅ Preset save/load missing `funOptions`
- `handleSavePreset` now includes `funOptions`
- `handleLoadPreset` now restores `funOptions`

### B3. ✅ `resetLayout` missing `funOptions`
- Now also calls `setFunOptions(funDefaults)`

### B4. ✅ WeatherWidget error state
- Separated loading/error rendering
- Error now shows `⚠` + actual error message + "check location permissions" hint

### B5. ✅ `lavander` typo → `lavender`
- Fixed in `constants.ts` (key + name)
- Added migration in `App.tsx` for users with old localStorage value

### B6. ✅ AsciiSlider keyboard accessibility
- Added arrow key support, `tabIndex`, `role="slider"`, ARIA attributes
- Focus ring styling on tab

---

## Other Improvements

### ✅ SEO — index.html
- Added `<meta name="description">`
- Added `<meta name="theme-color">`
- Added inline SVG favicon (⬡ hexagon)

---

## Remaining Low-Priority Notes
- DonutWidget accepts `speed` as direct prop (inconsistent with Matrix/Pipes which use `options` object) — not a bug, just style
- StatsWidget ping via `no-cors` Google fetch may show `<1ms` on blocked networks — cosmetic
- Search history uses `key={i}` — acceptable for small static lists
