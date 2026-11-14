import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import Input from "../../components/Input";
import users from "../../data/users";
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
// AI Assistance: ChatGPT helped implement the Sign Up form,
// including React state, validation, and mock registration.

export default function SignUp() {
  const [form, setForm] = useState({
    role: "learner",
    name: "",
    email: "",
    phone: "",
    city: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

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

  function handleSubmit(event) {
    event.preventDefault();

    const newErrors = {};
    const email = form.email.trim().toLowerCase();

    if (!form.name.trim()) {
      newErrors.name = "Full name is required.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Enter a valid email address.";
    } else if (
        users.some((user) => user.email.toLowerCase() === email)
    ) {
      newErrors.email = "This email is already registered.";
    }

    if (!/^05\d{8}$/.test(form.phone.trim())) {
      newErrors.phone = "Enter a valid Saudi mobile number (05XXXXXXXX).";
    }

    if (!form.city.trim()) {
      newErrors.city = "City is required.";
    }

    if (
        form.password.length < 8 ||
        !/[A-Za-z]/.test(form.password) ||
        !/\d/.test(form.password)
    ) {
      newErrors.password =
          "Password must contain at least 8 characters, a letter, and a number.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setSuccess(true);
    } else {
      setSuccess(false);
    }
  
  }

  return (
    <>
      <Navbar />

      <main className="min-h-[70vh] bg-cream px-4 py-12 text-ink">
        <div className="mx-auto max-w-md rounded-2xl bg-white p-8 shadow-sm">
          <h1 className="mb-2 text-center font-serif text-4xl text-clay">
            Create your account
          </h1>

          <p className="mb-8 text-center text-sm text-muted">
            Join Anamil to discover, learn, and share crafts.
          </p>

          {success ? (
            <div role="status" className="text-center">
              <h2 className="mb-3 text-xl font-semibold text-ink">Registration successful!</h2>
              <p className="mb-5 text-sm text-muted">
                Your information passed validation. In the complete application, a verification
                email would be sent to your address.
              </p>
              <Link to="/login" className="font-medium text-clay underline">
                Go to Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <fieldset>
                <legend className="mb-2 text-sm font-medium">I am joining as</legend>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: "learner", label: "I want to learn" },
                    { value: "craftsperson", label: "I teach a craft" },
                  ].map((option) => (
                    <label
                      key={option.value}
                      className={`cursor-pointer rounded-lg border p-3 text-center text-sm ${
                        form.role === option.value ? "border-clay bg-blush text-ink" : "border-gray-200"
                      }`}
                    >
                      <input
                        type="radio"
                        name="role"
                        value={option.value}
                        checked={form.role === option.value}
                        onChange={handleChange}
                        className="mr-2 accent-clay"
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
              </fieldset>

              <Input label="Full name" name="name" value={form.name} onChange={handleChange} placeholder="Enter your full name" error={errors.name} required />
              <Input label="Email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="example@email.com" error={errors.email} required />
              <Input label="Phone number" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="05XXXXXXXX" error={errors.phone} required />
              <Input label="City" name="city" value={form.city} onChange={handleChange} placeholder="Enter your city" error={errors.city} required />
              <Input label="Password" name="password" type="password" value={form.password} onChange={handleChange} placeholder="Create a password" error={errors.password} required />

              <Button type="submit" className="w-full">
                Create Account
              </Button>

              <p className="text-center text-sm text-muted">
                Already have an account?{" "}
                <Link to="/login" className="font-medium text-clay underline">
                  Log in
                </Link>
              </p>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}