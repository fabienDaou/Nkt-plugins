const puppeteer = require("puppeteer");
const fs = require("fs");

function delay(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time)
    });
}

console.log("Starting deploy to chat...");

const url = process.argv[2];

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
            const name = file.replace(".js", "");
            console.log(`Plugin '${name}' queued for deployment.`);
            pluginsToUpdate.push({
                name,
                content: fs.readFileSync("out/" + file, "utf-8").toString()
            })
        });
        
        if (pluginsToUpdate.length > 0) {
            (async () => {
                const browser = await puppeteer.launch();
                const page = await browser.newPage();
                await page.goto(url);
                console.log("Successfully navigates to chat.");
                const textAreaSelector = "#typing > textarea";
                await page.waitForSelector(textAreaSelector);
                await page.type(textAreaSelector, "githubNktPluginsCD");
                await page.keyboard.press("Enter");
                console.log("Logging in...");
                await delay(5000);
                for (var i = 0; i < pluginsToUpdate.length; i++) {
                    const { name, content } = pluginsToUpdate.pop();
                    const command = "/plugin add " + name + " " + content;
                    await page.type(textAreaSelector, command);
                    await page.keyboard.press("Enter");
                    await delay(3000);
                    console.log(`Plugin '${name}' successfully deployed.`);
                }
                await page.type(textAreaSelector, "Enjoy your new plugins !");
                await page.keyboard.press("Enter");
                await delay(2000);
                await browser.close();
            })();
        }
    });
}
