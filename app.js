const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

// ROUTERS
const containersRouter = require(`${__dirname}/routes/containersRoutes`);

// MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
app.use(express.json());
// Cuando se accede a un archivo al usar este middleware definimos que el
// archivo a retornar se encuentra en el directorio public desde el directorio
// actual
app.use(express.static(`${__dirname}/public`));
app.use(cors);

// USING ROUTERS
// Usamos el middleware containersRouters cuando se accede a la extendiín /api/contenedores/
app.use('/api/contenedores/', containersRouter);

module.exports = app;
