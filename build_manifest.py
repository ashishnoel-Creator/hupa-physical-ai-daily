#!/usr/bin/env python3
"""
Build manifest.json from days/*.md and monthly/*.md.

Manifest shape:
  {
    "days": [{date, slug, title, tldr: [..3 bullets..]}, ...],   # newest first
    "monthly_reviews": [{date, slug, title, summary}, ...],      # newest first
    "papers_count": int,
    "updated_at": "ISO8601 UTC"
  }
"""
import json
import re
import sys
import datetime
from pathlib import Path

BASE = Path(__file__).parent
DAYS_DIR = BASE / "days"
MONTHLY_DIR = BASE / "monthly"
PAPERS_HTML = BASE / "papers.html"
OUT = BASE / "manifest.json"


def parse_day_md(path: Path) -> dict:
    text = path.read_text(encoding="utf-8")
    # Title: first "## " heading
    m = re.search(r"^##\s+(.+?)\s*$", text, re.MULTILINE)
    title = m.group(1).strip() if m else path.stem
    # TL;DR bullets
    tldr = []
    tldr_match = re.search(r"^###\s+TL;?DR\s*$([\s\S]*?)(?=^###\s|\Z)", text, re.MULTILINE)
    if tldr_match:
        for line in tldr_match.group(1).splitlines():
            line = line.strip()
            if line.startswith("- "):
                # Strip markdown links to keep the manifest small + clean
                bullet = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", line[2:])
                tldr.append(bullet.strip())
    return {
        "date": path.stem,
        "slug": path.stem,
        "title": title,
        "tldr": tldr[:3],
    }


def parse_monthly_md(path: Path) -> dict:
    text = path.read_text(encoding="utf-8")
    m = re.search(r"^#\s+(.+?)\s*$", text, re.MULTILINE)
    title = m.group(1).strip() if m else path.stem
    # First non-empty paragraph as summary
    summary = ""
    for para in re.split(r"\n\s*\n", text):
        p = para.strip()
        if p and not p.startswith("#"):
            summary = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", p)[:240]
            break
    return {
        "date": path.stem,
        "slug": path.stem,
        "title": title,
        "summary": summary,
    }


def count_papers() -> int:
    if not PAPERS_HTML.exists():
        return 0
    text = PAPERS_HTML.read_text(encoding="utf-8")
    return len(re.findall(r"^    id:\s+'", text, re.MULTILINE))


def main() -> int:
    days = []
    if DAYS_DIR.exists():
        for p in sorted(DAYS_DIR.glob("*.md"), reverse=True):
            if re.match(r"^\d{4}-\d{2}-\d{2}$", p.stem):
                days.append(parse_day_md(p))

    monthly = []
    if MONTHLY_DIR.exists():
        for p in sorted(MONTHLY_DIR.glob("*.md"), reverse=True):
            if re.match(r"^\d{4}-\d{2}$", p.stem):
                monthly.append(parse_monthly_md(p))

    manifest = {
        "days": days,
        "monthly_reviews": monthly,
        "papers_count": count_papers(),
        "updated_at": datetime.datetime.utcnow().replace(microsecond=0).isoformat() + "Z",
    }
    OUT.write_text(json.dumps(manifest, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"manifest.json: {len(days)} days, {len(monthly)} monthly, {manifest['papers_count']} papers")
    return 0


if __name__ == "__main__":
    sys.exit(main())
