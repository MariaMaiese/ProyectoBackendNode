import { Request, Response, Router } from "express";
import { Gif } from "../models/gif.model";

const gifsRoute = Router();

gifsRoute.get('/', async (req: Request, res: Response) => {

    const gifs = await Gif.find().populate('generos').exec();
    res.json({
        ok: true,
        gifs
    })
})

gifsRoute.post('/', (req: Request, res: Response) => {
    const gif = {
        name: req.body.name,
        imagen: req.body.imagen,
        generos: req.body.generos
    }

    const arrGeneros = gif.generos.split(",");

    gif.generos = arrGeneros;

    Gif.create(gif)
        .then(gifDb => {
            res.json({
                ok: true,
                msj: gifDb
            })
        }).catch(err => {
            res.json({
                ok: false,
                err
            })
        })


})

export default gifsRoute;