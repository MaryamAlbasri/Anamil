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
- **Shared bookings**: the learner and craftsperson sides share the same booking data, so a cancellation or an accepted request shows on both sides
- **Admin panel**: verification requests, reported content and the crafts list
- Fully **responsive** for desktop and mobile

## Tech stack

| Tool | Purpose |
|------|---------|
| [React](https://react.dev) | UI components |
| [Vite](https://vitejs.dev) | Development server and build tool |
| [Tailwind CSS v4](https://tailwindcss.com) | Styling and responsive design |
| [React Router](https://reactrouter.com) | Page navigation |
| React Context + localStorage | Shared booking data that survives a page refresh |
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
| Cart | `/cart` |
| Craftsperson dashboard | `/dashboard/profile`, `/dashboard/lessons`, `/dashboard/bookings`, `/dashboard/products`, `/dashboard/orders` |
| Admin panel | `/admin/verification`, `/admin/reports`, `/admin/crafts` |

**Try these:**
- **Book a lesson:** open a teacher → Book → "Continue to booking (demo)" → pick a December date and time → pay.
- **Payment failed:** use any card number ending in `0000`.
- **Slot taken:** in the browser console run `sessionStorage.setItem("simulateSlotTaken", "true")`, then book.
- **Stock warning:** in the cart, click "Continue to payment" once. The apron quantity drops to 1.
- **Can't cancel:** in My bookings, click Cancel on Sara Mansour's photography lesson.
- **Booking requests:** in `/dashboard/bookings`, accept or decline Noura's pending request. Cancel a lesson in My bookings and it shows as Cancelled in the craftsperson's booking requests too.
- **Reset the sample data:** bookings are saved in the browser. To start fresh, run `localStorage.clear()` in the browser console and refresh.

## Project structure

```
src/
  components/    Navbar, Footer, Sidebar, HeroSlideshow, HobbyBento, TeachersRow,
                 HowItWorks, Card, Modal, Button, Input, Tag
  context/       BookingContext (shared bookings saved in localStorage)
  data/          crafts, craftspeople, lessons, bookings, orders, products, users
  pages/
    discovery/     Home, Browse, CraftspersonProfile, AiFinder, HowItWorksPage,
                   About, NotFound                                 (Maryam)
    admin/         AdminVerification, AdminReports, AdminCrafts    (Maryam)
    learner/       LessonDetails, LessonPayment, WhatToBuy, BookingSuccess,
                   BookingSlotTaken, PaymentFailed, MyBookings, BookingDetails,
                   CancelBooking, ReviewLesson, Cart, OrderPayment,
                   OrderConfirmation, OrderDetails                 (Hawra)
    accounts/      SignUp, Login, ResetPassword                    (Walaa)
    craftsperson/  ProfileSetup, LessonEditor, BookingRequests,
                   Products, Orders                                (Walaa)
  App.jsx        all routes
  main.jsx       app entry (BrowserRouter + BookingProvider)
public/images/   hobby photos, hero images and logo
```