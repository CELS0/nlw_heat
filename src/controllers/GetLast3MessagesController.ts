import { Request, Response} from 'express';
import { GetLast3MessagesService } from "../services/GetLast3MessagesService";

class GetLast3MessagesController {
    async hanher(req: Request, res: Response) {
        const getLast3MessagesService = new GetLast3MessagesService();
    
        const messages = await getLast3MessagesService.execute();

        res.status(200).json(messages);
    }
}

export { GetLast3MessagesController }