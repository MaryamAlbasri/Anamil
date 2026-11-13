
import { useState } from "react";
import Modal from "../../components/Modal";
import { getBookingById } from "../../data/bookings";

function CancelBooking() {
  const params = new URLSearchParams(window.location.search);
  const bookingId = Number(params.get("id"));

  const booking = getBookingById(bookingId);

  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isCancelled, setIsCancelled] = useState(false);

  const handleKeepBooking = () => {
    window.location.href =
      "/learner-preview.html?screen=my-bookings";
  };

  const handleCancel = () => {
    const saved = JSON.parse(
      localStorage.getItem("anamil-cancelled-bookings") || "[]"
    );

    const updated = [...new Set([...saved, bookingId])];

    localStorage.setItem(
      "anamil-cancelled-bookings",
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

        <a
          href="/learner-preview.html?screen=my-bookings"
          className="mt-5 inline-block underline"
        >
          Back to My Bookings
        </a>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <Modal
        isOpen={isModalOpen}
        onClose={handleKeepBooking}
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
            onClick={handleKeepBooking}
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

          <a
            href="/learner-preview.html?screen=my-bookings"
            className="mt-6 inline-block rounded-lg bg-black px-5 py-3 text-white"
          >
            Back to My Bookings
          </a>
        </div>
      )}
    </main>
  );
}

export default CancelBooking;
