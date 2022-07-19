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
const adminAuth_1 = require("../middlewares/adminAuth");
const auth_1 = require("../middlewares/auth");
const genero_model_1 = require("../models/genero.model");
const generoRoutes = (0, express_1.Router)();
generoRoutes.get('/', [auth_1.Authentication, adminAuth_1.adminAuthentication], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let perPage = 5; //cuantos registros quiero por pagina
    let page = Number(req.query.page) || 1; //paginas
    let sort = String(req.query.sort);
    let skip = page - 1; //ccuantos registros vamos a saltar
    skip = skip * perPage;
    let totalDocs = yield genero_model_1.Generos.count(); //registros son documentos en mongo
    let totalPages = Math.ceil(totalDocs / perPage);
    const generos = yield genero_model_1.Generos.find().limit(perPage).skip(skip).sort({ name: sort == 'asc' ? 1 : -1 }).exec();
    res.json({
        ok: true,
        generos,
        totalPages
    });
}));
generoRoutes.get('/search', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const searchText = String(req.query.searchText);
    var generos = yield genero_model_1.Generos.find({ 'name': { '$regex': searchText, '$options': 'i' } }).exec(); //busca el item que estamos mandando en texto
    res.json({
        ok: true,
        generos
    });
}));
generoRoutes.get('/byid/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (!id) {
        res.json({
            ok: false,
            msj: "No se encuentra el id"
        });
        return;
    }
    const generoDb = yield genero_model_1.Generos.findById(id).exec();
    if (!generoDb) {
        res.json({
            ok: false,
            error: "el genero no existe"
        });
        return;
    }
    res.json({
        ok: true,
        generoDb
    });
    return;
}));
generoRoutes.post('/', (req, res) => {
    const genero = {
        name: req.body.name
    };
    genero_model_1.Generos.create(genero)
        .then(generodb => {
        res.json({
            ok: true,
            msj: generodb
        });
    }).catch(err => {
        res.json({
            ok: false,
            err
        });
    });
});
generoRoutes.put('/:id', (req, res) => {
    const generoId = req.params.id;
    const genero = {
        name: req.body.name
    };
    genero_model_1.Generos.findByIdAndUpdate(generoId, genero)
        .then(generoDb => {
        res.json({
            ok: true,
            generoDb
        });
    });
});
generoRoutes.delete('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.id;
    yield genero_model_1.Generos.findByIdAndDelete(id);
    res.json({
        ok: true,
        id
    });
}));
exports.default = generoRoutes;
