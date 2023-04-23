import express from "express";

import DrinkList from '../models/drinkListModel.js';

const drink_lists_router = express.Router();

// drink_lists_router.post("/drinklists", async (req, res) => {
//     const drinkList = new DrinkList(
//         {

//     }
//     );
//     await drinkList.save();
//     res.send(drinkList);
// });

drink_lists_router.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

drink_lists_router.get('/drinklists/:id', async (req, res) => {
    const drinklist = await DrinkList.findById(req.params.id, {"item_list": {category: "Beer"}});
    res.send(drinklist);

});


export {drink_lists_router as drinkListRoutes}