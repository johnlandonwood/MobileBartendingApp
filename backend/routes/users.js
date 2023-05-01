import express from 'express';
import User from '../models/userModel.js';
import { handleValidationErrors } from './routesUtil.js';
import { query, body, validationResult } from "express-validator";
import { authenticate } from './routesUtil.js';
import dotenv from "dotenv";
import { OAuth2Client } from 'google-auth-library';

const googleClientId = "381439407225-fj25n8gmh9ub9dgvjhj0p5qi9igbq6jj.apps.googleusercontent.com";
const client = new OAuth2Client(googleClientId);

import jwt from 'jsonwebtoken';
const jwtSecret = process.env.JWT_SECRET;

const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      role: user.role,
      provider: user.provider,
      firstName: user.firstName,
      lastName: user.lastName
    },
    jwtSecret,
    { expiresIn: '3h' }
  );
}

dotenv.config();

const router = express.Router();

// Local authentication routes
router.post(
    '/register',
    [
        body('email').isEmail().withMessage('Invalid email address'),
        body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
        body('firstName').notEmpty().withMessage('First name is required'),
        body('lastName').notEmpty().withMessage('Last name is required'),
        body('role').isIn(['admin', 'company_owner', 'bartender', 'user']).withMessage('Invalid role'),
        body('dob').optional().isISO8601().toDate().withMessage('Invalid date of birth'),
    ],
    handleValidationErrors,
    async (req, res) => {
        try {
            const existingUser = await User.findOne({ email: req.body.email });
            if (existingUser) {
                return res.status(400).json({ message: 'User with this email already exists' });
            }

            const newUser = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password,
                role: req.body.role,
                provider: 'local'
            });

            await newUser.save();
            const token = generateToken(newUser);

            res.status(201).json({ message: 'User registered successfully', user: newUser, token });
        } catch (error) {
          console.log("Error on registration:", error);
            res.status(500).json({ message: 'Error registering user', error });
        }
    }
);

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  console.log("sign in request.");

  try {
    const user = await User.findOne({ email, provider: 'local' });

    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    const token = generateToken(user);
    console.log("signed in.");

    res.status(200).json({ token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
});

router.post('/api/auth/google', async (req, res) => {
    try {
      const { id_token } = req.body;
      const ticket = await client.verifyIdToken({
        idToken: id_token,
        audience: googleClientId,
      });
  
      const payload = ticket.getPayload();
      const { email, name, picture, sub: googleId } = payload;
  
      // Split the name into first and last names
      const [firstName, lastName] = name.split(' ');
  
      // Find the user by their email or Google ID
      let user = await User.findOne({
        $or: [{ email }, { 'google.id': googleId }],
      });
  
      // Create or update the user
      if (!user) {
        user = new User({
          firstName,
          lastName,
          email,
          role: 'user', // Set the default role
          provider: 'google',
          google: { id: googleId, picture },
        });
      } else {
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        user.google.id = googleId;
        user.google.picture = picture;
      }
  
      await user.save();
  
      // Generate an access token.
      const token = generateToken(user);
  
      res.status(200).json({ token: token, user: { _id: user._id, email: user.email, role: user.role }});
    } catch (error) {
        console.log(error);
      res.status(401).json({ message: 'Authentication failed' });
    }
  });


router.get('/api/profile', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export { router as userRoutes };
