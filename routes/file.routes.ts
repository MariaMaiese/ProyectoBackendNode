import { Request, Response, Router } from "express";
import FileSystem from "../classes/file-system";
import { fileUpload } from "../interfaces/file-upload";
import { adminAuthentication } from "../middlewares/adminAuth";


const filesRoutes = Router();
const fileSystem = new FileSystem();
const folder: string = 'actores'

filesRoutes.post('/', [adminAuthentication], async (req: any, res: Response) => {

    if (!req.files) {
        return res.status(400).json({
            ok: false,
            msj: "No se subio la imagen"
        })
    }

    const file: fileUpload = req.files.image;

    if (!file) {
        return res.status(400).json({
            ok: false,
            msj: "no se adjunto la imagen"
        })
    }

    if (!file.mimetype.includes('image')) {
        return res.status(400).json({
            ok: false,
            msj: "no se subio una imagen"
        })
    }

    var fileName = await fileSystem.saveImage(file, folder, req.user._id)

    res.json({
        ok: true,
        files: fileName
    })
})

filesRoutes.get('/tempimagen/:userId/:img', (req: any, res: Response) => {
    const userId = req.params.userId
    const img = req.params.img;
    const pathImg = fileSystem.getTmpImgUrl(userId, img);
    res.sendFile(pathImg);
})

export default filesRoutes;