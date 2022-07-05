"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authentication = void 0;
const token_1 = __importDefault(require("../classes/token"));
const Authentication = (req, res, next) => {
    const userToken = req.get('x-token') || '';
    token_1.default.validateToken(userToken)
        .then((decoded) => {
        console.log('Decoded', decoded);
        req.user = decoded.user;
        next(); //sigue la ejecucion de lo que se esta ejecutando
    }).catch(err => {
        res.json({
            ok: false,
            msj: "token invalido"
        });
    });
};
exports.Authentication = Authentication;
