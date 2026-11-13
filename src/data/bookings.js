
export const bookings = [
  {
    id: 4821,
    lessonId: 1,
    learnerId: 1,
    lesson: "Wheel throwing for beginners",
    craftsperson: "Noura Alqahtani",
    date: "2026-10-15",
    time: "4:00 - 6:00 PM",
    location: "Al Olaya studio, Riyadh",
    price: 150,
    status: "Pending",
    paymentStatus: "paid",
    canCancel: true,
    note: ""
  },
  {
    id: 4822,
    lessonId: 2,
    learnerId: 1,
    lesson: "Sadu weaving workshop",
    craftsperson: "Fatimah Alharbi",
    date: "2026-12-05",
    time: "5:00 - 7:00 PM",
    location: "Riyadh",
    price: 120,
    status: "Confirmed",
    paymentStatus: "paid",
    canCancel: true,
    note: ""
  },
  {
    id: 4810,
    lessonId: 3,
    learnerId: 1,
    lesson: "Arabic calligraphy basics",
    craftsperson: "Ahmed Alqahtani",
    date: "2026-09-10",
    time: "3:00 - 5:00 PM",
    location: "Al Khobar",
    price: 100,
    status: "Completed",
    paymentStatus: "paid",
    canCancel: false,
    note: ""
  }
];

export const getBookingById = (id) => {
  return bookings.find(
    (booking) => booking.id === Number(id)
  );
};

// Supports imports used by the main application.
export default bookings;
