# Monthly reviews

This folder holds end-of-month synthesis briefs. One file per month, named `YYYY-MM.md`. Each is rendered to `YYYY-MM.html` by `../build.sh`.

Schedule: written on the 1st of each month, covering the previous month. The first one will be `2026-06.md` (written 2026-06-01, covering 2026-05).

Structure each file as:

```
# <Month Year>

<One-paragraph "the month in one sentence" — what mattered, what the meta-narrative was.>

## Biggest moves by theme

### Data collection
### Data annotation & validation
### Embedded AI systems
### Robotics & humanoids
### India & SEA

## Money & moves

## Papers added this month

## What to watch in <next month>
```

Pulled in by `_sidebar.js` via `manifest.json` so they appear in the site nav under "Monthly reviews".
