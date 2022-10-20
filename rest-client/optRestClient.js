const axios = require('axios').default;
const cheerio = require('cheerio');

async function getFolgen() {
    return await axios.get('https://onepiece-tube.com/episoden-streams').then((response) => {
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
                const fillerMarker = childNodes[1].currentSrc;

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

module.exports.getFolgen = getFolgen;