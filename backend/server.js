import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

// import passport from "passport";
// import { BearerStrategy } from "passport-azure-ad";
// import { Jwt } from "jsonwebtoken";


import { eventRoutes } from './src/routes/events.js';
import { bartendingCompanyRoutes } from './src/routes/companies.js';


// const options = {
//   identityMetadata: `https://${process.env.B2C_TENANT_NAME}.b2clogin.com/${process.env.B2C_TENANT_NAME}.onmicrosoft.com/${process.env.B2C_POLICY_NAME}/v2.0/.well-known/openid-configuration`,
//   clientID: process.env.APP_CLIENT_ID,
//   policyName: process.env.B2C_POLICY_NAME,
//   isB2C: true,
//   validateIssuer: true,
//   loggingLevel: 'info',
//   passReqToCallback: false
// };



const PORT = 8080;

if(process.env.COSMOSDB_DBNAME === undefined)
  process.env.COSMOSDB_DBNAME = "bartending";

mongoose.connect("mongodb://"+process.env.COSMOSDB_HOST+":"+process.env.COSMOSDB_PORT+"/"+process.env.COSMOSDB_DBNAME, {
   auth: {
     username: process.env.COSMOSDB_USER,
     password: process.env.COSMOSDB_PASSWORD
   },
 useNewUrlParser: true,
 useUnifiedTopology: true,
 retryWrites: false
 })
 .then(() => {
    console.log('Connection to CosmosDB successful')
    const app = express();

    app.use(express.json())
    app.use(express.urlencoded({extended: true}))
    app.use('/api/', eventRoutes)
    app.use('/api/companies/', bartendingCompanyRoutes)
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
 })
 .catch((err) => console.error(err));