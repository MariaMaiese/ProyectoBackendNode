import express from 'express'

//clase que tendra la definicion del servidor

export default class Server {

    public app: express.Application;
    public port: number = 3000;

    constructor() {
        this.app = express();
    }


    //metodo para inicializar el servidor
    Start(callback: Function) {
        this.app.listen(this.port, callback())
    }
}