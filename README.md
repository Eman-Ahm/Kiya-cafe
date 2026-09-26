# ☕ Kiya Cafe

Full-stack dine-in cafe system — **React** frontend + **Node.js / Express / MySQL** backend.

Contact: kiyacafe@gmail.com | Dessie, Ethiopia 🇪🇹

---

## ✨ Features

- Home page: daily specials banner, hero, menu, chef's recommendations, about, book table, testimonials
- Menu page with category filter (view-only, dine-in)
- Book a Table — full form saved to MySQL database
- Sign In / Sign Up with JWT auth
- Sticky navbar, mobile hamburger, hover effects everywhere
- Footer with social icons, opening hours, quick links

---

## 🛠 Tech Stack

| Layer    | Tech                                  |
|----------|---------------------------------------|
| Frontend | React 19, React Router v7, Axios      |
| Backend  | Node.js, Express 5                    |
| Database | MySQL (via XAMPP)                     |
| ORM      | mysql2 (raw SQL — no ORM)             |
| Auth     | JWT + bcryptjs                        |
| Icons    | react-icons                           |

---

## 🚀 How to Run — Step by Step

---

### STEP 1 — Start XAMPP MySQL

1. Open **XAMPP Control Panel** (search "XAMPP" in Start menu)
2. Click **Start** next to **MySQL**
3. The status turns green — MySQL is now running on port 3306
4. Click **Start** next to **Apache** too (needed for phpMyAdmin)

---

### STEP 2 — Create the database in phpMyAdmin

1. Open your browser → go to **http://localhost/phpmyadmin**
2. Click **"SQL"** tab at the top
3. Copy and paste the entire contents of `backend/setup.sql`
4. Click **"Go"**
5. You should see: `Kiya Cafe database setup complete ✅`
6. In the left panel you'll now see the **kiyacafe** database with 3 tables:
   - `users`
   - `bookings`
   - `recipes`

> **Shortcut:** In phpMyAdmin left panel, click **"New"** → type `kiyacafe` → Create. Then click the SQL tab and paste the CREATE TABLE parts only.

---

### STEP 3 — Install backend dependencies

Open a terminal in the `backend` folder:

```bash
cd backend
npm install
```

This installs: `express`, `mysql2`, `bcryptjs`, `jsonwebtoken`, `cors`, `dotenv`

---

### STEP 4 — Check your .env file

Open `backend/.env` — it should look like this:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=kiyacafe
DB_PORT=3306

PORT=5000
JWT_SECRET=KiyaCafe2026SuperSecretKey987
```

> **Note:** XAMPP MySQL default has user `root` with **no password** (empty). If you set a password for root in XAMPP, put it after `DB_PASSWORD=`.

---

### STEP 5 — Start the backend

```bash
cd backend
node server.js
```

You should see:
```
🚀 Server running on port 5000
✅ MySQL connected — database: kiyacafe
```

Test it: open http://localhost:5000 in your browser → should show:
```json
{ "message": "Kiya Cafe API is running 🍽️", "status": "ok" }
```

---

### STEP 6 — Start the frontend

Open a **second terminal**:

```bash
cd frontend
npm install
npm start
```

Opens at **http://localhost:3000** automatically.

---

## 🧪 Testing Checklist

| Test | What to do | Expected result |
|---|---|---|
| Home loads | Open http://localhost:3000 | Specials banner, hero, menu, recommendations, about, book table, testimonials |
| Menu filter | Click category pills | Cards filter |
| Book a Table | Fill all fields → Reserve | 🎉 success screen |
| Booking saved | Open phpMyAdmin → kiyacafe → bookings | Your booking row appears |
| Sign Up | Go to /signup → fill form | Account created, redirected to home |
| Sign In | Go to /login → use your credentials | Logged in, navbar shows "Hi, Name" + Sign Out |
| Sign Out | Click Sign Out | Navbar back to Sign In / Sign Up |
| API health | http://localhost:5000 | `{"message":"Kiya Cafe API is running..."}` |

---

## 🌐 API Endpoints

```
GET    /                            → Health check
POST   /api/auth/signup             → Register  { name, email, password }
POST   /api/auth/login              → Login     { email, password }
POST   /api/bookings                → Book a table (public)
GET    /api/bookings                → All bookings (JWT required)
PATCH  /api/bookings/:id/status     → Update status (JWT required)
DELETE /api/bookings/:id            → Delete booking (JWT required)
GET    /api/recipes                 → All recipes
POST   /api/recipes                 → Create recipe (JWT required)
```

---

## 📤 Push to GitHub

```bash
# From project root
git init
git add .
git commit -m "feat: Kiya Cafe — React + MySQL"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/kiya-cafe.git
git push -u origin main
```

> `.env` is in `.gitignore` — it will NOT be pushed. ✅

---

## 📁 Project Structure

```
kiya-cafe/
├── backend/
│   ├── controllers/
│   │   ├── authController.js      ← MySQL queries for login/signup
│   │   ├── bookingController.js   ← MySQL queries for bookings
│   │   └── recipeController.js    ← MySQL queries for recipes
│   ├── middleware/
│   │   └── authMiddleware.js      ← JWT verification
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── bookingRoutes.js
│   │   └── recipeRoutes.js
│   ├── db.js                      ← mysql2 connection pool
│   ├── setup.sql                  ← Run this once to create tables
│   ├── .env                       ← DB credentials (not committed)
│   ├── .gitignore
│   ├── package.json
│   └── server.js
└── frontend/
    └── src/
        ├── components/  Navbar, Hero, MenuSection, Recommendations,
        │                SpecialsBanner, AboutSection, BookTableSection,
        │                Testimonials, Footer
        ├── pages/       Home, Menu, About, BookTable, Login, Signup
        ├── api/         axios.js, auth.js
        ├── App.js
        └── theme.js
```

---

© 2026 Kiya Cafe — kiyacafe@gmail.com — Dessie, Ethiopia 🇪🇹
