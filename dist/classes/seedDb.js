"use strict";
//setear el usuario admin para la bd
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const role_model_1 = require("../models/role.model");
const user_model_1 = require("../models/user.model");
class SeedDb {
    static seedRole() {
        return __awaiter(this, void 0, void 0, function* () {
            var roleAdmin = yield role_model_1.Role.findOne({ name: 'administrador' }).exec(); //va a buscar un rol de administrador en la bd
            var users = yield user_model_1.User.find().exec(); //va a buscar el listado de usuarios en la bd
            if (!roleAdmin) {
                var newRole = yield this.createAdminRole();
                if (users.length == 0) {
                    yield this.createAdminUser(newRole);
                }
                return;
            }
            if (users.length == 0) {
                yield this.createAdminUser(roleAdmin);
            }
        });
    }
    static createAdminRole() {
        return __awaiter(this, void 0, void 0, function* () {
            var newRoleAdmin = {
                name: 'administrador'
            };
            var newRole = yield role_model_1.Role.create(newRoleAdmin);
            return newRole;
        });
    }
    static createAdminUser(role) {
        return __awaiter(this, void 0, void 0, function* () {
            var newAdminToSeed = {
                name: 'Daniela Maiese',
                email: 'daniela@correo.com',
                password: '123456',
                roles: [role._id]
            };
            yield user_model_1.User.create(newAdminToSeed);
        });
    }
}
exports.default = SeedDb;
