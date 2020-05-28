const puppeteer = require("puppeteer");
const fs = require("fs");

function delay(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time)
    });
}
console.log("Starting deploy to chat...");
if (!fs.existsSync("out")) {
    console.log("No 'out' folder, no plugins to deploy.");
}
else {
    let pluginsToUpdate = [];
    fs.readdir("out", function (err, files) {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        files.forEach(function (file) {
            console.log(file.replace(".js", ""));
            pluginsToUpdate.push({
                name: file.replace(".js", ""),
                content: fs.readFileSync("out/" + file, "utf-8").replace(/(\r\n|\n|\r)/gm, "")
            })
        });
    });
    if (pluginsToUpdate.length > 0) {
        (async () => {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto("https://nkt.herokuapp.com/");
            const textAreaSelector = "#typing > textarea";
            await page.waitForSelector(textAreaSelector);
            await page.type(textAreaSelector, "githubNktPluginsCD");
            await page.keyboard.press("Enter");
            await delay(5000);
            for (var i = 0; i < pluginsToUpdate.length; i++) {
                const { name, content } = pluginsToUpdate.pop();
                const command = "/plugin add " + name + " " + content;
                console.log(command);
                await page.type(textAreaSelector, command);
                await page.keyboard.press("Enter");
                await delay(3000);
                await page.type(textAreaSelector, `Plugin '${name}' has been deployed.`);
                await page.keyboard.press("Enter");
                await delay(2000);
            }
            await page.type(textAreaSelector, "Enjoy your new plugins !");
            await page.keyboard.press("Enter");
            await delay(2000);
            await browser.close();
        })();
    }
}
