
import { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import Tag from "../components/Tag";

// AI Assistance: ChatGPT helped implement the Lesson Editor,
// including React state, form validation, time slots,
// starter materials, and mock lesson management.

const emptyForm = {
  title: "",
  description: "",
  level: "Beginner",
  duration: "60",
  price: "",
  seats: "1",
  location: "",
};

export default function LessonEditor() {
  const [form, setForm] = useState({ ...emptyForm });
  const [slots, setSlots] = useState([]);
  const [slotDate, setSlotDate] = useState("");
  const [slotTime, setSlotTime] = useState("");
  const [materials, setMaterials] = useState([]);
  const [materialName, setMaterialName] = useState("");
  const [materialPrice, setMaterialPrice] = useState("");
  const [lessons, setLessons] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  }

  function addSlot() {
    if (!slotDate || !slotTime) {
      setErrors((previous) => ({
        ...previous,
        slots: "Select a date and time.",
      }));
      return;
    }

    const start = new Date(`${slotDate}T${slotTime}`);
    const duration = Number(form.duration);
    const end = start.getTime() + duration * 60000;

    if (Number.isNaN(start.getTime()) || start <= new Date()) {
      setErrors((previous) => ({
        ...previous,
        slots: "Time slots must be in the future.",
      }));
      return;
    }

    if (!Number.isFinite(duration) || duration <= 0) {
      setErrors((previous) => ({
        ...previous,
        slots: "Enter a valid duration first.",
      }));
      return;
    }

    const overlapping = slots.some((slot) => {
      const existingStart = new Date(slot.start).getTime();
      const existingEnd = existingStart + duration * 60000;

      return start.getTime() < existingEnd &&
          end > existingStart;
    });

    if (overlapping) {
      setErrors((previous) => ({
        ...previous,
        slots: "This time slot overlaps with another slot.",
      }));
      return;
    }

    setSlots((previous) =>
        [...previous, {
          id: Date.now() + Math.random(),
          start: start.toISOString(),
          confirmed: false,
        }].sort((a, b) => new Date(a.start) - new Date(b.start))
    );

    setSlotDate("");
    setSlotTime("");
    setErrors((previous) => ({ ...previous, slots: "" }));
  }

  function removeSlot(id) {
    const slot = slots.find((item) => item.id === id);

    if (slot?.confirmed) {
      setErrors((previous) => ({
        ...previous,
        slots: "Slots with confirmed bookings cannot be deleted.",
      }));
      return;
    }

    setSlots((previous) =>
        previous.filter((item) => item.id !== id)
    );
  }

  function addMaterial() {
    const price = Number(materialPrice);

    if (!materialName.trim() ||
        materialPrice.trim() === "" ||
        !Number.isFinite(price) ||
        price < 0) {
      setErrors((previous) => ({
        ...previous,
        materials: "Enter a material name and valid price.",
      }));
      return;
    }

    setMaterials((previous) => [
      ...previous,
      {
        id: Date.now() + Math.random(),
        name: materialName.trim(),
        price,
      },
    ]);

    setMaterialName("");
    setMaterialPrice("");
    setErrors((previous) => ({ ...previous, materials: "" }));
  }

  function resetForm() {
    setForm({ ...emptyForm });
    setSlots([]);
    setMaterials([]);
    setEditingId(null);
    setErrors({});
  }

  function handleSubmit(event) {
    event.preventDefault();

    const newErrors = {};
    const price = Number(form.price);
    const seats = Number(form.seats);
    const duration = Number(form.duration);

    if (!form.title.trim()) {
      newErrors.title = "Lesson title is required.";
    }

    if (!form.description.trim()) {
      newErrors.description = "Description is required.";
    }

    if (form.price.trim() === "" ||
        !Number.isFinite(price) || price <= 0) {
      newErrors.price = "Price must be greater than 0.";
    }

    if (!Number.isInteger(seats) || seats < 1 || seats > 20) {
      newErrors.seats = "Seats must be between 1 and 20.";
    }

    if (!Number.isFinite(duration) || duration <= 0) {
      newErrors.duration = "Enter a valid duration.";
    }

    if (!form.location.trim()) {
      newErrors.location = "Location is required.";
    }

    if (slots.length === 0) {
      newErrors.slots = "Add at least one time slot.";
    } else if (
        slots.some((slot) => new Date(slot.start) <= new Date())
    ) {
      newErrors.slots = "All time slots must be in the future.";
    } else if (
        slots.some((slot, index) =>
            slots.some((other, otherIndex) =>
                index !== otherIndex &&
                new Date(slot.start).getTime() <
                new Date(other.start).getTime() + duration * 60000 &&
                new Date(slot.start).getTime() + duration * 60000 >
                new Date(other.start).getTime()
            )
        )
    ) {
      newErrors.slots = "Time slots must not overlap.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    const lesson = {
      ...form,
      price,
      seats,
      duration,
      id: editingId ?? Date.now(),
      slots: [...slots],
      materials: [...materials],
      hidden: false,
    };

    if (editingId !== null) {
      setLessons((previous) =>
          previous.map((item) =>
              item.id === editingId
                  ? { ...lesson, hidden: item.hidden }
                  : item
          )
      );
      setMessage("Lesson updated successfully!");
    } else {
      setLessons((previous) => [...previous, lesson]);
      setMessage("Lesson published successfully!");
    }

    resetForm();
  }

  function editLesson(lesson) {
    setForm({
      title: lesson.title,
      description: lesson.description,
      level: lesson.level,
      duration: String(lesson.duration),
      price: String(lesson.price),
      seats: String(lesson.seats),
      location: lesson.location,
    });

    setSlots([...lesson.slots]);
    setMaterials([...lesson.materials]);
    setEditingId(lesson.id);
    setErrors({});
    setMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function toggleVisibility(id) {
    setLessons((previous) =>
        previous.map((lesson) =>
            lesson.id === id
                ? { ...lesson, hidden: !lesson.hidden }
                : lesson
        )
    );
  }

  return (
      <main className="min-h-screen bg-cream px-4 py-10 text-ink">
        <div className="mx-auto max-w-4xl space-y-8">
          <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
            <h1 className="font-serif text-4xl text-clay">
              {editingId !== null ? "Edit lesson" : "Add a lesson"}
            </h1>

            <p className="mb-8 mt-2 text-sm text-muted">
              Create workshops and manage your available sessions.
            </p>

            {message && (
                <p role="status" className="mb-5 rounded-lg bg-blush p-3">
                  {message}
                </p>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              <Input
                  label="Lesson title"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="e.g. Pottery for beginners"
                  error={errors.title}
                  required
              />

              <div className="space-y-2">
                <label htmlFor="description" className="anamil-input-label">
                  Description *
                </label>
                <textarea
                    id="description"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows={4}
                    className="anamil-input"
                    placeholder="Describe what learners will do..."
                />
                {errors.description && (
                    <p className="anamil-error-message">
                      {errors.description}
                    </p>
                )}
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="level" className="anamil-input-label">
                    Skill level
                  </label>
                  <select
                      id="level"
                      name="level"
                      value={form.level}
                      onChange={handleChange}
                      className="anamil-input"
                  >
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                  </select>
                </div>

                <Input
                    label="Duration (minutes)"
                    name="duration"
                    type="number"
                    value={form.duration}
                    onChange={handleChange}
                    error={errors.duration}
                    required
                />

                <Input
                    label="Price (SAR)"
                    name="price"
                    type="number"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="e.g. 150"
                    error={errors.price}
                    required
                />

                <Input
                    label="Number of seats"
                    name="seats"
                    type="number"
                    value={form.seats}
                    onChange={handleChange}
                    error={errors.seats}
                    required
                />
              </div>

              <Input
                  label="Location"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="e.g. Qatif, Saudi Arabia"
                  error={errors.location}
                  required
              />

              <section className="space-y-4 border-t border-gray-200 pt-6">
                <h2 className="text-xl font-semibold">Time slots</h2>
                <p className="text-sm text-muted">
                  Add available dates and times for this lesson.
                </p>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="slotDate" className="anamil-input-label">
                      Date
                    </label>
                    <input
                        id="slotDate"
                        type="date"
                        value={slotDate}
                        onChange={(e) => setSlotDate(e.target.value)}
                        className="anamil-input"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="slotTime" className="anamil-input-label">
                      Time
                    </label>
                    <input
                        id="slotTime"
                        type="time"
                        value={slotTime}
                        onChange={(e) => setSlotTime(e.target.value)}
                        className="anamil-input"
                    />
                  </div>
                </div>

                <Button type="button" variant="secondary" onClick={addSlot}>
                  + Add slot
                </Button>

                {errors.slots && (
                    <p role="alert" className="anamil-error-message">
                      {errors.slots}
                    </p>
                )}

                {slots.map((slot) => (
                    <div
                        key={slot.id}
                        className="flex items-center justify-between gap-3 rounded-lg bg-cream p-3"
                    >
                  <span className="text-sm">
                    {new Date(slot.start).toLocaleString()}
                    {slot.confirmed && " (Booked)"}
                  </span>
                      <button
                          type="button"
                          onClick={() => removeSlot(slot.id)}
                          disabled={slot.confirmed}
                          className="text-sm text-red-600 underline disabled:opacity-40"
                      >
                        Remove
                      </button>
                    </div>
                ))}
              </section>

              <section className="space-y-4 border-t border-gray-200 pt-6">
                <h2 className="text-xl font-semibold">What to bring</h2>
                <p className="text-sm text-muted">
                  Add tools and materials learners need before the lesson.
                </p>

                <div className="grid gap-3 sm:grid-cols-2">
                  <input
                      value={materialName}
                      onChange={(e) => setMaterialName(e.target.value)}
                      placeholder="Material name"
                      aria-label="Material name"
                      className="anamil-input"
                  />

                  <input
                      type="number"
                      value={materialPrice}
                      onChange={(e) => setMaterialPrice(e.target.value)}
                      placeholder="Approximate price (SAR)"
                      aria-label="Approximate material price"
                      className="anamil-input"
                  />
                </div>

                <Button type="button" variant="secondary" onClick={addMaterial}>
                  + Add material
                </Button>

                {errors.materials && (
                    <p className="anamil-error-message">
                      {errors.materials}
                    </p>
                )}

                {materials.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-center justify-between rounded-lg bg-cream p-3"
                    >
                      <span>{item.name} — {item.price} SAR</span>
                      <button
                          type="button"
                          className="text-sm text-red-600 underline"
                          onClick={() =>
                              setMaterials((previous) =>
                                  previous.filter((m) => m.id !== item.id)
                              )
                          }
                      >
                        Remove
                      </button>
                    </div>
                ))}
              </section>

              <div className="flex flex-wrap gap-3">
                <Button type="submit">
                  {editingId !== null ? "Save Changes" : "Publish Lesson"}
                </Button>

                <Button type="button" variant="secondary" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>

          <section className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
            <h2 className="mb-5 text-2xl font-semibold">My Lessons</h2>

            {lessons.length === 0 && (
                <p className="text-muted">No lessons created yet.</p>
            )}

            <div className="space-y-4">
              {lessons.map((lesson) => (
                  <div key={lesson.id} className="rounded-xl border border-gray-200 p-4">
                    <div className="mb-3 flex flex-wrap items-center gap-3">
                      <h3 className="font-semibold">{lesson.title}</h3>
                      <Tag variant={lesson.hidden ? "default" : "success"}>
                        {lesson.hidden ? "Hidden" : "Published"}
                      </Tag>
                    </div>

                    <p className="mb-3 text-sm text-muted">
                      {lesson.price} SAR · {lesson.seats} seats ·
                      {" "}{lesson.slots.length} time slots
                    </p>

                    <div className="flex flex-wrap gap-3">
                      <Button type="button" variant="secondary"
                              onClick={() => editLesson(lesson)}>
                        Edit
                      </Button>
                      <Button type="button" variant="secondary"
                              onClick={() => toggleVisibility(lesson.id)}>
                        {lesson.hidden ? "Show" : "Hide"}
                      </Button>
                    </div>
                  </div>
              ))}
            </div>
          </section>
        </div>
      </main>
  );
}
