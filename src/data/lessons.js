export const lessons = [
  {
    id: 1,
    teacherId: 1,
    craftspersonId: 1,
    title: "Wheel throwing for beginners",
    description:
      "Learn to centre clay on the wheel, open it up and pull your first cup. No experience needed. All clay and tools are provided in class.",
    craftspersonName: "Noura Alqahtani",
    level: "Beginner",
    maxLearners: 6,
    category: "Pottery",
    price: 150,
    duration: "2 hours",
    location: "Riyadh",
    rating: 4.8,
    image: "/images/pottery.png",
    availableSlots: [
      { date: "2026-12-03", time: "4:00 - 6:00 PM", seatsLeft: 3 },
      { date: "2026-12-03", time: "6:30 - 8:30 PM", seatsLeft: 1 },
      { date: "2026-12-05", time: "10:00 AM - 12:00 PM", seatsLeft: 0 },
      { date: "2026-12-05", time: "4:00 - 6:00 PM", seatsLeft: 4 },
      { date: "2026-12-10", time: "6:30 - 8:30 PM", seatsLeft: 2 },
      { date: "2026-12-12", time: "10:00 AM - 12:00 PM", seatsLeft: 5 },
    ],
  },
  { id: 2, teacherId: 1, title: "Hand-building: bowls and cups", level: "Beginner", duration: "2 hours", price: 180 },
  { id: 3, teacherId: 1, title: "Glazing and finishing", level: "Intermediate", duration: "3 hours", price: 200 },
  { id: 4, teacherId: 2, title: "Intro to loom weaving", level: "Beginner", duration: "2 hours", price: 180 },
  { id: 5, teacherId: 3, title: "Arabic calligraphy basics", level: "Beginner", duration: "1.5 hours", price: 120 },
  { id: 6, teacherId: 4, title: "Camera basics: shoot in manual", level: "Beginner", duration: "2 hours", price: 200 },
];

export const getLessonById = (id) => {
  return lessons.find((lesson) => lesson.id === Number(id));
};

export default lessons;