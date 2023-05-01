import express from "express";
import { query, body, param, validationResult } from "express-validator";

import { upload } from "../../upload.js";
import { blobServiceClient } from "../../azureBlobStorage.js";
import DrinkItem from "../models/drinkModel.js";
import { deleteDBObject, handleValidationErrors, uploadImage } from "./routesUtil.js";

const router = express.Router();

const containerName = 'items';


// Validation rules
const drinkValidationRules = [
    // body('item_name').notEmpty().withMessage('Name is required'),
    // body('price').isNumeric().withMessage('Price must be a number'),
    // // body('company')
    // //     .notEmpty()
    // //     .withMessage('Company is required')
    // //     .isMongoId()
    // //     .withMessage('Company must be a valid ObjectId'),
    // body('description').notEmpty().withMessage('Description is required'),
    // body('category').isIn(['beer', 'wine', 'non-alcoholic']).withMessage('Invalid category'),
];

// Create a drink item
router.post('/', 
    upload.single('logo'), // Add the multer middleware for handling file uploads
    drinkValidationRules,
    handleValidationErrors,
    async (req, res) => {
    try {
      const drinkItem = new DrinkItem({ ...req.body });
      await drinkItem.save();

      if (req.file) {
        drinkItem.logoUrl = await uploadImage(drinkItem._id, req.file, 'items');
        await drinkItem.save();
      }

      res.status(201).json(drinkItem);
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ error: error.message });
    }
});


const drinkItemFilterRules = [
    query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
    query('limit').optional().isInt({ min: 1 }).withMessage('Limit must be a positive integer'),
    // query('name').optional().trim().escape(),
    // query('company').optional().notEmpty().isMongoId().withMessage('Company must be a valid ObjectId'),
    // query('minPrice').optional().isNumeric().withMessage('minPrice must be a number'),
    // query('maxPrice').optional().isNumeric().withMessage('maxPrice must be a number'),
];


// Get all drink items (with optional filtering)
router.get(
    '/',
    drinkItemFilterRules,
    handleValidationErrors,
    async (req, res) => {
        const {
            page = 1,
            limit = 10,
            // name,
            // company,
            // minPrice,
            // maxPrice,
        } = req.query;


        // // Convert page and limit to numbers
        const pageNumber = parseInt(page);
        const limitNumber = parseInt(limit);
        
        // const filter = {};
        // if (name) filter.name = name;
        // if (company) filter.company = company;

        // if (minPrice !== undefined && maxPrice !== undefined) {
        //     filter.price = { $gte: minPrice, $lte: maxPrice };
        //   } else if (minPrice !== undefined) {
        //     filter.price = { $gte: minPrice };
        //   } else if (maxPrice !== undefined) {
        //     filter.price = { $lte: maxPrice };
        //   }

        try {
            const drinkItems = await DrinkItem.find({}).skip((pageNumber - 1) * limitNumber).limit(limitNumber);
            // .find(filter)
            //     .skip((pageNumber - 1) * limitNumber)
            //     .limit(limitNumber);
            res.json(drinkItems);
        } catch (error) {
            res.status(500).json({ error: error.message });
            }
        }
);

// Get drink item by id
router.get(
  '/:id',
  // drinkItemFilterRules,
  // handleValidationErrors,
  async (req, res) => {
      // const {
      //     page = 1,
      //     limit = 10,
      //     name,
      //     company,
      //     minPrice,
      //     maxPrice,
      // } = req.query;


      // Convert page and limit to numbers
      // const pageNumber = parseInt(page);
      // const limitNumber = parseInt(limit);
      
      // const filter = {};
      // if (name) filter.name = name;
      // if (company) filter.company = company;

      // if (minPrice !== undefined && maxPrice !== undefined) {
      //     filter.price = { $gte: minPrice, $lte: maxPrice };
      //   } else if (minPrice !== undefined) {
      //     filter.price = { $gte: minPrice };
      //   } else if (maxPrice !== undefined) {
      //     filter.price = { $lte: maxPrice };
      //   }

      try {
          const drinkItem = await DrinkList.findOne({"_id": req.params.id}, '-_id name description price category');

          // const drinkItems = await DrinkItem.findOne(filter)
          //     .skip((pageNumber - 1) * limitNumber)
          //     .limit(limitNumber);
          res.json(drinkItem);
      } catch (error) {
          res.status(500).json({ error: error.message });
          }
      }
);


const updateDrinkValidationRules = [
    body('name').optional().notEmpty().withMessage('Name cannot be empty'),
    body('price').optional().isNumeric(),
    body('company')
      .optional()
      .notEmpty()
      .withMessage('Company cannot be empty')
      .isMongoId()
      .withMessage('Company must be a valid ObjectId'),
];

// update specific drink by ID
router.put('/:id',
    updateDrinkValidationRules,
    handleValidationErrors,
    async (req, res) => {
      try {
        let updateData = req.body;

        if (req.file) {
          updateData.logoUrl = await uploadImage(req.params.id, req.file, 'items');
        }

        const drinkItem = await DrinkItem.findByIdAndUpdate(req.params.id, updateData, {
          new: true,
          runValidators: true,
        });
        
        if (!drinkItem) {
            return res.status(404).json({ error: 'Company not found' });
        }
        res.json(drinkItem);
        } catch (error) {
        res.status(400).json({ error: error.message });
        }
});


router.delete('/:id', 
    async (req, res)  => {
        await deleteDBObject(DrinkItem, 'DrinkItem', req, res);
});




export { router as drinkRoutes };