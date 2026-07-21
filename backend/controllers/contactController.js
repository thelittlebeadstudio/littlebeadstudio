import nodemailer from "nodemailer";
import Message from "../models/Message.js";

export const sendContactMessage = async (req, res) => {
  const { name, email, message, itemInterest } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "Name, email, and message are required." });
  }

  try {
    // Always save the message first, so nothing is lost even if email fails
    const saved = await Message.create({ name, email, message, itemInterest });

    // Try to send an email notification
    try {
      const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE || "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: `"Little Bead Studio Website" <${process.env.EMAIL_USER}>`,
        to: process.env.CONTACT_EMAIL || process.env.EMAIL_USER,
        replyTo: email,
        subject: `New inquiry from ${name}${itemInterest ? ` about "${itemInterest}"` : ""}`,
        text: `From: ${name} (${email})\n${itemInterest ? `Interested in: ${itemInterest}\n` : ""}\nMessage:\n${message}`,
      });
    } catch (emailErr) {
      // The message is saved either way — log the email failure but don't fail the request
      console.error("Email send failed (message was still saved):", emailErr.message);
    }

    res.status(201).json({ message: "Message sent successfully!", id: saved._id });
  } catch (err) {
    res.status(500).json({ message: "Failed to send message", error: err.message });
  }
};
