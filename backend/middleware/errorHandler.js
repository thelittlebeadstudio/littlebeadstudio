export const notFound = (req, res, next) => {
  res.status(404).json({ message: `Route not found: ${req.originalUrl}` });
};

export const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // full detail always goes to Render's logs
  const status = err.status || 500;
  // Don't leak internal error messages (stack traces, DB details) to the
  // public in production — only in local dev where you're the one reading it.
  const message =
    status === 500 && process.env.NODE_ENV === "production"
      ? "Something went wrong on our end."
      : err.message || "Server error";
  res.status(status).json({ message });
};
