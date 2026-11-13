
import { useState } from "react";
import { getBookingById } from "../../data/bookings";
import Card from "../../components/Card";

const STORAGE_KEY = "anamil-lesson-reviews";

function ReviewLesson() {

    const bookingId = Number(
    window.location.pathname.split("/")[2]
    );

  const booking = getBookingById(bookingId);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const [existingReviews] = useState(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "[]"
      );
      return Array.isArray(saved) ? saved : [];
    } catch {
      return [];
    }
  });

  const alreadyReviewed = existingReviews.some(
    (review) => review.bookingId === bookingId
  );

  const handleSubmit = (event) => {
    event.preventDefault();

    if (rating === 0) {
      setError("Please select a star rating.");
      return;
    }

    if (!comment.trim()) {
      setError("Please write a short review.");
      return;
    }

    const review = {
      bookingId,
      lessonId: booking.lessonId,
      rating,
      comment: comment.trim(),
      createdAt: new Date().toISOString()
    };

    const updatedReviews = [...existingReviews, review];

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updatedReviews)
    );

    setSubmitted(true);
    setError("");
  };

  if (!booking) {
    return (
      <main className="min-h-screen bg-gray-50 p-8 text-center">
        <h1 className="text-2xl font-bold">
          Booking not found
        </h1>
        <a
          href="/my-bookings"
          className="mt-5 inline-block underline"
        >
          Back to My Bookings
        </a>
      </main>
    );
  }

  if (booking.status !== "Completed") {
    return (
      <main className="min-h-screen bg-gray-50 p-8 text-center">
        <h1 className="text-2xl font-bold">
          Review unavailable
        </h1>
        <p className="mt-3 text-gray-600">
          You can review a lesson only after it is completed.
        </p>
        <a
          href="/my-bookings"
          className="mt-5 inline-block underline"
        >
          Back to My Bookings
        </a>
      </main>
    );
  }

  if (submitted || alreadyReviewed) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
        <Card className="w-full max-w-md text-center">
          <div className="mb-4 text-4xl text-green-600">
            ✓
          </div>
          <h1 className="text-2xl font-bold">
            {submitted
              ? "Review submitted!"
              : "Already reviewed"}
          </h1>
          <p className="mt-3 text-gray-600">
            {submitted
              ? "Thank you for sharing your experience."
              : "You have already reviewed this lesson."}
          </p>
          <a
            href="/my-bookings"
            className="mt-6 inline-block rounded-lg bg-black px-5 py-3 text-white"
          >
            Back to My Bookings
          </a>
        </Card>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-xl">
        <a
          href={`/my-bookings/${bookingId}`}
          className="text-sm text-gray-600 underline"
        >
          ← Back to Booking Details
        </a>

        <Card className="mt-6">
          <h1 className="text-2xl font-bold">
            Review your lesson
          </h1>

          <p className="mt-2 text-gray-600">
            {booking.lesson}
          </p>

          <p className="mt-1 text-sm text-gray-500">
            With {booking.craftsperson}
          </p>

          <form onSubmit={handleSubmit} className="mt-7">
            <label className="block font-semibold">
              How was your experience?
            </label>

            <div
              className="mt-3 flex gap-2"
              role="group"
              aria-label="Star rating"
            >
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => {
                    setRating(star);
                    setError("");
                  }}
                  aria-label={`${star} star${star > 1 ? "s" : ""}`}
                  aria-pressed={rating === star}
                  className={`text-4xl transition ${
                    star <= rating
                      ? "text-yellow-500"
                      : "text-gray-300"
                  }`}
                >
                  ★
                </button>
              ))}
            </div>

            <label
              htmlFor="review-comment"
              className="mt-7 block font-semibold"
            >
              Write your review
            </label>

            <textarea
              id="review-comment"
              value={comment}
              onChange={(event) => {
                setComment(event.target.value);
                setError("");
              }}
              maxLength={500}
              rows={5}
              placeholder="Tell us about your experience..."
              className="mt-3 w-full rounded-lg border border-gray-300 p-3 focus:border-gray-700 focus:outline-none"
            />

            <p className="mt-1 text-right text-xs text-gray-500">
              {comment.length}/500
            </p>

            {error && (
              <p role="alert" className="mt-3 text-sm text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="mt-6 w-full rounded-lg bg-black px-5 py-3 font-medium text-white hover:bg-gray-800"
            >
              Submit Review
            </button>
          </form>
        </Card>
      </div>
    </main>
  );
}

export default ReviewLesson;
