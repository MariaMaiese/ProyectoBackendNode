"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const server_1 = __importDefault(require("./classes/server"));
const default_routes_1 = __importDefault(require("./routes/default.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const cors_1 = __importDefault(require("cors"));
const pelicula_routes_1 = __importDefault(require("./routes/pelicula.routes"));
const gif_routes_1 = __importDefault(require("./routes/gif.routes"));
const server = new server_1.default(); //instanciamos el objeto de la clase server
server.app.use((0, cors_1.default)());
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
server.app.use('/', default_routes_1.default);
server.app.use('/user', user_routes_1.default);
server.app.use('/peliculas', pelicula_routes_1.default);
server.app.use('/gifs', gif_routes_1.default);
//si el formato del body es json, lo desencripttará y lo transforma en json
//conexion a la bd de mongo
mongoose_1.default.connect('mongodb://localhost:27017/bdaiepflix', (error) => {
    //error de conexion
    if (error) {
        throw error;
    }
    console.log('Base de datos online');
});
//inicializando servidor
server.Start(() => {
    console.log(`Servidor corriendo en puerto: ${server.port}`);
});