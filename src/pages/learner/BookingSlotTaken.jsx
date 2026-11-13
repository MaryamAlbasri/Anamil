
import { getLessonById } from "../../data/lessons";
import Card from "../../components/Card";

function BookingSlotTaken() {
  const booking = JSON.parse(
    sessionStorage.getItem("pendingBooking") || "null"
  );

  const lesson = booking
    ? getLessonById(booking.lessonId)
    : null;

  const handleChooseAnotherSlot = () => {
    window.location.href =
  `/lessons/${booking?.lessonId || 1}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <Card className="w-full max-w-lg text-center">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 text-orange-600 text-3xl">
          !
        </div>

        <h1 className="text-2xl font-bold mb-3">
          This slot was just taken
        </h1>

        <p className="text-gray-600 mb-6">
          Sorry, the time slot you selected is no longer
          available. Please choose another available time.
        </p>

        {booking && lesson && (
          <div className="bg-gray-50 rounded-xl p-5 text-left space-y-3 mb-6">
            <h2 className="font-semibold">
              Your Previous Selection
            </h2>

            <p>
              <strong>Lesson:</strong> {lesson.title}
            </p>

            <p>
              <strong>Date:</strong> {booking.date}
            </p>

            <p>
              <strong>Time:</strong> {booking.time}
            </p>

            <p>
              <strong>Price:</strong> {lesson.price} SAR
            </p>
          </div>
        )}

        <button
          type="button"
          onClick={handleChooseAnotherSlot}
          className="w-full rounded-lg bg-black px-4 py-3 font-medium text-white hover:bg-gray-800"
        >
          Choose Another Slot
        </button>

        <p className="text-xs text-gray-400 mt-5">
          No payment has been processed.
        </p>
      </Card>
    </div>
  );
}

export default BookingSlotTaken;
