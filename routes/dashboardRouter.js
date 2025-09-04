const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const Course = require("../models/courseModel")


router.get("/student-dashboard/:id", async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) return res.status(404).send("Course not found");
        res.render("studentDashboard", { course }); 
    } catch (err) {
        res.status(500).send(err.message);
    }
});
module.exports = router;