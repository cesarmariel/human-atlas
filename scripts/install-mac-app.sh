#!/bin/zsh
# Creates "Human Atlas.app" so the atlas can be opened from Launchpad, Spotlight or the Applications folder.
# The app opens a Terminal window in this project and runs `npm start` (atlas + AI bridge + browser);
# close that window or press Ctrl+C in it to stop everything.
# Usage: zsh scripts/install-mac-app.sh [destination folder, default /Applications or ~/Applications]
set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DEST="${1:-/Applications}"
[ -w "$DEST" ] || DEST="$HOME/Applications"
mkdir -p "$DEST"
APP="$DEST/Human Atlas.app"
rm -rf "$APP"

osacompile -o "$APP" -e "tell application \"Terminal\"
	activate
	do script \"cd \" & quoted form of \"$ROOT\" & \" && ([ -d node_modules ] || npm ci) && npm start\"
end tell"

# Icon from the atlas favicon, when Quick Look can render it.
WORK="$(mktemp -d)"
if qlmanage -t -s 1024 -o "$WORK" "$ROOT/public/favicon.svg" >/dev/null 2>&1 && [ -f "$WORK/favicon.svg.png" ]; then
	ICONSET="$WORK/applet.iconset"; mkdir "$ICONSET"
	for size in 16 32 128 256 512; do
		sips -z $size $size "$WORK/favicon.svg.png" --out "$ICONSET/icon_${size}x${size}.png" >/dev/null
		sips -z $((size*2)) $((size*2)) "$WORK/favicon.svg.png" --out "$ICONSET/icon_${size}x${size}@2x.png" >/dev/null
	done
	iconutil -c icns "$ICONSET" -o "$APP/Contents/Resources/applet.icns"
	# osacompile also ships an asset-catalog icon that macOS prefers; drop it so applet.icns is used, then re-sign locally.
	/usr/libexec/PlistBuddy -c "Delete :CFBundleIconName" "$APP/Contents/Info.plist" 2>/dev/null || true
	rm -f "$APP/Contents/Resources/Assets.car"
	codesign --force --deep -s - "$APP" >/dev/null 2>&1 || true
	touch "$APP"
fi
rm -rf "$WORK"
echo "Created $APP"
