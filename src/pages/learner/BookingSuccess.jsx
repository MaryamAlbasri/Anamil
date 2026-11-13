import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { getLessonById } from "../../data/lessons";

function BookingSuccess() {
  const booking = JSON.parse(sessionStorage.getItem("pendingBooking") || "null");
  const lesson = booking ? getLessonById(booking.lessonId) : null;

  // Small helper so each summary row looks the same
  const Row = ({ label, value }) => (
    <div className="flex justify-between gap-4">
      <span className="text-muted">{label}</span>
      <span className="text-right">{value}</span>
    </div>
  );

  if (!booking || !lesson) {
    return (
      <>
        <Navbar />
        <main className="flex min-h-[70vh] items-center justify-center bg-cream px-6 py-12 text-center">
          <div>
            <h1 className="font-serif text-4xl italic text-ink">No booking found</h1>
            <Link to="/browse" className="mt-6 inline-block rounded-full bg-clay px-6 py-3 font-medium text-white">
              Find a teacher
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="flex justify-center bg-cream px-6 py-12">
        <div className="w-full max-w-lg rounded-3xl bg-white p-8 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl text-green-700">
            ✓
          </div>

          <h1 className="mb-3 font-serif text-4xl italic text-ink">Booking request sent!</h1>
          <p className="mb-6 text-muted">
            {lesson.craftspersonName} will review your request and confirm it soon.
          </p>

          <div className="mb-6 space-y-3 rounded-2xl bg-cream p-5 text-left text-sm text-ink">
            <p className="font-medium">{lesson.title}</p>
            <Row label="Teacher" value={lesson.craftspersonName} />
            <Row label="Date" value={booking.date} />
            <Row label="Time" value={booking.time} />
            <Row label="Location" value={lesson.location} />
            <div className="flex items-center justify-between border-t border-blush pt-3">
              <span className="rounded-full bg-gold/30 px-3 py-1 text-xs font-medium text-ink">Pending confirmation</span>
              <span className="text-base font-medium text-clay">{lesson.price} SAR</span>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              to="/my-bookings"
              className="flex-1 rounded-full bg-clay py-3 text-sm font-medium text-white hover:opacity-90"
            >
              Go to my bookings
            </Link>
            <Link
              to={`/lessons/${lesson.id}/checklist`}
              className="flex-1 rounded-full border border-ink py-3 text-sm font-medium text-ink hover:bg-cream"
            >
              See what to buy
            </Link>
          </div>

          <p className="mt-5 text-xs text-muted">Demo booking. No real payment was processed.</p>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default BookingSuccess;