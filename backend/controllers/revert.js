const fs = require('fs').promises;
const path = require('path');
const {promisify} = require('util');

async function revertRepo(commitID) {
    const repoPath = path.resolve(process.cwd(), ".agit");
    const commitsPath = path.join(repoPath, "commits");
    try {
        const commitDir = path.join(commitsPath, commitID);
        await fs.access(commitDir);

        const files = await fs.readdir(commitDir);
        const parentDir = path.resolve(repoPath, "..");

        for(const file of files){
            const source = path.join(commitDir, file);
            const dest = path.join(parentDir, file);

            // Skip directories (this version only restores files)
            const stats = await fs.stat(source);
            if (stats.isFile()) {
                await fs.copyFile(source, dest);
            }
        }

        console.log(`commit ${commitID} reverted successfully`);
    } catch (error) {
        console.error("unable to revert:", error);
    }
}

module.exports = {revertRepo};