const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const http = require('http');
const app = express();

const yargs = require('yargs');
const {hideBin} = require('yargs/helpers')
const {initRepo} = require('./controllers/init');
const { addFile } = require('./controllers/add');
const {commit} = require('./controllers/commit');
const {revertRepo} = require('./controllers/revert');
const {pushRepo} = require('./controllers/push');
const {pullRepo} = require('./controllers/pull');
const { error } = require('console');

dotenv.config();

yargs(hideBin(process.argv))
.command("start", "start a new server", {}, startServer)
.command("init", "initialize new repository", {}, initRepo)
.command("add <file>", "add a file to the repository", (yargs)=>{
    yargs.positional("file", {
        describe: "file to be added to staging",
        type: "string",
    });
}, (argv) =>{
    addFile(argv.file);
})
.command("commit <message>", "file ready to commit", (yargs)=>{
    yargs.positional("message", {
        describe: "commit message",
        type: "string",
    });
}, (argv) =>{
    commit(argv.message);
})
.command("revert <commitID>", "revert back ", (yargs)=>{
    yargs.positional("file", {
        describe: "commit to be reverted",
        type: "string",
    });
}, (argv) =>{
    revertRepo(argv.commitID);
})
.command("push", "push to repository", {}, pushRepo)
.command("pull", "pull to repository", {}, pullRepo)
.demandCommand(1, "You need atleast one command to run").help().argv;

function startServer() {
    console.log("server is running");
    const port = process.env.PORT || 3000;
    app.use(bodyParser.json());
    app.use(express.json());
    const mongoUrl = process.env.MONGO_URL;

    mongoose.connect(mongoUrl).then(() => console.log("mongo connected")).catch((err)=> console.error(error));
}