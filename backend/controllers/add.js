const fs = require("fs").promises;
const path = require('path');

async function addFile(filePath) {
    const repoPath = path.resolve(process.cwd(), ".agit");
    const stagePath = path.join(repoPath, "staging");

    try {
        await fs.mkdir(stagePath, {recursive:true});
        const fileName = path.basename(filePath);
        await fs.copyFile(filePath, path.join(stagePath, fileName));
        console.log(`${fileName} file added to staging process`);
    } catch (error) {
        console.error("Error adding file", error);
    }
}

module.exports = {addFile};