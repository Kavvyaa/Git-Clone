const express = require('express');
const issueController = require('../controllers/issueController');
const issueRouter = express.Router();

issueRouter.post('/issue/create', issueController.createIssue);
issueRouter.get('/issue/all', issueController.getAllIssues);
issueRouter.put('/issue/update/:id', issueController.updateIssueById);
issueRouter.delete('/issue/delete/:id', issueController.deleteIssueById);
issueRouter.post('/issue/:id', issueController.getIssueById);

module.exports = issueRouter;