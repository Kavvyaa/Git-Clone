const fs = require('fs').promises;
const path = require('path');
const {v4: uuidv4} = require('uuid');

async function commit(message) {
    const repoPath = path.resolve(process.cwd(), ".agit");
    const stagePath = path.join(repoPath, "staging");
    const commitPath = path.join(repoPath, "commits");
    try {
        const commitID = uuidv4();
        const commitDir = path.join(commitPath, commitID);
        await fs.mkdir(commitDir, {recursive: true});
        const files = await fs.readdir(stagePath);
        for(const file of files){
            await fs.copyFile(
                path.join(stagePath, file),
                path.join(commitDir, file)
            );
        }
        await fs.writeFile(path.join(commitDir, "commit.json"), JSON.stringify({message, date: new Date()}));
        console.log(`commit ${commitID} created with message: ${message}`);
    } catch (error) {
        console.error("Commit error:", error)
    }
}

module.exports = {commit};