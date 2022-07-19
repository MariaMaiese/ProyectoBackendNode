import { Document, model, Schema } from "mongoose";

const generoSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre es requerido']
    },
    gifs: [{
        type: Schema.Types.ObjectId,
        ref: 'Gif'
    }]
});

interface IGenero extends Document {
    name: string
}

export const Generos = model<IGenero>('Generos', generoSchema)