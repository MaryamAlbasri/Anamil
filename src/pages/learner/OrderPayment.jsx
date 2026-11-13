import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const CART_KEY = "anamil-cart";
const ORDERS_KEY = "anamil-orders";

// One style for every input on this page
const inputClass = "mt-2 w-full rounded-2xl border border-blush p-3 outline-none focus:border-clay";

function OrderPayment() {
  const navigate = useNavigate();

  const [order] = useState(() => {
    try {
      return JSON.parse(sessionStorage.getItem("pendingOrder") || "null");
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

  const handlePayment = () => {
    setError("");

    if (!order || !order.items?.length) {
      setError("No order found. Please return to your cart.");
      return;
    }

    if (paymentMethod === "card") {
      if (!cardName.trim() || !cardNumber.trim() || !expiry.trim() || !cvv.trim()) {
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
      if (month < 1 || month > 12 || year < now.getFullYear() || (year === now.getFullYear() && month < now.getMonth() + 1)) {
        setError("Card expiry date is invalid or expired.");
        return;
      }

      if (!/^\d{3,4}$/.test(cvv)) {
        setError("CVV must contain 3 or 4 digits.");
        return;
      }

      // Demo only: a card number ending in 0000 simulates a decline.
      if (digits.endsWith("0000")) {
        sessionStorage.setItem("paymentFailedSource", "order");
        navigate("/payment-failed");
        return;
      }
    }

    const completedOrder = {
      ...order,
      id: `AN-${Date.now()}`,
      status: "New",
      paymentStatus: "Demo paid",
      paymentMethod: paymentMethod === "card" ? "Card" : "Apple Pay",
      createdAt: new Date().toISOString(),
    };

    try {
      const stored = JSON.parse(localStorage.getItem(ORDERS_KEY) || "[]");
      const previousOrders = Array.isArray(stored) ? stored : [];
      localStorage.setItem(ORDERS_KEY, JSON.stringify([...previousOrders, completedOrder]));
      sessionStorage.setItem("completedOrder", JSON.stringify(completedOrder));
      localStorage.setItem(CART_KEY, "[]");
      // saveCard is UI-only. No card details are saved.
      navigate("/order-confirmation");
    } catch {
      setError("Unable to save your demo order. Try again.");
    }
  };

  if (!order || !order.items?.length) {
    return (
      <>
        <Navbar />
        <main className="flex min-h-[70vh] items-center justify-center bg-cream px-6 py-12 text-center">
          <div>
            <h1 className="font-serif text-4xl italic text-ink">No pending order</h1>
            <p className="mt-3 text-muted">Please complete your cart first.</p>
            <button onClick={() => navigate("/cart")} className="mt-6 rounded-full bg-clay px-6 py-3 font-medium text-white">
              Back to cart
            </button>
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
          <p className="mt-2 text-sm text-muted">Step 2 of 2 · Pay to place your order</p>

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
                    <input type="text" value={cardName} onChange={(e) => setCardName(e.target.value)} placeholder="Sara Mansour" autoComplete="off" className={inputClass} />
                  </label>

                  <label className="block">
                    Card number
                    <input type="text" inputMode="numeric" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} placeholder="4242 4242 4242 4242" maxLength={19} autoComplete="off" className={inputClass} />
                  </label>

                  <div className="grid grid-cols-2 gap-4">
                    <label className="block">
                      Expiry (MM/YY)
                      <input type="text" value={expiry} onChange={(e) => setExpiry(e.target.value)} placeholder="08/28" maxLength={5} autoComplete="off" className={inputClass} />
                    </label>
                    <label className="block">
                      CVV
                      <input type="password" inputMode="numeric" value={cvv} onChange={(e) => setCvv(e.target.value)} placeholder="•••" maxLength={4} autoComplete="off" className={inputClass} />
                    </label>
                  </div>

                  <label className="flex items-center gap-2 text-ink">
                    <input type="checkbox" checked={saveCard} onChange={(e) => setSaveCard(e.target.checked)} className="accent-clay" />
                    Save this card for next time (demo only)
                  </label>
                </div>
              )}

              <p className="mt-6 text-xs text-muted">
                Demo payment only. Don't enter real card details. Tip: a card ending in 0000 shows the "payment failed" screen.
              </p>
            </section>

            {/* Summary */}
            <aside className="h-fit rounded-3xl bg-white p-6">
              <h2 className="mb-5 text-lg font-medium text-ink">Order summary</h2>

              <div className="space-y-3 text-sm text-ink">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between gap-3">
                    <span>{item.name} × {item.quantity}</span>
                    <span>{item.price * item.quantity} SAR</span>
                  </div>
                ))}

                <div className="flex justify-between border-t border-blush pt-3">
                  <span className="text-muted">Delivery</span>
                  <span>{order.shipping} SAR</span>
                </div>

                <p className="text-xs text-muted">
                  {order.deliveryMethod === "pickup"
                    ? "Pickup from craftsperson"
                    : `Deliver to: ${order.address?.district || ""}, ${order.address?.city || ""}`}
                </p>

                <div className="flex justify-between border-t border-blush pt-4 text-lg font-medium">
                  <span>Total</span>
                  <span className="text-clay">{order.total} SAR</span>
                </div>
              </div>

              {error && (
                <p role="alert" className="mt-4 rounded-2xl bg-red-50 p-3 text-sm text-red-700">{error}</p>
              )}

              <button
                type="button"
                onClick={handlePayment}
                className="mt-6 w-full rounded-full bg-clay py-3 font-medium text-white hover:opacity-90"
              >
                Pay {order.total} SAR
              </button>
              <p className="mt-3 text-center text-xs text-muted">No real money will be charged.</p>

              <button type="button" onClick={() => navigate("/cart")} className="mt-5 text-sm text-muted hover:text-clay">
                ← Back to cart
              </button>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default OrderPayment;