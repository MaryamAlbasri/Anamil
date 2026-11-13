
import { useState } from "react";
import Modal from "../../components/Modal";
import { getBookingById } from "../../data/bookings";

const CANCELLED_KEY = "anamil-cancelled-bookings";

// Demo policy: cancellation is allowed more than 24 hours
// before the lesson starts.
const canCancelBooking = (booking) => {
  if (!["Pending", "Confirmed"].includes(booking.status)) {
    return false;
  }

  if (!booking.canCancel) {
    return false;
  }

  const lessonDate = new Date(`${booking.date}T00:00:00`);
  const hoursRemaining =
    (lessonDate.getTime() - Date.now()) / (1000 * 60 * 60);

  return hoursRemaining > 24;
};

function CancelBooking() {
  const params = new URLSearchParams(window.location.search);
  const bookingId = Number(params.get("id"));
  const booking = getBookingById(bookingId);

  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isCancelled, setIsCancelled] = useState(false);

  const [alreadyCancelled] = useState(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem(CANCELLED_KEY) || "[]"
      );
      return Array.isArray(saved)
        ? saved.includes(bookingId)
        : false;
    } catch {
      return false;
    }
  });

  const cancellationAllowed =
    booking && !alreadyCancelled && canCancelBooking(booking);

  const handleBack = () => {
    window.location.href =
      "/learner-preview.html?screen=my-bookings";
  };

  const handleCancel = () => {
    if (!cancellationAllowed) return;

    let saved = [];

    try {
      const stored = JSON.parse(
        localStorage.getItem(CANCELLED_KEY) || "[]"
      );
      saved = Array.isArray(stored) ? stored : [];
    } catch {
      saved = [];
    }

    const updated = [...new Set([...saved, bookingId])];

    localStorage.setItem(
      CANCELLED_KEY,
      JSON.stringify(updated)
    );

    setIsCancelled(true);
    setIsModalOpen(false);
  };

  if (!booking) {
    return (
      <main className="min-h-screen bg-gray-50 p-8 text-center">
        <h1 className="text-2xl font-bold">
          Booking not found
        </h1>

        <button
          type="button"
          onClick={handleBack}
          className="mt-5 underline"
        >
          Back to My Bookings
        </button>
      </main>
    );
  }

  if (!cancellationAllowed && !isCancelled) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
        <div className="w-full max-w-md rounded-xl bg-white p-8 text-center shadow-sm">
          <div className="mb-4 text-4xl text-orange-500">
            !
          </div>

          <h1 className="text-2xl font-bold">
            Cancellation not allowed
          </h1>

          <p className="mt-4 text-gray-600">
            {alreadyCancelled
              ? "This booking has already been cancelled."
              : "This booking cannot be cancelled because the cancellation period has ended or the booking is no longer eligible."}
          </p>

          <p className="mt-3 text-sm text-gray-500">
            Demo cancellation policy: cancellations must
            be made more than 24 hours before the lesson.
          </p>

          <button
            type="button"
            onClick={handleBack}
            className="mt-6 w-full rounded-lg bg-black px-5 py-3 text-white"
          >
            Back to My Bookings
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <Modal
        isOpen={isModalOpen}
        onClose={handleBack}
        title="Cancel booking?"
      >
        <p className="mb-5 text-gray-600">
          Are you sure you want to cancel this booking?
          This action cannot be undone.
        </p>

        <div className="mb-5 rounded-lg bg-gray-50 p-4 text-sm">
          <p>
            <strong>Lesson:</strong> {booking.lesson}
          </p>

          <p className="mt-2">
            <strong>Date:</strong> {booking.date}
          </p>

          <p className="mt-2">
            <strong>Time:</strong> {booking.time}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={handleBack}
            className="flex-1 rounded-lg border border-gray-300 px-4 py-3"
          >
            Keep booking
          </button>

          <button
            type="button"
            onClick={handleCancel}
            className="flex-1 rounded-lg bg-red-600 px-4 py-3 text-white"
          >
            Yes, cancel booking
          </button>
        </div>
      </Modal>

      {isCancelled && (
        <div className="mx-auto mt-20 max-w-md rounded-xl bg-white p-8 text-center shadow-sm">
          <div className="mb-4 text-4xl text-green-600">
            ✓
          </div>

          <h1 className="text-2xl font-bold">
            Booking cancelled
          </h1>

          <p className="mt-3 text-gray-600">
            Your booking has been cancelled successfully.
          </p>

          <button
            type="button"
            onClick={handleBack}
            className="mt-6 rounded-lg bg-black px-5 py-3 text-white"
          >
            Back to My Bookings
          </button>
        </div>
      )}
    </main>
  );
}

export default CancelBooking;
