import puppeteer from 'puppeteer';

const scrapeConcentrationCodes = async () => {
    const browser = await puppeteer.launch({
        headless: true, // Ensure running in headless mode
        timeout: 60000});
    const page = await browser.newPage();
    const url = 'https://bulletin.brown.edu/the-college/concentrations/'

    await page.goto(url, { waitUntil: 'networkidle2' });
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));

    const concentrationCodes = await page.evaluate(() => {
        const tokenize = (url) => {
            return url.split('/').filter(e => e).pop()
        }

        let concentrationLinks = document.querySelectorAll(`.page_content ul li a`)
        
        let concentrationCodeList = Array.from(concentrationLinks).map((concentration) => {
            // const curr_con = e.textContent
            let link = concentration.getAttributeNode('href').value;
            let tokenizedLink = tokenize(link);
            return tokenizedLink;
        })
        return concentrationCodeList;
    })

    let data = concentrationCodes;
    console.log(data);
    await browser.close();
    return data;
}

// scrapeConcentrationCodes();

const scrapeConcentrationInfo = async(concentrationCode) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const url = 'https://bulletin.brown.edu/the-college/concentrations/' + concentrationCode + '/'
    const testUrl = 'https://bulletin.brown.edu/the-college/concentrations/csci/'
    

    await page.goto(url, { waitUntil: 'networkidle2' });
    page.on('console', msg => console.log('PAGE LOG:', msg.text));

    const concentrationInfo = await page.evaluate(() => {
        /**
         * course = course code, course name, orCourses:, andCourses: 
         */

        /**
         * Concentration: 
         *  - degreeType: BA | BS
         *  - sectionList: {
         *      - section Title
         *      - courseList: {
         *          - course
         *         }
         * }
         */

        /**
         * TODO sections
         * 1. see if there is a table. If yes, proceed. If not, return something indicative
         * 2. get the different degree types
         * 3. get each section 
         * 4. get each course in a section
         */
        const concentrationData = {}
        concentrationData.concentrationTypes = []
        let concentrationTypes = concentrationData.concentrationTypes
        // get concentration types (Sc.B, B.A)
        const pageContent = document.querySelector('.page_content');
        const headings = document.querySelectorAll('h1,h2,h3,h4,h5,h6');
        headings.forEach((heading) => {
            const headingText = heading.textContent
            
            if (headingText.includes('Sc.B') || headingText.includes('A.B')) {
                // if (headingText.toLowerCase.includes('professional')) {
                //     return;
                // }
                let conTypeText = headingText.includes('Sc.B') ? 'SCB' : 'BA';
                // code for aquiring table here
                let found = false;
                let table = undefined;
                let count = 0;
                let nextEl = heading.nextElementSibling;
                while (!found && count < 10 && nextEl != null) {
                    if (nextEl.nodeName === "TABLE") {
                        found = true;
                        table = nextEl
                    } else {
                        nextEl = nextEl.nextSibling;
                    }
                    count += 1;

                }
                // check that table exists, if it does we add this, if not we dont
                if (table !== undefined) {
                    let rows = table.querySelectorAll('tr');
                    let courseRegex = /[A-Z]{4}\s\d{4}/;
                    let courses = [];
                    // A section is a group of courses. The first section should be 
                    rows.forEach((row) => {
                        let courseCode = row.querySelector('td').textContent;
                        if (courseRegex.test(courseCode)) {
                            // console.log(courseCode);
                            courses.push(courseCode)
                        }
                    })

                    let sections = table.querySelectorAll('tbody > .areaheader');
                    let sectionList = [];
                    sections.forEach((section) => {
                        let sectionTitle = section.textContent;
                        
                        // find subsections, add class to subsection, add sub to class
                        currEl = section.nextElementSibling;
                        let classes = [];
                        while (currEl != null && !currEl.classList.contains('areaheader') ) {
                            let courseCode = currEl.querySelector('td').textContent;
                            if (courseRegex.test(courseCode)) {
                                classes.push(currEl.textContent)
                            }
                            currEl = currEl.nextElementSibling;
                        }
                        sectionList.push({section: sectionTitle, classes: classes})
                    })
                    concentrationTypes. push({type: conTypeText, headingNode: heading, table: table, courses: courses, sections: sectionList})
                    //TODO: get each section for the table and each class per section

                    //TODO: nest classes under each section!
                }
            }
        })
        return concentrationData;

    })
    let conData = concentrationInfo;
    await browser.close();
    return conData;
}
let data = await scrapeConcentrationInfo('comp').catch(console.error);
import fs from 'fs';
let json_data = JSON.stringify(data);
// console.log(json_data)
fs.writeFile('classes.json', json_data, 'utf-8', (err) => {console.log(err)});
