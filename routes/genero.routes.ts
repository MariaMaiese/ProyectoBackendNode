import { Request, Response, Router } from "express";
import { adminAuthentication } from "../middlewares/adminAuth";
import { Authentication } from "../middlewares/auth";
import { Generos } from "../models/genero.model";

const generoRoutes = Router();

generoRoutes.get('/', [Authentication, adminAuthentication], async (req: Request, res: Response) => {

    let perPage = 5; //cuantos registros quiero por pagina
    let page = Number(req.query.page) || 1; //paginas
    let sort = String(req.query.sort)
    let skip = page - 1;//ccuantos registros vamos a saltar
    skip = skip * perPage;
    let totalDocs = await Generos.count();//registros son documentos en mongo
    let totalPages = Math.ceil(totalDocs / perPage);


    const generos = await Generos.find().limit(perPage).skip(skip).sort({ name: sort == 'asc' ? 1 : -1 }).exec()
    res.json({
        ok: true,
        generos,
        totalPages
    })
})

generoRoutes.get('/search', async (req: Request, res: Response) => {
    const searchText = String(req.query.searchText);
    var generos = await Generos.find({ 'name': { '$regex': searchText, '$options': 'i' } }).exec(); //busca el item que estamos mandando en texto
    res.json({
        ok: true,
        generos
    })
})

generoRoutes.get('/byid/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    if (!id) {
        res.json({
            ok: false,
            msj: "No se encuentra el id"
        })
        return;
    }
    const generoDb = await Generos.findById(id).exec();
    if (!generoDb) {
        res.json({
            ok: false,
            error: "el genero no existe"
        })
        return;
    }

    res.json({
        ok: true,
        generoDb
    })
    return;


})

generoRoutes.post('/', (req: Request, res: Response) => {

    const genero = {
        name: req.body.name
    }

    Generos.create(genero)
        .then(generodb => {
            res.json({
                ok: true,
                msj: generodb
            })
        }).catch(err => {
            res.json({
                ok: false,
                err
            })
        })
})

generoRoutes.put('/:id', (req: Request, res: Response) => {
    const generoId = req.params.id;
    const genero = {
        name: req.body.name
    }

    Generos.findByIdAndUpdate(generoId, genero)
        .then(generoDb => {
            res.json({
                ok: true,
                generoDb
            })
        })

})

generoRoutes.delete('/', async (req: Request, res: Response) => {
    const id = req.query.id
    await Generos.findByIdAndDelete(id);
    res.json({
        ok: true,
        id
    })
})


export default generoRoutes;