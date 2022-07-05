"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const gif_model_1 = require("../models/gif.model");
const gifsRoute = (0, express_1.Router)();
gifsRoute.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const gifs = yield gif_model_1.Gif.find().exec();
    res.json({
        ok: true,
        gifs
    });
}));
gifsRoute.post('/', (req, res) => {
    const gif = {
        name: req.body.name,
        imagen: req.body.imagen
    };
    gif_model_1.Gif.create(gif)
        .then(gifDb => {
        res.json({
            ok: true,
            msj: gifDb
        });
    }).catch(err => {
        res.json({
            ok: false,
            err
        });
    });
});
exports.default = gifsRoute;
