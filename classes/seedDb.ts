//setear el usuario admin para la bd

import { Role } from "../models/role.model";
import { User } from "../models/user.model";

export default class SeedDb {
    static async seedRole() {
        var roleAdmin = await Role.findOne({ name: 'administrador' }).exec(); //va a buscar un rol de administrador en la bd
        var users = await User.find().exec(); //va a buscar el listado de usuarios en la bd

        if (!roleAdmin) {
            var newRole: any = await this.createAdminRole();


            if (users.length == 0) {
                await this.createAdminUser(newRole)
            }

            return;

        }

        if (users.length == 0) {
            await this.createAdminUser(roleAdmin)
        }
    }

    private static async createAdminRole() {
        var newRoleAdmin = {
            name: 'administrador'
        };

        var newRole = await Role.create(newRoleAdmin);

        return newRole;
    }

    private static async createAdminUser(role: any) {
        var newAdminToSeed = {
            name: 'Daniela Maiese',
            email: 'daniela@correo.com',
            password: '123456',
            roles: [role._id]
        }

        await User.create(newAdminToSeed);
    }
}