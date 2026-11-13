
export const lessons = [
  {
    id: 1,
    title: "Pottery for Beginners",
    description: "Learn the basics of pottery.",
    craftspersonId: 1,
    category: "Pottery",
    price: 150,
    duration: "2 hours",
    location: "Al Khobar",
    rating: 4.8,
    image: "/images/pottery.jpg",
    availableSlots: [
      {
        date: "2026-11-20",
        time: "10:00 AM",
        seatsLeft: 5
      },
      {
        date: "2026-11-20",
        time: "2:00 PM",
        seatsLeft: 0
      }
    ]
  }
];

export const getLessonById = (id) => {
  return lessons.find((lesson) => lesson.id === Number(id));
};
