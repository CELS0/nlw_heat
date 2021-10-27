import { client } from "../prisma"

class GetLast3MessagesService {
async execute(){
    const messages = await  client.message.findMany({
        take: 3,
        orderBy: {
            created_at: 'desc',
        },
        include:{
            user: true,
        },
    });
    return messages;
}

}

export { GetLast3MessagesService }