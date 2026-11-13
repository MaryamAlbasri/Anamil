
export const bookings = [
  {
    id: 1,
    lessonId: 1,
    learnerId: 1,
    date: "2026-11-20",
    time: "10:00 AM",
    status: "pending",
    paymentStatus: "unpaid",
    note: ""
  }
];

export const getBookingById = (id) => {
  return bookings.find(
    (booking) => booking.id === Number(id)
  );
};
