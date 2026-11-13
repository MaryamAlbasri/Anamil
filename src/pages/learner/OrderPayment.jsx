
import { useState } from "react";

const CART_KEY = "anamil-cart";
const ORDERS_KEY = "anamil-orders";

function OrderPayment() {
  const [order] = useState(() => {
    try {
      return JSON.parse(
        sessionStorage.getItem("pendingOrder") || "null"
      );
    } catch {
      return null;
    }
  });

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [saveCard, setSaveCard] = useState(false);
  const [error, setError] = useState("");

  const goTo = (screen) => {
    window.location.href =
      `/learner-preview.html?screen=${screen}`;
  };

  const handlePayment = () => {
    setError("");

    if (!order || !order.items?.length) {
      setError("No order found. Please return to your cart.");
      return;
    }

    if (paymentMethod === "card") {
      if (
        !cardName.trim() ||
        !cardNumber.trim() ||
        !expiry.trim() ||
        !cvv.trim()
      ) {
        setError("Please complete all card details.");
        return;
      }

      const digits = cardNumber.replace(/\s/g, "");

      if (!/^\d{16}$/.test(digits)) {
        setError("Please enter a valid 16-digit card number.");
        return;
      }

      const match = expiry.match(/^(\d{2})\/(\d{2})$/);

      if (!match) {
        setError("Enter expiry as MM/YY.");
        return;
      }

      const month = Number(match[1]);
      const year = 2000 + Number(match[2]);
      const now = new Date();

      if (
        month < 1 ||
        month > 12 ||
        year < now.getFullYear() ||
        (year === now.getFullYear() &&
          month < now.getMonth() + 1)
      ) {
        setError("Card expiry date is invalid or expired.");
        return;
      }

      if (!/^\d{3,4}$/.test(cvv)) {
        setError("CVV must contain 3 or 4 digits.");
        return;
      }

      // Demo only: never send or store card details.
      // A card number ending in 0000 simulates a decline.
      if (digits.endsWith("0000")) {
        sessionStorage.setItem(
          "paymentFailedSource",
          "order"
        );
        goTo("payment-failed");
        return;
      }
    }

    const completedOrder = {
      ...order,
      id: `AN-${Date.now()}`,
      status: "New",
      paymentStatus: "Demo paid",
      paymentMethod:
        paymentMethod === "card" ? "Card" : "Apple Pay",
      createdAt: new Date().toISOString()
    };

    try {
      const stored = JSON.parse(
        localStorage.getItem(ORDERS_KEY) || "[]"
      );

      const previousOrders = Array.isArray(stored)
        ? stored
        : [];

      localStorage.setItem(
        ORDERS_KEY,
        JSON.stringify([...previousOrders, completedOrder])
      );

      sessionStorage.setItem(
        "completedOrder",
        JSON.stringify(completedOrder)
      );

      localStorage.setItem(CART_KEY, "[]");

      // saveCard is UI-only in this prototype.
      // No card number, CVV or expiry is persisted.
      goTo("order-confirmation");
    } catch {
      setError("Unable to save your demo order. Try again.");
    }
  };

  if (!order || !order.items?.length) {
    return (
      <main className="min-h-screen bg-gray-50 p-8 text-center">
        <h1 className="text-2xl font-bold">
          No pending order
        </h1>
        <p className="mt-3 text-gray-600">
          Please complete your cart first.
        </p>
        <button
          onClick={() => goTo("cart")}
          className="mt-6 rounded-lg bg-black px-5 py-3 text-white"
        >
          Back to cart
        </button>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold">
          Payment
        </h1>

        <p className="mt-2 text-gray-600">
          Step 2 of 2 – Pay to place your order
        </p>

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          <section className="rounded-xl border bg-white p-6 lg:col-span-2">
            <h2 className="mb-5 text-lg font-semibold">
              Payment method
            </h2>

            <div className="mb-6 grid gap-3 sm:grid-cols-2">
              <label className="flex cursor-pointer items-center gap-3 rounded-lg border p-4">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "card"}
                  onChange={() => setPaymentMethod("card")}
                  className="accent-black"
                />
                <span>
                  <span className="block font-medium">
                    Credit / debit card
                  </span>
                  <span className="text-xs text-gray-500">
                    Visa, Mastercard, mada
                  </span>
                </span>
              </label>

              <label className="flex cursor-pointer items-center gap-3 rounded-lg border p-4">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "apple"}
                  onChange={() => setPaymentMethod("apple")}
                  className="accent-black"
                />
                <span>
                  <span className="block font-medium">
                    Apple Pay
                  </span>
                  <span className="text-xs text-gray-500">
                    Demo only – no actual Apple Pay
                  </span>
                </span>
              </label>
            </div>

            {paymentMethod === "card" && (
              <div className="space-y-4">
                <label className="block text-sm font-medium">
                  Name on card
                  <input
                    type="text"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    placeholder="Sara Alazharani"
                    autoComplete="off"
                    className="mt-2 w-full rounded-lg border p-3"
                  />
                </label>

                <label className="block text-sm font-medium">
                  Card number
                  <input
                    type="text"
                    inputMode="numeric"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="Demo card number"
                    maxLength={19}
                    autoComplete="off"
                    className="mt-2 w-full rounded-lg border p-3"
                  />
                </label>

                <div className="grid grid-cols-2 gap-4">
                  <label className="block text-sm font-medium">
                    Expiry (MM/YY)
                    <input
                      type="text"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      placeholder="08/28"
                      maxLength={5}
                      autoComplete="off"
                      className="mt-2 w-full rounded-lg border p-3"
                    />
                  </label>

                  <label className="block text-sm font-medium">
                    CVV
                    <input
                      type="password"
                      inputMode="numeric"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      placeholder="***"
                      maxLength={4}
                      autoComplete="off"
                      className="mt-2 w-full rounded-lg border p-3"
                    />
                  </label>
                </div>

                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={saveCard}
                    onChange={(e) => setSaveCard(e.target.checked)}
                    className="accent-black"
                  />
                  Save this card for next time (demo only)
                </label>
              </div>
            )}

            <p className="mt-6 text-xs text-gray-500">
              Demo payment only. Do not enter real card
              information. No real payment is processed
              and card details are not stored.
            </p>
          </section>

          <aside className="h-fit rounded-xl border bg-white p-6">
            <h2 className="mb-5 text-lg font-semibold">
              Order summary
            </h2>

            <div className="space-y-3 text-sm">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between gap-3"
                >
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <span>
                    {item.price * item.quantity} SAR
                  </span>
                </div>
              ))}

              <div className="flex justify-between border-t pt-3">
                <span>Delivery</span>
                <span>{order.shipping} SAR</span>
              </div>

              <p className="text-xs text-gray-500">
                {order.deliveryMethod === "pickup"
                  ? "Pickup from craftsperson"
                  : `Deliver to: ${order.address?.district || ""}, ${order.address?.city || ""}`}
              </p>

              <div className="flex justify-between border-t pt-4 text-lg font-bold">
                <span>Total</span>
                <span>{order.total} SAR</span>
              </div>
            </div>

            {error && (
              <p
                role="alert"
                className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700"
              >
                {error}
              </p>
            )}

            <button
              type="button"
              onClick={handlePayment}
              className="mt-6 w-full rounded-lg bg-black px-5 py-3 font-medium text-white"
            >
              Pay {order.total} SAR
            </button>

            <p className="mt-3 text-center text-xs text-gray-500">
              Demo only. No real money will be charged.
            </p>

            <button
              type="button"
              onClick={() => goTo("cart")}
              className="mt-5 text-sm underline"
            >
              ← Back to cart
            </button>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default OrderPayment;
