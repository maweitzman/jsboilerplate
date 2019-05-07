import {createConnection} from 'mysql2/promise';
import config from '../config';

createConnection({
    host: config.database.host,
    user: config.database.username,
    password: config.database.password
}).then(connection => {
    connection.query('CREATE DATABASE IF NOT EXISTS ' + config.database.name + ';');
});