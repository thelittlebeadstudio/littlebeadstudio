import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Item from "../models/Item.js";

dotenv.config();

const sampleItems = [
  {
    name: "Sunset Amber Wrap Bracelet",
    description:
      "A hand-strung wrap bracelet in warm amber and honey-toned glass beads, finished with a brass toggle clasp. Wraps three times around most wrists.",
    price: 28,
    images: [],
    category: "Bracelets",
    materials: ["Glass beads", "Brass clasp", "Waxed cord"],
    inStock: true,
    featured: true,
  },
  {
    name: "Coral Reef Beaded Earrings",
    description:
      "Lightweight dangle earrings featuring coral and turquoise seed beads in a hand-loomed pattern. Hypoallergenic ear wires.",
    price: 22,
    images: [],
    category: "Earrings",
    materials: ["Seed beads", "Surgical steel ear wires"],
    inStock: true,
    featured: true,
  },
  {
    name: "Indigo Strand Necklace",
    description:
      "A single long strand of deep indigo and slate beads, hand-knotted between each bead for durability and drape.",
    price: 42,
    images: [],
    category: "Necklaces",
    materials: ["Glass beads", "Silk cord"],
    inStock: true,
    featured: false,
  },
  {
    name: "Woven Bead Cuff",
    description:
      "A wide peyote-stitch cuff in a geometric pattern of moss green and cream, backed with soft leather for comfort.",
    price: 35,
    images: [],
    category: "Bracelets",
    materials: ["Seed beads", "Leather backing"],
    inStock: false,
    featured: false,
  },
];

const run = async () => {
  await connectDB();
  await Item.deleteMany({});
  await Item.insertMany(sampleItems);
  console.log(`Seeded ${sampleItems.length} items.`);
  process.exit(0);
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
