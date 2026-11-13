
import { getLessonById } from "../../data/lessons";
import Card from "../../components/Card";

function BookingSuccess() {
  const booking = JSON.parse(
    sessionStorage.getItem("pendingBooking") || "null"
  );

  const lesson = booking
    ? getLessonById(booking.lessonId)
    : null;

  if (!booking || !lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">
          No booking found.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <Card className="w-full max-w-lg text-center">

        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-700 text-4xl">
          ✓
        </div>

        <h1 className="text-2xl font-bold mb-3">
          Booking request sent!
        </h1>

        <p className="text-gray-600 mb-6">
          Your booking request has been sent successfully.
          The craftsperson will review your request
          and confirm your booking soon.
        </p>

        <div className="bg-gray-50 rounded-xl p-5 text-left space-y-3 mb-6">
          <h2 className="text-lg font-semibold mb-3">
            Booking Summary
          </h2>

          <p>
            <strong>Lesson:</strong> {lesson.title}
          </p>

          <p>
            <strong>Craftsperson:</strong>{" "}
            {lesson.craftspersonName}
          </p>

          <p>
            <strong>Date:</strong> {booking.date}
          </p>

          <p>
            <strong>Time:</strong> {booking.time}
          </p>

          <p>
            <strong>Location:</strong> {lesson.location}
          </p>

          <p>
            <strong>Amount:</strong> {lesson.price} SAR
          </p>

          <div className="border-t pt-3">
            <span className="inline-block rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-800">
              Pending confirmation
            </span>
          </div>
        </div>

        <p className="text-sm text-gray-500 mb-5">
          This is a demo booking.
          No real payment has been processed.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href="/my-bookings"
            className="flex-1 rounded-lg bg-black px-4 py-3 text-sm font-medium text-white hover:bg-gray-800"
          >
            Go to My Bookings
          </a>

          <a
            href={`/lessons/${lesson.id}/checklist`}
            className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-sm font-medium hover:bg-gray-100"
          >
            See What to Buy
          </a>
        </div>

      </Card>
    </div>
  );
}

export default BookingSuccess;
