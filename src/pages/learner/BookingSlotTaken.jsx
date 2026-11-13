import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { getLessonById } from "../../data/lessons";

function BookingSlotTaken() {
  const booking = JSON.parse(sessionStorage.getItem("pendingBooking") || "null");
  const lesson = booking ? getLessonById(booking.lessonId) : null;
  const lessonId = booking?.lessonId || 1;

  return (
    <>
      <Navbar />

      <main className="flex min-h-[70vh] items-center justify-center bg-cream px-6 py-12">
        <div className="w-full max-w-lg rounded-3xl bg-white p-8 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-blush text-3xl text-clay">
            !
          </div>

          <h1 className="mb-3 font-serif text-4xl italic text-ink">This slot was just taken</h1>
          <p className="mb-6 text-muted">
            Someone booked this time a moment before you. Please pick another time.
          </p>

          {booking && lesson && (
            <div className="mb-6 space-y-2 rounded-2xl bg-cream p-5 text-left text-sm text-ink">
              <p className="font-medium">Your previous choice</p>
              <div className="flex justify-between"><span className="text-muted">Lesson</span><span>{lesson.title}</span></div>
              <div className="flex justify-between">
                <span className="text-muted">Date</span>
                <span className="line-through decoration-clay">{booking.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Time</span>
                <span className="line-through decoration-clay">{booking.time}</span>
              </div>
            </div>
          )}

          <Link
            to={`/lessons/${lessonId}`}
            className="block w-full rounded-full bg-clay py-3 font-medium text-white hover:opacity-90"
          >
            Choose another time
          </Link>

          <p className="mt-5 text-xs text-muted">No payment has been taken.</p>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default BookingSlotTaken;