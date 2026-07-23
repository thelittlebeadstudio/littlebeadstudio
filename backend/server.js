import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import itemRoutes from "./routes/items.js";
import contactRoutes from "./routes/contact.js";
import eventRoutes from "./routes/events.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";

dotenv.config();
connectDB();

const app = express();

// Sets a batch of standard security headers (no server-info leakage, etc.)
app.use(helmet());

// In production, only the one real frontend origin may call this API.
// Locally, CLIENT_URL falls back to the Vite dev server.
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));

app.use(express.json({ limit: "10kb" })); // caps request body size

// The contact form is the only public write — throttle it against spam/abuse.
// 5 submissions per IP per 15 minutes is generous for a real visitor.
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { message: "Too many messages sent — please try again later." },
});

app.get("/api/health", (req, res) => res.json({ status: "ok" }));
app.use("/api/items", itemRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/contact", contactLimiter, contactRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
