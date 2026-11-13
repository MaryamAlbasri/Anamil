import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { lessons } from "../../data/lessons";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Card from "../../components/Card";

function LessonDetails() {
  const lesson = lessons[0];
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [note, setNote] = useState("");

  // Start the calendar on the month of the first available slot
  const [firstYear, firstMonth] = lesson.availableSlots[0].date.split("-");
  const [calendarMonth, setCalendarMonth] = useState(
    new Date(Number(firstYear), Number(firstMonth) - 1, 1)
  );

  const availableDates = [...new Set(lesson.availableSlots.map((slot) => slot.date))];
  const slotsForSelectedDate = lesson.availableSlots.filter((slot) => slot.date === selectedDate);

  const year = calendarMonth.getFullYear();
  const month = calendarMonth.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const calendarDays = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
  ];

  function handleContinue() {
    const selectedSlot = lesson.availableSlots.find(
      (slot) => slot.date === selectedDate && slot.time === selectedTime
    );

    sessionStorage.setItem(
      "pendingBooking",
      JSON.stringify({ lessonId: lesson.id, date: selectedDate, time: selectedTime, note, price: lesson.price })
    );

    // Demo: simulate a slot becoming unavailable
    const simulateSlotTaken = sessionStorage.getItem("simulateSlotTaken") === "true";

    if (!selectedSlot || selectedSlot.seatsLeft === 0 || simulateSlotTaken) {
      sessionStorage.removeItem("simulateSlotTaken");
      navigate("/slot-taken");
      return;
    }

    navigate(`/lessons/${lesson.id}/payment`);
  }

  return (
    <>
      <Navbar />

      <main className="bg-cream">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">

            {/* Lesson information */}
            <div>
              <img
                src="/images/pottery.png"
                alt="Wheel throwing pottery lesson"
                className="mb-5 h-64 w-full rounded-3xl object-cover"
              />

              <h1 className="mb-3 font-serif text-4xl italic text-ink">{lesson.title}</h1>

              <div className="mb-4 flex flex-wrap items-center gap-3 text-sm">
                <span className="font-medium text-ink">{lesson.craftspersonName}</span>
                <span className="text-clay">★ {lesson.rating}</span>
                <span className="rounded-full bg-white px-3 py-1 text-ink">{lesson.level}</span>
                <span className="rounded-full bg-white px-3 py-1 text-ink">{lesson.duration}</span>
                <span className="rounded-full bg-white px-3 py-1 text-ink">Max {lesson.maxLearners} learners</span>
              </div>

              <div className="mt-6">
                <h2 className="mb-2 text-lg font-medium text-ink">About this lesson</h2>
                <p className="leading-relaxed text-muted">{lesson.description}</p>
              </div>

              <div className="mt-6">
                <h2 className="mb-2 text-lg font-medium text-ink">What to bring</h2>
                <ul className="list-inside list-disc space-y-1 text-muted">
                  <li>Apron or old clothes</li>
                  <li>Small towel</li>
                  <li>Hair tie</li>
                  <li>Clay is provided</li>
                </ul>
                <Link
                  to={`/lessons/${lesson.id}/checklist`}
                  className="mt-3 inline-block text-sm font-medium text-clay"
                >
                  See full starter list →
                </Link>
              </div>
            </div>

            {/* Booking section */}
            <Card>
              <h2 className="mb-1 text-xl font-medium text-ink">Book this lesson</h2>
              <p className="mb-5 text-2xl font-medium text-clay">{lesson.price} SAR</p>

              <label className="mb-2 block text-sm text-muted">Select a date</label>

              <div className="mb-5">
                <div className="mb-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setCalendarMonth(new Date(year, month - 1, 1))}
                    aria-label="Previous month"
                    className="rounded-full px-3 py-1 hover:bg-cream"
                  >
                    ‹
                  </button>
                  <h3 className="font-medium text-ink">
                    {calendarMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                  </h3>
                  <button
                    type="button"
                    onClick={() => setCalendarMonth(new Date(year, month + 1, 1))}
                    aria-label="Next month"
                    className="rounded-full px-3 py-1 hover:bg-cream"
                  >
                    ›
                  </button>
                </div>

                <div className="mb-2 grid grid-cols-7 gap-2 text-center">
                  {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
                    <span key={index} className="text-xs text-muted">{day}</span>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-2">
                  {calendarDays.map((day, index) => {
                    if (day === null) return <span key={`empty-${index}`} />;

                    const date = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                    const isAvailable = availableDates.includes(date);
                    const isSelected = selectedDate === date;

                    return (
                      <button
                        key={date}
                        type="button"
                        disabled={!isAvailable}
                        onClick={() => {
                          setSelectedDate(date);
                          setSelectedTime("");
                        }}
                        className={`aspect-square rounded-full text-sm transition ${
                          isSelected
                            ? "bg-clay text-white"
                            : isAvailable
                            ? "bg-blush font-medium text-ink hover:bg-gold"
                            : "cursor-not-allowed text-muted/40"
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mb-5">
                <h3 className="mb-3 text-sm text-muted">Available time slots</h3>

                {!selectedDate && (
                  <p className="text-sm text-muted">Pick a highlighted date to see times.</p>
                )}

                <div className="grid grid-cols-2 gap-3">
                  {slotsForSelectedDate.map((slot) => (
                    <button
                      key={slot.time}
                      type="button"
                      disabled={slot.seatsLeft === 0}
                      onClick={() => setSelectedTime(slot.time)}
                      className={`rounded-2xl border p-3 text-left transition ${
                        slot.seatsLeft === 0
                          ? "cursor-not-allowed border-cream bg-cream text-muted"
                          : selectedTime === slot.time
                          ? "border-clay bg-clay text-white"
                          : "border-blush hover:border-clay"
                      }`}
                    >
                      <span className="block font-medium">{slot.time}</span>
                      <span className="text-sm">
                        {slot.seatsLeft === 0 ? "Full" : `${slot.seatsLeft} seats left`}
                      </span>
                    </button>
                  ))}
                </div>

                {selectedDate && slotsForSelectedDate.length === 0 && (
                  <p className="mt-3 text-sm text-muted">No available time slots for this date.</p>
                )}
              </div>

              <label className="mb-2 block text-sm text-muted">Note to craftsperson (optional)</label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="mb-5 w-full rounded-2xl border border-blush p-3 outline-none focus:border-clay"
                placeholder="e.g. I am left-handed"
              />

              <button
                type="button"
                onClick={handleContinue}
                disabled={!selectedDate || !selectedTime}
                className="w-full rounded-full bg-clay py-3 font-medium text-white disabled:opacity-40"
              >
                Continue to payment
              </button>
            </Card>

          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default LessonDetails;