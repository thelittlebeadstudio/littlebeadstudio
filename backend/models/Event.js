import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    location: { type: String, default: "" },
    date: { type: Date, required: true },      // start date/time
    endDate: { type: Date },                     // optional, for multi-day events
    link: { type: String, default: "" },         // e.g. a Facebook event or market's website
    image: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("Event", eventSchema);
