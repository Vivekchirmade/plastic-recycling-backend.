const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log("❌ MongoDB Error:", err));

// Plastic Waste Model
const Plastic = mongoose.model("Plastic", new mongoose.Schema({
    type: String,
    quantity: Number,
    location: String,
    price: Number,
}));

// Add Plastic Waste
app.post("/plastic", async (req, res) => {
    const newPlastic = new Plastic(req.body);
    await newPlastic.save();
    res.json({ message: "♻️ Plastic waste added successfully!" });
});

// Get All Plastic Listings
app.get("/plastic", async (req, res) => {
    const plastics = await Plastic.find();
    res.json(plastics);
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
