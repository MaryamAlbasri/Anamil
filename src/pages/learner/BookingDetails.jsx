import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
// AI Assistance: ChatGPT helped connect booking details
// to the shared BookingContext.
import { useBookings } from "../../context/BookingContext.jsx";



// Same status colors as My bookings
const statusStyles = {
  Pending: "bg-gold/30 text-ink",
  Confirmed: "bg-green-100 text-green-700",
  Completed: "bg-blush text-clay",
  Cancelled: "bg-red-100 text-red-700",
  Declined: "bg-cream text-muted",
};

function BookingDetails() {
  const { getBookingById } = useBookings();

  const location = useLocation();
  const [showMore, setShowMore] = useState(false);

  const bookingId = location.pathname.split("/")[2];
  const booking = getBookingById(bookingId);




  const status = booking?.status ?? null;

  const formatDate = (date) =>
    new Date(`${date}T12:00:00`).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

  // One info box (label on top, value below)
  const Info = ({ label, value }) => (
    <div className="rounded-2xl bg-cream p-4">
      <p className="text-xs text-muted">{label}</p>
      <p className="mt-1 font-medium text-ink">{value}</p>
    </div>
  );

  if (!booking) {
    return (
      <>
        <Navbar />
        <main className="flex min-h-[70vh] items-center justify-center bg-cream px-6 py-12 text-center">
          <div>
            <h1 className="font-serif text-4xl italic text-ink">Booking not found</h1>
            <p className="mt-3 text-muted">We couldn't find this booking.</p>
            <Link to="/my-bookings" className="mt-6 inline-block rounded-full bg-clay px-6 py-3 font-medium text-white">
              Back to my bookings
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

      <main className="min-h-screen bg-cream px-6 py-10">
        <div className="mx-auto max-w-3xl">
          <Link to="/my-bookings" className="text-sm text-muted hover:text-clay">
            ← Back to my bookings
          </Link>

          <div className="mt-6 rounded-3xl bg-white p-6 md:p-8">
            {/* Header */}
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-sm text-muted">Booking #{booking.id}</p>
                <h1 className="mt-1 font-serif text-4xl italic text-ink">{booking.lesson}</h1>
                <p className="mt-2 text-muted">with {booking.craftsperson}</p>
              </div>
              <span className={`rounded-full px-3 py-1 text-sm font-medium ${statusStyles[status] || statusStyles.Pending}`}>
                {status}
              </span>
            </div>

            {/* Info boxes */}
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Info label="Date" value={formatDate(booking.date)} />
              <Info label="Time" value={booking.time} />
              <Info label="Location" value={booking.location} />
              <Info label="Total paid (demo)" value={`${booking.price} SAR`} />
            </div>

            {/* More info */}
            <div className="mt-6">
              <button
                type="button"
                onClick={() => setShowMore(!showMore)}
                className="text-sm font-medium text-clay"
              >
                {showMore ? "Hide details ↑" : "More details ↓"}
              </button>

              {showMore && (
                <div className="mt-3 space-y-1 rounded-2xl bg-cream p-4 text-sm text-muted">
                  <p>Reference: AN-{booking.id}</p>
                  <p>Status: {status}</p>
                  <p>Demo booking. No real payment was processed.</p>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="mt-6 flex flex-wrap gap-3 border-t border-blush pt-6">
              {status === "Completed" && (
                <Link
                  to={`/my-bookings/${booking.id}/review`}
                  className="rounded-full bg-clay px-5 py-3 text-sm font-medium text-white hover:opacity-90"
                >
                  Write a review
                </Link>
              )}

              <Link
                to="/my-bookings"
                className="rounded-full border border-ink px-5 py-3 text-sm font-medium text-ink hover:bg-cream"
              >
                My bookings
              </Link>

              {["Pending", "Confirmed"].includes(status) && booking.canCancel && (
                <Link
                  to={`/my-bookings/${booking.id}/cancel`}
                  className="rounded-full px-5 py-3 text-sm font-medium text-red-600 hover:bg-red-50"
                >
                  Cancel booking
                </Link>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default BookingDetails;