import { NextFunction } from "express";
import Token from "../classes/token";

export const adminAuthentication = async (req: any, res: any, next: NextFunction) => {
    const userToken = req.get('x-token') || '';

    await Token.validateToken(userToken)
        .then(async (decoded: any) => {
            next();
        }).catch(err => {
            res.json({
                ok: true
            })
        })
}