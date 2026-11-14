
import { useState } from "react";
import Button from "../components/Button";
import Tag from "../components/Tag";

// AI Assistance: ChatGPT helped implement the Orders page,
// including mock orders, status updates, validation,
// and simulated learner notifications.

// Demo orders for front-end testing only.
const demoOrders = [
  {
    id: 1001,
    learner: "Sara Ahmed",
    product: "Handmade Pottery Vase",
    quantity: 1,
    total: 150,
    method: "delivery",
    address: "Qatif, Saudi Arabia",
    status: "new",
  },
  {
    id: 1002,
    learner: "Fatima Ali",
    product: "Handmade Ceramic Bowl",
    quantity: 2,
    total: 180,
    method: "pickup",
    address: "",
    status: "preparing",
  },
  {
    id: 1003,
    learner: "Noura Ahmed",
    product: "Traditional Pottery Set",
    quantity: 1,
    total: 250,
    method: "delivery",
    address: "Dammam, Saudi Arabia",
    status: "shipped",
  },
];

function getNextStatuses(order) {
  if (order.status === "new") {
    return ["preparing"];
  }

  if (order.status === "preparing") {
    return [order.method === "pickup" ? "ready" : "shipped"];
  }

  if (
      order.status === "ready" ||
      order.status === "shipped"
  ) {
    return ["delivered"];
  }

  return [];
}

function getTagVariant(status) {
  if (status === "delivered") return "success";
  if (status === "shipped") return "success";
  if (status === "ready") return "success";
  if (status === "preparing") return "pending";
  return "default";
}

export default function Orders() {
  const [orders, setOrders] = useState(demoOrders);
  const [selectedStatuses, setSelectedStatuses] = useState({});
  const [message, setMessage] = useState("");

  function handleStatusSelection(id, value) {
    setSelectedStatuses((previous) => ({
      ...previous,
      [id]: value,
    }));
  }

  function updateOrderStatus(id) {
    const order = orders.find((item) => item.id === id);

    if (!order) return;

    const newStatus = selectedStatuses[id];

    if (!getNextStatuses(order).includes(newStatus)) {
      setMessage("Please select a valid next status.");
      return;
    }

    setOrders((previous) =>
        previous.map((item) =>
            item.id === id
                ? { ...item, status: newStatus }
                : item
        )
    );

    setSelectedStatuses((previous) => ({
      ...previous,
      [id]: "",
    }));

    setMessage(
        `Order #${id} updated to ${newStatus}. ` +
        "Learner notification simulated."
    );
  }

  return (
      <main className="min-h-screen bg-cream px-4 py-10 text-ink">
        <div className="mx-auto max-w-4xl">
          <h1 className="font-serif text-4xl text-clay">
            Manage Orders
          </h1>

          <p className="mb-8 mt-2 text-sm text-muted">
            Track and update orders for your handmade products.
          </p>

          {message && (
              <p
                  role="status"
                  className="mb-6 rounded-lg bg-blush p-4 text-sm"
              >
                {message}
              </p>
          )}

          <div className="mb-6 grid gap-4 sm:grid-cols-3">
            {["new", "preparing", "delivered"].map((status) => (
                <div
                    key={status}
                    className="rounded-xl bg-white p-5 shadow-sm"
                >
                  <p className="text-sm capitalize text-muted">
                    {status}
                  </p>

                  <p className="mt-2 text-3xl font-semibold">
                    {orders.filter((order) => order.status === status).length}
                  </p>
                </div>
            ))}
          </div>

          <div className="space-y-5">
            {orders.map((order) => {
              const nextStatuses = getNextStatuses(order);

              return (
                  <article
                      key={order.id}
                      className="rounded-2xl bg-white p-6 shadow-sm"
                  >
                    <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                      <h2 className="text-xl font-semibold">
                        Order #{order.id}
                      </h2>

                      <Tag variant={getTagVariant(order.status)}>
                        {order.status}
                      </Tag>
                    </div>

                    <div className="space-y-3 text-sm">
                      <p>
                        <strong>Learner:</strong> {order.learner}
                      </p>

                      <p>
                        <strong>Product:</strong> {order.product}
                      </p>

                      <p>
                        <strong>Quantity:</strong> {order.quantity}
                      </p>

                      <p>
                        <strong>Total:</strong> {order.total} SAR
                      </p>

                      <p>
                        <strong>Delivery method:</strong>{" "}
                        <span className="capitalize">{order.method}</span>
                      </p>

                      {order.method === "delivery" && (
                          <p>
                            <strong>Address:</strong> {order.address}
                          </p>
                      )}
                    </div>

                    <div className="mt-6 border-t border-gray-200 pt-5">
                      {nextStatuses.length > 0 ? (
                          <div className="flex flex-wrap items-end gap-3">
                            <div className="min-w-48 flex-1 space-y-2">
                              <label
                                  htmlFor={`status-${order.id}`}
                                  className="anamil-input-label"
                              >
                                Update order status
                              </label>

                              <select
                                  id={`status-${order.id}`}
                                  value={selectedStatuses[order.id] || ""}
                                  onChange={(event) =>
                                      handleStatusSelection(
                                          order.id,
                                          event.target.value
                                      )
                                  }
                                  className="anamil-input"
                              >
                                <option value="">
                                  Select next status
                                </option>

                                {nextStatuses.map((status) => (
                                    <option key={status} value={status}>
                                      {status.charAt(0).toUpperCase() +
                                          status.slice(1)}
                                    </option>
                                ))}
                              </select>
                            </div>

                            <Button
                                type="button"
                                disabled={!selectedStatuses[order.id]}
                                onClick={() => updateOrderStatus(order.id)}
                            >
                              Update Status
                            </Button>
                          </div>
                      ) : (
                          <p className="font-medium text-clay">
                            Order completed — no further updates.
                          </p>
                      )}
                    </div>
                  </article>
              );
            })}
          </div>
        </div>
      </main>
  );
}
