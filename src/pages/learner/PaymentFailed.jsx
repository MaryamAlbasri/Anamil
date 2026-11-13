
import Card from "../../components/Card";

function PaymentFailed() {
  const booking = JSON.parse(
    sessionStorage.getItem("pendingBooking") || "null"
  );


    const handleRetry = () => {
    const source = sessionStorage.getItem("paymentFailedSource");

    if (source === "order") {
        window.location.href =
        "/learner-preview.html?screen=order-payment";
    } else {
        window.location.href =
        "/learner-preview.html?screen=payment";
    }
    };


    const handleBack = () => {
    const source = sessionStorage.getItem("paymentFailedSource");

    if (source === "order") {
        window.location.href =
        "/learner-preview.html?screen=cart";
    } else {
        window.location.href =
        "/learner-preview.html";
    }
    };


  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <Card className="w-full max-w-lg text-center">

        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600 text-4xl">
          ✕
        </div>

        <h1 className="text-2xl font-bold mb-3">
          Payment Failed
        </h1>

        <p className="text-gray-600 mb-6">
          Unfortunately, your payment could not be
          processed. Please check your payment details
          and try again.
        </p>

        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 text-left">
          <h2 className="font-semibold text-red-700 mb-2">
            Payment Declined
          </h2>

          <p className="text-sm text-gray-600">
            Your card was declined.
            No payment has been made.
            Please try another payment method.
          </p>
        </div>

        {booking && (
          <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left space-y-2">
            <h2 className="font-semibold">
              Booking Details
            </h2>

            <p className="text-sm">
              <strong>Date:</strong> {booking.date}
            </p>

            <p className="text-sm">
              <strong>Time:</strong> {booking.time}
            </p>

            <p className="text-sm">
              <strong>Amount:</strong> {booking.price} SAR
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={handleRetry}
            className="flex-1 rounded-lg bg-black px-4 py-3 text-sm font-medium text-white hover:bg-gray-800"
          >
            Try Again
          </button>

          <button
            type="button"
            onClick={handleBack}
            className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-sm font-medium hover:bg-gray-100"
          >
            {sessionStorage.getItem("paymentFailedSource") === "order"
                ? "Back to Cart"
                : "Back to Lesson"}
          </button>
        </div>

        <p className="text-xs text-gray-400 mt-6">
          Demo payment only. No real transaction
          has been processed.
        </p>

      </Card>
    </div>
  );
}

export default PaymentFailed;
