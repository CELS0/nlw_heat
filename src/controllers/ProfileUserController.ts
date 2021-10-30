import { Request, Response} from 'express';
import { ProfileUserService } from "../services/ProfileUserService"

class ProfileUserController {
    async handler(req: Request, res: Response) {
        const { user_id } = req;

        const profileUserService = new ProfileUserService();

        const user = await profileUserService.execute(user_id)

        res.status(200).json(user);
    }
}

export { ProfileUserController }