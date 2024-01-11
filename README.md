# Kurokku-overlay
Cpol styled osu! replay overlay for Kurokku

Overlay for: [StreamCompanion](https://github.com/Piotrekol/StreamCompanion)

Demo: [Click here](https://youtu.be/3I5x9xlzTc4)
### Instruction
1. Download and extract the **Kurokku** folder to `%sc_root%/Files/Web/overlays`
2. Setup OBS:
- For **Combo**, **Hit**, **PP**, **Stats** and **UR** overlay, paste URLs to each browser components. 
- For **Key** overlay, after pasting its URL to browser component, add a **Colour Key** filter and set to Black color.
- The URL format is `http://localhost:20727/overlays/Kurokku/{overlay name}/`. **Ex:** `http://localhost:20727/overlays/Kurokku/Combo/` (*Warn*: Splash `/` at the end of each URLs).
3. Start osu! and Stream Companion and refresh all OBS browser components.
4. Adjust your OBS overlay and you are done!

### Colour config
There is a global css file for colour configuration. You need to pick 3 variants type of same colour as 3 following variables: `--key` (normal), `--key-active` (lighten),`--key-dark` (darken).

**Examples:**
1. Venti's Green
* ![#6ac48e](https://placehold.co/15x15/6ac48e/6ac48e.png) `#6ac48e`
* ![#9cf7c0](https://placehold.co/15x15/9cf7c0/9cf7c0.png) `#9cf7c0`
* ![#233d2d](https://placehold.co/15x15/233d2d/233d2d.png) `#233d2d`
2. Ocean Blue
* ![#0d69b4](https://placehold.co/15x15/0d69b4/0d69b4.png) `#0d69b4`
* ![#13d0fc](https://placehold.co/15x15/13d0fc/13d0fc.png) `#13d0fc`
* ![#0e375c](https://placehold.co/15x15/0e375c/0e375c.png) `#0e375c`
3. Purple
* ![#6f4ca5](https://placehold.co/15x15/6f4ca5/6f4ca5.png) `#6f4ca5`
* ![#d790fe](https://placehold.co/15x15/d790fe/d790fe.png) `#d790fe`
* ![#3a2756](https://placehold.co/15x15/3a2756/3a2756.png) `#3a2756`

To config these colours, find and edit `global.css`. You will find the following code in the file.
```css
:root {
  --key: #6ac48e;
  --key-active: #9cf7c0;
  --key-dark: #233d2d
}
```
Change these hex colour codes to your desired one. Those can be in RGB format.

For **Hit Count** overlay, you don't need to change these colours as they are in their correct presenting colours.

For **Stats** overlay, you need to do extra step. Find and edit `App.js` file in `/components` of **Hit** directory, navigate to line 55 and line 62:
- **Line 55**: Paste `--key-dark` hex code in `global.css` to it.
- **Line 62**: Paste `--key` hex code in `global.css` to it.

![stats](/images/stats.png)

### Project structure
```
Kurokku-overlay
│   README.md 
|
└───images
│   │   stats.png
│   
└───Kurokku
    │   Combo
    │   Hit
    |   Key
    |   PP
    |   Stats
    |   UR
    |   global.css
```
All overlays were made using <img src="https://github.com/get-icon/geticon/raw/master/icons/html-5.svg" alt="HTML5" width="21px" height="21px"> **HTML**, <img src="https://github.com/get-icon/geticon/raw/master/icons/css-3.svg" alt="CSS3" width="21px" height="21px"> **CSS3**, <img src="https://github.com/get-icon/geticon/raw/master/icons/javascript.svg" alt="JavaScript" width="21px" height="21px"> **Javascript**, <img src="https://github.com/get-icon/geticon/raw/master/icons/vue.svg" alt="Vue.js" width="21px" height="21px"> **Vue.js** based on Stream Companion default overlays.
External Libraries used: [Animate.css](https://github.com/animate-css/animate.css), [odometer](https://github.com/HubSpot/odometer), [Font Awesome](https://fontawesome.com/)
### License
This project has no license. It is for private uses.

©️ 2024 [@ltln](https://github.com/ltln). All rights reserved!
