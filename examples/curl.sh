#!/bin/bash
# export APIFY_TOKEN=your_token
curl -X POST "https://api.apify.com/v2/acts/automationnation~google-play-reviews-scraper/run-sync-get-dataset-items?token=$APIFY_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"apps": ["com.spotify.music", "Duolingo"], "maxReviewsPerApp": 200, "sort": "newest", "country": "us", "language": "en"}'
