import axios from 'axios';
import { client } from '../prisma'
import { sign } from 'jsonwebtoken';

interface IAccessToken {
    access_token: string;
}

interface IUserResponse {
    avatar_url: string;
    login: string;
    id: number;
    name: string;
}
class AutheticateUserService {
    async execute(code: string) {
        const url = 'https://github.com/login/oauth/access_token';

        const { data: accessTokenResponse } = await axios.post<IAccessToken>(url, null, {
            params: {
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                code,
            },
            headers: {
                "Accept": 'application/json',
            }
        });

        const response = await axios.get<IUserResponse>('https://api.github.com/user', {
            headers: {
                authorization: `Bearer ${accessTokenResponse.access_token}`
            }
        })

        let { login, id, avatar_url, name } = response.data;
        let user = await client.user.findFirst({
            where: {
                github_id: id,
            }
        })

        if(!name){
            name = 'Celso Jr';
        }

        if (!user) {
            user = await client.user.create({
                data: {
                    name,
                    github_id: id,
                    avatar_url,
                    login,
                }
            })
        }

        const token = sign({
            user: {
                name: user.name,
                avatar_url: user.avatar_url,
                id: user.id,
            }
        },
            process.env.SECRET_KEY,
            {
                subject: user.id,
                expiresIn: '1d'
            }
        )

        return { token, user };
    }
}

export { AutheticateUserService }