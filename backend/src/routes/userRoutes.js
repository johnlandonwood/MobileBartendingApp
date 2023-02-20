import express from 'express';
const User = require('../../models/userModel');

const router = express.Router();

//create new user
router.post("/signup", async (req, res) => {
    const user = new User(
        {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        phone_number: req.body.phone_number,
        password: req.body.password,
        user_type: req.body.user_type
    }
    );
    await user.save();
    res.send(user);
});

//get user by email and password
router.get("/users/:", async(req, res) => {
    User.findOne({
        email: req.body.email
    })

    res.send(users);
});

//update user
// router.put("/users/{email}&{password}", async(req, res) => {
//     try {
//         const user = await User.findOne(
//             {email: req.params.email, password: req.params.password});
//         if(req)
//     }
// });

//delete user
router.delete("/users/:email", async(req, res) => {
    try {
        await User.deleteOne(
            {
                email: req.params.email
            }
        )
        res.status(204).send()
    } catch {
        res.status(404)
        res.send({error: "User doesn't exist!"})
    }
});

module.exports = router;