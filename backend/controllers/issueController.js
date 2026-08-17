const mongoose = require('mongoose');
const Repository = require('../models/repoModel');
const User = require('../models/userModel');
const Issue = require('../models/issueModel');

async function createIssue(req, res) {
    const {title, description} = req.body;
    const {id} = req.params;
    try {
        const issue = new Issue({title, description, repository: id});
        await issue.save();
        res.status(200).json({message: "Issue created"});
    } catch (error) {
        console.error("error while creating issue", error);
        res.status(500).json({message: "Server Error"});
    }
};

async function updateIssueById(req, res) {
    const {id} = req.params;
    // const{title, description, status} = req.body;
    try {
        const issue = await Issue.findByIdAndUpdate(id);
        // const issuee = await Issue.findById(id);
        // if(!issuee){
        //     return res.status(404).json({error: "issue not found"});
        // }
        // issuee.title = title;
        // issuee.description = description;
        // issuee.status = status;
        // await issuee.save();
        res.status(201).json({message: "updated"});
    } catch (error) {
        console.error("error while creating issue", error);
        res.status(500).json({message: "Server Error"});
    }
};

async function deleteIssueById(req, res) {
    const {id} = req.params;
    try {
        const issue = await Issue.findByIdAndDelete(id);
        if(!issuee){
            return res.status(404).json({error: "issue not found"});
        }
        res.status(201).json({message: "updated"});

    } catch (error) {
        console.error("error while creating issue", error);
        res.status(500).json({message: "Server Error"});
    }
};

async function getAllIssues(req, res) {
    const {id} = req.params;
    try {
        const issues = await Issue.find({repository: id}).populate("repository");
        if(!issuee){
            return res.status(404).json({error: "issue not found"});
        }
        res.json(issues);
    } catch (error) {
        console.error("Error while fetching repo:" , error);
        res.status(500).send("Server Error")
    }
};

async function getIssueById(req, res) {
    const {id} = req.params;
    try {
        const issue = await Issue.findById(id);
        if(!issuee){
            return res.status(404).json({error: "issue not found"});
        }
        res.json(issue);
    } catch (error) {
        console.error("Error while fetching repo:" , error);
        res.status(500).send("Server Error")
    }
};
 
module.exports = {createIssue, getAllIssues, getIssueById, deleteIssueById, updateIssueById};