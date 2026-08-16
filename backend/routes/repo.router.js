const express = require('express');
const repoController = require('../controllers/repoController');
const repoRouter = express.Router();

repoRouter.post('/repo/create', repoController.createRepo);
repoRouter.get('/repo/all', repoController.allRepo);
repoRouter.get('/repo/:id', repoController.getRepoById);
repoRouter.get('/repo/name/:name', repoController.getRepoByName);
repoRouter.get('/repo/name/:userID', repoController.getRepoForCurrentUser);
repoRouter.delete('/repo/delete/:id', repoController.deleteRepoById);
repoRouter.put('/repo/update/:id', repoController.updateRepoById);
repoRouter.patch('/repo/toggle/:id', repoController.toggleVisibilityById);

module.exports = repoRouter;