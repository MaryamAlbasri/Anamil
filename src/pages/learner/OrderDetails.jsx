
import { useState } from "react";

const ORDERS_KEY = "anamil-orders";

function OrderDetails() {
  const [order] = useState(() => {
    try {
      
        const orderId = decodeURIComponent(
        window.location.pathname.split("/")[2] || ""
        );


      const savedOrders = JSON.parse(
        localStorage.getItem(ORDERS_KEY) || "[]"
      );

      const orders = Array.isArray(savedOrders)
        ? savedOrders
        : [];

      if (orderId) {
        return orders.find(
          (item) => String(item.id) === orderId
        ) || null;
      }

      const completedOrder = JSON.parse(
        sessionStorage.getItem("completedOrder") || "null"
      );

      return completedOrder || orders[orders.length - 1] || null;
    } catch {
      return null;
    }
  });


    const goTo = (screen) => {
    const routes = {
        "order-confirmation": "/order-confirmation",
        cart: "/cart",
        browse: "/browse"
    };

    window.location.href = routes[screen] || "/browse";
    };

  if (!order) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-10">
        <div className="mx-auto max-w-xl rounded-xl border bg-white p-8 text-center">
          <h1 className="text-2xl font-bold">
            Order not found
          </h1>

          <p className="mt-3 text-gray-600">
            We could not find your order details.
          </p>

          <button
            type="button"
            onClick={() => goTo("cart")}
            className="mt-6 rounded-lg bg-black px-5 py-3 text-white"
          >
            Back to shop
          </button>
        </div>
      </main>
    );
  }

  const formattedDate = new Date(
    order.createdAt
  ).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });

  const orderSteps = [
    "New",
    "Preparing",
    "Ready",
    "Shipped",
    "Delivered"
  ];

  const currentStep = orderSteps.indexOf(order.status);
  const isDeclined = order.status === "Declined";

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-3xl">
        <button
          type="button"
          onClick={() => goTo("order-confirmation")}
          className="mb-6 text-sm text-gray-600 underline"
        >
          ← Back to order confirmation
        </button>

        <div className="rounded-xl border border-gray-200 bg-white p-7 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">
                Order details
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                Order #{order.id}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Placed on {formattedDate}
              </p>
            </div>

            <span
              className={`rounded-full px-3 py-1 text-sm font-medium ${
                isDeclined
                  ? "bg-red-100 text-red-700"
                  : "bg-blue-100 text-blue-800"
              }`}
            >
              {order.status}
            </span>
          </div>

          <section className="mt-8 border-t pt-6">
            <h2 className="text-xl font-semibold">
              Order tracking
            </h2>

            {isDeclined ? (
              <p className="mt-4 rounded-lg bg-red-50 p-4 text-sm text-red-700">
                This order was declined by the craftsperson.
              </p>
            ) : (
              <div className="mt-5 space-y-4">
                {orderSteps.map((step, index) => (
                  <div
                    key={step}
                    className="flex items-center gap-3"
                  >
                    <span
                      className={`flex h-7 w-7 items-center justify-center rounded-full text-sm ${
                        index <= currentStep
                          ? "bg-black text-white"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {index <= currentStep ? "✓" : index + 1}
                    </span>

                    <span
                      className={
                        index <= currentStep
                          ? "font-semibold"
                          : "text-gray-400"
                      }
                    >
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="mt-8 border-t pt-6">
            <h2 className="text-xl font-semibold">
              Items ordered
            </h2>

            <div className="mt-4 space-y-4">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between gap-4 border-b pb-3"
                >
                  <div>
                    <p className="font-medium">
                      {item.name}
                    </p>

                    <p className="text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                  </div>

                  <p className="font-medium">
                    {item.price * item.quantity} SAR
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{order.subtotal} SAR</span>
              </div>

              <div className="flex justify-between">
                <span>Delivery</span>
                <span>{order.shipping} SAR</span>
              </div>

              <div className="flex justify-between border-t pt-3 text-lg font-bold">
                <span>Total</span>
                <span>{order.total} SAR</span>
              </div>
            </div>
          </section>

          <section className="mt-8 border-t pt-6">
            <h2 className="text-xl font-semibold">
              Delivery information
            </h2>

            {order.deliveryMethod === "pickup" ? (
              <p className="mt-3 text-gray-600">
                Pickup from craftsperson – Al Olaya, Riyadh
              </p>
            ) : (
              <div className="mt-3 space-y-1 text-sm text-gray-600">
                <p>{order.address?.city}</p>
                <p>{order.address?.district}</p>
                <p>{order.address?.street}</p>
                <p>Building: {order.address?.building}</p>
              </div>
            )}
          </section>

          <section className="mt-8 border-t pt-6">
            <h2 className="text-xl font-semibold">
              Payment information
            </h2>

            <p className="mt-3 text-sm text-gray-600">
              Method: {order.paymentMethod}
            </p>

            <p className="mt-1 text-sm text-gray-600">
              Status: {order.paymentStatus}
            </p>

            <p className="mt-3 text-xs text-gray-500">
              This is a demonstration order.
              No real payment was processed.
            </p>
          </section>

          <button
            type="button"
            onClick={() => goTo("cart")}
            className="mt-8 rounded-lg bg-black px-5 py-3 text-white"
          >
            Back to shop
          </button>
        </div>
      </div>
    </main>
  );
}

export default OrderDetails;
