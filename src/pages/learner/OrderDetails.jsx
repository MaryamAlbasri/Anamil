import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const ORDERS_KEY = "anamil-orders";
const orderSteps = ["New", "Preparing", "Ready", "Shipped", "Delivered"];

function OrderDetails() {
  const location = useLocation();

  const [order] = useState(() => {
    try {
      const orderId = decodeURIComponent(location.pathname.split("/")[2] || "");
      const savedOrders = JSON.parse(localStorage.getItem(ORDERS_KEY) || "[]");
      const orders = Array.isArray(savedOrders) ? savedOrders : [];

      if (orderId) return orders.find((item) => String(item.id) === orderId) || null;

      const completedOrder = JSON.parse(sessionStorage.getItem("completedOrder") || "null");
      return completedOrder || orders[orders.length - 1] || null;
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
            <h1 className="font-serif text-3xl italic text-ink">Order not found</h1>
            <p className="mt-3 text-muted">We couldn't find this order.</p>
            <Link to="/browse" className="mt-6 inline-block rounded-full bg-clay px-6 py-3 font-medium text-white">
              Keep browsing
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const formattedDate = new Date(order.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  const currentStep = orderSteps.indexOf(order.status);
  const isDeclined = order.status === "Declined";

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-cream px-6 py-10">
        <div className="mx-auto max-w-3xl">
          <Link to="/order-confirmation" className="text-sm text-muted hover:text-clay">
            ← Back to order confirmation
          </Link>

          <div className="mt-6 rounded-3xl bg-white p-6 md:p-8">
            {/* Header */}
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 className="font-serif text-4xl italic text-ink">Order details</h1>
                <p className="mt-2 text-sm text-clay">Order #{order.id}</p>
                <p className="text-sm text-muted">Placed on {formattedDate}</p>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-sm font-medium ${
                  isDeclined ? "bg-red-100 text-red-700" : "bg-gold/30 text-ink"
                }`}
              >
                {order.status}
              </span>
            </div>

            {/* Tracking */}
            <section className="mt-8 border-t border-blush pt-6">
              <h2 className="text-lg font-medium text-ink">Tracking</h2>

              {isDeclined ? (
                <p className="mt-4 rounded-2xl bg-red-50 p-4 text-sm text-red-700">
                  This order was declined by the craftsperson. You haven't been charged.
                </p>
              ) : (
                <div className="mt-5 grid grid-cols-5 gap-2">
                  {orderSteps.map((step, index) => {
                    const done = index <= currentStep;
                    return (
                      <div key={step} className="text-center">
                        <div className={`h-1.5 rounded-full ${done ? "bg-clay" : "bg-blush"}`} />
                        <span
                          className={`mx-auto mt-3 flex h-8 w-8 items-center justify-center rounded-full text-sm ${
                            done ? "bg-clay text-white" : "bg-cream text-muted"
                          }`}
                        >
                          {done ? "✓" : index + 1}
                        </span>
                        <span className={`mt-2 block text-xs ${done ? "font-medium text-ink" : "text-muted"}`}>{step}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>

            {/* Items */}
            <section className="mt-8 border-t border-blush pt-6">
              <h2 className="text-lg font-medium text-ink">Items</h2>

              <div className="mt-4 space-y-3">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between gap-4 rounded-2xl bg-cream p-3">
                    <div className="flex items-center gap-3">
                      <img src="/images/pottery.png" alt="" className="h-12 w-12 rounded-xl object-cover" />
                      <div>
                        <p className="font-medium text-ink">{item.name}</p>
                        <p className="text-xs text-muted">Qty {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-medium text-ink">{item.price * item.quantity} SAR</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 space-y-2 text-sm text-ink">
                <div className="flex justify-between"><span className="text-muted">Subtotal</span><span>{order.subtotal} SAR</span></div>
                <div className="flex justify-between"><span className="text-muted">Delivery</span><span>{order.shipping} SAR</span></div>
                <div className="flex justify-between border-t border-blush pt-3 text-lg font-medium">
                  <span>Total</span><span className="text-clay">{order.total} SAR</span>
                </div>
              </div>
            </section>

            {/* Delivery + payment side by side */}
            <section className="mt-8 grid gap-4 border-t border-blush pt-6 sm:grid-cols-2">
              <div className="rounded-2xl bg-cream p-4 text-sm">
                <h2 className="mb-2 font-medium text-ink">Delivery</h2>
                {order.deliveryMethod === "pickup" ? (
                  <p className="text-muted">Pickup from craftsperson · Al Olaya, Riyadh</p>
                ) : (
                  <p className="text-muted">
                    {order.address?.street}, building {order.address?.building}
                    <br />
                    {order.address?.district}, {order.address?.city}
                  </p>
                )}
              </div>

              <div className="rounded-2xl bg-cream p-4 text-sm">
                <h2 className="mb-2 font-medium text-ink">Payment</h2>
                <p className="text-muted">{order.paymentMethod} · {order.paymentStatus}</p>
                <p className="mt-2 text-xs text-muted">Demo order. No real payment was processed.</p>
              </div>
            </section>

            <Link
              to="/browse"
              className="mt-8 inline-block rounded-full bg-clay px-6 py-3 font-medium text-white hover:opacity-90"
            >
              Keep browsing
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default OrderDetails;