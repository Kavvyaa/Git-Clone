const createIssue = (req, res)=>{
    res.send("issue created");
};

const updateIssueById = (req, res)=>{
    res.send("issue updated");
};

const deleteIssueById = (req, res)=>{
    res.send("issue deleted");
};

const getAllIssues = (req, res)=>{
    res.send("All issues");
};

const getIssueById = (req, res)=>{
    res.send("issues");
};
 
module.exports = {createIssue, getAllIssues, getIssueById, deleteIssueById, updateIssueById};