const express = require('express');
const app = express();
const port = 3000;
const optRestClient = require('./api/rest-client/optRestClient');

app.get('/folgen', async function (req, res) {
    res.set('Access-Control-Allow-Origin', '*'); // open API
    const folgen = await optRestClient.getFolgen();
    res.json(folgen);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})