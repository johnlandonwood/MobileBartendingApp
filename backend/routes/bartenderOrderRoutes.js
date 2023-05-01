import express from 'express';
import bartenderOrder from '../models/bartenderOrderModel.js';

const router = express.Router();


router.post("/", async (req, res) => {

    const newOrder = new bartenderOrder( {
            // title: req.body.title,
            // timePlaced: req.body.timePlaced,
            // placedBy: req.body.placedBy,
            drinks: req.body.drinks,
            // status: req.body.status,
            // timeFulfilled: req.body.timeFulfilled
        }
    );
    console.log(newOrder.drinks);

    var date = new Date(newOrder.timePlaced);
    const placed = date.toLocaleTimeString('en-US', { 
        hour: "numeric", 
        minute: "numeric"
    })
    newOrder.timePlaced = placed;
    newOrder.status = "Unclaimed";
    newOrder.placedBy = "Genny Wood";
    newOrder.title = "Order 7";

    try {
        console.log("Creating order");
        await newOrder.save();
        res.send(newOrder);

    } catch (error) {
        res.status(500).json({ message: 'Error creating order', error: error });
    }

});

router.get("/", async (req, res) => {

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