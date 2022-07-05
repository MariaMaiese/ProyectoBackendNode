import { Document, model, Schema } from "mongoose";

const gifSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre es requerido']
    },
    imagen: {
        type: String,
        required: [true, 'La imagen es requerida']
    }
});

interface Igif extends Document {
    name: string,
    imagen: string
}

export const Gif = model<Igif>('Gifs', gifSchema)