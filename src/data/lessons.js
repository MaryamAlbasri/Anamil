
export const lessons = [
  {
    id: 1,
    title: "Wheel Throwing for Beginners",
    description: "Learn the basics of pottery.",
    craftspersonId: 1,
    craftspersonName: "Noura Alqahtani",
    level: "Beginner",
    maxLearners: 6,
    category: "Pottery",
    price: 150,
    duration: "2 hours",
    location: "Al Khobar",
    rating: 4.8,
    image: "/images/pottery.jpg",

    availableSlots: [
      {
        date: "2026-10-15",
        time: "4:00 - 6:00 PM",
        seatsLeft: 3
      },
      {
        date: "2026-10-15",
        time: "6:30 - 8:30 PM",
        seatsLeft: 1
      },
      {
        date: "2026-10-15",
        time: "10:00 AM - 12:00 PM",
        seatsLeft: 0
      }
    ]
  }
];

export const getLessonById = (id) => {
  return lessons.find(
    (lesson) => lesson.id === Number(id)
  );
};

// Supports default imports from the main application.
export default lessons;
