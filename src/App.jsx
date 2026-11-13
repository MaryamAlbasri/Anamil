import { Routes, Route } from 'react-router-dom'

// Maryam – Discovery + Admin
import Home from './pages/Home'
import Browse from './pages/Browse'
import HowItWorksPage from './pages/HowItWorksPage'
import CraftspersonProfile from './pages/CraftspersonProfile'
import AiFinder from './pages/AiFinder'
import About from './pages/About'
import AdminVerification from './pages/AdminVerification'
import AdminReports from './pages/AdminReports'
import AdminCrafts from './pages/AdminCrafts'
import NotFound from './pages/NotFound'
// Walaa – Accounts + Craftsperson
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import ResetPassword from './pages/ResetPassword'
import ProfileSetup from './pages/ProfileSetup'
import LessonEditor from './pages/LessonEditor'
import BookingRequests from './pages/BookingRequests'
import Products from './pages/Products'
import Orders from './pages/Orders'
// Hawra – Learner
import LessonDetails from './pages/LessonDetails'
import LessonPayment from './pages/LessonPayment'
import Checklist from './pages/Checklist'
import MyBookings from './pages/MyBookings'
import Cart from './pages/Cart'
import OrderPayment from './pages/OrderPayment'
import OrderConfirmation from './pages/OrderConfirmation'

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

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}