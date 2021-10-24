import { Request, Response } from 'express';
import { CreateMessageService } from "../services/CreateMessageService";
import { Message } from "@prisma/client";

class CreateMessageController {
    async handler(req: Request, res: Response){
        const { text, user_id } = req.body;

        const createMessageService = new CreateMessageService();
        const message = await createMessageService.execute(text, user_id);

        res.status(201).json(message);
    }
}

export { CreateMessageController }