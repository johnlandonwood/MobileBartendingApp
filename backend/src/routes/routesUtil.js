import { blobServiceClient } from "../../azureBlobStorage.js";
import { validationResult } from "express-validator";


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


