# Anamil (أنامل): Crafts Connect People

Anamil is a web platform that connects people who want to learn a craft or creative hobby with the teachers who practise it. Teachers get a professional profile, a shop and an organized lesson booking system. Beginners get an AI assistant that turns a plain description of their interests into matching hobbies, connects them with local teachers, and gives them a starter list of what to buy before their first lesson.

This repository contains the **Phase 4 front-end prototype** built with React. All data is sample data stored in the front-end; there is no back-end, real login, real payment or real AI yet.

## Features

- **Home**: hero slideshow, AI search, hobby categories and featured teachers
- **AI hobby finder**: describe what you enjoy and get 3 matching hobbies (simulated AI with loading and error states)
- **Browse**: filter teachers by craft, city and price, with a no-results state
- **Teacher profile**: lessons, shop and reviews tabs, and a "log in to book" modal
- **Accounts**: sign up, log in and password reset forms with validation
- **Craftsperson dashboard**: profile setup, lessons, booking requests, products and orders
- **Learner flow**: lesson booking, starter checklist, my bookings, cart and checkout
- **Admin panel**: verification requests, reported content and the crafts list
- Fully **responsive** for desktop and mobile

## Tech stack

| Tool | Purpose |
|------|---------|
| [React](https://react.dev) | UI components |
| [Vite](https://vitejs.dev) | Development server and build tool |
| [Tailwind CSS v4](https://tailwindcss.com) | Styling and responsive design |
| [React Router](https://reactrouter.com) | Page navigation |
| Google Fonts (DM Sans, Instrument Serif) | Typography |

## Getting started

### Requirements
- [Node.js](https://nodejs.org) 20 or newer (includes npm)
- Git

### Installation
```bash
git clone https://github.com/MaryamAlbasri/Anamil.git
cd Anamil
npm install
```

### Run the app
```bash
npm run dev
```
Then open http://localhost:5173 in your browser.

To test on a phone on the same Wi-Fi, run `npm run dev -- --host` and open the **Network** address shown in the terminal.

### Build for production
```bash
npm run build
npm run preview
```

No API keys or environment variables are needed for this phase.

## Usage

| Page | URL |
|------|-----|
| Home | `/` |
| AI hobby finder | `/find-my-hobby` |
| Browse teachers | `/browse` (e.g. `/browse?craft=pottery`) |
| Teacher profile | `/craftspeople/1` |
| How it works | `/how-it-works` |
| About us | `/about` |
| Sign up / Log in | `/signup`, `/login` |
| Lesson details & booking | `/lessons/1` |
| Lesson payment | `/lessons/1/payment` |
| Starter checklist | `/lessons/1/checklist` |
| My bookings | `/my-bookings` (details: `/my-bookings/4821`) |
| Cart, checkout, confirmation | `/cart`, `/checkout/payment`, `/order-confirmation` |
| Craftsperson dashboard | `/dashboard/profile`, `/dashboard/lessons`, `/dashboard/bookings`, `/dashboard/products`, `/dashboard/orders` |
| Admin panel | `/admin/verification`, `/admin/reports`, `/admin/crafts` |

**Try these:**
- On a lesson page, pick a date and time, then continue to payment to finish a booking.
- On Home, type *"something calm and quiet for my weekends"* in the search and press **Find**.
- In the AI finder, include the word **error** in your description to see the error state.
- On a teacher profile, click **Book** to see the login-required modal.
- In Browse, pick filters with no match (e.g. Photography + Riyadh) to see the empty state.

Data resets when the page reloads, since it is sample data for the prototype.

## Project structure

```
src/
├── components/   Reusable UI (Navbar, Footer, Button, Card, Modal, ...)
├── data/         Sample data (craftspeople, lessons, bookings, orders, products, users)
├── pages/
│   ├── discovery/  Home, Browse, AI finder, teacher profile, About, How it works, 404
│   ├── admin/      Verification, reports, crafts list
│   ├── learner/    Lesson booking, payment, checklist, bookings, cart, orders
│   └── ...         Accounts and craftsperson dashboard pages
├── App.jsx       Route table
├── index.css     Tailwind import and theme colors (clay, ink, cream, blush, gold, muted)
└── main.jsx      App entry point
public/images/    Logo and hobby photos
AI_USAGE.md       AI usage declaration for this phase
```

## Team

| Member | Role | Area |
|--------|------|------|
| Maryam Albasri | Team lead, discovery and admin | Home, AI finder, Browse, teacher profile, How it works, About, admin pages, 404 |
| Walaa | Accounts and craftsperson | Sign up, log in, password reset, craftsperson dashboard pages, shared Button/Input/Tag |
| Hawra Alyousif | Learner flow | Lesson details and booking, payment, starter checklist, my bookings, cart, checkout and order pages |
