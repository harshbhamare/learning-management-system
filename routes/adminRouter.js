const express = require("express");
const Course = require("../models/courseModel");
const router = express.Router();

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.get("/", async (req, res) => {
    try {
        const courses = await Course.find({}).sort({ createdAt: -1 });
        res.render("adminDashboard", { courses });
    } catch (err) {
        console.error("Error fetching courses:", err);
        res.status(500).send("Failed to load dashboard");
    }
});

router.post("/add-course", async (req, res) => {
    try {
        const { title, description, thumbnailUrl, instructor } = req.body;
        const newCourse = new Course({ title, description, thumbnailUrl, instructor });
        await newCourse.save();
        console.log("Course saved");
        res.redirect("/admin"); 
    } catch (err) {
        console.error("Error adding course:", err);
        res.status(500).send("Failed to add course");
    }
});


router.post("/course/:courseId/add-chapter", async (req, res) => {
    try {
        const course = await Course.findById(req.params.courseId);
        if (!course) return res.status(404).send("Course not found");

        const newChapter = { title: req.body.title, videos: [] };
        course.chapters.push(newChapter);
        await course.save();
        console.log("Chapter added");
        res.redirect("/admin"); 
    } catch (err) {
        console.error("Error adding chapter:", err);
        res.status(500).send("Failed to add chapter");
    }
});

router.post("/course/:courseId/chapter/:chapterId/add-video", async (req, res) => {
    try {
        const { courseId, chapterId } = req.params;
        const { title, description, youtubeLink } = req.body;

        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ message: "Course not found" });
        
        const chapter = course.chapters.id(chapterId); 
        if (!chapter) return res.status(404).json({ message: "Chapter not found" });

        const newVideo = { title, description, youtubeLink };
        chapter.videos.push(newVideo);
        await course.save();

        console.log("Video lecture added successfully");
        const addedVideo = chapter.videos[chapter.videos.length - 1];
        res.status(201).json(addedVideo);
    } catch (err) {
        console.error("Error adding video:", err);
        res.status(500).json({ message: "Failed to add video lecture" });
    }
});

module.exports = router;