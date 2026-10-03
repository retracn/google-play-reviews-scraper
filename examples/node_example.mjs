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
