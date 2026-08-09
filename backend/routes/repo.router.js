const express = require('express');
const repoController = require('../controllers/repoController');
const repoRouter = express.Router();

repoRouter.get('/repo/create', repoController.createRepo);
repoRouter.get('/repo/all', repoController.allRepo);
repoRouter.post('/repo/:id', repoController.getRepoById);
repoRouter.get('/repo/:name', repoController.getRepoByName);
repoRouter.put('/repo/:userID', repoController.updateRepoById);
repoRouter.delete('/deleteRepo', repoController.deleteRepoById);

module.exports = repoRouter;