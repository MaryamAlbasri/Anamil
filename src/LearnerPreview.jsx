
import LessonDetails from "./pages/learner/LessonDetails";
import LessonPayment from "./pages/learner/LessonPayment";
import BookingSuccess from "./pages/learner/BookingSuccess";
import PaymentFailed from "./pages/learner/PaymentFailed";

function LearnerPreview() {
  const params = new URLSearchParams(window.location.search);
  const screen = params.get("screen");

  switch (screen) {
    case "payment":
      return <LessonPayment />;

    case "booking-success":
      return <BookingSuccess />;

    case "payment-failed":
      return <PaymentFailed />;

    default:
      return <LessonDetails />;
  }
}

export default LearnerPreview;
