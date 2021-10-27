import { Request, Response } from 'express';
import { CreateMessageService } from "../services/CreateMessageService";
class CreateMessageController {
    async handler(req: Request, res: Response) {
        const { text } = req.body;
        const { user_id } = req;

        const createMessageService = new CreateMessageService();
        const message = await createMessageService.execute(text, user_id);

        res.status(201).json(message);
    }
}

export { CreateMessageController }