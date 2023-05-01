import express from "express";
import order from '../models/orderModel.js'

const orders_router = express.Router();

//place an order
orders_router.post("/events", async (req, res) => {
    const order = new order(
        {

    }
    );
    await event.save();
    res.send(event);
});

//update an order

//change status of an order

//delete an order

export default orders_router