# Contributing to Auto Scroller

Thanks for your interest in contributing! This is a small Chrome extension — contributions are welcome in any form.

## Ways to Contribute

- **Bug reports** — open an issue with steps to reproduce
- **Feature requests** — open an issue describing the use case
- **Code** — fork → branch → PR
- **Themes** — new themes are always welcome (see Theme Guide below)

## Development Setup

1. Clone this repo
2. Open `chrome://extensions` in Chrome
3. Enable **Developer mode** (top right)
4. Click **Load unpacked** → select the repo folder
5. Edit files → click the refresh icon on the extension card to reload

No build step needed — it's vanilla JS.

## Pull Request Guidelines

- Keep PRs focused — one feature or fix per PR
- Test on at least one manga/manhwa site before submitting
- Update `CHANGELOG.md` with your change under a new version heading
- No hardcoded secrets, no external API calls, no data collection

## Adding a Theme

Themes are defined in `content.js` in the `THEMES` array. Each entry needs:

```js
{
  id: 'my-theme',          // kebab-case, unique
  name: 'My Theme',        // display name
  sw: ['#bg-color', '#accent-color'],  // swatch colors [background, accent]
  v: {
    '--asc-bg': '#...',    // background
    '--asc-sf': '#...',    // surface
    '--asc-br': '#...',    // border
    '--asc-tx': '#...',    // text
    '--asc-ac': '#...',    // accent
    '--asc-bt': '#...',    // button
    '--asc-bh': '#...',    // button hover
    '--asc-sh': '0 4px 24px rgba(...)',  // shadow
    '--asc-bd': 'none',
  },
  p: {
    img: '...',            // CSS background-image value
    size: '...',           // optional background-size
    anim: 'asc-anim-...'  // optional animation class
  }
}
```

Available animations: `asc-anim-scan`, `asc-anim-aurora`, `asc-anim-holo`, `asc-anim-wave`, `asc-anim-drift`, `asc-anim-flow`, `asc-anim-shimmer`, `asc-anim-blink`, `asc-anim-float`

## Code of Conduct

Be kind. This is a hobby project.
