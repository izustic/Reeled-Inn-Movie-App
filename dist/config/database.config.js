"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db = new sequelize_1.Sequelize('reeled', '', '', {
    storage: './database.sqlite',
    dialect: 'sqlite',
    logging: false
});
exports.default = db;
//# sourceMappingURL=database.config.js.map