import express from 'express';
import { UpdateResult, DeleteResult } from "mongodb";
import { IProduct } from '../interfaces/product';
import ProductService from '../services/product';
const router: express.Router = express.Router();

router.get('/', async (req: express.Request, res: express.Response) => {
    try {
        const { limit, skip } = req.query;
        const products: IProduct[] = await ProductService.getProducts(limit, skip);
        return (products.length > 0) ? res.json({ success: true, products }) : res.json({ success: false });
    } catch (err) {
        throw err;
    }
});

router.post('/', async (req: express.Request, res: express.Response) => {
    try {
        const { title, imageUrl } = req.body;
        const product: IProduct = await ProductService.addProduct(title, imageUrl);
        return (product) ? res.status(201).send({ success: true }) : res.json({ success: false })
    } catch (err) {
        throw err;
    }
});

router.put('/:sku', async (req: express.Request, res: express.Response) => {
    try {
        const { sku } = req.params;
        const { title, imageUrl } = req.body;
        const product: IProduct = await ProductService.updateProduct(sku, { title, imageUrl });
        return (product) ? res.status(200).send({ success: true }) : res.json({ success: false })
    } catch (err) {
        throw err;
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
