
import { useState } from "react";

function OrderConfirmation() {
  const [order] = useState(() => {
    try {
      const completed = JSON.parse(
        sessionStorage.getItem("completedOrder") || "null"
      );

      if (completed) return completed;

      const saved = JSON.parse(
        localStorage.getItem("anamil-orders") || "[]"
      );

      return Array.isArray(saved) && saved.length > 0
        ? saved[saved.length - 1]
        : null;
    } catch {
      return null;
    }
  });

    const goTo = (screen) => {
    const routes = {
        cart: "/cart",
        browse: "/browse",
        "order-details": `/orders/${order?.id}`
    };

    window.location.href = routes[screen] || "/browse";
    };


  if (!order) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
        <div className="w-full max-w-md rounded-xl border bg-white p-8 text-center">
          <h1 className="text-2xl font-bold">
            No completed order found
          </h1>

          <p className="mt-3 text-gray-600">
            Complete checkout to see your order confirmation.
          </p>

          <button
            type="button"
            onClick={() => goTo("cart")}
            className="mt-6 rounded-lg bg-black px-5 py-3 text-white"
          >
            Back to cart
          </button>
        </div>
      </main>
    );
  }

  const isPickup = order.deliveryMethod === "pickup";


    const trackOrder = () => {
    window.location.href =
        `/orders/${encodeURIComponent(order.id)}`;
    };


  return (
    <main className="flex min-h-screen justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="rounded-xl border border-gray-200 bg-white p-7 shadow-sm">
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border-2 border-green-600 text-2xl text-green-700">
              ✓
            </div>

            <h1 className="mt-5 text-2xl font-bold">
              Order placed!
            </h1>

            <p className="mt-2 text-sm font-medium">
              Order #{order.id}
            </p>

            <p className="mt-3 text-sm text-gray-600">
              Your order has been placed successfully.
              The craftsperson will prepare your order
              and notify you when it is ready.
            </p>
          </div>

          <div className="mt-6 space-y-3 border-t pt-5 text-sm">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between gap-4"
              >
                <span className="text-gray-600">
                  {item.name} × {item.quantity}
                </span>

                <span className="font-medium">
                  {item.price * item.quantity} SAR
                </span>
              </div>
            ))}

            <div className="flex justify-between border-t pt-3">
              <span className="text-gray-600">
                Delivery
              </span>
              <span>{order.shipping} SAR</span>
            </div>

            <div className="flex justify-between text-base font-bold">
              <span>Total</span>
              <span>{order.total} SAR</span>
            </div>

            <div className="flex justify-between gap-4">
              <span className="text-gray-600">
                Payment
              </span>
              <span className="text-right">
                {order.paymentMethod || "Demo payment"}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">
                Status
              </span>
              <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
                {order.status || "New"}
              </span>
            </div>
          </div>

          <div className="mt-7 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={trackOrder}
              className="rounded-lg bg-black px-3 py-3 text-sm font-medium text-white"
            >
              Track order
            </button>

            <button
              type="button"
              onClick={() => goTo("cart")}
              className="rounded-lg border border-gray-300 px-3 py-3 text-sm font-medium"
            >
              Continue browsing
            </button>
          </div>

          <p className="mt-5 text-center text-xs text-gray-500">
            {isPickup
              ? "Pickup from craftsperson"
              : `Delivery to ${order.address?.district || ""}, ${order.address?.city || ""}`}
          </p>

          <p className="mt-2 text-center text-xs text-gray-400">
            Demo order only. No real payment was processed.
          </p>
        </div>
      </div>
    </main>
  );
}

export default OrderConfirmation;
