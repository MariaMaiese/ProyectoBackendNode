"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Peliculas = void 0;
const mongoose_1 = require("mongoose");
const peliculaSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'El nombre es requerido']
    },
    poster: {
        type: String,
        required: [true, 'El poster es requerido']
    },
    year: {
        type: Number,
        required: [true, 'El año es requerido']
    }
});
exports.Peliculas = (0, mongoose_1.model)('Peliculas', peliculaSchema);
