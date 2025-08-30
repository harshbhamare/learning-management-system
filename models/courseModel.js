const mongoose = require('mongoose');
const chapterSchema = require("./chapterModel")

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    thumbnailUrl: {
        type: String,
        required: true,
        trim: true,
    },
    instructor: {
        name: { type: String, required: true },
        bio: { type: String, required: true },
    },
    chapters: {
        type: [chapterSchema], // Array of chapter sub-documents
        // required: true,
    },
}, { timestamps: true });


module.exports = mongoose.model('Course', courseSchema);