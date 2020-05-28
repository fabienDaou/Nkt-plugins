var spawn = require("child_process").spawn;
var fs = require("fs");

console.log("Start copying plugins that have been modified or added.");

var run = function (command, callback) {

    var bits = command.split(" ");
    var args = bits.slice(1);

    var cmd = spawn(bits[0], args, {
        cwd: module.exports.cwd
    });

    var stdout = "";
    var stderr = "";

    cmd.stdout.on('data', function (data) {
        stdout += data.toString();
    });

    cmd.stderr.on('data', function (data) {
        stderr += data.toString();
    });

    cmd.on("close", function (code) {
        var err = null;

        if (code !== 0) {
            err = new Error(stderr);
        }

        callback(err, stdout, stderr);
    });
};

run("git diff --diff-filter=MA --name-only head head~", function (err, stdout, stderr) {
    if (err) {
        console.error(stderr);
    }
    var filePaths = stdout.split("\n");
    filePaths.filter(file => file.startsWith("plugins/")).forEach(file => {
        console.log("Copying " + file + " ...");
        var fileName = file.substring(file.lastIndexOf("/"), file.length);
        fs.copyFileSync(file, "out/" + fileName);
        console.log("Copying " + file + " done!");
    });
});