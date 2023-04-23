import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { drinkListRoutes } from "./src/routes/drinkListRoutes.js";
import DrinkList from './src/models/drinkListModel.js';

dotenv.config();

const PORT = 8080;
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
    const corsOptions = {
      origin: 'http://localhost:19006/',
      credentials: true,
      optionSuccessStatus: 200
    };
    app.use(cors());
    // app.use('/items', items_router);
    // app.get('/drinklists/:id', async (req, res) => {
    //   const drinklist = await DrinkList.findOne({_id: req.params.id}, 'item_list');
    //   res.send(drinklist);
  
    // });
    app.use('/api', drinkListRoutes);
    const port = 4000;
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    })
 })
 .catch((err) => console.error(err));