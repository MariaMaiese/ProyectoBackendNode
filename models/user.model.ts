import { Document, model, Schema } from "mongoose";
import bcrypt from 'bcrypt';

//colecciones = tablas pero en bd no relacional
//esta es la estructura de nuestra coleccion en mongoose
const userSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es requerido']
    },

    email: {
        type: String,
        unique: true,
        required: [true, 'El email es requerido']
    },

    password: {
        type: String,
        required: [true, 'El password es requerido']
    }
})

userSchema.method('checkPassword', function (password: string = ''): boolean {
    // if (bcrypt.compareSync(password, this.password)) {
    //   return true;
    //} else {
    //  return false;
    //}
    if (password == this.password) {
        return true
    } else {
        return false
    }

})

//interfaz para trabajarlo en typescript
interface IUser extends Document {
    nombre: string;
    email: string;
    password: string;

    checkPassword(password: string): boolean;
}

export const User = model<IUser>('Users', userSchema);