import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

// AI Assistance: ChatGPT helped implement this Login page,
// including form validation, mock authentication,
// and a demonstration of the account lockout feature.

// Demo credentials only. This is not real authentication.
const demoAccounts = [
  { email: "sara@example.com", password: "Demo12345", role: "learner" },
  { email: "noura@example.com", password: "Demo12345", role: "craftsperson" },
];

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockedUntil, setLockedUntil] = useState(null);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => ({ ...previous, [name]: "", general: "" }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const now = Date.now();

    if (lockedUntil && now < lockedUntil) {
      setErrors({ general: "Account temporarily locked. Please try again after 15 minutes." });
      return;
    }

    if (lockedUntil && now >= lockedUntil) {
      setLockedUntil(null);
      setFailedAttempts(0);
    }

    const newErrors = {};
    const email = form.email.trim().toLowerCase();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Enter a valid email address.";
    if (!form.password) newErrors.password = "Password is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const account = demoAccounts.find((user) => user.email === email && user.password === form.password);

    if (account) {
      setErrors({});
      setFailedAttempts(0);
      setLockedUntil(null);
      navigate(account.role === "craftsperson" ? "/dashboard/profile" : "/browse");
      return;
    }

    const attempts = failedAttempts + 1;
    setFailedAttempts(attempts);

    if (attempts >= 5) {
      setLockedUntil(Date.now() + 15 * 60 * 1000);
      setErrors({ general: "Too many failed attempts. Login is locked for 15 minutes." });
    } else {
      setErrors({ general: `Invalid email or password. ${5 - attempts} attempts remaining.` });
    }
  }

  const isLocked = lockedUntil !== null && Date.now() < lockedUntil;

  return (
    <>
      <Navbar />

      <main className="min-h-[70vh] bg-cream px-4 py-12 text-ink">
        <div className="mx-auto max-w-md rounded-2xl bg-white p-8 shadow-sm">
          <h1 className="mb-2 text-center font-serif text-4xl text-clay">Welcome back</h1>
          <p className="mb-8 text-center text-sm text-muted">Log in to your Anamil account.</p>

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <Input label="Email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="example@email.com" error={errors.email} required />
            <Input label="Password" name="password" type="password" value={form.password} onChange={handleChange} placeholder="Enter your password" error={errors.password} required />

            {errors.general && (
              <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{errors.general}</p>
            )}

            <div className="text-right">
              <Link to="/reset-password" className="text-sm font-medium text-clay underline">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" className="w-full" disabled={isLocked}>
              {isLocked ? "Account Locked" : "Log In"}
            </Button>

            <p className="text-center text-sm text-muted">
              Don't have an account?{" "}
              <Link to="/signup" className="font-medium text-clay underline">Sign up</Link>
            </p>

            <p className="rounded-lg bg-cream p-3 text-center text-xs text-muted">
              Demo: <span className="text-ink">sara@example.com</span> (learner) or{" "}
              <span className="text-ink">noura@example.com</span> (craftsperson), password{" "}
              <span className="text-ink">Demo12345</span>
            </p>
          </form>
        </div>
      </main>

      <Footer />
    </>
  );
}