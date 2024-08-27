
const express = require("express");
const router = express.Router();
var bodyParser = require("body-parser");
const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'chambers'
})
var jsonParser = bodyParser.json();
const crypto = require('crypto');

// Home page route.
router.get("/search", function (req, res) {

    connection.query('SELECT * FROM user_cards', (err, rows, fields) => {
    if (err) throw err

        res.send({ cards: 
            rows});
    })


});

// Home page route.
router.post("/insert", jsonParser, function (req, res) {
    for (let card of req.body) {
        console.log(card);
        connection.query(
            "INSERT INTO user_cards (id, card_name, scryfall_id, foil, image_uri, set_id, set_name, set_uri, price, artist, mana_cost, tcg_uri, card_type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [crypto.randomUUID(), card.cardName, card.scryfallId, card.foil, card.imageUri, card.setId, card.setName, card.setUri, card.price, card.artist, card.manaCost, card.tcgUri, card.cardType],
            function(err, results, fields)
            {
                if (err) throw err;
            }
        )
    }

});

// About page route.
router.get("/about", function (req, res) {
  res.send("About this wiki");
});

module.exports = router;
