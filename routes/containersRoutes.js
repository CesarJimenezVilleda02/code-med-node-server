const express = require('express');

const {
    getAllContainers,
    postContainer,
    getContainerInfo,
    postRead,
    getAllReads,
    getLastRead,
} = require(`${__dirname}/../controllers/containersController`);

const router = express.Router();

router.route('/').get(getAllContainers).post(postContainer);
router.route('/:id').get(getContainerInfo).post(postRead);
router.route('/:id/allReads').get(getAllReads);
router.route('/:id/lastRead').get(getLastRead);

module.exports = router;
