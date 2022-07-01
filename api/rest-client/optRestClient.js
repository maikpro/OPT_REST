const axios = require('axios').default;
const cheerio = require('cheerio');

const puppeteer = require('puppeteer');

async function getFolgen() {
    return await axios.get('https://onepiece-tube.com/episoden-streams', {
            headers: {
            Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36",
            "Accept-Language": "de-DE,de;q=0.9,en-US;q=0.8,en;q=0.7"
            
        }
             
        }).then((response) => {
        // get Website data
        const html = response.data;
        const $ = cheerio.load(html);
        const episodes = $('.mediaitem');
        const folgenList = [];

        episodes.each(function (index) {
            const folgeName = $(this).text().split("\n")[2].trim();
            let isFiller = false;
            let isNew = false;

            // Fillerfolge markieren
            const childNodes = $(this).children('td').eq(1)[0].childNodes
            if (childNodes.length === 2) {
                const fillerMarker = childNodes[1].attribs.src;

                if (fillerMarker.includes("filler.gif")) {
                    isFiller = true;
                }

                if (fillerMarker.includes("new.gif")) {
                    isNew = true;
                }
            }

            const nr = index + 1;
            const link = 'https://onepiece-tube.com/folge/' + nr;
            const folgeObj = {
                nr,
                name: folgeName,
                isFiller,
                isNew,
                link
            }
            folgenList.push(folgeObj);
        });

        return folgenList;

    }).catch((error) => {
        // handle error
        console.log(error);
    });
}

//puppeteer
async function crawl(){
    const browser = await puppeteer.launch({
        'args' : [
            '--no-sandbox',
            '--disable-setuid-sandbox'
        ]
    });
    const page = await browser.newPage();
    await page.goto('https://onepiece-tube.com/episoden-streams');
    const content = await page.content();
    const $ = cheerio.load(content);

    const episodes = $('.mediaitem');
    const folgenList = [];
    await browser.close();

    episodes.each(function (index) {
        const folgeName = $(this).text().split("\n")[2].trim();
        let isFiller = false;
        let isNew = false;

        // Fillerfolge markieren
        const childNodes = $(this).children('td').eq(1)[0].childNodes
        if (childNodes.length === 2) {
            const fillerMarker = childNodes[1].attribs.src;

            if (fillerMarker.includes("filler.gif")) {
                isFiller = true;
            }

            if (fillerMarker.includes("new.gif")) {
                isNew = true;
            }
        }

        const nr = index + 1;
        const link = 'https://onepiece-tube.com/folge/' + nr;
        const folgeObj = {
            nr,
            name: folgeName,
            isFiller,
            isNew,
            link
        }
        folgenList.push(folgeObj);
    });

    return folgenList;
}

module.exports.getFolgen = getFolgen;
module.exports.crawl = crawl;