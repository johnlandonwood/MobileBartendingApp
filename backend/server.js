import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";

// import passport from "passport";
// import { BearerStrategy } from "passport-azure-ad";
// import { Jwt } from "jsonwebtoken";


import { eventRoutes } from './src/routes/events.js';
import { bartendingCompanyRoutes } from './src/routes/companies.js';
import { drinkListRoutes } from "./src/routes/drinklists.js";
import { drinkRoutes } from "./src/routes/drinks.js";


// const options = {
//   identityMetadata: `https://${process.env.B2C_TENANT_NAME}.b2clogin.com/${process.env.B2C_TENANT_NAME}.onmicrosoft.com/${process.env.B2C_POLICY_NAME}/v2.0/.well-known/openid-configuration`,
//   clientID: process.env.APP_CLIENT_ID,
//   policyName: process.env.B2C_POLICY_NAME,
//   isB2C: true,
//   validateIssuer: true,
//   loggingLevel: 'info',
//   passReqToCallback: false
// };



const PORT = 4000;

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
    console.log('Connection to CosmosDB successful')
    const app = express();
    app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });
    app.use(express.json())
    app.use(express.urlencoded({extended: true}))
    app.use('/api/drinklists/', drinkListRoutes);
    app.use('/api/drinks/', drinkRoutes);
    // app.use('/api/', eventRoutes)
    // app.use('/api/companies/', bartendingCompanyRoutes)
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
})
 .catch((err) => console.error(err));