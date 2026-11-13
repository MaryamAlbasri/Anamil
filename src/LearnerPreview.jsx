
import LessonDetails from "./pages/learner/LessonDetails";
import BookingSlotTaken from "./pages/learner/BookingSlotTaken";
import BookingSuccess from "./pages/learner/BookingSuccess";
import LessonPayment from "./pages/learner/LessonPayment";
import PaymentFailed from "./pages/learner/PaymentFailed";

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

    default:
      return <LessonDetails />;
  }
}

export default LearnerPreview;
