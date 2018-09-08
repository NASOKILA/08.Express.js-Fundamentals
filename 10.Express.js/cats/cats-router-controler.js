let express = require('express');

let router = express.Router();

router.get('/', (req, res) => {
    res.send('<h1>Welcome to the Cat Controller !</h1>')
});

router.get('/create', (req, res) => {
    res.send('Cat Created !')
});

router.get('/delete', (req, res) => {
    res.send('Cat Deleted !')
});

router.get('/details/:id', (req, res) => {

    let id = req.params.id;
    res.send(`<h1>Cat Id: ${id}</h1><br/>` + 'Cat Details !')
});

module.exports = router;