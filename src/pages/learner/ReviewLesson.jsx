import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { getBookingById } from "../../data/bookings";

const STORAGE_KEY = "anamil-lesson-reviews";
const ratingWords = ["", "Poor", "Okay", "Good", "Very good", "Loved it!"];

// Shared layout: navbar + cream page + footer
function Page({ children }) {
  return (
    <>
      <Navbar />
      <main className="flex min-h-[70vh] items-center justify-center bg-cream px-6 py-12">{children}</main>
      <Footer />
    </>
  );
}

function ReviewLesson() {
  const location = useLocation();
  const bookingId = Number(location.pathname.split("/")[2]);
  const booking = getBookingById(bookingId);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const [existingReviews] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      return Array.isArray(saved) ? saved : [];
    } catch {
      return [];
    }
  });

  const alreadyReviewed = existingReviews.some((review) => review.bookingId === bookingId);

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

    const review = { bookingId, lessonId: booking.lessonId, rating, comment: comment.trim(), createdAt: new Date().toISOString() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...existingReviews, review]));
    setSubmitted(true);
    setError("");
  };

  const backButton = (
    <Link to="/my-bookings" className="mt-6 inline-block rounded-full bg-clay px-6 py-3 font-medium text-white hover:opacity-90">
      Back to my bookings
    </Link>
  );

  if (!booking) {
    return (
      <Page>
        <div className="text-center">
          <h1 className="font-serif text-4xl italic text-ink">Booking not found</h1>
          {backButton}
        </div>
      </Page>
    );
  }

  if (booking.status !== "Completed") {
    return (
      <Page>
        <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center">
          <h1 className="font-serif text-3xl italic text-ink">Review not available yet</h1>
          <p className="mt-3 text-muted">You can review a lesson once it's completed.</p>
          {backButton}
        </div>
      </Page>
    );
  }

  if (submitted || alreadyReviewed) {
    return (
      <Page>
        <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl text-green-700">✓</div>
          <h1 className="font-serif text-3xl italic text-ink">{submitted ? "Thank you!" : "Already reviewed"}</h1>
          <p className="mt-3 text-muted">
            {submitted
              ? `Your review helps ${booking.craftsperson} and other learners.`
              : "You have already reviewed this lesson."}
          </p>
          {backButton}
        </div>
      </Page>
    );
  }

  return (
    <Page>
      <div className="w-full max-w-xl">
        <Link to={`/my-bookings/${bookingId}`} className="text-sm text-muted hover:text-clay">
          ← Back to booking details
        </Link>

        <div className="mt-6 rounded-3xl bg-white p-6 md:p-8">
          <h1 className="font-serif text-4xl italic text-ink">Review your lesson</h1>
          <p className="mt-2 text-ink">{booking.lesson}</p>
          <p className="text-sm text-muted">with {booking.craftsperson}</p>

          <form onSubmit={handleSubmit} className="mt-7">
            <label className="block font-medium text-ink">How was your experience?</label>

            <div className="mt-3 flex items-center gap-1" role="group" aria-label="Star rating">
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
                  className={`text-4xl transition hover:scale-110 ${star <= rating ? "text-gold" : "text-blush"}`}
                >
                  ★
                </button>
              ))}
              <span className="ml-3 text-sm text-clay">{ratingWords[rating]}</span>
            </div>

            <label htmlFor="review-comment" className="mt-7 block font-medium text-ink">
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
              placeholder="What did you learn? How was the teacher?"
              className="mt-3 w-full rounded-2xl border border-blush p-3 outline-none focus:border-clay"
            />
            <p className="mt-1 text-right text-xs text-muted">{comment.length}/500</p>

            {error && (
              <p role="alert" className="mt-3 rounded-2xl bg-red-50 p-3 text-sm text-red-700">{error}</p>
            )}

            <button type="submit" className="mt-6 w-full rounded-full bg-clay py-3 font-medium text-white hover:opacity-90">
              Submit review
            </button>
          </form>
        </div>
      </div>
    </Page>
  );
}

export default ReviewLesson;