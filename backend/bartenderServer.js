import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { bartenderOrderRoutes } from "./src/routes/bartenderOrderRoutes.js";
// import { drinkListRoutes } from "./src/routes/drinkListRoutes.js";
// import DrinkList from './src/models/drinkListModel.js';

dotenv.config();

const PORT = 8080;
const uri = "mongodb://127.0.0.1:27017/bartending";

mongoose.connect(uri)
 .then(() => {
    console.log('Connection to ' + uri + ' successful')
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

    app.use('/api', bartenderOrderRoutes);
    const port = 8000;
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    })
 })
 .catch((err) => console.error(err));