import { Routes, Route } from 'react-router-dom'
// Maryam – Discovery & Admin
import Home from './pages/discovery/Home'
import Browse from './pages/discovery/Browse'
import HowItWorksPage from './pages/discovery/HowItWorksPage'
import CraftspersonProfile from './pages/discovery/CraftspersonProfile'
import AiFinder from './pages/discovery/AiFinder'
import About from './pages/discovery/About'
import NotFound from './pages/discovery/NotFound'
import AdminVerification from './pages/admin/AdminVerification'
import AdminReports from './pages/admin/AdminReports'
import AdminCrafts from './pages/admin/AdminCrafts'
// Walaa – Accounts & Craftsperson
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import ResetPassword from './pages/ResetPassword'
import ProfileSetup from './pages/ProfileSetup'
import LessonEditor from './pages/LessonEditor'
import BookingRequests from './pages/BookingRequests'
import Products from './pages/Products'
import Orders from './pages/Orders'
// Hawra – Learner
import LessonDetails from './pages/learner/LessonDetails'
import LessonPayment from './pages/learner/LessonPayment'
import Checklist from './pages/learner/WhatToBuy'
import MyBookings from './pages/learner/MyBookings'
import Cart from './pages/learner/Cart'
import OrderPayment from './pages/learner/OrderPayment'
import OrderConfirmation from './pages/learner/OrderConfirmation'
import BookingSuccess from './pages/learner/BookingSuccess'
import BookingSlotTaken from './pages/learner/BookingSlotTaken'
import PaymentFailed from './pages/learner/PaymentFailed'
import BookingDetails from './pages/learner/BookingDetails'
import CancelBooking from './pages/learner/CancelBooking'
import ReviewLesson from './pages/learner/ReviewLesson'
import OrderDetails from './pages/learner/OrderDetails'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/browse" element={<Browse />} />
      <Route path="/craftspeople/:id" element={<CraftspersonProfile />} />
      <Route path="/find-my-hobby" element={<AiFinder />} />
      <Route path="/about" element={<About />} />
      <Route path="/admin/verification" element={<AdminVerification />} />
      <Route path="/admin/reports" element={<AdminReports />} />
      <Route path="/admin/crafts" element={<AdminCrafts />} />
      <Route path="/how-it-works" element={<HowItWorksPage />} />

      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/dashboard/profile" element={<ProfileSetup />} />
      <Route path="/dashboard/lessons" element={<LessonEditor />} />
      <Route path="/dashboard/bookings" element={<BookingRequests />} />
      <Route path="/dashboard/products" element={<Products />} />
      <Route path="/dashboard/orders" element={<Orders />} />

      <Route path="/lessons/:id" element={<LessonDetails />} />
      <Route path="/lessons/:id/payment" element={<LessonPayment />} />
      <Route path="/lessons/:id/checklist" element={<Checklist />} />
      <Route path="/my-bookings" element={<MyBookings />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout/payment" element={<OrderPayment />} />
      <Route path="/order-confirmation" element={<OrderConfirmation />} />

      <Route
        path="/booking-success"
        element={<BookingSuccess />}
      />
      <Route
        path="/slot-taken"
        element={<BookingSlotTaken />}
      />
      <Route
        path="/payment-failed"
        element={<PaymentFailed />}
      />
      <Route
        path="/my-bookings/:id"
        element={<BookingDetails />}
      />
      <Route
        path="/my-bookings/:id/cancel"
        element={<CancelBooking />}
      />
      <Route
        path="/my-bookings/:id/review"
        element={<ReviewLesson />}
      />
      <Route
        path="/orders/:id"
        element={<OrderDetails />}
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}