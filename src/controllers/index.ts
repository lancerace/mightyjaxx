import express from "express";
import ProductController from './product';
import UserController from './user';
import auth from '../middlewares/authentication';
const router: express.Router = express.Router();

router.use("/products", auth, ProductController);
router.use("/users", UserController);

export default router;

