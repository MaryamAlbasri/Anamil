import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

// AI Assistance: ChatGPT helped implement this Reset Password
// page with email validation and a simulated reset request.

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    const cleanedEmail = email.trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanedEmail)) {
      setError("Enter a valid email address.");
      setSubmitted(false);
      return;
    }

    setError("");
    setSubmitted(true);
  }

  return (
    <>
      <Navbar />

      <main className="min-h-[70vh] bg-cream px-4 py-12 text-ink">
        <div className="mx-auto max-w-md rounded-2xl bg-white p-8 shadow-sm">
          <h1 className="mb-2 text-center font-serif text-4xl text-clay">Reset password</h1>

          <p className="mb-8 text-center text-sm text-muted">
            Enter your email to request a password reset link.
          </p>

          {submitted ? (
            <div role="status" className="text-center">
              <h2 className="mb-3 text-xl font-semibold">Check your email</h2>
              <p className="mb-6 text-sm text-muted">
                This is a demo. In the complete application, a password reset link would be sent if
                an account exists for this email. The link would be valid for 30 minutes.
              </p>
              <Link to="/login" className="font-medium text-clay underline">
                Back to Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <Input
                label="Email"
                name="email"
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setError("");
                }}
                placeholder="example@email.com"
                error={error}
                required
              />

              <Button type="submit" className="w-full">
                Send Reset Link
              </Button>

              <p className="text-center text-sm text-muted">
                Remember your password?{" "}
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