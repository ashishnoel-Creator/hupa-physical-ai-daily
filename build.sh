#!/bin/bash
# Rebuild index.html from briefing.md using the HuPa daily shell.
# Output is index.html (not briefing.html) so the GitHub Pages root URL
# https://ashishnoel-creator.github.io/hupa-physical-ai-daily/ serves the latest.
set -e
cd "$(dirname "$0")"
pandoc briefing.md -t html5 --no-highlight --section-divs -o _body.html
cat _shell_head.html _body.html _shell_foot.html > index.html
rm _body.html
echo "Built: index.html ($(wc -l < index.html) lines)"
