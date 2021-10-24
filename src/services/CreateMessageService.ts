import { Message } from "@prisma/client";
import { client } from "../prisma";

class CreateMessageService{
    async execute(text: string, user_id: string): Promise<Message>{
        const message = await client.message.create({
            data:{
                text,
                user_id
            },
            include:{
                user: true,
            }
        })

        return message
    }
}

export {CreateMessageService}