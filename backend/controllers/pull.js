const fs = require('fs').promises;
const path = require('path');

function pullRepo() {
    console.log("pull called");
}

module.exports = {pullRepo};