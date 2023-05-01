import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
//import cors from "cors";

dotenv.config();

// import passport from 'passport';
// import LocalStrategy from 'passport-local';
// import GoogleStrategy from 'passport-google-oauth20';
// import bcrypt from 'bcrypt';
// import User from './src/models/userModel.js';
// import session from "express-session";
// import { MemoryStore } from "express-session";

import { eventRoutes } from './routes/events.js';
import { bartendingCompanyRoutes } from './routes/companies.js';
import { userRoutes } from './routes/users.js';


const PORT = 8080;

// if(process.env.COSMOSDB_DBNAME === undefined)
//   process.env.COSMOSDB_DBNAME = "bartending";

// mongoose.connect("mongodb://"+process.env.COSMOSDB_HOST+":"+process.env.COSMOSDB_PORT+"/"+process.env.COSMOSDB_DBNAME, {
//    auth: {
//      username: process.env.COSMOSDB_USER,
//      password: process.env.COSMOSDB_PASSWORD
//    },
//  useNewUrlParser: true,
//  useUnifiedTopology: true,
//  retryWrites: false
//  })

dotenv.config();

const uri = "mongodb://127.0.0.1:27017/bartending";

mongoose.connect(uri
  // "mongodb://"+process.env.COSMOSDB_HOST+":"+process.env.COSMOSDB_PORT+"/"+process.env.COSMOSDB_DBNAME+"?ssl=true&replicaSet=globaldb", {
  //  auth: {
  //    username: process.env.COSMOSDB_USER,
  //    password: process.env.COSMOSDB_PASSWORD
  //  },
//  useNewUrlParser: true,
//  useUnifiedTopology: true,
//  retryWrites: false
//  }
 )
 .then(() => {
    console.log('Connection to CosmosDB successful');
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({extended: true}));

    // let sess = {
    //   secret: process.env.SESSION_SECRET,
    //   cookie: {
    //     name: 'barpal.sid', // Use custom cookie name
    //     maxAge: 24 * 60 * 60 * 1000, // 24 hours
    //     secure: false, // Set to true in production

    //   },
    //   resave: false,
    //   saveUninitialized: true,

    //   store: new MemoryStore(),
    // }
    
    // if (app.get('env') === 'production') {
    //   sess.cookie.secure = true // serve secure cookies
    // }
    
    // app.use(session(sess))

    // Configure Passport with the Local strategy
    // passport.use(
    //     new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    //         try {
    //             const user = await User.findOne({ email });
    //             if (!user) {
    //                 return done(null, false, { message: 'Invalid email or password' });
    //             }

    //             const isPasswordValid = await bcrypt.compare(password, user.password);
    //             if (!isPasswordValid) {
    //                 return done(null, false, { message: 'Invalid email or password' });
    //             }

    //             return done(null, user);
    //         } catch (error) {
    //             done(error);
    //         }
    //     })
    // );

    // // Configure Passport session support
    // passport.serializeUser((user, done) => {
    //     done(null, user.id);
    // });

    // passport.deserializeUser(async (id, done) => {
    //     try {
    //         const user = await User.findById(id);
    //         done(null, user);
    //     } catch (error) {
    //         done(error);
    //     }
    // });


    // // Set up Passport middleware
    // app.use(passport.initialize());
    // app.use(passport.session());

    app.use('/', userRoutes);
    app.use('/api/', eventRoutes);
    app.use('/api/companies/', bartendingCompanyRoutes);

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
 })

 .catch((err) => console.error(err));