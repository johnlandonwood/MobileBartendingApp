import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";

dotenv.config();

import { eventRoutes } from './routes/events.js';
import { bartendingCompanyRoutes } from './routes/companies.js';
import { userRoutes } from './routes/users.js';


const PORT = 8080;

dotenv.config();

const uri = "mongodb://127.0.0.1:27017/bartending";

mongoose.connect(uri
 )
 .then(() => {
    console.log('Connection to CosmosDB successful');
    const app = express();

    app.use(cors());

    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    
    app.use('/', userRoutes);
    app.use('/api/', eventRoutes);
    app.use('/api/companies/', bartendingCompanyRoutes);

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
 })

 .catch((err) => console.error(err));