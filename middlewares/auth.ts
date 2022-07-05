import { NextFunction, Request, Response } from "express";
import Token from "../classes/token";

export const Authentication = (req: any, res: Response, next: NextFunction) => {
    const userToken = req.get('x-token') || '';

    Token.validateToken(userToken)
        .then((decoded: any) => {//es una promesa, por eso el .then
            console.log('Decoded', decoded);
            req.user = decoded.user;
            next(); //sigue la ejecucion de lo que se esta ejecutando
        }).catch(err => {
            res.json({
                ok: false,
                msj: "token invalido"
            })
        })
}