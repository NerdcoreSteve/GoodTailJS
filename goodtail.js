#!/usr/bin/env /usr/local/bin/node

var fs = require('fs');

if (process.argv.length < 3) {
    console.error('Please specify a file to watch.');
    process.exit(1);
}

var fileToTail = process.argv[2];

try {
    fs.accessSync(fileToTail, fs.F_OK);
} catch (e) {
    console.error('File not found:', fileToTail);
    process.exit(2);
}

try {
    fs.accessSync(fileToTail, fs.R_OK);
} catch (e) {
    console.error('Read permission denied:', fileToTail);
    process.exit(3);
}

var Tail = require('tail').Tail;
var tail = new Tail(fileToTail);

tail.on("line", function(data) {
    console.log(
        data
            .replace(/\\n/g, '\n')
            .replace(/\\t/g, '\t'));
});
