<scheduled-task name="hupa-physical-ai-monthly" file="this file">
This is an automated run of a scheduled task. The user is not present. Execute autonomously, make reasonable choices, note them in your output.

You are running the **HuPa Physical AI Monthly Review** — a once-per-month synthesis of the previous month's daily briefs into a single readable digest. Lives at `monthly/YYYY-MM.html`.

Schedule: 1st of each month at 08:00 IST (one hour after the daily run, so the prior month's last day is already published).

================================================================
SITE LAYOUT (same as daily skill)
================================================================
Working dir: `/Users/ashishnoel/Documents/Projects/HuPa/02_market/physical_ai_daily/`
Sources: `days/YYYY-MM-DD.md` (one per day, prior month)
Output: `monthly/YYYY-MM.md` → `monthly/YYYY-MM.html` (via `./build.sh`)

================================================================
0. LOAD ENV
================================================================
```
cd /Users/ashishnoel/Documents/Projects/HuPa/02_market/physical_ai_daily
set -a; . ./.env.local; set +a
git remote set-url origin "https://x-access-token:${GITHUB_TOKEN}@github.com/${GITHUB_REPO}.git"
```

================================================================
1. COMPUTE TARGET MONTH
================================================================
Target = the month that just ended.
```
TARGET=$(date -v-1m +%Y-%m 2>/dev/null || date -d "last month" +%Y-%m)
echo "Target month: $TARGET"
```

================================================================
2. GATHER INPUT
================================================================
Read every `days/${TARGET}-*.md`. Confirm at least 15 days exist; if fewer, note it in the output (could be the first month after launch).

================================================================
3. WRITE monthly/${TARGET}.md
================================================================
Structure (strict — drives the manifest title + sidebar):

```markdown
# <Month Name> <Year> review

<One-paragraph "the month in one sentence" — what mattered, what the meta-narrative was. 60-90 words. Builder-operator voice, no AI-tells.>

## TL;DR

- [Biggest move of the month — with link]
- [Second — funding / partnership / capability shift]
- [Third — what changed in our space]
- [Fourth — what should change in our plan because of it]
- [Fifth — what to watch in <next month>]

## Biggest moves by theme

### Data collection
<2-4 paragraphs synthesizing all collection-related moves from the month. Don't just bullet-list — argue what the month meant for this wedge. Quote specific entities, link to the relevant day's brief via `../days/YYYY-MM-DD.html#data-collection`.>

### Data annotation & validation
<Same shape.>

### Embedded AI systems
<Same shape.>

### Robotics & humanoids
<Same shape.>

### India & SEA spotlight
<Same shape.>

## Money & moves

<Table of the month's named funding rounds, acquisitions, and major hires. Columns: date · entity · move · $ or context · source. Reverse-chronological.>

## Papers added this month

<Reference papers added to the Papers DB during the month, with the same one-line "why it matters" framing.>

## What to watch in <next month>

<3-5 bullets. Specific entities, specific likely moves, specific signals to track. Not hype.>
```

**Voice rules:** `ashish-writing` AI-tells checklist. No em dashes. Declarative. First-person "we" when commenting on HuPa positioning. Never pad.

================================================================
4. BUILD + PUBLISH
================================================================
```
./build.sh
git add monthly/ index.html manifest.json
git diff --cached --quiet || (
  git commit -m "monthly: ${TARGET} review"
  git push origin main
)
```

================================================================
5. SEND TELEGRAM
================================================================
Longer than daily — include the TL;DR and a link.

```
MONTH_NAME=$(date -d "${TARGET}-01" "+%B %Y" 2>/dev/null || date -v-1m "+%B %Y")
MONTHLY_URL="${GITHUB_PAGES_URL%/}/monthly/${TARGET}.html"

TLDR=$(awk '/^## TL;?DR$/{flag=1;next}/^## /{flag=0}flag&&/^- /' \
  "monthly/${TARGET}.md" | head -5)

MESSAGE=$(cat <<EOF
📊 HuPa Physical AI Monthly Review — $MONTH_NAME

TL;DR
$TLDR

📄 Full review: $MONTHLY_URL
📚 All briefs: $GITHUB_PAGES_URL
EOF
)

curl -s -X POST "https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/sendMessage" \
  --data-urlencode "chat_id=$TELEGRAM_CHAT_ID" \
  --data-urlencode "text=$MESSAGE" \
  --data-urlencode "disable_web_page_preview=false"
```

================================================================
6. FINAL STATUS REPORT
================================================================
  - `monthly/${TARGET}.md` and `.html` paths
  - Live URL
  - Number of input days covered
  - Last commit SHA
  - Telegram delivery
</scheduled-task>
