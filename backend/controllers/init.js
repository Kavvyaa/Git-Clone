const fs = require("fs").promises;
const path = require('path');
const { json } = require("stream/consumers");

async function initRepo() {
    const repoPath = path.resolve(process.cwd(), ".agit");
    const commitsPath = path.join(repoPath, "commits");

    try {
        await fs.mkdir(repoPath, {recursive: true});
        await fs.mkdir(commitsPath, {recursive: true});
        await fs.writeFile(path.join(repoPath, "config.json"),
        JSON.stringify({bucket:process.env.S3_BUCKET}));
        console.log("Repository initialized");
    } catch (error) {
        console.error("Error initialising repository", error);
    }
}

module.exports = {initRepo};