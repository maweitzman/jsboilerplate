require('babel-register')({
    presets: [ 'env' ]
});

exports.default = require('../../../server.js');
exports.default = require('./database.js');