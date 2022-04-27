import express from "express";
import AuthUtil from '../utils/auth';
const router: express.Router = express.Router();


router.use(async (req, res, next) => {
    const result = await AuthUtil.authenticate(req.headers.authorization);
    if (!result.success) {
        res.status(401).send({ message: result.message });
    }
    else
        next();
})

export default router;