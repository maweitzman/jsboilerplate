// ---------- Import Dependencies ---------- //
import express from 'express';
import next from 'next';
import {json, urlencoded} from 'body-parser';
import cookies from 'cookie-parser';

// ---------- Setup Variables ---------- //
const server = express();
const dev = process.env.NODE_ENV !== 'production';
const app = next({dev, dir: './client'});
const handle = app.getRequestHandler();

// ---------- Application Rules ---------- //
require('custom-env').env();
server.use(json());
server.use(urlencoded({
    extended: true
}));
server.use(cookies(process.env.COOKIE_SECRET));
require('./api/config/passport');

// ---------- Start Server ---------- //
app.prepare().then(() => {
    require('./api/routes')(app, server, handle);
    server.listen(process.env.PORT);
});