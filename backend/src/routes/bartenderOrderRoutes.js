import express from 'express';
import bartenderOrder from '../models/bartenderOrderModel.js';

const router = express.Router();


router.post("/orders", async (req, res) => {

    const newOrder = new bartenderOrder( {
            title: req.body.title,
            timePlaced: req.body.timePlaced,
            placedBy: req.body.placedBy,
            drink1: req.body.drink1,
            drink2: req.body.drink2,
            status: req.body.status,
            timeFulfilled: req.body.timeFulfilled
        }
    );

    var date = new Date(newOrder.timePlaced);
    const placed = date.toLocaleTimeString('en-US', { 
        hour: "numeric", 
        minute: "numeric"
    })
    newOrder.timePlaced = placed;

    try {
        console.log("Creating order");
        const savedOrder = await newOrder.save();
        res.status(201).send(savedOrder);

    } catch (error) {
        res.status(500).json({ message: 'Error creating order', error: error });
    }

});

router.get("/orders", async (req, res) => {

    const filter = {};

    try {
        console.log("Getting all orders");
        const orders = await bartenderOrder.find(filter)
        res.status(200).json(orders);

    } catch (error) {
        res.status(500).json({ message: 'Error getting orders', error: error });
    }

    

});


export { router as bartenderOrderRoutes };