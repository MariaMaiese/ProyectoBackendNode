"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pelicula_model_1 = require("../models/pelicula.model");
const peliculasRoute = (0, express_1.Router)();
peliculasRoute.post('/', (req, res) => {
    const pelicula = {
        name: req.body.name,
        poster: req.body.poster,
        year: req.body.year
    };
    pelicula_model_1.Peliculas.create(pelicula)
        .then(peliculaDb => {
        res.json({
            ok: true,
            msj: peliculaDb
        });
    }).catch(err => {
        res.json({
            ok: false,
            err
        });
    });
});
exports.default = peliculasRoute;
