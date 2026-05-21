#!/bin/bash
# Build the HuPa Physical AI Daily site.
#
# Inputs:
#   days/YYYY-MM-DD.md       — one markdown file per day
#   monthly/YYYY-MM.md       — one markdown file per monthly review (when written)
#   _shell_head.html, _shell_foot.html — shared page chrome
#
# Outputs:
#   days/YYYY-MM-DD.html     — rendered per-day page (wrapped in shell)
#   monthly/YYYY-MM.html     — rendered monthly review page (wrapped in shell)
#   index.html               — copy of the latest day's HTML so the root URL
#                              always shows the newest brief
#   manifest.json            — machine-readable index of all days/monthlies
#                              (consumed by _sidebar.js)
#
# Idempotent. Skips MD files whose HTML is already up-to-date.

set -e
cd "$(dirname "$0")"

# Ensure PATH includes Homebrew (so scheduled tasks running under launchd
# can still find pandoc / python3 even with a stripped login PATH).
export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"

PANDOC_FLAGS="-t html5 --no-highlight --section-divs"

build_one() {
  local md="$1"
  local html="${md%.md}.html"
  if [ ! -f "$html" ] || [ "$md" -nt "$html" ] || [ "_shell_head.html" -nt "$html" ] || [ "_shell_foot.html" -nt "$html" ]; then
    local tmpbody
    tmpbody="$(mktemp -t hupa_body.XXXXXX)"
    pandoc "$md" $PANDOC_FLAGS -o "$tmpbody"
    cat _shell_head.html "$tmpbody" _shell_foot.html > "$html"
    rm -f "$tmpbody"
    echo "  built: $html"
  fi
}

# 1. Render any day briefs whose HTML is stale or missing
mkdir -p days monthly
for md in days/*.md; do
  [ -e "$md" ] || continue
  build_one "$md"
done

# 2. Render any monthly reviews
for md in monthly/*.md; do
  [ -e "$md" ] || continue
  [ "$(basename "$md")" = "README.md" ] && continue
  build_one "$md"
done

# 3. Sync index.html to the latest day's HTML
latest_day_html=$(ls days/*.html 2>/dev/null | sort | tail -n 1 || true)
if [ -n "$latest_day_html" ]; then
  cp "$latest_day_html" index.html
  echo "  index.html ← $latest_day_html"
fi

# 4. Rebuild manifest.json
python3 build_manifest.py

# 5. Summary
day_count=$(ls days/*.html 2>/dev/null | wc -l | tr -d ' ')
monthly_count=$(ls monthly/*.html 2>/dev/null | wc -l | tr -d ' ')
echo "site: $day_count days · $monthly_count monthly reviews · papers.html"
