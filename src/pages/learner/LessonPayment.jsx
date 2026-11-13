import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { getLessonById } from "../../data/lessons";

const inputClass = "mt-2 w-full rounded-2xl border border-blush p-3 outline-none focus:border-clay";

function LessonPayment() {
  const navigate = useNavigate();

  const booking = JSON.parse(sessionStorage.getItem("pendingBooking") || "null");
  const lesson = booking ? getLessonById(booking.lessonId) : null;

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const isCardValid =
    cardName.trim().length > 0 &&
    /^\d{16}$/.test(cardNumber.replace(/\s/g, "")) &&
    /^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry) &&
    /^\d{3,4}$/.test(cvv);

  const handlePayment = () => {
    if (paymentMethod === "card" && !isCardValid) return;

    // Demo only: a card ending in 0000 simulates a failed payment.
    const paymentFailed = cardNumber.replace(/\s/g, "").endsWith("0000");

    if (paymentFailed) {
      sessionStorage.setItem("paymentFailedSource", "lesson");
      navigate("/payment-failed");
    } else {
      navigate("/booking-success");
    }
  };

  if (!booking || !lesson) {
    return (
      <>
        <Navbar />
        <main className="flex min-h-[70vh] items-center justify-center bg-cream px-6 py-12 text-center">
          <div>
            <h1 className="font-serif text-4xl italic text-ink">No booking selected</h1>
            <p className="mt-3 text-muted">Pick a date and time on the lesson page first.</p>
            <Link
              to={`/lessons/${booking?.lessonId || 1}`}
              className="mt-6 inline-block rounded-full bg-clay px-6 py-3 font-medium text-white"
            >
              Back to lesson
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const methods = [
    { id: "card", label: "Credit / debit card", note: "Visa, Mastercard, mada" },
    { id: "apple", label: "Apple Pay", note: "Demo only" },
  ];

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-cream px-6 py-10">
        <div className="mx-auto max-w-6xl">
          <h1 className="font-serif text-4xl italic text-ink">Payment</h1>
          <p className="mt-2 text-sm text-muted">Step 2 of 2 · Pay to send your booking request</p>

          <div className="mt-8 grid gap-8 lg:grid-cols-3">
            {/* Payment form */}
            <section className="rounded-3xl bg-white p-6 lg:col-span-2">
              <h2 className="mb-5 text-lg font-medium text-ink">Payment method</h2>

              <div className="mb-6 grid gap-3 sm:grid-cols-2">
                {methods.map((m) => (
                  <label
                    key={m.id}
                    className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-4 ${
                      paymentMethod === m.id ? "border-clay bg-cream" : "border-blush"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === m.id}
                      onChange={() => setPaymentMethod(m.id)}
                      className="accent-clay"
                    />
                    <span>
                      <span className="block font-medium text-ink">{m.label}</span>
                      <span className="text-xs text-muted">{m.note}</span>
                    </span>
                  </label>
                ))}
              </div>

              {paymentMethod === "card" && (
                <div className="space-y-4 text-sm text-muted">
                  <label className="block">
                    Name on card
                    <input className={inputClass} placeholder="Sara Mansour" value={cardName} onChange={(e) => setCardName(e.target.value)} autoComplete="off" />
                  </label>
                  <label className="block">
                    Card number
                    <input className={inputClass} inputMode="numeric" maxLength={19} placeholder="4242 4242 4242 4242" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} autoComplete="off" />
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <label className="block">
                      Expiry (MM/YY)
                      <input className={inputClass} maxLength={5} placeholder="08/28" value={expiry} onChange={(e) => setExpiry(e.target.value)} autoComplete="off" />
                    </label>
                    <label className="block">
                      CVV
                      <input className={inputClass} type="password" inputMode="numeric" maxLength={4} placeholder="•••" value={cvv} onChange={(e) => setCvv(e.target.value)} autoComplete="off" />
                    </label>
                  </div>
                </div>
              )}

              <p className="mt-6 text-xs text-muted">
                Demo payment only. Don't enter real card details. Tip: a card ending in 0000 shows the "payment failed" screen.
              </p>
            </section>

            {/* Summary */}
            <aside className="h-fit rounded-3xl bg-white p-6">
              <h2 className="mb-5 text-lg font-medium text-ink">Booking summary</h2>

              <img src="/images/pottery.png" alt="" className="mb-4 h-32 w-full rounded-2xl object-cover" />

              <div className="space-y-2 text-sm text-ink">
                <p className="font-medium">{lesson.title}</p>
                <div className="flex justify-between"><span className="text-muted">Date</span><span>{booking.date}</span></div>
                <div className="flex justify-between"><span className="text-muted">Time</span><span>{booking.time}</span></div>
                <div className="flex justify-between"><span className="text-muted">Seats</span><span>1</span></div>
                <div className="flex justify-between border-t border-blush pt-3 text-lg font-medium">
                  <span>Total</span>
                  <span className="text-clay">{lesson.price} SAR</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handlePayment}
                disabled={paymentMethod === "card" && !isCardValid}
                className="mt-6 w-full rounded-full bg-clay py-3 font-medium text-white hover:opacity-90 disabled:opacity-40"
              >
                Pay {lesson.price} SAR
              </button>
              {paymentMethod === "card" && !isCardValid && (
                <p className="mt-2 text-center text-xs text-muted">Fill in all card details to continue.</p>
              )}

              <Link to={`/lessons/${lesson.id}`} className="mt-5 inline-block text-sm text-muted hover:text-clay">
                ← Back to lesson
              </Link>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default LessonPayment;