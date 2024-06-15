import puppeteer from 'puppeteer';
import fs from 'fs';
import { list } from 'postcss';
import { type } from 'os';
import { stringify } from 'querystring';
const url = 'https://bulletin.brown.edu/the-college/concentrations/comp/'


const main = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: 'networkidle2' });
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    const info = {
        degreeTypes: [
            {
                type: 'string',
                sections: [],
                subsections: [],
                classes: []
            }
        ],
    }



    // const allH1s = await page.evaluate(() => {
    //     const table = document.querySelectorAll('table');
        
    //     // return table
    //     return Array.from(table).map(h1 => h1.innerText);
    // })

    const allSections = await page.evaluate(() => {
        /**
         * 
         * @param {HTMLElement} el 
         * @returns {string[]}
         */
        const listify = (el) => {
            return Array.from(el).map((e) => {
                const sectionText = e.textContent; //inner.Text to aquire text of an element
                return sectionText;
                });
        }
        // GET Degree Types
        let degreeTypes = document.querySelectorAll('[data-sisprogram]')
        // Map over the NodeList to get the text value of the data-sisprogram attribute
        degreeTypes = Array.from(degreeTypes).map((e) => e.getAttribute('data-sisprogram'));
        // filter out the SCB/BA part. 
        for (let i = 0; i < degreeTypes.length; i++) {
            if (degreeTypes[i].includes('SCB')) {
                degreeTypes[i] = 'SCB';
            } else if (degreeTypes[i].includes('AB')) {
                degreeTypes[i] = 'AB';
            }
        }

        const pageContent = document.querySelector('.page_content');
        let titles = pageContent.querySelectorAll('[data-sisprogram]');
        let nextEl = Array.from(titles).map((e) => listify(e.nextElementSibling));
        let courses = [];

        //create titles array and get course selection from next element
        let titles_arr = [...titles];
        titles_arr.forEach((el) => {
            courses.push(el.nextElementSibling.textContent);
        })
        
        return {degreeTypes: degreeTypes, title: courses};
    })
    console.log(allSections);

    // const h1s = document.querySelector('h1').innerText;
    
    
    // fs.writeFile('Output.txt', `[${allH1s.map(JSON.stringify).join(',\n ')}]`, (err) => {

    //     // In case of a error throw err.
    //     if (err) throw err;
    // })
    await browser.close();

}

main().catch(console.error);


