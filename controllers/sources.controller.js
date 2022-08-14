const express = require('express');
const router = express.Router();
const Joi = require('joi');
const sourcesService = require('../services/source.service');
const authorize = require('_middleware/authorize');

// routes

router.get('/getSources', getSources);
router.get('/getSourceByID/:id', getSourceByID);
router.post('/addSource', addSource);
router.post('/updateSource/:id', updateSource);
router.delete('/deleteSource/:id', deleteSource);

module.exports = router;

function getSources(req, res, next) {
    sourcesService.getSources()
        .then(source => res.json(source))
        .catch(next);
}

function getSourceByID(req, res, next) {
    sourcesService.getSourceByID(req.params.id)
        .then(source => res.json(source))
        .catch(next);
}

function addSource(req, res, next) {
    sourcesService.addSource(req.body)
        .then(source => res.json(source))
        .catch(next);
}

function updateSource(req, res, next) {
    sourcesService.updateSource(req.params.id, req.body)
        .then(source => res.json(source))
        .catch(next);
}

function deleteSource(req, res, next) {
    sourcesService.deleteSource(req.params.id)
        .then(source => res.json(source))
        .catch(next);
}

