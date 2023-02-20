import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const PORT = process.env.COSMOSDB_PORT || 8080;
// const uri = "mongodb://127.0.0.1:27017/bartending";

mongoose.connect("mongodb://"+process.env.COSMOSDB_HOST+":"+process.env.COSMOSDB_PORT+"/"+process.env.COSMOSDB_DBNAME+"?ssl=true&replicaSet=globaldb", {
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
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
 })
 .catch((err) => console.error(err));