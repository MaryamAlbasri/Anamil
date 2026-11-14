import { useState } from "react";
import Button from "../../components/Button";
import Tag from "../../components/Tag";
import Sidebar from "../../components/Sidebar";
import { craftspersonLinks } from "./ProfileSetup";

// AI Assistance: ChatGPT helped implement the Booking Requests
// page, including mock data, status management, validation,
// and simulated notifications and refunds.

function createDemoBookings() {
  const future = new Date();
  future.setDate(future.getDate() + 7);

  const past = new Date();
  past.setDate(past.getDate() - 7);

  return [
    { id: 1, learner: "Sara Ahmed", lesson: "Pottery for Beginners", date: future.toISOString(), note: "This is my first pottery class.", price: 150, status: "pending", reason: "" },
    { id: 2, learner: "Fatima Ali", lesson: "Calligraphy Workshop", date: future.toISOString(), note: "I would like to learn Arabic calligraphy.", price: 120, status: "pending", reason: "" },
    { id: 3, learner: "Noura Ahmed", lesson: "Handmade Pottery", date: past.toISOString(), note: "Looking forward to this workshop.", price: 100, status: "confirmed", reason: "" },
  ];
}

function getTagVariant(status) {
  if (status === "confirmed" || status === "completed") return "success";
  if (status === "declined") return "danger";
  return "pending";
}

export default function BookingRequests() {
  const [bookings, setBookings] = useState(createDemoBookings);
  const [decliningId, setDecliningId] = useState(null);
  const [declineReason, setDeclineReason] = useState("");
  const [message, setMessage] = useState("");

  function acceptBooking(id) {
    setBookings((previous) =>
      previous.map((booking) =>
        booking.id === id && booking.status === "pending" ? { ...booking, status: "confirmed" } : booking
      )
    );
    setMessage("Booking accepted. Demo notification created.");
  }

  function startDecline(id) {
    setDecliningId(id);
    setDeclineReason("");
    setMessage("");
  }

  function confirmDecline() {
    setBookings((previous) =>
      previous.map((booking) =>
        booking.id === decliningId && booking.status === "pending"
          ? { ...booking, status: "declined", reason: declineReason.trim() }
          : booking
      )
    );
    setDecliningId(null);
    setDeclineReason("");
    setMessage("Booking declined. Notification and refund are simulated only.");
  }

  function markCompleted(id) {
    setBookings((previous) =>
      previous.map((booking) =>
        booking.id === id && booking.status === "confirmed" && new Date(booking.date) <= new Date()
          ? { ...booking, status: "completed" }
          : booking
      )
    );
    setMessage("Lesson marked as completed.");
  }

  return (
    <div className="md:flex">
      <Sidebar title="CRAFTSPERSON" links={craftspersonLinks} />

      <main className="min-h-screen flex-1 bg-cream px-4 py-10 text-ink">
        <div className="mx-auto max-w-4xl">
          <h1 className="font-serif text-4xl text-clay">Booking Requests</h1>
          <p className="mb-8 mt-2 text-sm text-muted">Manage learners' requests for your craft lessons.</p>

          {message && <p role="status" className="mb-5 rounded-lg bg-blush p-4 text-sm">{message}</p>}

          <div className="mb-6 grid gap-4 sm:grid-cols-3">
            {["pending", "confirmed", "completed"].map((status) => (
              <div key={status} className="rounded-xl bg-white p-5 shadow-sm">
                <p className="text-sm capitalize text-muted">{status}</p>
                <p className="mt-2 text-3xl font-semibold">{bookings.filter((b) => b.status === status).length}</p>
              </div>
            ))}
          </div>

          <section className="space-y-4">
            {bookings.map((booking) => (
              <article key={booking.id} className="rounded-2xl bg-white p-6 shadow-sm">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <h2 className="text-xl font-semibold">{booking.learner}</h2>
                  <Tag variant={getTagVariant(booking.status)}>{booking.status}</Tag>
                </div>

                <div className="space-y-2 text-sm">
                  <p><strong>Lesson:</strong> {booking.lesson}</p>
                  <p><strong>Date:</strong> {new Date(booking.date).toLocaleString()}</p>
                  <p><strong>Price:</strong> {booking.price} SAR</p>
                  <p><strong>Learner note:</strong> {booking.note}</p>
                  {booking.status === "declined" && booking.reason && (
                    <p className="text-red-600"><strong>Decline reason:</strong> {booking.reason}</p>
                  )}
                </div>

                {booking.status === "pending" && (
                  <div className="mt-5 flex flex-wrap gap-3">
                    <Button onClick={() => acceptBooking(booking.id)}>Accept</Button>
                    <Button variant="secondary" onClick={() => startDecline(booking.id)}>Decline</Button>
                  </div>
                )}

                {booking.status === "confirmed" && new Date(booking.date) <= new Date() && (
                  <div className="mt-5">
                    <Button onClick={() => markCompleted(booking.id)}>Mark as Completed</Button>
                  </div>
                )}
              </article>
            ))}
          </section>

          {/* Decline modal */}
          {decliningId !== null && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
              <div role="dialog" aria-modal="true" aria-labelledby="decline-title" className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
                <h2 id="decline-title" className="mb-3 text-xl font-semibold">Decline Booking</h2>
                <label htmlFor="decline-reason" className="mb-2 block text-sm">Reason (optional)</label>
                <textarea
                  id="decline-reason"
                  value={declineReason}
                  onChange={(event) => setDeclineReason(event.target.value)}
                  maxLength={500}
                  rows={4}
                  placeholder="Explain why you are declining..."
                  className="anamil-input"
                />
                <div className="mt-5 flex gap-3">
                  <Button onClick={confirmDecline}>Confirm Decline</Button>
                  <Button variant="secondary" onClick={() => setDecliningId(null)}>Cancel</Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}