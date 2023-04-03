import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";

import { eventRoutes } from './src/routes/eventRoutes.js';


dotenv.config();

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
    app.use('/api/', eventRoutes);
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
 })
 .catch((err) => console.error(err));