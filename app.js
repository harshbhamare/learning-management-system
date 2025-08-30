const express = require("express");
const mongoose = require('mongoose');
const path = require('path');
const router = express.Router();
const cookieParser = require('cookie-parser');
const Course = require('./models/courseModel'); 

const app = express()

const dbURI = process.env.MONGO_URI || "mongodb://localhost:27017/lms-xero"; 

if (!dbURI) {
    console.error('FATAL ERROR: MONGO_URI is not defined in the .env file.');
    process.exit(1);
}

mongoose.connect(dbURI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => {
        console.error('MongoDB connection failed:', err);
        process.exit(1);
    });

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));
app.use(cookieParser());


const homeRouter = require("./routes/homeRouter")
const dashboardRouter = require("./routes/dashboardRouter")
const mentorRouter = require("./routes/adminRouter")

app.use("/", homeRouter)
app.use("/", dashboardRouter)
app.use("/", mentorRouter)

app.listen(3000)