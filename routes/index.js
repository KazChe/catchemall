'use strict'

var express = require('express');
var router = express.Router();
var util = require('./../utils/util')

router.get('/', function(req, res, next) {
    res.sendfile('./public/index.html');
});

router.get('/search', function(req, res, next) {
    var result = {};

    util.getPokemonByTypeNameOrID(req)
        .then(function(pokeAPIResponse){
            result.id = pokeAPIResponse.id;
            result.name = pokeAPIResponse.name;
            result.weight = pokeAPIResponse.weight;
            result.height = pokeAPIResponse.height;
            result.types = pokeAPIResponse.types;
            result.speciesName = pokeAPIResponse.species.name;
            result.spritesBackDefault = pokeAPIResponse.sprites.back_default;
            return util.getPokemonHabitat(pokeAPIResponse.species.url);
        })
        .then(function(habitatResponse){
            result.habitat = habitatResponse.habitat.name;
            return util.getEnglishText(habitatResponse.flavor_text_entries);
        })
        .then(function(textFlavorResponse){
            result.englishText = textFlavorResponse;
            res.status(200).send({result: result });
        })
        .catch(function (err) {
        res.status(404).send({ result: {status:"404", message: "Pokemon Not Found"}});
    });
});

module.exports = router;
