# Little Bead Studio

A MERN-stack site for showcasing handmade beadwork: a gallery of pieces with
prices and descriptions, an About page, and a contact form that emails you
when someone reaches out.

## Stack
- **MongoDB** — stores items (your beadwork listings) and contact messages
- **Express** — REST API (`/backend`)
- **React** (Vite) — frontend (`/frontend`)
- **Node.js** — runs it all

## Project structure
```
littlebeadstudio/
├── backend/
│   ├── config/db.js          MongoDB connection
│   ├── models/                Item.js, Message.js (Mongoose schemas)
│   ├── controllers/           request logic for items & contact
│   ├── routes/                /api/items, /api/contact
│   ├── seed/seedItems.js      sample data loader
│   └── server.js              app entry point
└── frontend/
    └── src/
        ├── pages/              Home (gallery), ItemDetail, About, Contact
        ├── components/         Navbar, Footer, ItemCard, BeadDivider
        └── api/client.js       talks to the backend API
```

## 1. Set up MongoDB
Easiest option: create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas),
and grab the connection string. (Or run MongoDB locally if you prefer.)

## 2. Backend setup
```bash
cd backend
cp .env.example .env
# edit .env: paste your MONGO_URI, and your email credentials for the contact form
npm install
npm run seed     # loads 4 sample beadwork items so the gallery isn't empty
npm run dev      # starts the API on http://localhost:5000
```

### Setting up the contact-form email
The contact form emails you via [Nodemailer](https://nodemailer.com/). The
easiest setup is Gmail with an **App Password** (not your normal password):
1. Turn on 2-Step Verification on your Google account
2. Go to https://myaccount.google.com/apppasswords and generate a password
3. Put your Gmail address in `EMAIL_USER` and the generated password in `EMAIL_PASS`

Every message is also saved to MongoDB regardless of whether the email sends,
so nothing gets lost.

## 3. Frontend setup
```bash
cd frontend
cp .env.example .env    # defaults are fine for local dev
npm install
npm run dev              # starts the site on http://localhost:5173
```

Open http://localhost:5173 — the gallery pulls live from your API.

## 4. Add your real beadwork
Right now there's no admin page yet — the fastest way to add real pieces is:
- **Easiest:** open MongoDB Atlas's web UI (or MongoDB Compass) and add
  documents to the `items` collection directly, matching the shape in
  `backend/models/Item.js`.
- **Also easy:** edit `backend/seed/seedItems.js` with your real pieces and
  re-run `npm run seed`.
- For photos, the simplest path for now is uploading images somewhere like
  [Cloudinary](https://cloudinary.com/) (free tier) or even a GitHub repo,
  and pasting the image URL into the item's `images` array.

Once you're ready to manage listings from the browser instead of the
database, an admin page (with login) is a natural next step — just ask
and it can be added on top of this.

## 5. Customize
- Your name/bio: `frontend/src/pages/About.jsx`
- Colors/fonts: CSS variables at the top of `frontend/src/index.css`
- Site title: `frontend/index.html` and `Navbar.jsx`

## Deploying
- Frontend: [Netlify](https://netlify.com) or [Vercel](https://vercel.com) (free)
- Backend: [Render](https://render.com) (free tier)
- Database: MongoDB Atlas (already free from step 1)

This repo includes `render.yaml` and `netlify.toml`, so both platforms will
auto-detect the right build settings (root directory, build/start commands,
SPA redirect rule) as soon as you connect the GitHub repo — no manual
configuration needed in their dashboards.

Deployment order:
1. Push this repo to GitHub
2. On Render: New → Blueprint → connect the repo. It'll read `render.yaml`
   automatically. Add your real env var values (MONGO_URI, EMAIL_USER, etc.)
   in the Render dashboard — they're deliberately left blank in `render.yaml`
   since secrets don't belong in version control.
3. On Netlify: Add new site → connect the repo. It'll read `netlify.toml`
   automatically. Add one env var: `VITE_API_URL` = your Render URL + `/api`.
4. Back on Render, set `CLIENT_URL` to your live Netlify URL (needed for CORS).
5. Run `npm run seed` once against your live `MONGO_URI`, or add items in
   Atlas directly.

Note: Render's free tier spins down after inactivity, so the first request
after a quiet period can take 30–60 seconds to wake back up.
