const express = require('express');
const morgan = require('morgan');

const app = express();

// ROUTERS

// MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
app.use(express.json());
// para pasar archivos
app.use(express.static(`${__dirname}/public`));

// USING ROUTERS

module.exports = app;
