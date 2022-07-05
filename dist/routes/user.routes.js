"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_model_1 = require("../models/user.model");
const token_1 = __importDefault(require("../classes/token"));
const auth_1 = require("../middlewares/auth");
const userRoutes = (0, express_1.Router)();
userRoutes.post('/', (req, res) => {
    const user = {
        nombre: req.body.nombre,
        email: req.body.email,
        password: req.body.password
        //password : bcrypt.hashSync( req.body.password,10)
    };
    user_model_1.User.create(user)
        //promesa
        .then(userDb => {
        const token = token_1.default.getJwtToken({
            _id: userDb._id,
            nombre: userDb.nombre,
            email: userDb.email
        });
        res.json({
            ok: true,
            token: token
        });
    }).catch(err => {
        res.json({
            ok: false,
            err
        });
    });
});
userRoutes.post('/login', (req, res) => {
    // capturamos el body de la peticion
    const body = req.body;
    user_model_1.User.findOne({ email: body.email }, (err, userDb) => {
        if (err) {
            res.json({
                ok: false,
                err
            });
        }
        else {
            if (!userDb) {
                res.json({
                    ok: false,
                    msj: 'Usuario o contraseña incorrectos'
                });
            }
            else {
                if (userDb.checkPassword(body.password)) {
                    const token = token_1.default.getJwtToken({
                        _id: userDb._id,
                        nombre: userDb.nombre,
                        email: userDb.email
                    });
                    res.json({
                        ok: true,
                        token: token
                    });
                }
                else {
                    res.json({
                        ok: false,
                        msj: 'Usuario o contraseña incorrectos'
                    });
                }
            }
        }
    });
});
//esta ruta esta protegida con el middleware de autenticacion
userRoutes.put('/update', [auth_1.Authentication], (req, res) => {
    const user = {
        nombre: req.body.nombre || req.user.nombre,
        email: req.body.email || req.user.email
    };
    //new true para que lo actualice todo, trae el id del token por medio del req
    user_model_1.User.findByIdAndUpdate(req.user._id, user, { new: true }, (err, userDb) => {
        if (err)
            throw err;
        if (!userDb) {
            return res.json({
                ok: false,
                msj: 'No existe el usuario'
            });
        }
        const token = token_1.default.getJwtToken({
            _id: userDb._id,
            nombre: userDb.nombre,
            email: userDb.email
        });
        res.json({
            ok: true,
            token: token
        });
    });
});
exports.default = userRoutes;
