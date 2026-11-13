
import { useState } from "react";
import { lessons } from "../../data/lessons";
import Card from "../../components/Card";
import potteryImage from "../../assets/lessons/pottery.jpg";
function LessonDetails() {
  const lesson = lessons[0];

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [note, setNote] = useState("");
  const [calendarMonth, setCalendarMonth] = useState(
  new Date(2026, 9, 1)
    );  

    const availableDates = [
    ...new Set(lesson.availableSlots.map((slot) => slot.date))
    ];


    const slotsForSelectedDate = lesson.availableSlots.filter(
    (slot) => slot.date === selectedDate
    );
    const year = calendarMonth.getFullYear();
    const month = calendarMonth.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const calendarDays = [
    ...Array(firstDay).fill(null),
    ...Array.from(
        { length: daysInMonth },
        (_, index) => index + 1
    )
    ];



  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Lesson Information */}
        <div>
            <img
            src={potteryImage}
            alt="Wheel throwing pottery lesson"
            className="w-full h-64 object-cover rounded-lg mb-4"
            />
          <h1 className="text-2xl font-bold mb-4">
            {lesson.title}
          </h1>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="font-medium">
                {lesson.craftspersonName}
            </span>

            <span className="text-orange-600">
                ★ {lesson.rating}
            </span>

            <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                {lesson.level}
            </span>

            <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                {lesson.duration}
            </span>

            <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                Max {lesson.maxLearners} learners
            </span>
            </div>

          

        

        <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">
            About this lesson
        </h2>

        <p className="text-gray-600 leading-relaxed">
            {lesson.description}
        </p>
        </div>

        <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">
            What to bring
        </h2>

        <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li>Apron or old clothes</li>
            <li>Small towel</li>
            <li>Hair tie</li>
            <li>Clay is provided</li>
        </ul>

        <a
            href="#"
            className="inline-block mt-3 text-sm font-medium underline"
        >
            See full starter list →
        </a>
        </div>




          <p>Price: {lesson.price} SAR</p>
          <p>Duration: {lesson.duration}</p>
          <p>Location: {lesson.location}</p>
          <p>Rating: {lesson.rating}</p>
        </div>

        {/* Booking Section */}
        <Card>
          <h2 className="text-xl font-semibold mb-4">
            Book This Lesson
          </h2>

          <label className="block mb-2">Select Date</label>

            <div className="mb-5">
            <div className="flex items-center justify-between mb-4">
                <button
                type="button"
                onClick={() =>
                    setCalendarMonth(new Date(year, month - 1, 1))
                }
                aria-label="Previous month"
                className="px-3 py-1 rounded hover:bg-gray-100"
                >
                ‹
                </button>

                <h3 className="font-semibold">
                {calendarMonth.toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric"
                })}
                </h3>

                <button
                type="button"
                onClick={() =>
                    setCalendarMonth(new Date(year, month + 1, 1))
                }
                aria-label="Next month"
                className="px-3 py-1 rounded hover:bg-gray-100"
                >
                ›
                </button>
            </div>

            <div className="grid grid-cols-7 gap-2 text-center mb-2">
                {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
                <span key={index} className="text-xs text-gray-500">
                    {day}
                </span>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
                {calendarDays.map((day, index) => {
                if (day === null) {
                    return <span key={`empty-${index}`} />;
                }

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
                    className={`aspect-square rounded-full text-sm transition
                        ${
                        isSelected
                            ? "bg-gray-900 text-white"
                            : isAvailable
                            ? "hover:bg-gray-200 text-gray-900"
                            : "text-gray-300 cursor-not-allowed"
                        }`}
                    >
                    {day}
                    </button>
                );
                })}
            </div>
            </div>







<div className="mb-4">
  <h3 className="font-semibold mb-3">
    Available Time Slots
  </h3>

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
    {slotsForSelectedDate.map((slot) => (
      <button
        key={slot.time}
        type="button"
        disabled={slot.seatsLeft === 0}
        onClick={() => setSelectedTime(slot.time)}
        className={`border rounded-lg p-3 text-left transition
          ${
            slot.seatsLeft === 0
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : selectedTime === slot.time
              ? "border-orange-600 bg-orange-50"
              : "border-gray-300 hover:border-orange-400"
          }`}
      >
        <span className="block font-medium">
          {slot.time}
        </span>

        <span className="text-sm">
          {slot.seatsLeft === 0
            ? "Fully booked"
            : `${slot.seatsLeft} seats left`}
        </span>
      </button>
    ))}
  </div>

  {selectedDate && slotsForSelectedDate.length === 0 && (
    <p className="text-sm text-gray-500 mt-3">
      No available time slots for this date.
    </p>
  )}
</div>





          <label className="block mb-2">
            Note to Craftsperson (optional)
          </label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="border rounded p-2 w-full mb-4"
            placeholder="e.g. I am left-handed"
          />


            <button
            type="button"
            onClick={() => {
                const selectedSlot = lesson.availableSlots.find(
                (slot) =>
                    slot.date === selectedDate &&
                    slot.time === selectedTime
                );

                sessionStorage.setItem(
                "pendingBooking",
                JSON.stringify({
                    lessonId: lesson.id,
                    date: selectedDate,
                    time: selectedTime,
                    note: note,
                    price: lesson.price
                })
                );

                // Demo: simulate a slot becoming unavailable
                const simulateSlotTaken =
                sessionStorage.getItem("simulateSlotTaken") === "true";

                if (
                !selectedSlot ||
                selectedSlot.seatsLeft === 0 ||
                simulateSlotTaken
                ) {
                sessionStorage.removeItem("simulateSlotTaken");

                window.location.href =
                    "/learner-preview.html?screen=slot-taken";
                return;
                }

                window.location.href =
                "/learner-preview.html?screen=payment";
            }}
            disabled={!selectedDate || !selectedTime}
            className="bg-black text-white p-3 rounded w-full disabled:opacity-50"
            >
            Continue to Payment
            </button>

        </Card>

      </div>
    </div>
  );
}

export default LessonDetails;
