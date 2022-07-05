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
    }
});
exports.Gif = (0, mongoose_1.model)('Gifs', gifSchema);
