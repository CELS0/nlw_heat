import { Request, Response } from 'express';
import { AutheticateUserService } from "../services/AutheticateUserService";


class AuthenticateUserController {
    async handle(req: Request, res: Response) {
        const { code } = req.body;

        const autheticateUserService = new AutheticateUserService();
        try {
            const result = await autheticateUserService.execute(code);

            res.status(200).json(result);
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
}

export { AuthenticateUserController }