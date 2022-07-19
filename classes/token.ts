import jwt from 'jsonwebtoken'
import { User } from '../models/user.model';

export default class Token {
    private static seed: string = 'esta es la frase secreta de la aplicacion';
    private static expires: string = '1d';

    constructor() { }
    // payload son como los claims de c#, la informacion que esta en el token
    static getJwtToken(payload: any) {
        return jwt.sign({
            user: payload
        }, this.seed, { expiresIn: this.expires })
    };

    static validateToken(userToken: string) {
        return new Promise((resolve, reject) => {
            jwt.verify(userToken, this.seed, (err, decoded) => {
                if (err) {
                    reject();

                } else {
                    resolve(decoded); //devuelve el token decodificado
                }
            })
        })
    }

    static async validateAdmin(userToken: string) {
        return new Promise((resolve, reject) => {
            this.validateToken(userToken).then(async (decoded: any) => {
                var user = await User.findById(decoded.user._id).populate('roles')

                if (user) {
                    if (user.roles.length > 0) {
                        var roleAdmin = user.roles.find((x: any) => x.name == 'administrador');
                        if (roleAdmin) {
                            resolve(true);
                        } else {
                            reject();
                        }
                    }
                }
            })
        })
    }
}