import { Request, Response, Router } from "express";
import { Peliculas } from "../models/pelicula.model";

const peliculasRoute = Router();

peliculasRoute.post('/', (req: Request, res: Response) => {

    const pelicula = {
        name: req.body.name,
        poster: req.body.poster,
        year: req.body.year
    }

    Peliculas.create(pelicula)
        .then(peliculaDb => {
            res.json({
                ok: true,
                msj: peliculaDb
            })
        }).catch(err => {
            res.json({
                ok: false,
                err
            })
        })


})

export default peliculasRoute;