const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");

// Import routers
const homeRouter = require("../routes/homeRouter");
const dashboardRouter = require("../routes/dashboardRouter");
const mentorRouter = require("../routes/adminRouter");

const app = express();

// MongoDB URI
const dbURI = process.env.MONGO_URI || "mongodb://localhost:27017/lms-xero";

mongoose.connect(dbURI)
    .then(() => console.log("✅ MongoDB connected successfully"))
    .catch(err => {
        console.error("❌ MongoDB connection failed:", err);
        process.exit(1);
    });

// Middleware
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));
app.use(cookieParser());

app.use("/", homeRouter);
app.use("/", dashboardRouter);
app.use("/admin", mentorRouter); 

// Start server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

module.exports = app;