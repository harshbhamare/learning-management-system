const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();


router.get("/mentor-dashboard", function(req, res){
    res.render("adminDashboard")
})

module.exports = router;