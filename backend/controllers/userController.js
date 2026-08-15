const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {MongoClient} = require('mongodb');
const dotenv = require('dotenv');

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

const getAllUsers = (req, res)=>{
    res.send("All users!!");
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

const getUserProfile = (req, res)=>{
    res.send("user profile!!");
};

const updateUserProfile = (req, res)=>{
    res.send("user profile updated!!");
};

const deleteUserProfile = (req, res)=>{
    res.send("user profile deleted!!");
};

module.exports = {getAllUsers, login, signup, getUserProfile, deleteUserProfile, updateUserProfile};