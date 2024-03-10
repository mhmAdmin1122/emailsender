// pages/contact.tsx

import { useState } from "react";
import axios from "axios";

export default function Contact() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await axios.post("/api/sendEmail", { email, message });
      setSuccess(true);
    } catch (error) {
      setError("Failed to send email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Contact Form</h1>
      {success ? (
        <p>Email sent successfully!</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Your email"
            value={email}
            className="border-2 border-gray-200 px-[30px] py-[9px] w-[280px]"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <textarea
            placeholder="Your message"
            value={message}
            className="border-2 border-gray-200 px-[30px] py-[9px] w-[280px]"
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
          <button
            type="submit"
            disabled={loading}
            className="border-2 border-gray-200 px-[30px] py-[9px] w-[280px] bg-[#00ff] text-[#fff]"
          >
            {loading ? "Sending..." : "Send Email"}
          </button>
          {error && <p>{error}</p>}
        </form>
      )}
    </div>
  );
}
