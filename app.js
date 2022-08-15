const express = require('express');
const app = express();
const port = process.env.PORT || 80;
const optRestClient = require('./api/rest-client/optRestClient');

const router = express.Router();

app.use("/api", router);

router.get('/episodes', async function (req, res) {
    res.set('Access-Control-Allow-Origin', '*'); // open API
    const folgen = await optRestClient.crawl();
    res.json(folgen);
});

router.get('/test', async function (req, res) {
    res.set('Access-Control-Allow-Origin', '*'); // open API
    const obj = {
        test: 'hello'
    }
    res.json(obj);
});


router.get('/', function (req, res) {
    res.set('Access-Control-Allow-Origin', '*'); // open API
    res.send('OPT Api v1');
});

router.get('/folgen', async function (req, res) {
    res.set('Access-Control-Allow-Origin', '*'); // open API
    const folgen = await optRestClient.getFolgen();
    res.json(folgen);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});