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
        let tables = [];

        //create titles array and get course selection from next element
        let titles_arr = [...titles];
        titles_arr.forEach((el) => {
            tables.push(el.nextElementSibling);
        })
        let sections = tables[0].querySelectorAll('tbody tr');
        let cols = []
        // if (sections.hasChildNodes()) {
        //     cols.push('CLASS');
        // }
        sections.forEach((tr) => {
            // cols.push(section.textContent)
            //prints hours for section, else it class or subsection
            let hoursCol = tr.querySelector('.hourscol');
            let hours = hoursCol ? hoursCol.textContent : null;
            // let content = tr.querySelector('[colspan="2"]').textContent
            //print subsection if it exists, course otherwise
            if (hours) {
                let comm = tr.querySelector('[colspan="2"]')
                let test = comm.querySelector('.courselistcomment');
                if (test) {
                    //if courselistcomment exists, it is a subsection
                    cols.push(test.textContent);
                } else {
                    //old
                    //else it is a section
                    let commText = comm.textContent;
                    cols.push(commText);
                }
            } else {
                //else it is a course
                let codecol = tr.querySelector('.codecol') ? tr.querySelector('.codecol').textContent : null;
                cols.push(codecol);
            }
            // cols.push('hi')
        })
        
        
        return {degreeTypes: degreeTypes, sections: listify(sections),  cols: cols};
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


