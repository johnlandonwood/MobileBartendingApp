import express from 'express';
import User from '../models/userModel';
import { handleValidationErrors } from './routesUtil';

const router = express.Router();

//create new user
router.post('/register',
    [
        body('firstName').notEmpty().withMessage('First name is required'),
        body('lastName').notEmpty().withMessage('Last name is required'),
        body('email').isEmail().withMessage('Invalid email address'),
        body('phone').optional().isMobilePhone().withMessage('Invalid phone number'),
        body('role').isIn(['admin', 'company_owner', 'bartender']).withMessage('Invalid role'),
        body('dob').optional().isISO8601().toDate().withMessage('Invalid date of birth'),
        body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
    ],
    handleValidationErrors,
    async (req, res) => {
        try {
            const newUser = new User(req.body);
            await newUser.save();
            res.status(201).json({ message: 'User registered successfully', user: newUser });
        } catch (error) {
            res.status(500).json({ message: 'Error registering user', error });
        }
    }
);


router.post(
    '/signin',
    [
        body('email').isEmail().withMessage('Invalid email address'),
        body('password').notEmpty().withMessage('Password is required')
    ],
    handleValidationErrors,

    async (req, res) => {
        try {
            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                return res.status(400).json({ message: 'Invalid email or password' });
            }

            const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
            if (!isPasswordValid) {
                return res.status(400).json({ message: 'Invalid email or password' });
            }

            // You can generate a token here if you want to implement JWT-based authentication

            res.status(200).json({ message: 'User signed in successfully', user });
        } catch (error) {
            res.status(500).json({ message: 'Error signing in', error });
        }
    }
);

//get user by email
// router.get("/users/:", async(req, res) => {
//     User.findOne({
//         email: req.body.email
//     })

//     res.send(users);
// });


// //delete user
// router.delete("/users/:email", async(req, res) => {
//     try {
//         await User.deleteOne(
//             {
//                 email: req.params.email
//             }
//         )
//         res.status(204).send()
//     } catch {
//         res.status(404)
//         res.send({error: "User doesn't exist!"})
//     }
// });

module.exports = router;