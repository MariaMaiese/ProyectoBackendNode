"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
//colecciones = tablas pero en bd no relacional
//esta es la estructura de nuestra coleccion en mongoose
const userSchema = new mongoose_1.Schema({
    name: {
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
    },
    roles: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Role'
        }]
});
userSchema.method('checkPassword', function (password = '') {
    // if (bcrypt.compareSync(password, this.password)) {
    //   return true;
    //} else {
    //  return false;
    //}
    if (password == this.password) {
        return true;
    }
    else {
        return false;
    }
});
exports.User = (0, mongoose_1.model)('User', userSchema);
