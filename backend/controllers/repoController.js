const mongoose = require('mongoose');
const Repository = require('../models/repoModel');
const User = require('../models/userModel');
const Issue = require('../models/issueModel');

async function createRepo(req, res) {
    const {owner, name, issues, content, description, visibility} = req.body;

    try {
        if(!name){
            res.status(400).json({error: "Repository name is required"});
        }
        if(!mongoose.Types.ObjectId.isValid(owner)){
            res.status(400).json({error: "User is required"});
        }
        const newRepo = new Repository({name, description, visibility, issues, content, owner});
        const result = await newRepo.save();
        res.status(201).json({message: "Repository created", name: result._id})

    } catch (error) {
        console.error("Error while creating repo:" , error);
        res.status(500).send("Server Error1")
    }
};

async function allRepo(req, res){
    try {
        const repositories = await Repository.find({}).populate("owner").populate("issues");
        res.json(repositories);
    } catch (error) {
        console.error("Error while fetching repo:" , error);
        res.status(500).send("Server Error")
    }
};

async function getRepoById(req, res) {
    const repoId = req.params.id;
    try {
        const repository = await Repository.find({_id: repoId}).populate("owner").populate("issues");
        res.json(repository);
    } catch (error) {
        console.error("Error while fetching that repo:" , error);
        res.status(500).send("Server Error");
    }
};

async function getRepoByName(req, res){
    const repoName = req.params.name;
    try {
        const repository = await Repository.find({name: repoName}).populate("owner").populate("issues");
        res.json(repository);
    } catch (error) {
        console.error("Error while fetching that repo:" , error);
        res.status(500).send("Server Error");
    }
};

async function getRepoForCurrentUser(req, res) {
    const userID = req.user;
    try {
        const repositories = await Repository.find({owner: userID});
        if(!repositories || repositories.length == 0){
            return res.status(404).json({error: "Repository not found"});
        }
        res.json({messgae: "Repositories found", repositories});
    } catch (error) {
        console.error("Error while fetching current repo:" , error);
        res.status(500).send("Server Error");
    }
};

async function updateRepoById(req, res) {
    const {id} = req.params;
    const {content, description} = req.body;
    try {
        const repository = await Repository.findById(id);
        if(!repository){
            return res.status(404).json({error: "repository not found"});
        }
        repository.content.push(content);
        repository.description = description;
        const updatedRepo = await Repository.save();
        res.json({message: "Repository updated", repository: updatedRepo});
    } catch (error) {
        console.error("Error while updating repo:" , error);
        res.status(500).send("Server Error");
    }
};

async function deleteRepoById (req, res) {
    const {id} = req.params;
    try {
        const repository = await Repository.findByIdAndDelete(id);
        if(!repository){
            return res.status(404).json({error: "repository not found"});
        }
    } catch (error) {
        console.error("Error while deleting repo:" , error);
        res.status(500).send("Server Error");
    }
};

async function toggleVisibilityById(req, res) {
    const {id} = req.params;
    try {
        const repository = await Repository.findById(id);
        if(!repository){
            return res.status(404).json({error: "repository not found"});
        }
        repository.visibility = !repository.visibility;
        const updatedRepo = await Repository.save();
        res.json({message: "Repository toggled", repository: updatedRepo});
    } catch (error) {
        console.error("Error while toggling visibility:" , error);
        res.status(500).send("Server Error");
    }
};

module.exports = {createRepo, getRepoById, getRepoByName, getRepoForCurrentUser, allRepo, updateRepoById, deleteRepoById, toggleVisibilityById};