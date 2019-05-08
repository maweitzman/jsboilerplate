const development = {
    api_url: 'http://localhost:5000/api',
    database: {
        name: process.env.DATABASE,
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
        host: process.env.HOST,
        dialect: 'mysql'
    }
};

const testing = {
    database: {
        name: '',
        username: '',
        password: null,
        host: '',
        dialect: 'mysql'
    }
};

const staging = {
    database: {
        name: '',
        username: '',
        password: null,
        host: '',
        dialect: 'mysql'
    }
};

const production = {
    database: {
        name: '',
        username: '',
        password: null,
        host: '',
        dialect: 'mysql'
    }
};

const config = {
    development,
    testing,
    staging,
    production
}

module.exports = config[process.env.NODE_ENV];