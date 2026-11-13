import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

function OrderConfirmation() {
  const navigate = useNavigate();

  const [order] = useState(() => {
    try {
      const completed = JSON.parse(sessionStorage.getItem("completedOrder") || "null");
      if (completed) return completed;
      const saved = JSON.parse(localStorage.getItem("anamil-orders") || "[]");
      return Array.isArray(saved) && saved.length > 0 ? saved[saved.length - 1] : null;
    } catch {
      return null;
    }
  });

  if (!order) {
    return (
      <>
        <Navbar />
        <main className="flex min-h-[70vh] items-center justify-center bg-cream px-6 py-12">
          <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center">
            <h1 className="font-serif text-3xl italic text-ink">No completed order found</h1>
            <p className="mt-3 text-muted">Complete checkout to see your order confirmation.</p>
            <button
              type="button"
              onClick={() => navigate("/cart")}
              className="mt-6 rounded-full bg-clay px-6 py-3 font-medium text-white"
            >
              Back to cart
            </button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const isPickup = order.deliveryMethod === "pickup";

  return (
    <>
      <Navbar />

      <main className="flex justify-center bg-cream px-6 py-12">
        <div className="w-full max-w-md rounded-3xl bg-white p-7">
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl text-green-700">
              ✓
            </div>
            <h1 className="mt-5 font-serif text-4xl italic text-ink">Order placed!</h1>
            <p className="mt-2 text-sm font-medium text-clay">Order #{order.id}</p>
            <p className="mt-3 text-sm text-muted">
              The craftsperson will prepare your order and let you know when it's ready.
            </p>
          </div>

          <div className="mt-6 space-y-3 border-t border-blush pt-5 text-sm text-ink">
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between gap-4">
                <span className="text-muted">{item.name} × {item.quantity}</span>
                <span className="font-medium">{item.price * item.quantity} SAR</span>
              </div>
            ))}

            <div className="flex justify-between border-t border-blush pt-3">
              <span className="text-muted">Delivery</span>
              <span>{order.shipping} SAR</span>
            </div>

            <div className="flex justify-between text-base font-medium">
              <span>Total</span>
              <span className="text-clay">{order.total} SAR</span>
            </div>

            <div className="flex justify-between gap-4">
              <span className="text-muted">Payment</span>
              <span className="text-right">{order.paymentMethod || "Demo payment"}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-muted">Status</span>
              <span className="rounded-full bg-gold/30 px-3 py-1 text-xs font-medium text-ink">
                {order.status || "New"}
              </span>
            </div>
          </div>

          <div className="mt-7 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => navigate(`/orders/${encodeURIComponent(order.id)}`)}
              className="rounded-full bg-clay py-3 text-sm font-medium text-white hover:opacity-90"
            >
              Track order
            </button>
            <button
              type="button"
              onClick={() => navigate("/browse")}
              className="rounded-full border border-ink py-3 text-sm font-medium text-ink hover:bg-cream"
            >
              Keep browsing
            </button>
          </div>

          <p className="mt-5 text-center text-xs text-muted">
            {isPickup
              ? "Pickup from craftsperson"
              : `Delivery to ${order.address?.district || ""}, ${order.address?.city || ""}`}
          </p>
          <p className="mt-1 text-center text-xs text-muted">Demo order only. No real payment was processed.</p>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default OrderConfirmation;