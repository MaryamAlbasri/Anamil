import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

function PaymentFailed() {
  const navigate = useNavigate();

  const source = sessionStorage.getItem("paymentFailedSource"); // "order" or "lesson"
  const isOrder = source === "order";

  const booking = JSON.parse(sessionStorage.getItem("pendingBooking") || "null");
  const order = JSON.parse(sessionStorage.getItem("pendingOrder") || "null");

  const handleRetry = () => {
    navigate(isOrder ? "/checkout/payment" : `/lessons/${booking?.lessonId || 1}/payment`);
  };

  const handleBack = () => {
    navigate(isOrder ? "/cart" : `/lessons/${booking?.lessonId || 1}`);
  };

  return (
    <>
      <Navbar />

      <main className="flex min-h-[70vh] items-center justify-center bg-cream px-6 py-12">
        <div className="w-full max-w-lg rounded-3xl bg-white p-8 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-3xl text-red-600">
            ✕
          </div>

          <h1 className="mb-3 font-serif text-4xl italic text-ink">Payment failed</h1>
          <p className="mb-6 text-muted">
            Your card was declined and <span className="text-ink">no money was taken</span>. Check your details or try
            another card.
          </p>

          {isOrder && order && (
            <div className="mb-6 space-y-2 rounded-2xl bg-cream p-4 text-left text-sm text-ink">
              <p className="font-medium">Your order</p>
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span className="text-muted">{item.name} × {item.quantity}</span>
                  <span>{item.price * item.quantity} SAR</span>
                </div>
              ))}
              <div className="flex justify-between border-t border-blush pt-2 font-medium">
                <span>Total</span>
                <span className="text-clay">{order.total} SAR</span>
              </div>
            </div>
          )}

          {!isOrder && booking && (
            <div className="mb-6 space-y-2 rounded-2xl bg-cream p-4 text-left text-sm text-ink">
              <p className="font-medium">Your booking</p>
              <div className="flex justify-between"><span className="text-muted">Date</span><span>{booking.date}</span></div>
              <div className="flex justify-between"><span className="text-muted">Time</span><span>{booking.time}</span></div>
              <div className="flex justify-between border-t border-blush pt-2 font-medium">
                <span>Amount</span>
                <span className="text-clay">{booking.price} SAR</span>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={handleRetry}
              className="flex-1 rounded-full bg-clay py-3 text-sm font-medium text-white hover:opacity-90"
            >
              Try again
            </button>
            <button
              type="button"
              onClick={handleBack}
              className="flex-1 rounded-full border border-ink py-3 text-sm font-medium text-ink hover:bg-cream"
            >
              {isOrder ? "Back to cart" : "Back to lesson"}
            </button>
          </div>

          <p className="mt-6 text-xs text-muted">Demo payment only. No real transaction was processed.</p>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default PaymentFailed;