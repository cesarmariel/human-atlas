#!/bin/zsh
# Double-click on macOS to start Human Atlas (atlas + AI bridge) and open it in the browser.
cd "$(dirname "$0")"
[ -d node_modules ] || npm ci
npm start
