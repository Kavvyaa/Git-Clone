const getAllUsers = (req, res)=>{
    res.send("All users!!");
};

const signup = (req, res)=>{
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