import Message from "../models/Message.js";

export const sendContactMessage = async (req, res) => {
  const { name, email, message, itemInterest } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "Name, email, and message are required." });
  }

  try {
    // Always save the message first, so nothing is lost even if email fails
    const saved = await Message.create({ name, email, message, itemInterest });

    // Send the notification via Resend's HTTP API (not SMTP). Render's free
    // tier blocks outbound SMTP ports (25/465/587) to prevent spam abuse, but
    // regular HTTPS (port 443) is always open, so an HTTP-based email API
    // works reliably where Nodemailer/SMTP would time out.
    try {
      const emailRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // "onboarding@resend.dev" is Resend's shared test sender — it works
          // immediately with no setup. Once you verify your own domain with
          // Resend, switch this to something like "contact@littlebeadstudio.ca".
          from: "Little Bead Studio <onboarding@resend.dev>",
          to: process.env.CONTACT_EMAIL,
          reply_to: email,
          subject: `New inquiry from ${name}${itemInterest ? ` about "${itemInterest}"` : ""}`,
          text: `From: ${name} (${email})\n${itemInterest ? `Interested in: ${itemInterest}\n` : ""}\nMessage:\n${message}`,
        }),
      });

      if (!emailRes.ok) {
        const errBody = await emailRes.text();
        console.error("Resend API error:", emailRes.status, errBody);
      }
    } catch (emailErr) {
      // The message is saved either way — log the email failure but don't fail the request
      console.error("Email send failed (message was still saved):", emailErr.message);
    }

    res.status(201).json({ message: "Message sent successfully!", id: saved._id });
  } catch (err) {
    res.status(500).json({ message: "Failed to send message", error: err.message });
  }
};