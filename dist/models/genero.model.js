"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Generos = void 0;
const mongoose_1 = require("mongoose");
const generoSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'El nombre es requerido']
    },
    gifs: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Gif'
        }]
});
exports.Generos = (0, mongoose_1.model)('Generos', generoSchema);
