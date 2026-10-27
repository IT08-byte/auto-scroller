# Changelog

All notable changes to Auto Scroller are documented here.

## [1.2.1] — 2026-10-21

### Fixed
- Switching themes left `asc-anim-blink` / `asc-anim-float` classes behind (animation cleanup list now derived from THEMES)
- Start/pause keybinds fired while typing in inputs, textareas, selects, and contentEditable fields
- Document `mousemove`/`mouseup` listeners leaked on every overlay open (now torn down via AbortController)
- Malformed stored settings (wrong types, NaN, unknown theme) could crash the overlay — now validated and clamped on load
- Page scripts could write arbitrary keys to extension storage through the bridge — writes now whitelisted to settings keys; storage errors handled
- Pressing Reset during keybind capture let the next keypress overwrite the reset value

## [1.2] — 2026-06-28

### Added
- `asc-blink` and `asc-float` animations (Galaxy, Firefly, Sakura)
- GitHub trust files: SECURITY, CONTRIBUTING, issue/PR templates, Dependabot, CODEOWNERS

### Fixed
- Matcha theme pattern (removed misplaced pink/orange dots)
- `background.js` no longer throws on chrome:// and about: pages

### Changed
- Keybinds only active while the overlay is open

## [1.1] — 2026-06-28

### Added
- 50+ themes with unique patterns and animations (Matcha, Sakura, Firefly, Galaxy, and more)
- Animated theme backgrounds: blink, float, scan, aurora, holo, wave, drift, flow, shimmer
- Bridge script for cross-site `chrome.storage.sync` via CustomEvents
- Auto-popup option, draggable overlay, adjustable scale

### Changed
- Improved smart scroll target detection for manga readers and split layouts
- Settings sync across all Chrome sessions via `chrome.storage.sync`

## [1.0] — Initial Release

### Added
- Auto-scroll any web page with configurable speed
- Custom keybinds for start and pause
- Works on sites with custom scroll containers (MangaFire, Webtoon, etc.)
- Zero data collection, no external requests
