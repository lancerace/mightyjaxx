import express from 'express';
import { IUser } from '../interfaces/user';
import UserService from '../services/user';
import AuthUtil from '../utils/auth'
;import bcrypt from 'bcryptjs';
const router: express.Router = express.Router();

router.post('/login', async (req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body;
        const user: IUser = await UserService.getUser(email, password);
        const isPasswordCorrect: boolean = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect)
            return res.status(400).send({ message: "invalid username or password", success: false });

        const accessToken = await AuthUtil.issueAccessToken(email);
        return res.json({ accessToken, success: true });
    } catch (err) {
        throw err;
    }
});


router.post('/register', async (req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body;
        const user: IUser = await UserService.addUser(email, password);
        (user) ? res.json({ success: true }) : res.json({ success: false })
    } catch (err) {
        throw err
    }
})


export default router;