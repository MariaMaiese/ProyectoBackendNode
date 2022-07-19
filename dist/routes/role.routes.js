"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const role_model_1 = require("../models/role.model");
const roleRoutes = (0, express_1.Router)();
roleRoutes.post('/', (req, res) => {
    const role = {
        name: req.body.name
    };
    role_model_1.Role.create(role).then(resp => {
        res.json({
            ok: true,
            role: resp
        });
    });
});
roleRoutes.post('/asignar', (req, res) => {
    const roleId = req.body.roleId;
    const userId = req.body.userId;
    role_model_1.Role.findByIdAndUpdate(roleId, { $push: { users: userId } }).then(resp => {
        res.json({
            ok: true,
            role: resp
        });
    });
});
roleRoutes.get('/validaradmin', (req, res) => {
    res.json({
        ok: true
    });
});
exports.default = roleRoutes;
