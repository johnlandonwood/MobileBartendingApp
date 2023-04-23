import express from "express";
import { query, body, param, validationResult } from "express-validator";
import BartendingCompany from "../models/bartendingCompanyModel.js";

import { upload } from "../../upload.js";
import { blobServiceClient } from "../../azureBlobStorage.js";

import { handleValidationErrors, deleteOldImages, uploadImage } from "./routesUtil.js";

const router = express.Router();


// Validation rules
const companyValidationRules = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email')
    .isEmail()
    .withMessage('Email must be a valid email address')
    .normalizeEmail(),
    body('admin')
        .notEmpty()
        .withMessage('Admin is required')
        .isMongoId()
        .withMessage('Admin must be a valid ObjectId'),
    body('bartenders')
        .optional()
        .isArray()
        .withMessage('Bartenders must be an array of ObjectIds')
        .custom((value) => {
        const isValid = value.every((id) => mongoose.Types.ObjectId.isValid(id));
        return isValid;
        })
        .withMessage('Bartenders must be valid MongoDB ObjectIds'),
];

// Create a bartending company
router.post('/', 
    upload.single('logo'), // Add the multer middleware for handling file uploads
    companyValidationRules,
    handleValidationErrors,
    async (req, res) => {
    try {
      const company = new BartendingCompany({ ...req.body });
      await company.save();

      if (req.file) {
        company.logoUrl = await uploadImage(company._id, req.file, 'company-logos');
        await company.save();
      }

      res.status(201).json(company);
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ error: error.message });
    }
});


// Get a specific bartending company by ID
router.get('/:id', async (req, res) => {
    try {
      const company = await BartendingCompany.findById(req.params.id);
      if (!company) {
        return res.status(404).json({ error: 'Company not found' });
      }
      res.json(company);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});
  
const updateCompanyValidationRules = [
    body('name').optional().notEmpty().withMessage('Name cannot be empty'),
    body('email')
      .optional()
      .isEmail()
      .withMessage('Email must be a valid email address')
      .normalizeEmail(),
    body('admin')
      .optional()
      .notEmpty()
      .withMessage('Admin cannot be empty')
      .isMongoId()
      .withMessage('Admin must be a valid ObjectId'),
    body('bartenders')
      .optional()
      .isArray()
      .withMessage('Bartenders must be an array of ObjectIds')
      .custom((value) => {
        const isValid = value.every((id) => mongoose.Types.ObjectId.isValid(id));
        return isValid;
      })
      .withMessage('Bartenders must be valid MongoDB ObjectIds'),
];
  
// Update a bartending company by ID
router.put('/:id',
    updateCompanyValidationRules,
    handleValidationErrors,
    async (req, res) => {
      try {
        let updateData = req.body;

        if (req.file) {
          updateData.logoUrl = await uploadImage(req.params.id, req.file, 'company-logos');
        }

        const company = await BartendingCompany.findByIdAndUpdate(req.params.id, updateData, {
          new: true,
          runValidators: true,
        });
        
        if (!company) {
            return res.status(404).json({ error: 'Company not found' });
        }
        res.json(company);
        } catch (error) {
        res.status(400).json({ error: error.message });
        }
});
  
  // Delete a bartending company by ID
router.delete('/:id', async (req, res) => {
    try {
      const company = await BartendingCompany.findByIdAndDelete(req.params.id);
      if (!company) {
        return res.status(404).json({ error: 'Company not found' });
      }
      res.json({ message: 'Company deleted' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});


const companyFilterRules = [
    query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
    query('limit').optional().isInt({ min: 1 }).withMessage('Limit must be a positive integer'),
    query('name').optional().trim().escape(),
    query('email').optional().isEmail().withMessage('Email must be a valid email address').normalizeEmail(),
    query('admin').optional().notEmpty().isMongoId().withMessage('Admin must be a valid ObjectId'),
    query('bartenders')
        .optional()
        .isArray()
        .withMessage('Bartenders must be an array of ObjectIds')
        .custom((value) => {
            const isValid = value.every((id) => mongoose.Types.ObjectId.isValid(id));
            return isValid;
        })
        .withMessage('Bartenders must be valid MongoDB ObjectIds'),
];


// Get all bartending companies (with optional filtering)
router.get(
    '/',
    companyFilterRules,
    handleValidationErrors,
    async (req, res) => {
        const {
            page = 1,
            limit = 10,
            name,
            email,
            admin,
            bartenders,
        } = req.query;


        // Convert page and limit to numbers
        const pageNumber = parseInt(page);
        const limitNumber = parseInt(limit);
        
        const filter = {};
        if (name) filter.name = name;
        if (email) filter.email = email;
        if (admin) filter.admin = admin;
        if (bartenders) {
            filter.bartenders = { $in: bartenders.map(id => mongoose.Types.ObjectId(id)) };
        };

        try {
            const companies = await BartendingCompany.find(filter)
                .skip((pageNumber - 1) * limitNumber)
                .limit(limitNumber);
            res.json(companies);
        } catch (error) {
            res.status(500).json({ error: error.message });
            }
        }
);


const addBartenderValidationRules = [
    param('id')
      .notEmpty()
      .withMessage('Company ID is required')
      .isMongoId()
      .withMessage('Company ID must be a valid ObjectId'),
    body('bartenderId')
      .notEmpty()
      .withMessage('Bartender ID is required')
      .isMongoId()
      .withMessage('Bartender ID must be a valid ObjectId'),
];


router.put(
    '/:id/add-bartender',
    addBartenderValidationRules,
    handleValidationErrors,
    async (req, res) => {
      try {
        const { id } = req.params;
        const { bartenderId } = req.body;
  
        // Verify if the company exists
        const company = await BartendingCompany.findById(id);
        if (!company) {
          return res.status(404).json({ error: 'Company not found' });
        }
  
        // Append the bartender ID to the bartenders list if not already present
        if (!company.bartenders.includes(bartenderId)) {
          company.bartenders.push(bartenderId);
          await company.save();
        }
  
        res.json(company);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
);

router.put(
    '/:id/remove-bartender',
    addBartenderValidationRules, // Reuse the same validation rules
    handleValidationErrors,
    async (req, res) => {
        try {
        const { id } = req.params;
        const { bartenderId } = req.body;

        // Verify if the company exists
        const company = await BartendingCompany.findById(id);
        if (!company) {
            return res.status(404).json({ error: 'Company not found' });
        }

        // Remove the bartender ID from the bartenders list if it's present
        const bartenderIndex = company.bartenders.indexOf(bartenderId);
        if (bartenderIndex !== -1) {
            company.bartenders.splice(bartenderIndex, 1);
            await company.save();
        }

        res.json(company);
        } catch (error) {
        res.status(500).json({ error: error.message });
        }
    }
);

export { router as bartendingCompanyRoutes };