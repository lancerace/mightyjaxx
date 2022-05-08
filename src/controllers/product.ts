import express from 'express';
import { UpdateResult, DeleteResult } from "mongodb";
import { IProduct, UploadURL } from '../interfaces/product';
import ProductService from '../services/product';
import fs from 'fs';
const multer = require('multer');
const upload = multer();
const router: express.Router = express.Router();
import AWSUtil from '../utils/aws';

router.get('/', async (req: express.Request, res: express.Response, next) => {
    try {
        const { limit, skip } = req.query;
        let products: IProduct[] = await ProductService.getProducts(limit, skip);

        for (var i = 0; i < products.length; i++) {
            const url = await AWSUtil.generateS3ObjectPresignedURL(`${UploadURL.PRODUCT}/${products[i].fileName}`);
            products[i].fileUrl= url;
        }

        return (products.length > 0) ? res.json({ success: true, products }) : res.json({ success: false });
    } catch (err) {
        next(err.message);
    }
});

router.get('/:sku', async (req: express.Request, res: express.Response, next) => {
    try {
        const { sku } = req.params;
        const product: IProduct = await ProductService.getProduct(sku);
        return (product) ? res.json({ success: true, product }) : res.json({ success: false, product: null });
    } catch (err) {
        next(err.message);
    }
});

router.post('/', upload.single("file"), async (req: express.Request, res: express.Response, next) => {
    try {
        const product: IProduct = await ProductService.addProduct(req.body.title, req.file.originalname, req.file.mimetype);
        await AWSUtil.uploadImage(req.file.buffer,`image`,req.file.originalname); 
        return (product) ? res.status(201).send({ success: true }) : res.json({ success: false })
    } catch (err) {
        next(err.message);
    }
});

router.put('/:sku', async (req: express.Request, res: express.Response, next) => {
    try {
        const { sku } = req.params;
        const { title, imageUrl } = req.body;
        const product: IProduct = await ProductService.updateProduct(sku, { title, imageUrl });
        return (product) ? res.status(200).send({ success: true }) : res.json({ success: false })
    } catch (err) {
        next(err.message);
    }
});

router.delete('/:sku', async (req: express.Request, res: express.Response) => {
    try {
        const { sku } = req.params;
        const result: DeleteResult = await ProductService.deleteProduct(sku);
        return (result.deletedCount > 0) ? res.json({ success: true }) : res.json({ success: false });
    } catch (err) {
        throw err;
    }
});

export default router;
