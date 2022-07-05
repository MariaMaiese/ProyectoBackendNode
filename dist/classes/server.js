"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//clase que tendra la definicion del servidor
class Server {
    constructor() {
        this.port = 3000;
        this.app = (0, express_1.default)();
    }
    //metodo para inicializar el servidor
    Start(callback) {
        this.app.listen(this.port, callback());
    }
}
exports.default = Server;
