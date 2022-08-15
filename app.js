const express = require('express');
const app = express();
const port = process.env.PORT || 80;
const optRestClient = require('./rest-client/optRestClient');

const router = express.Router();

app.use(express.static(__dirname + '/node_modules/bootstrap/dist/css'));

app.use("/api", router);

app.get('/', function (req, res) {
    res.set('Access-Control-Allow-Origin', '*'); // open API
    res.sendFile(__dirname + '/index.html');
});

// API

router.get('/test', async function (req, res) {
    res.set('Access-Control-Allow-Origin', '*'); // open API
    const obj = {
        test: 'hello'
    }
    res.json(obj);
});

router.get('/episodes', async function (req, res) {
    res.set('Access-Control-Allow-Origin', '*'); // open API
    const folgen = await optRestClient.getFolgen();
    res.json(folgen);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});