const express = require('express');
const router = express.Router();
const Joi = require('joi');
const clientsService = require('../services/client.service');
const authorize = require('_middleware/authorize')

// routes

router.get('/getClients', getClients);
router.get('/getClientByID/:id', getClientByID)
router.post('/addClient', addClient)
router.post('/addClients', addClients)
router.post('/updateClient/:id', updateClient)
router.delete('/deleteClient/:id', deleteClient)
router.delete('/deleteManyClients/:id', deleteManyClients)


module.exports = router;

function getClients(req, res, next) {
    clientsService.getClients()
        .then(client => res.json(client))
        .catch(next);
}

function getClientByID(req, res, next) {
    clientsService.getClientByID(req.params.id)
        .then(client => res.json(client))
        .catch(next);
}
function addClient(req, res, next) {
    clientsService.addClient(req.body)
        .then(client => res.json(client))
        .catch(next);
}
function addClients(req, res, next) {
    clientsService.addClients(req.body)
        .then(client => res.json(client))
        .catch(next);
}

function updateClient(req, res, next) {
    clientsService.updateClient(req.params.id, req.body)
        .then(client => res.json(client))
        .catch(next);
}

function deleteClient(req, res, next) {
    clientsService.deleteClient(req.params.id)
        .then(() => res.json({ message: 'Client deleted successfully' }))
        .catch(next);
}

function deleteManyClients(req, res, next) {
    clientsService.deleteManyClients(req.params.id)
        .then(() => res.json({ message: 'Clients deleted successfully' }))
        .catch(next);
}