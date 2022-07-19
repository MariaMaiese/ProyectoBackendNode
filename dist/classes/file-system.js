"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const uniqid_1 = __importDefault(require("uniqid"));
class FileSystem {
    constructor() { }
    saveImage(file, folder, userId) {
        return new Promise((resolve, reject) => {
            const path = this.CreateFolder(folder, userId);
            //generar nombre unico para cada imagen
            const fileName = this.GenFileName(file.name);
            const imagesInTemp = this.readTemp(userId);
            imagesInTemp.forEach(image => {
                fs_1.default.unlink(`${path}/${image}`, (err) => {
                    if (err)
                        console.log; //eliminando todo lo que hay en la carpeta temp
                });
            });
            file.mv(`${path}/${fileName}`, (err) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                else {
                    resolve(fileName);
                }
            });
        });
    }
    CreateFolder(folder, userId) {
        const pathFolder = path_1.default.resolve(__dirname, '../images/', folder); //folder va a ser actores o peliculas, dependiendo
        const temporalPath = path_1.default.resolve(__dirname, '../temp/', userId); //path temporal para que cada usuario tengasu propia carpeta temporal
        const exist = fs_1.default.existsSync(temporalPath);
        if (!exist) {
            fs_1.default.mkdirSync(pathFolder);
            fs_1.default.mkdirSync(temporalPath);
        }
        return temporalPath;
    }
    GenFileName(originalName) {
        const nameArray = originalName.split('.'); //se toma l nombre y se separa con el split
        const extension = nameArray[nameArray.length - 1]; //almacenamos la extension
        const uniqName = (0, uniqid_1.default)();
        return `${uniqName}.${extension}`; //devolvemos el nombre unico con la extension
    }
    readTemp(userId) {
        const temporalPath = path_1.default.resolve(__dirname, '../temp/', userId); //path temporal para que cada usuario tengasu propia carpeta temporal
        return fs_1.default.readdirSync(temporalPath);
    }
    //traer la url de la img temp
    getTmpImgUrl(userId, img) {
        const pathImg = path_1.default.resolve(__dirname, '../temp/', userId, img);
        const exist = fs_1.default.existsSync(pathImg);
        if (!exist) {
            return path_1.default.resolve(__dirname, '../assets/', '400x250.jpg');
        }
        return pathImg;
    }
}
exports.default = FileSystem;
