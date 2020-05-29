const jshint = require("jshint").JSHINT;
const { execSync } = require("child_process");
const fs = require("fs");
var fsExtra = require("fs-extra");

const NKTPLUGINS_REPO_PATH = "D:\\local\\Temp";

module.exports = async function (context, req) {
    const validators = [validateName, validateContentType, validateBodyNotEmpty];

    const validationResults = validators.map(validator => validator(req));
    const validationErrorResults = validationResults.filter(validationResult => validationResult.result === false);
    const validationErrors = validationErrorResults.map(result => result.error);

    if (validationErrors.length > 0) {
        context.res = {
            status: 400,
            body: validationErrors.join("\n")
        };
        return;
    }

    context.log("Validating plugin code...");
    const { body } = req;
    jshint(body, { esversion: 6 });
    if (jshint.errors && jshint.errors.length === 0) {

        context.log("Plugin code validated.");

        cloneGitRepository();

        context.log("Repository cloned.");

        const name = req.query.name;
        updatePluginFileContent(name, body, context);

        context.log("Plugin file updated.");

        commitAndPushUpdate(name);

        context.log("Plugin commited and pushed.");

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
    const options = { cwd: NKTPLUGINS_REPO_PATH + "\\nktPlugins", timeout: 10000 };
    execSync("git config user.name \"commitFunction\"", options);
    execSync("git config user.email \"none@none.com\"", options);
    execSync("git add -A", options);
    execSync("git commit -m \"Plugin " + name + " updated.\"", options);
    execSync("git push", options);
};

const updatePluginFileContent = (name, content, context) => {
    const filePath = NKTPLUGINS_REPO_PATH + "\\nktPlugins\\plugins\\" + name + ".js";

    context.log("Checking existence of file " + filePath);

    if (fs.existsSync(filePath)) {
        context.log(filePath + " exists, removing it...");

        fs.unlinkSync(filePath);

        context.log(filePath + " removed.");
    }

    context.log("Writing to " + filePath + "...");

    fs.writeFileSync(filePath, content);

    context.log("Writing operation done.");
};

const cloneGitRepository = () => {
    const userEnv = process.env.NktPluginsUserName;
    const personalAccessTokenEnv = process.env.NktPluginsPersonalAccessToken;
    const credentials = userEnv + ":" + personalAccessTokenEnv;

    // ensures there is no lingering repository
    fsExtra.removeSync(NKTPLUGINS_REPO_PATH + "\\nktPlugins");

    execSync("git clone -b master https://" + credentials + "@github.com/fabienDaou/Nkt-plugins.git " + NKTPLUGINS_REPO_PATH + "\\nktPlugins --depth=1");
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
    const lettersAndNumbers = /^[0-9a-zA-Z]+$/;
    return request.query.name && request.query.name.match(lettersAndNumbers) ?
        { result: true } :
        {
            result: false,
            error: "Must pass a valid name, only not empty names and a-z, A-Z and 0-9 characters are allowed."
        };
};