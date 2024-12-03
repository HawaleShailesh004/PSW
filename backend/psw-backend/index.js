const express = require("express");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const promptRoutes = require("./routes/promptRoute");

require("dotenv").config();

connectDB();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(require("cors")());

// Routes
app.use("/api/prompts", promptRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
