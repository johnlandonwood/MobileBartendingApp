import { blobServiceClient } from "../azureBlobStorage.js";
import { validationResult } from "express-validator";

import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import dotenv from "dotenv";


// Error handling middleware
export const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("validation error: " + JSON.stringify(errors.array()));
      return res.status(400).json({ errors: errors.array() });
    }
    next();
};

export async function deleteOldImages(companyId, containerClient) {
  try {
    const blobs = containerClient.listBlobsFlat({ prefix: `${companyId}.` });
    for await (const blob of blobs) {
      await containerClient.deleteBlob(blob.name);
    }
  } catch (error) {
    console.error(`Error deleting old images for company ID ${companyId}:`, error.message);
  }
}


export async function uploadImage(uuid, file, containerName) {
    const containerClient = blobServiceClient.getContainerClient(containerName);
  
    await deleteOldImages(uuid, containerClient);
  
    const filename = `${uuid}.${file.mimetype.split('/')[1]}`;
    const blockBlobClient = containerClient.getBlockBlobClient(filename);
    await blockBlobClient.upload(file.buffer, file.size);
    return blockBlobClient.url;
}


export async function deleteDBObject(ItemClass, name, req, res) {
    try {
      const obj = await ItemClass.findByIdAndDelete(req.params.id);
      if (!obj) {
        return res.status(404).json({ error: `${name} not found`});
      }
      res.json({ message: `${name} deleted` });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

export const authenticate = async (req, res, next) => {
  try {
    let token = req.header('Authorization');

    if (!token) {
      console.log('No token provided. Access denied.');
      return res.status(401).json({ message: 'No token provided. Access denied.' });
    }

    token = token.replace('Bearer ', '');

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace with your JWT secret key
      const user = await User.findById(decoded.id);

      if (!user) {
        console.log('Invalid token. Access denied.');
        return res.status(401).json({ message: 'Invalid token. Access denied.' });
      }

      req.user = user;
      next();
    } catch (error) {
      console.error('JWT verification error:', error);
      if (error instanceof jwt.TokenExpiredError) {
        res.status(401).json({ message: 'Token has expired. Access denied.' });
      } else if (error instanceof jwt.JsonWebTokenError) {
        res.status(401).json({ message: 'Invalid token. Access denied.' });
      } else {
        res.status(401).json({ message: 'Access denied.' });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Invalid token. Access denied.' });
  }
};

