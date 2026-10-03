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
