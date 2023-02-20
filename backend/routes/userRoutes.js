const express = require('express');
const User = require('../models/userModel');

const router = express.Router();

//create new user
router.post("/users", async (req, res) => {
    const user = new User(req.body
    //     {
    //     first_name: req.body.first_name,
    //     last_name: req.body.last_name,
    //     email: req.body.email,
    //     phone_number: req.body.phone_number,
    //     password: req.body.password,
    //     user_type: req.body.user_type,
    //     date_of_birth: req.body.date_of_birth,
    // }
    );
    await user.save();
    res.send(user);
});

//get all users
router.get("/users", async(req, res) => {
    const users = await User.find();

    res.send(users);
});

// //update user
// router.put("/users", async(req, res) => {
    
// })

// //delete user
// router.delete("/users", async(req, res) => {
    
// })

module.exports = router;