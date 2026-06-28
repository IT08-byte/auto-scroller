# Security Policy

## Supported Versions

| Version | Supported |
|---------|-----------|
| 1.1.x   | ✅        |
| < 1.1   | ❌        |

## Reporting a Vulnerability

If you discover a security vulnerability in Auto Scroller, **please do not open a public GitHub issue**.

Instead, report it privately:

1. Email: open a [GitHub Security Advisory](../../security/advisories/new) on this repo
2. Or contact the maintainer directly via the GitHub profile

Please include:
- A description of the vulnerability
- Steps to reproduce
- Potential impact
- Any suggested fix (optional)

You can expect a response within **7 days**. If the vulnerability is confirmed, a fix will be prioritized and a new release issued.

## Scope

This is a Chrome extension. The primary attack surface concerns:

- **Content script injection**: the extension runs on all URLs (`<all_urls>`)
- **chrome.storage.sync**: stores user preferences (keybinds, speed, theme) — no PII
- **No external network requests**: the extension makes zero API calls and collects no data

## Out of Scope

- Issues with third-party manga/manhwa sites the extension scrolls
- Browser-level vulnerabilities unrelated to this extension
