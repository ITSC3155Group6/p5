"use strict";

const mongoose = require("mongoose");
const path = require("path");

// Load your schemas
const User = require("./schema/user.js");
const Photo = require("./schema/photo.js");
const SchemaInfo = require("./schema/schemaInfo.js");

// Connect to MongoDB
mongoose.set("strictQuery", false);
mongoose.connect("mongodb://127.0.0.1/project6");

async function seed() {
  try {
    console.log("Seeding database...");

    // Clear existing collections (optional)
    await User.deleteMany({});
    await Photo.deleteMany({});
    await SchemaInfo.deleteMany({});

    // Insert SchemaInfo
    const schemaInfo = await SchemaInfo.create({ version: "1.0" });
    console.log("Inserted SchemaInfo:", schemaInfo);

    // Insert a sample User
    const user = await User.create({
      first_name: "Obi-Wan",
      last_name: "Kenobi",
      location: "Tatooine",
      description: "Jedi Master",
      occupation: "Jedi",
    });
    console.log("Inserted User:", user);

    // Insert sample Photos
    // Make sure these files exist in ./images folder
    const photo1 = await Photo.create({
      file_name: "kenobi1.jpg",
      user_id: user._id,
    });
    const photo2 = await Photo.create({
      file_name: "kenobi2.jpg",
      user_id: user._id,
    });
    console.log("Inserted Photos:", [photo1.file_name, photo2.file_name]);

    console.log("Database seeding completed!");
  } catch (err) {
    console.error("Seeding error:", err);
  } finally {
    mongoose.disconnect();
  }
}

seed();