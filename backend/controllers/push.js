const fs = require('fs').promises;
const path = require('path');
const {v4: uuidv4} = require('uuid');

async function pushRepo() {
    const repoPath = path.resolve(process.cwd(), ".agit");
    const commitsPath = path.join(repoPath, "commits");
    const pushPath = path.join(repoPath, "push");
    try {
        const pushID = uuidv4();
        const pushDir = path.join(pushPath, pushID);
        await fs.mkdir(pushDir, {recursive:true});
        const commitDirs = await fs.readdir(commitsPath);

        for(const commitDir of commitDirs){
            const commitPath = path.join(commitsPath, commitDir);
            const files = await fs.readdir(commitPath);

            for(const file of files){
                const filePath = path.join(commitPath, file)
                await fs.copyFile(
                    filePath,
                    path.join(pushDir, file)
                );
            }
        }
        console.log(`push ${pushID} has been done`);
    } catch (error) {
        console.error("error while pushing code:" , error);
    }
}

module.exports = {pushRepo};