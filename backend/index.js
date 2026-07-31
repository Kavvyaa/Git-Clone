const yargs = require('yargs');
const {hideBin} = require('yargs/helpers')
const {initRepo} = require('./controllers/init');
const { addFile } = require('./controllers/add');
const {commit} = require('./controllers/commit');
const {revertRepo} = require('./controllers/revert');
const {pushRepo} = require('./controllers/push');
const {pullRepo} = require('./controllers/pull');

yargs(hideBin(process.argv))
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
        describe: "file to be reverted",
        type: "string",
    });
}, revertRepo)
.command("push", "push to repository", {}, pushRepo)
.command("pull", "pull to repository", {}, pullRepo)
.demandCommand(1, "You need atleast one command to run").help().argv;