const jshint = require("jshint").JSHINT;
const { execSync } = require("child_process");
const fs = require("fs");

module.exports = async function (context, req) {
    const validations = [validateName, validateContentType, validateBodyNotEmpty];

    const validationErrors = validations.filter(validator => validator(req).response === false).map(result => result.error);

    if (validationErrors.length > 0) {
        context.res = {
            status: 400,
            body: validationErrors.join("\n")
        };
        return;
    }

    const { body } = req;
    jshint(body, { esversion: 6 });
    if (jshint.errors && jshint.errors.length === 0) {

        cloneGitRepository();

        const name = req.query.name;
        updatePluginFileContent(name, body);

        commitAndPushUpdate(name);

        context.res = {
            status: 200
        };
    } else {
        context.res = {
            status: 400,
            body: jshint.errors
        };
    }
};

const commitAndPushUpdate = name => {
    const options = { cwd: __dirname + "/../tmp", timeout: 5000 };
    execSync("git add -A", options);
    execSync("git commit -m \"Plugin " + name + " updated.\"", options);
    execSync("git push", options);
};

const updatePluginFileContent = (name, content) => {
    const filePath = "./tmp/plugins/" + name + ".js";

    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }

    fs.writeFileSync(filePath, content);
};

const cloneGitRepository = () => {
    const userEnv = process.env["NktPluginsUserName"];
    const personalAccessTokenEnv = process.env["NktPluginsPersonalAccessToken"];
    const credentials = userEnv + ":" + personalAccessTokenEnv;
    execSync("git clone -b master https://" + credentials + "@github.com/fabienDaou/Nkt-plugins.git tmp --depth=1");
};

const validateBodyNotEmpty = request => {
    return request.body ?
        { result: true } :
        {
            result: false,
            error: "Must pass a body in the request."
        };
};

const validateContentType = request => {
    return request.headers["content-type"] === "application/javascript" ?
        { result: true } :
        {
            result: false,
            error: "ContentType should be application/javascript."
        };
};

const validateName = (request) => {
    return request.query.name && request.query.name.match("/^[A-Za-z]+$/") ?
        { result: true } :
        {
            result: false,
            error: "Must pass a valid name, only not empty names and a-z and A-Z characters are allowed."
        };
};