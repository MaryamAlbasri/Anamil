export const bookings = [
  {
    id: 4821,
    lessonId: 1,
    learnerId: 1,
    lesson: "Wheel throwing for beginners",
    craftsperson: "Noura Alqahtani",
    date: "2026-12-03",
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
    lessonId: 4,
    learnerId: 1,
    lesson: "Intro to loom weaving",
    craftsperson: "Lina Haddad",
    date: "2026-12-05",
    time: "5:00 - 7:00 PM",
    location: "Amman",
    price: 180,
    status: "Confirmed",
    paymentStatus: "paid",
    canCancel: true,
    note: ""
  },
  {
    id: 4823,
    lessonId: 6,
    learnerId: 1,
    lesson: "Camera basics: shoot in manual",
    craftsperson: "Sara Mansour",
    date: "2026-12-08",
    time: "6:00 - 8:00 PM",
    location: "Dubai",
    price: 200,
    status: "Confirmed",
    paymentStatus: "paid",
    canCancel: false,
    note: ""
  },
  {
    id: 4810,
    lessonId: 5,
    learnerId: 1,
    lesson: "Arabic calligraphy basics",
    craftsperson: "Omar Alsharif",
    date: "2026-09-10",
    time: "3:00 - 4:30 PM",
    location: "Jeddah",
    price: 120,
    status: "Completed",
    paymentStatus: "paid",
    canCancel: false,
    note: ""
  }
];

export const getBookingById = (id) => {
  return bookings.find((booking) => booking.id === Number(id));
};

// Supports imports used by the main application.
export default bookings;