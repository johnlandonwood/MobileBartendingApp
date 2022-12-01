const express = require('express');
const mongoose = require('mongoose');
const url = "mongodb://127.0.0.1:27017/bartending";

const userRoutes = require('./routes/userRoutes');

mongoose.connect(url).then(() => {

    const app = express();

    app.use(express.json());
    app.use('/account', userRoutes);

    app.listen(5000, () => {
        console.log("Server has started!");
    })

});