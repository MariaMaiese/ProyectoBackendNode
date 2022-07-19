"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gif = void 0;
const mongoose_1 = require("mongoose");
const gifSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'El nombre es requerido']
    },
    imagen: {
        type: String,
        required: [true, 'La imagen es requerida']
    },
    generos: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Generos'
        }]
});
exports.Gif = (0, mongoose_1.model)('Gif', gifSchema);
