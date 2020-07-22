const express = require('express');
const bodyParser = require('body-parser');
const Blockchain = require('../blockchain/blockchain');

//Gets the port from the user or sets the default.
const HTTP_PORT = process.env.HTTP_PORT || 4001;
//Creates a new instance of blockchain.
const blockchain = new Blockchain();
//Creates a new app.
const app = new express();
app.use(bodyParser.json());

//APIs

//GET call.
app.get('/blocks', (req, res) => {
    res.json(blockchain.chain);
});

//POST call to add a block.
app.post('/add', (req, res) => {
    const block = blockchain.addBlock(req.body.data);
    console.log(`Added a new block to the chain: ${block.toString()}`);

    res.redirect('/blocks');
});

//Starting the server.
app.listen(HTTP_PORT, () => {
    console.log(`Server listening on port: ${HTTP_PORT}`);
});