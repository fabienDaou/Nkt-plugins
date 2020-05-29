const jshint = require("jshint").JSHINT;
const { execSync } = require("child_process");
const fs = require("fs");
var fsExtra = require("fs-extra");

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

        commitAndPushUpdate(name, context);

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

const commitAndPushUpdate = (name, context) => {
    context.log("Does repo exists? " + fsExtra.existsSync("D:\\local\\Temp\\nktPlugins"));
    const options = { cwd: "D:\\local\\Temp\\nktPlugins", timeout: 10000 };
    execSync("git config user.name \"commitFunction\"", options);
    execSync("git config user.email \"none@none.com\"", options);
    execSync("git add -A", options);
    execSync("git commit -m \"Plugin " + name + " updated.\"", options);
    execSync("git push", options);
};

const updatePluginFileContent = (name, content, context) => {
    const filePath = "D:\\local\\Temp\\nktPlugins\\plugins\\" + name + ".js";

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
    fsExtra.removeSync("D:\\local\\Temp\\nktPlugins");

    execSync("git clone -b master https://" + credentials + "@github.com/fabienDaou/Nkt-plugins.git %TMP%\\nktPlugins --depth=1");
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