const mongoose = require('mongoose');
const videoSchema = require("./videoModel"); 

const chapterSchema = new mongoose.Schema({
    chapterId: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    videos: {
        type: [videoSchema],
        required: true,
    },
}, { _id: false });

module.exports = chapterSchema; 