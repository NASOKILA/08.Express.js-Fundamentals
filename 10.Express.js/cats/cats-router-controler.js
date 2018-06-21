

let express = require('express');

//ROUTER: POMAGA NI ZA ROUTOVETE I PUTISHTATA
//Stawa po sledniq nachin KATO POLZVAME express ZA RA SUZDADEM Router:
let router = express.Router();

//Regsttrirame nqkolko putishta
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


//ZADULJITELNO REGISTRIRAME ROUTERA  ZA da raboti na put '/Cats'
//Sega primerno ako otiden na /Cats/Details/:id ili nqkoi ot drugite shte proraboti
//REGISTRIRANETO V SLUCHIQ TRQBVA DA STANE VUV FAILA KUDETo NI E APLIKACIQTA

//app.use('/Cats', router);


module.exports = router;

