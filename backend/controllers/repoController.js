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
        console.error("Error while creating repo:" , error);
        res.status(500).send("Server Error1")
    }
};

const getRepoById = (req, res)=>{
    res.send("Repository by id!!");
};

const getRepoByName = (req, res)=>{
    res.send("Repository by name!!");
};

const getRepoForCurrentUser = (req, res)=>{
    res.send("Repository for logged in user!!");
};

const updateRepoById = (req, res)=>{
    res.send("Update Repository!!");
};

const deleteRepoById = (req, res)=>{
    res.send("delete Repository!!");
};

const toggleVisibilityById = (req, res)=>{
    res.send("private or public!!");
};

module.exports = {createRepo, getRepoById, getRepoByName, getRepoForCurrentUser, allRepo, updateRepoById, deleteRepoById, toggleVisibilityById};