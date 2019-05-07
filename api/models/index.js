import Sequelize from 'sequelize';
import config from '../config/config.js';
import fs from 'fs';
import path from 'path';
import sequelize_fixtures from 'sequelize-fixtures';
import fixtures from '../config/fixtures.json';

let models = {};

const sequelize = new Sequelize(config.database.name, config.database.username, config.database.password, {
    dialect: config.database.dialect,
    host: config.database.host,
    logging: false,
    define: {
        timestamps: true
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    operatorsAliases: false
});

fs.readdirSync(path.join(__dirname, '..', 'models'))
    .filter((file) => {
        return file.indexOf('.') !== 0 && file !== 'index.js';
    })
    .forEach((file) => {
        var model = sequelize.import(path.join(__dirname, '..', 'models', file));
        models[model.name] = model;
    });

Object.keys(models).forEach((modelName) => {
    if ('associate' in models[modelName]) {
        models[modelName].associate(models);
    }
});

sequelize.sync()
.then(() => {
    sequelize_fixtures.loadFixtures(fixtures, models);
});

module.exports = models;