import express from 'express';
import { IUser } from '../interfaces/user';
import UserService from '../services/user';
import AuthUtil from '../utils/auth'
    ; import bcrypt from 'bcryptjs';
const router: express.Router = express.Router();

router.post('/login', async (req: express.Request, res: express.Response, next) => {
    try {
        let isPasswordCorrect: boolean = false;
        const { email, password } = req.body;

        const user: IUser = await UserService.getUser({ email });
        if (user)
            isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect)
            return res.status(400).send({ message: "invalid username or password", success: false });

        const accessToken = await AuthUtil.issueAccessToken(email, password);
        return res.json({ accessToken, success: true });
    } catch (err) {
        next(err.message);
    }
});


router.post('/register', async (req: express.Request, res: express.Response, next) => {
    try {
        const { email, password } = req.body;
        const user: IUser = await UserService.addUser(email, password);
        (user) ? res.json({ success: true }) : res.json({ success: false })
    } catch (err) {
        next(err.message);
    }
})


export default router;