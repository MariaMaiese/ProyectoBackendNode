import bodyParser from "body-parser";
import mongoose from "mongoose";
import Server from "./classes/server";
import defaultRoutes from "./routes/default.routes";
import userRoutes from "./routes/user.routes";
import cors from "cors";
import peliculasRoute from "./routes/pelicula.routes";
import gifsRoute from "./routes/gif.routes";

const server = new Server(); //instanciamos el objeto de la clase server
server.app.use(cors());

server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(bodyParser.json());
server.app.use('/', defaultRoutes);
server.app.use('/user', userRoutes);
server.app.use('/peliculas', peliculasRoute);
server.app.use('/gifs', gifsRoute);

//si el formato del body es json, lo desencripttará y lo transforma en json

//conexion a la bd de mongo
mongoose.connect('mongodb://localhost:27017/bdaiepflix', (error) => {
    //error de conexion
    if (error) {
        throw error;
    }
    console.log('Base de datos online');
})

//inicializando servidor
server.Start(() => {
    console.log(`Servidor corriendo en puerto: ${server.port}`)
})

