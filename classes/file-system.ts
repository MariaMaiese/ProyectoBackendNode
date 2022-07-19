import { fileUpload } from "../interfaces/file-upload";
import path from 'path';
import fs from 'fs';
import uniqid from 'uniqid';



export default class FileSystem {
    constructor() { }
    saveImage(file: fileUpload, folder: string, userId: string) {

        return new Promise((resolve, reject) => {
            const path = this.CreateFolder(folder, userId);

            //generar nombre unico para cada imagen
            const fileName = this.GenFileName(file.name);

            const imagesInTemp = this.readTemp(userId);

            imagesInTemp.forEach(image => {
                fs.unlink(`${path}/${image}`, (err: any) => {
                    if (err) console.log; //eliminando todo lo que hay en la carpeta temp

                })
            })

            file.mv(`${path}/${fileName}`, (err: any) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(fileName);
                }
            });


        })
    }

    private CreateFolder(folder: string, userId: string) {
        const pathFolder = path.resolve(__dirname, '../images/', folder) //folder va a ser actores o peliculas, dependiendo
        const temporalPath = path.resolve(__dirname, '../temp/', userId) //path temporal para que cada usuario tengasu propia carpeta temporal

        const exist = fs.existsSync(temporalPath);
        if (!exist) {
            fs.mkdirSync(pathFolder);
            fs.mkdirSync(temporalPath);
        }

        return temporalPath;
    }

    private GenFileName(originalName: string) {
        const nameArray = originalName.split('.') //se toma l nombre y se separa con el split
        const extension = nameArray[nameArray.length - 1] //almacenamos la extension
        const uniqName = uniqid();

        return `${uniqName}.${extension}` //devolvemos el nombre unico con la extension
    }

    private readTemp(userId: string) {
        const temporalPath = path.resolve(__dirname, '../temp/', userId) //path temporal para que cada usuario tengasu propia carpeta temporal
        return fs.readdirSync(temporalPath);
    }
    //traer la url de la img temp
    public getTmpImgUrl(userId: string, img: string) {
        const pathImg = path.resolve(__dirname, '../temp/', userId, img)
        const exist = fs.existsSync(pathImg);
        if (!exist) {
            return path.resolve(__dirname, '../assets/', '400x250.jpg');
        }

        return pathImg;
    }

}