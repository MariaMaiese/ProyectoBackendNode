import { Request, Response, Router } from "express";
import { User } from "../models/user.model";
import bcrypt from 'bcrypt';
import Token from "../classes/token";
import { Authentication } from "../middlewares/auth";

const userRoutes = Router();

userRoutes.post('/', (req: Request, res: Response) => { //lo que recibimos es el req y la respuesta es res

    const user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password

        //password : bcrypt.hashSync( req.body.password,10)
    };

    User.create(user)
        //promesa
        .then((userDb: any) => {
            const token = Token.getJwtToken({
                _id: userDb._id,
                name: userDb.name,
                email: userDb.email,
                role: userDb.roles.length > 0 ? userDb.roles[0].name : 'Usuario'
            })
            res.json({
                ok: true,
                token: token
            })
        }).catch(err => {
            res.json({
                ok: false,
                err
            })
        })
});

userRoutes.post('/login', (req: Request, res: Response) => {
    // capturamos el body de la peticion
    const body = req.body;
    User.findOne({ email: body.email }, (err: any, userDb: any) => {
        if (err) {
            res.json({
                ok: false,
                err
            })
        } else {
            if (!userDb) {
                res.json({
                    ok: false,
                    msj: 'Usuario o contraseña incorrectos'
                })
            } else {
                if (userDb.checkPassword(body.password)) {
                    const token = Token.getJwtToken({
                        _id: userDb._id,
                        name: userDb.name,
                        email: userDb.email,
                        role: userDb.roles.length > 0 ? userDb.roles[0].name : 'Usuario'  //clausula bicondicional
                    })
                    res.json({
                        ok: true,
                        token: token
                    })
                } else {
                    res.json({
                        ok: false,
                        msj: 'Usuario o contraseña incorrectos'
                    })
                }
            }
        }


    }).populate('roles')
});
//esta ruta esta protegida con el middleware de autenticacion
userRoutes.put('/update', [Authentication], (req: any, res: Response) => {
    const user = {
        name: req.body.name || req.user.name,
        email: req.body.email || req.user.email
    }
    //new true para que lo actualice todo, trae el id del token por medio del req
    User.findByIdAndUpdate(req.user._id, user, { new: true }, (err, userDb) => {
        if (err) throw err;
        if (!userDb) {
            return res.json({
                ok: false,
                msj: 'No existe el usuario'
            });
        }
        const token = Token.getJwtToken({
            _id: userDb._id,
            name: userDb.name,
            email: userDb.email
        })
        res.json({
            ok: true,
            token: token
        })
    })



});

userRoutes.get('/checkadmin', [Authentication], async (req: Request, res: Response) => {
    const token = req.get('x-token') || '';
    var resp = await Token.validateAdmin(token);

    res.json({
        ok: true,
        respuesta: resp
    })

})


export default userRoutes;