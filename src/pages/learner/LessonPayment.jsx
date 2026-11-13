
import { useState } from "react";
import { getLessonById } from "../../data/lessons";
import Card from "../../components/Card";

function LessonPayment() {
  const booking = JSON.parse(
    sessionStorage.getItem("pendingBooking") || "null"
  );

  const lesson = booking
    ? getLessonById(booking.lessonId)
    : null;

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
    if (paymentMethod !== "card" || !isCardValid) {
        return;
    }

    // Demo only: no real payment is processed.
    const paymentFailed = cardNumber.replace(/\s/g, "").endsWith("0000");

    if (paymentFailed) {
        sessionStorage.setItem("paymentFailedSource", "lesson");
        
        window.location.href =
        "/learner-preview.html?screen=payment-failed";
    } else {
        window.location.href =
        "/learner-preview.html?screen=booking-success";
    }
    };



  if (!booking || !lesson) {
    return (
      <div className="max-w-xl mx-auto p-8">
        <p>No booking selected.</p>
        <a
          href="/learner-preview.html"
          className="underline"
        >
          Back to lesson
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-2">
        Payment
      </h1>

      <p className="text-gray-500 mb-6">
        Step 2 of 2 - Pay to send your booking request
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <h2 className="font-semibold mb-4">
            Payment Method
          </h2>

          <div className="flex gap-4 mb-5">
            <label>
              <input
                type="radio"
                name="payment"
                checked={paymentMethod === "card"}
                onChange={() => setPaymentMethod("card")}
              />
              {" "}Credit / debit card
            </label>

            <label>
              <input
                type="radio"
                name="payment"
                checked={paymentMethod === "apple"}
                onChange={() => setPaymentMethod("apple")}
              />
              {" "}Apple Pay
            </label>
          </div>

          {paymentMethod === "card" && (
            <div className="space-y-4">
              <input
                className="border rounded p-3 w-full"
                placeholder="Name on card"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
              />

              <input
                className="border rounded p-3 w-full"
                placeholder="Card number"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />

              <div className="grid grid-cols-2 gap-4">
                <input
                  className="border rounded p-3 w-full"
                  placeholder="MM/YY"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                />

                <input
                  className="border rounded p-3 w-full"
                  placeholder="CVV"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                />
              </div>
            </div>
          )}

          <p className="text-xs text-gray-500 mt-5">
            Demo payment only. No real payment is processed.
          </p>
        </Card>

        <Card>
          <h2 className="font-semibold mb-4">
            Booking Summary
          </h2>

          <p>Lesson: {lesson.title}</p>
          <p>Date: {booking.date}</p>
          <p>Time: {booking.time}</p>
          <p>Seats: 1</p>

          <div className="border-t mt-4 pt-4">
            <p className="font-bold">
              Total: {lesson.price} SAR
            </p>
          </div>

          <button
            type="button"
            onClick={handlePayment}
            disabled={
              paymentMethod === "card" &&
              !isCardValid
            }
            className="bg-black text-white w-full p-3 rounded mt-5 disabled:opacity-50"
          >
            Pay {lesson.price} SAR
          </button>

          <a
            href="/learner-preview.html"
            className="block text-sm underline mt-4"
          >
            Back to lesson
          </a>
        </Card>
      </div>
    </div>
  );
}

export default LessonPayment;
