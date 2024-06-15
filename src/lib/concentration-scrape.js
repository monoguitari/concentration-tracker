import puppeteer from 'puppeteer';
import fs from 'fs';
const url = 'https://bulletin.brown.edu/the-college/concentrations/comp/'
const main = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: 'networkidle2' });

    const allH1s = await page.evaluate(() => {
        const h1s = document.querySelectorAll('table');

        return Array.from(h1s).map(h1 => h1.innerText);
    })

    // const h1s = document.querySelector('h1').innerText;
    
    console.log(allH1s); // Log the title to the console
    fs.writeFile('Output.txt', JSON.stringify(allH1s), (err) => {

        // In case of a error throw err.
        if (err) throw err;
    })
    await browser.close();

}

main().catch(console.error);
