const puppeteer = require('puppeteer');
const path = require('path');
let examplePath = path.join(__dirname, 'apexExample.html');
const fs = require('fs').promises;
function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};

(async () => {
    const buffer = await fs.readFile(examplePath);
    const html = buffer.toString();
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(html)
    await timeout(1000)//this is a fix because the apexchart is animated so needs to wait until it's completely rendered
    await page.pdf({path: 'apex.pdf'})
    await page.screenshot({path: 'apex.jpg', type: 'jpeg', quality: 100});//comes out lo resolution so needs a fix
    await browser.close();
})();