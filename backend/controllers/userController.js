const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {MongoClient, ReturnDocument} = require('mongodb');
const dotenv = require('dotenv');
var ObjectId = require('mongodb').ObjectId;

dotenv.config();
const url = process.env.MONGO_URL;

let client;
async function connectClient() {
    if (!client) {
        client = new MongoClient(url);
        await client.connect();
    }
    return client;
}

async function getAllUsers(req, res) {
    try {
        await connectClient();
        const db = client.db("Git-Clone");
        const usersCollection = db.collection("users");
        const users = await usersCollection.find({}).toArray();
        res.json(users);
    } catch (error) {
        console.error("Error during fetching: ", error.message);
        res.status(500).send("Server Error");
    }
};

async function signup(req, res) {
    const {username, email, password} = req.body;
    try {
        await connectClient();
        const db = client.db("Git-Clone");
        const usersCollection = db.collection("users");
        const user = await usersCollection.findOne({username});

        if(user){
            return res.status(400).json({message: "user already exist"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);   

        const newUser = {
            username, password: hashedPassword, email, repositories: [], followedUsers: [], 
            starstarRepos: []
        };
        const result = await usersCollection.insertOne(newUser);    

        const token = jwt.sign({id: result.insertedId}, process.env.JWT_SECRET_KEY, {expiresIn: "1h"});

        res.json({token});

    } catch (error) {
        console.error("Error during signup: ", error.message);
        res.status(500).send("Server Error");
    }
};

async function login(req, res){
    const {email, password} = req.body;
    try {
        await connectClient();
        const db = client.db("Git-Clone");
        const usersCollection = db.collection("users");
        const user = await usersCollection.findOne({email});

        if(!user){
            return res.status(400).json({message: "Invalid Credentials"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({message: "Invalid Credentials"});
        }
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET_KEY, {expiresIn: "1h"});
        res.json({token, userId: user._id});
    } catch (error) {
        console.error("error while login:", error.message);
        res.status(500).send("Server Error");
    }
};

async function getUserProfile(req, res){
    const currId = req.params.id;
    try {
        await connectClient();
        const db = client.db("Git-Clone");
        const usersCollection = db.collection("users");
        const user = await usersCollection.findOne({ _id: new ObjectId(currId),});
        if(!user){  
            return res.status(404).json({message: "user not found"});
        }
        res.json({user, message: "profile fetched"});

    } catch (error) {
        console.error("error while fetching user:", error.message);
        res.status(500).send("Server Error");
    }
};

async function updateUserProfile(req, res) {
    const currId = req.params.id;
    const {email, password} = req.body;
    try {
        await connectClient();
        const db = client.db("Git-Clone");
        const usersCollection = db.collection("users");
        let updateFields = {email};
        if(password){
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            updateFields.password = password;
        }
        const result = await usersCollection.findOneAndUpdate({ _id: new ObjectId(currId),}, {$set: updateFields}, {ReturnDocument: "after"});

        if(!result.value){
            res.status(404).json({message: "user not found"});
        }
        res.json(result.value);
    } catch (error) {
        console.error("error while updating:", error);
        res.status(500).send("Server error");
    }
};

async function deleteUserProfile(req, res) {
    const currId = req.params.id;
    try {
        await connectClient();
        const db = client.db("Git-Clone");
        const usersCollection = db.collection("users");
        const result = await usersCollection.deleteOne({ _id: new ObjectId(currId)})
        if(result.deleteCount == 0){
            res.status(404).json({message: "user not found"});
        }
        res.json({result, message: "user deleted"});
    } catch (error) {
        console.error("error while updating:", error);
        res.status(500).send("Server error");
    }
};

module.exports = {getAllUsers, login, signup, getUserProfile, deleteUserProfile, updateUserProfile};