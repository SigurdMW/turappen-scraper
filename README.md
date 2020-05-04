# Turappen Scraper
![Node.js CI](https://github.com/SigurdMW/turappen-scraper/workflows/Node.js%20CI/badge.svg?branch=master)

Scraping the family score from turappen.no for family members and collects it in a firebase database. Uses Puppeteer to extract info from webpage and runs on schedule in GitHub Actions.

## Development (WIP)
Need a `.env` file with `PRIVATE_KEY_ID` and `PRIVATE_KEY` like below. Run `npm run dev` to start developments
```
PRIVATE_KEY_ID=**************
PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n******************\n-----END PRIVATE KEY-----\n"
```
