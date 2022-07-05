"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class Token {
    constructor() { }
    // payload son como los claims de c#, la informacion que esta en el token
    static getJwtToken(payload) {
        return jsonwebtoken_1.default.sign({
            user: payload
        }, this.seed, { expiresIn: this.expires });
    }
    ;
    static validateToken(userToken) {
        return new Promise((resolve, reject) => {
            jsonwebtoken_1.default.verify(userToken, this.seed, (err, decoded) => {
                if (err) {
                    reject();
                }
                else {
                    resolve(decoded); //devuelve el token decodificado
                }
            });
        });
    }
}
exports.default = Token;
Token.seed = 'esta es la frase secreta de la aplicacion';
Token.expires = '1d';
