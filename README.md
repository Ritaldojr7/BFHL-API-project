# BFHL REST API (Node.js + Express)

A lightweight REST API for the BFHL task.

## Endpoints
- `POST /bfhl` – Accepts a JSON body `{ "data": ["a","1","334","4","R","$"] }` and returns the processed response.

## Identity
Configure the following environment variables on your host (Render/Railway/Heroku/etc.) so `user_id`, `email`, and `roll_number` are correct:

- `FULL_NAME` (lowercase + underscores preferred, e.g., `john_doe`)
- `DOB_DDMMYYYY` (e.g., `17091999`)
- `EMAIL`
- `ROLL_NUMBER`

If not set, the app uses sane defaults for local testing.

## Run locally
```bash
npm install
npm start

# In another terminal, test:
curl -X POST http://localhost:3000/bfhl \    -H "Content-Type: application/json" \    -d '{ "data": ["a","1","334","4","R","$"] }'
```

## Deploy (Render)
1. Push this folder to a public GitHub repo.
2. Create a new **Web Service** on [Render](https://render.com), connect your repo.
3. Build Command: `npm install`
4. Start Command: `npm start`
5. Set Environment Variables: `FULL_NAME`, `DOB_DDMMYYYY`, `EMAIL`, `ROLL_NUMBER`.
6. After deploy, your base URL will look like `https://your-service.onrender.com`. Your API is then `POST https://your-service.onrender.com/bfhl`.

## Deploy (Railway – alternative)
- Create a new project from your GitHub repo, Railway auto-detects Node and deploys.
- Set the same environment variables in Railway settings.

## Notes
- Numbers are returned **as strings**.
- `sum` is returned **as a string**.
- `alphabets` are returned uppercased.
- `concat_string` uses **all letters** from alphabet-only inputs, reversed, and then **alternating caps** (Upper, lower, Upper, ...).
