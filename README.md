# Google Play Reviews Scraper & API: reviews, ratings and developer replies

[![Run on Apify](https://img.shields.io/badge/Run%20on-Apify-0b57d0)](https://apify.com/automationnation/google-play-reviews-scraper)

Google Play Reviews Scraper is an Apify Actor that extracts Google Play reviews for any app, country and language — star rating, text, date, author, thumbs-up count, app version and the developer's reply — at $0.08 per 1,000 reviews. It works as a Google Play reviews API: call it from code, schedule it to monitor new reviews, or let AI agents use it through Apify's MCP server.

**Price:** $0.08 per 1,000 reviews ($0.05–$0.07 on paid plans) · **Run it:** [https://apify.com/automationnation/google-play-reviews-scraper](https://apify.com/automationnation/google-play-reviews-scraper) · **Guide:** [https://retracn.github.io/automationnation-actors/google-play-reviews-scraper/](https://retracn.github.io/automationnation-actors/google-play-reviews-scraper/)

## Quick facts

- One row per review: stars, text, date, the reviewer's public name, thumbs-up count, the app version it was written for, and the developer's reply with its date, plus app name, developer, overall rating and URL.
- Any app, country and language: Google Play URLs, package names (com.spotify.music) or plain app names; newest, most relevant or by rating; thousands of reviews per app.
- Star filters (for example only 1 and 2 stars) and an Only new reviews mode: scheduled runs return just the reviews earlier runs didn't, and repeats aren't charged.
- Price: $0.08 per 1,000 reviews on the Free plan ($0.05–$0.07 on paid plans), with no caps on free-plan runs or reviews. Apify's free $5 monthly credit covers over 60,000 reviews.
- Also reads App Store apps, past the 500-review limit of Apple's public review feed.

## Example input

```json
{
  "apps": [
    "com.spotify.music",
    "Duolingo"
  ],
  "maxReviewsPerApp": 200,
  "sort": "newest",
  "country": "us",
  "language": "en"
}
```

## Run it from code

**REST API**

```bash
curl -X POST "https://api.apify.com/v2/acts/automationnation~google-play-reviews-scraper/run-sync-get-dataset-items?token=$APIFY_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"apps": ["com.spotify.music", "Duolingo"], "maxReviewsPerApp": 200, "sort": "newest", "country": "us", "language": "en"}'
```

**Python** — see [`examples/python_example.py`](examples/python_example.py)

```python
# pip install apify-client
from apify_client import ApifyClient

client = ApifyClient("YOUR_APIFY_TOKEN")
run = client.actor("automationnation/google-play-reviews-scraper").call(run_input={
  "apps": [
    "com.spotify.music",
    "Duolingo"
  ],
  "maxReviewsPerApp": 200,
  "sort": "newest",
  "country": "us",
  "language": "en"
})
for item in client.dataset(run["defaultDatasetId"]).iterate_items():
    print(item.get("appName"), item.get("rating"), item.get("date"), item.get("text"))
```

**JavaScript** — see [`examples/node_example.mjs`](examples/node_example.mjs)

```js
// npm install apify-client
import { ApifyClient } from 'apify-client';

const client = new ApifyClient({ token: 'YOUR_APIFY_TOKEN' });
const run = await client.actor('automationnation/google-play-reviews-scraper').call({
  "apps": [
    "com.spotify.music",
    "Duolingo"
  ],
  "maxReviewsPerApp": 200,
  "sort": "newest",
  "country": "us",
  "language": "en"
});
const { items } = await client.dataset(run.defaultDatasetId).listItems();
for (const item of items) console.log(item.appName, item.rating, item.date, item.text);
```

## Use it with AI agents (MCP)

Hosted MCP server URL (Claude, ChatGPT, Cursor and other clients with remote MCP support):

```
https://mcp.apify.com?tools=automationnation/google-play-reviews-scraper
```

Local config for Claude Desktop / Cursor — [`mcp/claude_desktop_config.json`](mcp/claude_desktop_config.json):

```json
{
  "mcpServers": {
    "google-play-reviews-scraper": {
      "command": "npx",
      "args": [
        "-y",
        "@apify/actors-mcp-server",
        "--tools",
        "automationnation/google-play-reviews-scraper"
      ],
      "env": {
        "APIFY_TOKEN": "YOUR_APIFY_TOKEN"
      }
    }
  }
}
```

## FAQ

**Is there an official Google Play reviews API?**
Google's Play Developer API returns reviews only for apps you publish yourself, and only from the last week. To read reviews of any app, including competitors', Google Play Reviews Scraper on Apify reads the public reviews shown on Google Play and returns them through Apify's REST API, Python and JavaScript clients, integrations and MCP.

**What does Google Play Reviews Scraper return?**
One row per review: rating, text, date, reviewer name, thumbs-up count, app version, the developer's reply and reply date, a link to the review, and app details (name, developer, overall rating, number of ratings, URL).

**How many reviews can I get?**
Thousands per app for popular apps. The Actor pages through Google Play until it reaches your limit or the last review.

**How much does it cost?**
$0.08 per 1,000 reviews on Apify's Free plan and $0.05–$0.07 on paid plans. Reviews already returned by earlier runs in Only new reviews mode, and apps that can't be found, are free.

**Can I monitor new reviews?**
Yes. Tick Only new reviews and schedule the Actor; each run returns only reviews that earlier runs didn't, and you can send them to Slack, email or a webhook.

## More from AutomationNation

- [AI Visibility Tracker](https://apify.com/automationnation/ai-visibility-tracker) — $0.05 per answer checked ($0.04 on Gold) + $0.50 per optional report · [GitHub examples](https://github.com/retracn/ai-visibility-tracker)
- [Google Jobs Scraper](https://apify.com/automationnation/google-jobs-scraper) — $2 per 1,000 jobs ($1.50 on paid plans) + $0.03 per search · [GitHub examples](https://github.com/retracn/google-jobs-scraper)
- [Google Trends Scraper](https://apify.com/automationnation/google-trends-scraper) — $1 per 1,000 keyword reports ($0.27–$0.90 on paid plans) · $0.50 per 1,000 trending searches · [GitHub examples](https://github.com/retracn/google-trends-scraper)
- [App Store Reviews Scraper](https://apify.com/automationnation/app-store-reviews-scraper) — $0.08 per 1,000 reviews ($0.05–$0.07 on paid plans) · [GitHub examples](https://github.com/retracn/app-store-reviews-scraper)
- [AEO & GEO Tracker — Google AI Overview Citation Checker](https://apify.com/automationnation/aeo-auditor) — $0.04 per keyword ($0.032 on Gold), plus $2 per run from 17 Nov 2026; $0.01 per keyword until 16 Oct 2026 · [GitHub examples](https://github.com/retracn/google-ai-overview-tracker)
- [Google Maps Leads Scraper UK](https://apify.com/automationnation/uk-business-leads) — $0.05 per lead ($0.04 on Gold) · [GitHub examples](https://github.com/retracn/uk-business-leads-google-maps)
- [App Store & Google Play Reviews Scraper + AI](https://apify.com/automationnation/app-store-review-miner) — $0.05 per app report ($0.04 on Gold) · [GitHub examples](https://github.com/retracn/app-store-google-play-reviews-ai)
- [UK Companies House Leads — Filing Signals & AI Outreach](https://apify.com/automationnation/companies-house-leads) — $0.008 per lead
- [Contact Waterfall Enrichment — Emails & Directors](https://apify.com/automationnation/contact-waterfall-enrichment) — $0.015 per company
- [All Actors and guides](https://retracn.github.io/automationnation-actors/) · [AI visibility trackers compared](https://retracn.github.io/automationnation-actors/compare/ai-visibility-trackers/) · [Google Jobs scrapers compared](https://retracn.github.io/automationnation-actors/compare/google-jobs-scrapers/) · [Google Trends scrapers compared](https://retracn.github.io/automationnation-actors/compare/google-trends-scrapers/) · [App Store review scrapers compared](https://retracn.github.io/automationnation-actors/compare/app-store-review-scrapers/) · [Google Play review scrapers compared](https://retracn.github.io/automationnation-actors/compare/google-play-review-scrapers/)

---

This repository holds usage examples. The scraper itself runs on the [Apify platform](https://apify.com/automationnation/google-play-reviews-scraper); you need a free Apify account and API token. Examples are MIT licensed.
