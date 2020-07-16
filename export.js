const puppeteer = require('puppeteer');
const path = require('path');
let examplePath = path.join(__dirname, 'apexExample.html');
const fs = require('fs').promises;
const PDF2Pic = require("pdf2pic");

const pdf2pic = new PDF2Pic({//settings for the png
    density: 300,           // output pixels per inch
    savename: "apex",   // output file name
    savedir: __dirname,    // output file location
    format: "png",          // output file format
    size: "5000x5000"         // output size in pixels
  });

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
    //await page.screenshot({path: 'apex.jpg', type: 'jpeg', quality: 100});//comes out lo resolution so needs a fix
    await browser.close();
    await pdf2pic.convert(path.join(__dirname, "apex.pdf"))
})();