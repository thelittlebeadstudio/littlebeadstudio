import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Event from "../models/Event.js";

dotenv.config();

const now = new Date();
const inDays = (n) => new Date(now.getTime() + n * 24 * 60 * 60 * 1000);

const sampleEvents = [
  {
    name: "Sunday Makers Market",
    description: "A stall of finished pieces plus a few one-off samples not listed online.",
    location: "Community Hall, Calgary, AB",
    date: inDays(21),
    link: "",
    image: "",
  },
  {
    name: "Winter Craft Fair",
    description: "Little Bead Studio's biggest table of the year — extra stock and holiday-ready pieces.",
    location: "Downtown Market, Calgary, AB",
    date: inDays(60),
    link: "",
    image: "",
  },
  {
    name: "Spring Pop-Up",
    description: "A small pop-up table with a preview of the new spring color palette.",
    location: "Local Coffee House, Calgary, AB",
    date: inDays(-30), // in the past, to demonstrate the "previous events" section
    link: "",
    image: "",
  },
];

const run = async () => {
  await connectDB();
  await Event.deleteMany({});
  await Event.insertMany(sampleEvents);
  console.log(`Seeded ${sampleEvents.length} events.`);
  process.exit(0);
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
