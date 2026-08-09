const createRepo = (req, res)=>{
    res.send("new Repository created!!");
};

const allRepo = (req, res)=>{
    res.send("All Repositories!!");
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