// models/videoModel.js
const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
    videoId: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
    },
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
    youtubeLink: {
        type: String,
        required: true,
        trim: true,
    },
}, { _id: false }); 

module.exports = videoSchema;
