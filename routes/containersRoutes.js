const express = require('express');

// Se recuperan las funciones del archivo de controladores
const {
    getAllContainers,
    postContainer,
    getContainerInfo,
    postRead,
    getAllReads,
    getLastRead,
} = require(`${__dirname}/../controllers/containersController`);

// Se crea el router que engloba todos los middlewares
const router = express.Router();

// Se definen los middlewares que actuarán sobre cada ruta dentro del router
router.route('/').get(getAllContainers).post(postContainer);
router.route('/:id').get(getContainerInfo).post(postRead);
router.route('/:id/allReads').get(getAllReads);
router.route('/:id/lastRead').get(getLastRead);

// Se exporta el router
module.exports = router;
