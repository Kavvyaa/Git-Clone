const yargs = require('yargs');
const {hideBin} = require('yargs/helpers')
const {initRepo} = require('./controllers/init');
const { addFile } = require('./controllers/add');

yargs(hideBin(process.argv))
.command("init", "initialize new repository", {}, initRepo)
.command("add <file>", "add a file to the repository", (yargs)=>{
    yargs.positional("file", {
        describe: "file to be added to staging",
        type: "string",
    });
}, addFile).demandCommand(1, "You need atleast one command to run").help().argv;