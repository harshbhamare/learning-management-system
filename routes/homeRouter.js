const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();


router.get("/profile", function(req, res){
    res.render("studentProfile")
})



module.exports = router;