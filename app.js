const express = require('express');
const app = express();
const port = process.env.PORT || 80;
const optRestClient = require('./api/rest-client/optRestClient');



app.get('/', function (req, res) {
    res.set('Access-Control-Allow-Origin', '*'); // open API
    res.send('OPT Api v1');
});

app.get('/folgen', async function (req, res) {
    res.set('Access-Control-Allow-Origin', '*'); // open API
    const folgen = await optRestClient.getFolgen();
    res.json(folgen);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});