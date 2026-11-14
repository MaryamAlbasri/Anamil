
import { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";

// AI Assistance: ChatGPT helped implement the Craftsperson
// Profile Setup page, including image validation,
// a simulated AI bio draft, and profile submission.

const crafts = [
  "Pottery",
  "Sadu Weaving",
  "Calligraphy",
  "Woodwork",
  "Embroidery",
  "Photography",
];

export default function ProfileSetup() {
  const [form, setForm] = useState({
    craft: "",
    city: "",
    experience: "",
    style: "",
    teaching: "",
    bio: "",
  });

  const [photos, setPhotos] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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

  function handlePhotos(event) {
    const selectedFiles = Array.from(event.target.files || []);

    if (photos.length + selectedFiles.length > 10) {
      setErrors((previous) => ({
        ...previous,
        photos: "You can upload a maximum of 10 photos.",
      }));
      event.target.value = "";
      return;
    }

    const invalidFile = selectedFiles.some(
        (file) =>
            !["image/jpeg", "image/png"].includes(file.type) ||
            file.size > 5 * 1024 * 1024
    );

    if (invalidFile) {
      setErrors((previous) => ({
        ...previous,
        photos: "Only JPG or PNG images up to 5 MB are allowed.",
      }));
      event.target.value = "";
      return;
    }

    setPhotos((previous) => [...previous, ...selectedFiles]);
    setErrors((previous) => ({ ...previous, photos: "" }));
    event.target.value = "";
  }

  function removePhoto(index) {
    setPhotos((previous) =>
        previous.filter((_, photoIndex) => photoIndex !== index)
    );
  }

  function generateBio() {
    if (
        !form.craft ||
        !form.experience.trim() ||
        !form.style.trim() ||
        !form.teaching.trim()
    ) {
      setErrors((previous) => ({
        ...previous,
        bio: "Complete your craft and notes before drafting a bio.",
      }));
      return;
    }

    setLoading(true);

    // Simulated AI draft for the front-end prototype.
    // No external AI API is called.
    const draft =
        `I am a ${form.craft.toLowerCase()} craftsperson based in ` +
        `${form.city.trim() || "Saudi Arabia"}. ` +
        `My experience includes ${form.experience.trim()}. ` +
        `My creative style focuses on ${form.style.trim()}. ` +
        `I enjoy sharing my knowledge by teaching ` +
        `${form.teaching.trim()}.`;

    setForm((previous) => ({
      ...previous,
      bio: draft,
    }));

    setErrors((previous) => ({ ...previous, bio: "" }));
    setLoading(false);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const newErrors = {};

    if (!form.craft) {
      newErrors.craft = "Please select your craft.";
    }

    if (!form.city.trim()) {
      newErrors.city = "City is required.";
    }

    if (photos.length === 0) {
      newErrors.photos = "Upload at least one work photo.";
    }

    if (!form.bio.trim()) {
      newErrors.bio = "Please write or generate your bio.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setSubmitted(true);
    }
  }

  return (
      <main className="min-h-screen bg-cream px-4 py-12 text-ink">
        <div className="mx-auto max-w-3xl rounded-2xl bg-white p-6 shadow-sm sm:p-8">
          <h1 className="mb-2 font-serif text-4xl text-clay">
            Set up your profile
          </h1>

          <p className="mb-8 text-sm text-muted">
            Tell learners about your craft, experience, and work.
          </p>

          {submitted ? (
              <div role="status" className="space-y-4 text-center">
            <span className="inline-block rounded-full bg-blush px-4 py-2 font-medium text-clay">
              Pending Verification
            </span>

                <h2 className="text-2xl font-semibold">
                  Profile submitted!
                </h2>

                <p className="text-muted">
                  Your demo profile has been submitted for review.
                  In the complete application, an admin would
                  verify your profile before publishing it.
                </p>

                <Button
                    variant="secondary"
                    onClick={() => setSubmitted(false)}
                >
                  Edit Profile
                </Button>
              </div>
          ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="craft" className="anamil-input-label">
                      Craft *
                    </label>

                    <select
                        id="craft"
                        name="craft"
                        value={form.craft}
                        onChange={handleChange}
                        className="anamil-input"
                    >
                      <option value="">Select your craft</option>

                      {crafts.map((craft) => (
                          <option key={craft} value={craft}>
                            {craft}
                          </option>
                      ))}
                    </select>

                    {errors.craft && (
                        <p className="anamil-error-message">
                          {errors.craft}
                        </p>
                    )}
                  </div>

                  <Input
                      label="City"
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      placeholder="e.g. Dammam"
                      error={errors.city}
                      required
                  />
                </div>

                <div className="space-y-3">
                  <label htmlFor="photos" className="anamil-input-label">
                    Upload your work photos *
                  </label>

                  <input
                      id="photos"
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      multiple
                      onChange={handlePhotos}
                      className="block w-full rounded-lg border border-gray-300 p-3 text-sm"
                  />

                  <p className="text-xs text-muted">
                    JPG or PNG only, maximum 10 photos, 5 MB each.
                  </p>

                  {errors.photos && (
                      <p className="anamil-error-message" role="alert">
                        {errors.photos}
                      </p>
                  )}

                  {photos.length > 0 && (
                      <div className="space-y-2">
                        {photos.map((photo, index) => (
                            <div
                                key={`${photo.name}-${index}`}
                                className="flex items-center justify-between gap-3 rounded-lg bg-cream p-3 text-sm"
                            >
                      <span className="min-w-0 truncate">
                        {photo.name}
                      </span>

                              <button
                                  type="button"
                                  onClick={() => removePhoto(index)}
                                  className="shrink-0 text-red-600 underline"
                              >
                                Remove
                              </button>
                            </div>
                        ))}
                      </div>
                  )}
                </div>

                <div className="space-y-5">
                  <h2 className="text-xl font-semibold">
                    Tell us about yourself
                  </h2>

                  <Input
                      label="Years of experience"
                      name="experience"
                      value={form.experience}
                      onChange={handleChange}
                      placeholder="e.g. 5 years of pottery experience"
                  />

                  <Input
                      label="Your style"
                      name="style"
                      value={form.style}
                      onChange={handleChange}
                      placeholder="e.g. Traditional handmade designs"
                  />

                  <Input
                      label="What do you teach?"
                      name="teaching"
                      value={form.teaching}
                      onChange={handleChange}
                      placeholder="e.g. Beginner pottery workshops"
                  />
                </div>

                <div className="space-y-3">
                  <h2 className="text-xl font-semibold">
                    Your profile bio
                  </h2>

                  <p className="text-sm text-muted">
                    Use the demo draft helper or write your own bio.
                  </p>

                  <Button
                      type="button"
                      variant="secondary"
                      onClick={generateBio}
                      disabled={loading}
                  >
                    {loading ? "Drafting..." : "Draft my bio (Demo)"}
                  </Button>

                  <textarea
                      name="bio"
                      value={form.bio}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Write your profile description..."
                      className="anamil-input resize-y"
                  />

                  {errors.bio && (
                      <p className="anamil-error-message" role="alert">
                        {errors.bio}
                      </p>
                  )}
                </div>

                <Button type="submit" className="w-full">
                  Submit Profile
                </Button>
              </form>
          )}
        </div>
      </main>
  );
}
