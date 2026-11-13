
import LessonDetails from "./pages/learner/LessonDetails";
import BookingSlotTaken from "./pages/learner/BookingSlotTaken";
import BookingSuccess from "./pages/learner/BookingSuccess";
import LessonPayment from "./pages/learner/LessonPayment";
import PaymentFailed from "./pages/learner/PaymentFailed";
import WhatToBuy from "./pages/learner/WhatToBuy";
import MyBookings from "./pages/learner/MyBookings";
import BookingDetails from "./pages/learner/BookingDetails";
import CancelBooking from "./pages/learner/CancelBooking";
import ReviewLesson from "./pages/learner/ReviewLesson";
import Cart from "./pages/learner/Cart";
import OrderPayment from "./pages/learner/OrderPayment";
import OrderConfirmation from "./pages/learner/OrderConfirmation";
import OrderDetails from "./pages/learner/OrderDetails";

function LearnerPreview() {
  const params = new URLSearchParams(window.location.search);
  const screen = params.get("screen");

  switch (screen) {
    case "slot-taken":
      return <BookingSlotTaken />;

    case "booking-success":
      return <BookingSuccess />;

    case "payment":
      return <LessonPayment />;

    case "payment-failed":
      return <PaymentFailed />;

    case "what-to-buy":
      return <WhatToBuy />;

    case "my-bookings":
      return <MyBookings />;

    case "booking-details":
      return <BookingDetails />;

    case "cancel-booking":
      return <CancelBooking />;

    case "review-lesson":
      return <ReviewLesson />;

    case "cart":
      return <Cart />;

    case "order-payment":
      return <OrderPayment />;

    case "order-confirmation":
      return <OrderConfirmation />;

    case "order-details":
      return <OrderDetails />;

    default:
      return <LessonDetails />;
  }
}

export default LearnerPreview;
