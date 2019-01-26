'use strict'

var Promise = require('bluebird');
var Request = require('request');

module.exports.getPokemonByTypeNameOrID = function (req) {
    return new Promise(function(resolve, reject){
        Request.get('http://pokeapi.co/api/v2/pokemon/'+req.query.searchValue.trim().toLowerCase(), function (error, response, body) {
            if (response.statusCode == "200")  {
                resolve(JSON.parse(body));
            } else if (response.statusCode != '200') {
                console.error('ERROR::: Call to get Pokemon',req.query.searchValue,'falied with message:',response.message,
                'Status code:',response.statusCode)
                reject({ result: {status: response.statusCode, message:"Pokemon Not Found" }})
            }
        });
    })
}

module.exports.getPokemonHabitat = function (habitatEndpoint) {
    return new Promise(function(resolve, reject){
        Request.get(habitatEndpoint, function (error, response, body) {
            if (response.statusCode == "200")  {
                resolve(JSON.parse(body));
            } else if (response.statusCode != '200') {
                console.error('ERROR::: Call to get Habitat',habitatEndpoint,'falied with message:',response.message,
                    'Status code:',response.statusCode)
                reject({ result: {status: response.statusCode, message:"Habitat Not Found" }})
            }
        });
    });
}

module.exports.getEnglishText = function (textList) {
    var enText = '';
    var len = textList.length;
    for(var i=0; i < len; i++) {
        if (textList[i].language.name == 'en') {
            enText = textList[i].flavor_text;
            break;
        }
    }
    return enText;
}

