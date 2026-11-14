import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Modal from "../../components/Modal";
import { useBookings } from "../../context/BookingContext.jsx";


// Demo policy: cancellation is allowed more than 24 hours before the lesson starts.
const canCancelBooking = (booking) => {
  if (!["Pending", "Confirmed"].includes(booking.status)) return false;
  if (!booking.canCancel) return false;

  const lessonDate = new Date(`${booking.date}T00:00:00`);
  const hoursRemaining = (lessonDate.getTime() - Date.now()) / (1000 * 60 * 60);
  return hoursRemaining > 24;
};

function CancelBooking() {
  // AI Assistance: ChatGPT helped integrate shared booking state.
  const { getBookingById, updateBookingStatus } = useBookings();

  const navigate = useNavigate();
  const location = useLocation();
  const bookingId = Number(location.pathname.split("/")[2]);
  const booking = getBookingById(bookingId);

  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isCancelled, setIsCancelled] = useState(false);



// AI Assistance: ChatGPT helped use the shared cancellation status.
  const alreadyCancelled = booking?.status === "Cancelled";
  const cancellationAllowed = Boolean(booking) && canCancelBooking(booking);

  const handleBack = () => navigate("/my-bookings");

  // AI Assistance: ChatGPT helped connect cancellation
// to the shared BookingContext.
  const handleCancel = () => {
    if (!cancellationAllowed) return;

    const success = updateBookingStatus(bookingId, "Cancelled");

    if (!success) {
      alert("Unable to cancel this booking. Please try again.");
      return;
    }

    setIsCancelled(true);
    setIsModalOpen(false);
  };

  // Shared wrapper: navbar + cream page + footer
  const Page = ({ children }) => (
    <>
      <Navbar />
      <main className="flex min-h-[70vh] items-center justify-center bg-cream px-6 py-12">{children}</main>
      <Footer />
    </>
  );

  if (!booking) {
    return (
      <Page>
        <div className="text-center">
          <h1 className="font-serif text-4xl italic text-ink">Booking not found</h1>
          <button type="button" onClick={handleBack} className="mt-5 text-clay">
            ← Back to my bookings
          </button>
        </div>
      </Page>
    );
  }

  if (!cancellationAllowed && !isCancelled) {
    return (
      <Page>
        <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blush text-2xl text-clay">!</div>
          <h1 className="font-serif text-3xl italic text-ink">Can't cancel this booking</h1>
          <p className="mt-4 text-muted">
            {alreadyCancelled
              ? "This booking has already been cancelled."
              : "This lesson starts in less than 24 hours, or the booking is no longer eligible."}
          </p>
          <p className="mt-3 text-xs text-muted">Cancellations must be made more than 24 hours before the lesson.</p>
          <button
            type="button"
            onClick={handleBack}
            className="mt-6 w-full rounded-full bg-clay py-3 font-medium text-white hover:opacity-90"
          >
            Back to my bookings
          </button>
        </div>
      </Page>
    );
  }

  return (
    <Page>
      <Modal isOpen={isModalOpen} onClose={handleBack} title="Cancel this booking?">
        <p className="mb-5 text-muted">
          You'll get a full refund because you're cancelling more than 24 hours before the lesson.
        </p>

        <div className="mb-5 space-y-1 rounded-2xl bg-cream p-4 text-sm text-ink">
          <p><span className="text-muted">Lesson:</span> {booking.lesson}</p>
          <p><span className="text-muted">Date:</span> {booking.date}</p>
          <p><span className="text-muted">Time:</span> {booking.time}</p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={handleBack}
            className="flex-1 rounded-full border border-ink py-3 font-medium text-ink hover:bg-cream"
          >
            Keep booking
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="flex-1 rounded-full bg-red-600 py-3 font-medium text-white hover:opacity-90"
          >
            Yes, cancel
          </button>
        </div>
      </Modal>

      {isCancelled && (
        <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-2xl text-green-700">✓</div>
          <h1 className="font-serif text-3xl italic text-ink">Booking cancelled</h1>
          <p className="mt-3 text-muted">Your refund will reach your card in 3–5 working days.</p>
          <button
            type="button"
            onClick={handleBack}
            className="mt-6 w-full rounded-full bg-clay py-3 font-medium text-white hover:opacity-90"
          >
            Back to my bookings
          </button>
        </div>
      )}
    </Page>
  );
}

export default CancelBooking;