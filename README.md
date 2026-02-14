

<p align="center">
  <img src="https://dc.missuo.ru/file/1472237296475443202" width="72" alt="Pixel Start Icon">
</p>

<h1 align="center">Pixel Start</h1>

<p align="center">
  Retro-inspired, modular new tab dashboard built for focus and speed.
</p>

<p align="center">
  <img src="https://dc.missuo.ru/file/1472233821897494592" width="900" alt="Pixel Start Preview">
</p>

---






## Build

### Requirements

* Node.js v16+
* Python 3

### Steps

1. Extract the source archive.
2. Open a terminal in the project root.
3. Install dependencies:

```
npm install
```

4. Build:

```
npm run build
```

5. Copy:

`/dist/assets` → `/firefox_addon/assets`

6. Package (Firefox):

```
python package_addon.py
```

Output: `pixel-start-v2.1.xpi`

---

## Install in Chrome

1. Complete the build steps above.
2. Open: `chrome://extensions`
3. Enable **Developer Mode**
4. Click **Load unpacked**
5. Select the `firefox_addon` folder


## Note

`package_addon.py` ensures correct ZIP formatting for Firefox validation.


Will add a firefox addon link here when it is approved.
