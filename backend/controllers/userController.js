const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {mongoClient} = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();
const url = process.env.MONGO_URL;

let client;
async function connectClient() {
    if (!client) {
        client = new mongoClient(url, {useNewUrlParser: true, useUnifiedTopology: true});
        await client.connect();
    }
}

const getAllUsers = (req, res)=>{
    res.send("All users!!");
};

const signup = (req, res)=>{
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
    } catch (error) {
        
    }
    res.send("signing up!!");
};

const login = (req, res)=>{
    res.send("loging in!!");
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