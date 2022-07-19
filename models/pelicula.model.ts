import { Document, model, Schema } from "mongoose";

const peliculaSchema = new Schema({
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

interface Ipelicula extends Document {
    name: string,
    poster: string,
    year: number
}

export const Peliculas = model<Ipelicula>('Peliculas', peliculaSchema)