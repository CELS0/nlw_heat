import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken"

interface IPayload {
    sub: string;
}

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
    const authToken = req.headers.authorization;

    if (!authToken) {
        return res.status(401).json({
            message: "Unauthorized"
        })
    }

    const [, token] = authToken.split(" ");

    try {
     const {sub} =  verify(token, process.env.SECRET_KEY) as IPayload;

     req.user_id = sub;

        return next();
    } catch (err) {
        res.status(401).json({
            message: "Token invalid"
        })
    }
}