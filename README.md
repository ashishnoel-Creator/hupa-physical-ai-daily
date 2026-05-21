# HuPa Physical AI Daily

Rolling daily intelligence digest on Physical AI — data collection, annotation/validation, embedded systems, robotics, humanoids. Curated by [@ashishnoel-Creator](https://github.com/ashishnoel-Creator) for HuPa, an early-stage Physical AI company.

**Read the live briefing:** https://ashishnoel-creator.github.io/hupa-physical-ai-daily/

## How it works

- `briefing.md` is the rolling source of truth — newest day on top.
- `build.sh` runs `pandoc` + the HuPa shell HTML (`_shell_head.html` / `_shell_foot.html`) to produce `index.html`.
- A scheduled task on the maintainer's machine runs every morning at 7 AM IST, prepends a new day to `briefing.md`, rebuilds `index.html`, pushes to this repo, and sends a Telegram digest to the maintainer.

## Bar for inclusion

Signal only. An item makes it in if it shows: a new capability, real money moved, a named strategic partnership, a clear positioning shift, a key team move, a concrete benchmark, or a substantive expert opinion. Hype, re-announcements, and generic AI commentary get dropped.

## Repo files

- `briefing.md` — rolling source, edited daily
- `index.html` — the rendered, branded HTML page served by GitHub Pages
- `_shell_head.html` / `_shell_foot.html` — HuPa-branded HTML shell (deep indigo + amber + cream, Geist fonts)
- `build.sh` — pandoc render pipeline
- `.gitignore` — keeps secrets and build artifacts out

