// models/courseModel.js
const mongoose = require("mongoose");
const videoSchema = require("./videoModel");
const chapterSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    videos: [videoSchema],
}, { _id: true });


const courseSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    thumbnailUrl: { type: String, required: true, trim: true },
    instructor: { type: String, required: true, trim: true },
    chapters: [chapterSchema],
}, { timestamps: true });

module.exports = mongoose.model("Course", courseSchema);
