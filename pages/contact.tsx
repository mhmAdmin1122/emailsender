import { useState } from "react";
import axios from "axios";

export default function Contact() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  function generateSixDigitCode() {
    let code = "";
    for (let i = 0; i < 6; i++) {
      code += Math.floor(Math.random() * 10); // Generates a random digit between 0 and 9
    }
    return code;
  }

  const sixDigitCode = generateSixDigitCode();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!emailSent) {
        // Send email with the six-digit code
        await axios.post("/api/sendEmail", { email, message: sixDigitCode });
        setEmailSent(true);
        setSuccess(false); // Reset success status
        setMessage(""); // Clear message input
        setVerificationCode(""); // Clear verification code input
      } else {
        // If email is sent, check verification code
        if (verificationCode == sixDigitCode) {
          setSuccess(true);
          // Proceed with further actions here after successful verification
        } else {
          setError("Verification code incorrect. Please try again.");
        }
      }
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
          {emailSent ? (
            <input
              type="text"
              placeholder="Enter Verification Code"
              value={verificationCode}
              className="border-2 border-gray-200 px-[30px] py-[9px] w-[280px]"
              onChange={(e) => setVerificationCode(e.target.value)}
              required
            />
          ) : null}
          <button
            type="submit"
            disabled={loading}
            className="border-2 border-gray-200 px-[30px] py-[9px] w-[280px] bg-[#00ff] text-[#fff]"
          >
            {loading ? "Sending..." : emailSent ? "Verify Code" : "Send Email"}
          </button>
          {error && <p>{error}</p>}
        </form>
      )}
    </div>
  );
}
