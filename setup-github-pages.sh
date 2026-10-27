#!/bin/bash
# ─────────────────────────────────────────────────────────────────────────────
# Auto Scroller — GitHub Pages setup script
# Run this AFTER creating an empty repo on GitHub named: auto-scroller-privacy
#
# Usage:
#   1. Go to https://github.com/new
#   2. Name it: auto-scroller-privacy
#   3. Set it to PUBLIC, leave everything else blank, click "Create repository"
#   4. Open Terminal, cd to this folder, then run:  bash setup-github-pages.sh
# ─────────────────────────────────────────────────────────────────────────────

set -e

# ── Prompt for GitHub username ────────────────────────────────────────────────
read -p "Enter your GitHub username: " GITHUB_USER

REPO="auto-scroller-privacy"
REMOTE="https://github.com/${GITHUB_USER}/${REPO}.git"
PAGES_URL="https://${GITHUB_USER}.github.io/${REPO}/"

echo ""
echo "Setting up GitHub Pages at: $PAGES_URL"
echo ""

# ── Create temp directory and copy files ──────────────────────────────────────
TMP=$(mktemp -d)
cp "$(dirname "$0")/index.html" "$TMP/index.html"

# ── Init git repo and push ────────────────────────────────────────────────────
cd "$TMP"
git init -b main
git add index.html
git commit -m "Add privacy policy for Auto Scroller Chrome extension"
git remote add origin "$REMOTE"
git push -u origin main

echo ""
echo "✅ Done! GitHub Pages will be live at:"
echo "   $PAGES_URL"
echo ""
echo "⏱  It may take 1–2 minutes to go live."
echo ""
echo "📋 Next step: paste this URL into content.js"
echo "   Find: 'YOUR_USERNAME.github.io'"
echo "   Replace with: ${GITHUB_USER}.github.io/${REPO}/"
echo ""
echo "Then also add it as your Privacy Policy URL in the Chrome Web Store listing."
