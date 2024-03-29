"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const genero_routes_1 = __importDefault(require("./routes/genero.routes"));
const role_routes_1 = __importDefault(require("./routes/role.routes"));
const seedDb_1 = __importDefault(require("./classes/seedDb"));
const file_routes_1 = __importDefault(require("./routes/file.routes"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const server = new server_1.default(); //instanciamos el objeto de la clase server
server.app.use((0, cors_1.default)());
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
server.app.use((0, express_fileupload_1.default)());
server.app.use('/', default_routes_1.default);
server.app.use('/user', user_routes_1.default);
server.app.use('/peliculas', pelicula_routes_1.default);
server.app.use('/gifs', gif_routes_1.default);
server.app.use('/generos', genero_routes_1.default);
server.app.use('/roles', role_routes_1.default);
server.app.use('/files', file_routes_1.default);
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
server.Start(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Servidor corriendo en puerto: ${server.port}`);
    yield seedDb_1.default.seedRole();
}));
