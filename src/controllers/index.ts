import express from "express";
import ProductController from './product';
import UserController from './user';
const router: express.Router = express.Router();

router.use("/products", ProductController);
router.use("/users", UserController);

export default router;

