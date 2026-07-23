import Event from "../models/Event.js";

// GET /api/events — returns all events sorted soonest-first.
// The frontend splits these into "upcoming" vs "past" by comparing to today,
// so no separate query param is needed.
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch events", error: err.message });
  }
};

// POST /api/events (left open for a future admin page, same pattern as items)
export const createEvent = async (req, res) => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ message: "Failed to create event", error: err.message });
  }
};
