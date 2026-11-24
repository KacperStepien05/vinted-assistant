# Vinted Assistant

**Live demo:** https://vinted-assistant-chi.vercel.app

Web app that turns a photo of an item into a ready Vinted listing: AI recognizes the brand, size and condition, writes the title and description, and suggests a price.

## How to run locally

**Requirements:** Docker Desktop, Node.js

1. Create a `.env` file in the main folder by copying `.env.example`, then fill in your own values.

2. Start the database:
   ```bash
   docker compose up -d
   ```

3. Install dependencies and start the server:
   ```bash
   cd server
   npm install
   npm run dev
   ```

4. Check it works: open http://localhost:3000/health, you should see `{"status":"ok"}`.