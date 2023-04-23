import express from "express";
import item from '../models/itemModel.js';

const items_router = express.Router();

//get all items associated with a bartending company
items_router.get("/items/:bartendingCompany", async (req, res) => {
    const query = {bartending_company: req.params.bartending_company};

    const options = {
        sort: {item_name: 1},
        projection: {_id: 0, item_name: 1, description: 1, add_ons: 1, price: 1},
    };

    const items = await Item.find(query, options);

    if((await items.count()) === 0){
        console.log("No documents found!");
    }

    res.send(items);

})

//update an item

//delete an item

export default items_router