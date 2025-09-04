const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const Course = require("../models/courseModel")

router.get("/profile", async (req, res) => {
    try {
        const courses = await Course.find();
        res.render("studentProfile", { courses }); 
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;