import express from "express";
import mongoose from "mongoose";

import DrinkList from "../models/drinkListModel.js";
import DrinkItem from "../models/drinkModel.js";

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

// GET a drink list by id
drink_lists_router.get('/:id', async (req, res) => {
    const drinklist = await DrinkList.findOne({"_id": req.params.id}, '-_id item_list');
    
    // THIS LOGIC NEEDS TO BE REWORKED TO BE MORE FLEXIBLE
    const beer_items = [];
    const wine_items = [];
    const liquor_items = [];
    const mixeddrink_items = [];
    const nonalcoholic_items = [];
    const items = drinklist.item_list;

    for(const [key, value] of Object.entries(items)) {
        try {
            const drink = await DrinkItem.findById(`${value}`).select('item_name description price category logoUrl');
            // .exec(function (err, item){
            // });
            if(drink.category == "Beer"){
                beer_items.push(drink);
            }
            else if (drink.category == "Wine") {
                wine_items.push(drink);
            }
            else if (drink.category == "Liquor") {
                liquor_items.push(drink);
            }
            else if (drink.category == "Mixed Drink") {
                mixeddrink_items.push(drink);
            }
            else if (drink.category == "Non-Alcoholic") {
                nonalcoholic_items.push(drink);
            }
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }

    }
    const items_categorized = [];

    const beer_object = {
        title: "Beer",
        data: beer_items
    };
    const wine_object = {
        title: "Wine",
        data: wine_items
    };
    const liquor_object = {
        title: "Liquor",
        data: liquor_items
    };
    const mixeddrink_object = {
        title: "Mixed Drinks",
        data: mixeddrink_items
    };
    const nonalcoholic_object = {
        title: "Non-Alcoholic Drinks",
        data: nonalcoholic_items
    };
    items_categorized.push(beer_object, wine_object, liquor_object, mixeddrink_object, nonalcoholic_object);
    // console.log(items_categorized);
    // console.log(items_categorized[0].data);
    res.send(items_categorized);
});

// //GET a drink list with a query
// drink_lists_router.get('/:id?query', async (req, res) => {
//     const drinklist = await DrinkList.findOne({"_id": req.params.id}, '-_id item_list');
    
//     // THIS LOGIC NEEDS TO BE REWORKED TO BE MORE FLEXIBLE
//     const beer_items = [];
//     const wine_items = [];
//     const liquor_items = [];
//     const mixeddrink_items = [];
//     const nonalcoholic_items = [];
//     const items = drinklist.item_list;

//     for(const [key, value] of Object.entries(items)) {
//         try {
//             const drink = await DrinkItem.findOne({_id: `${value}`}).select('-_id item_name description price category');
//             // .exec(function (err, item){
//             // });
//             if(drink.category == "Beer"){
//                 beer_items.push(drink);
//             }
//             else if (drink.category == "Wine") {
//                 wine_items.push(drink);
//             }
//             else if (drink.category == "Liquor") {
//                 liquor_items.push(drink);
//             }
//             else if (drink.category == "Mixed Drink") {
//                 mixeddrink_items.push(drink);
//             }
//             else if (drink.category == "Non-Alcoholic") {
//                 nonalcoholic_items.push(drink);
//             }
//         }
//         catch (error) {
//             res.status(500).json({ error: error.message });
//         }

//     }
//     const items_categorized = [];

//     const beer_object = {
//         title: "Beer",
//         data: beer_items
//     };
//     const wine_object = {
//         title: "Wine",
//         data: wine_items
//     };
//     const liquor_object = {
//         title: "Liquor",
//         data: liquor_items
//     };
//     const mixeddrink_object = {
//         title: "Mixed Drinks",
//         data: mixeddrink_items
//     };
//     const nonalcoholic_object = {
//         title: "Non-Alcohoic Drinks",
//         data: nonalcoholic_items
//     };

//     items_categorized.push(beer_object, wine_object, liquor_object, mixeddrink_object, nonalcoholic_object);
//     // console.log(items_categorized);
//     // console.log(items_categorized[0].data);
//     res.send(items_categorized);
// });

export {drink_lists_router as drinkListRoutes}