'use strict'

$(document).ready(function(){

    $(function() {
        $('#searchButton').click(function(e) {
            e.preventDefault(); // prevent form from reloading page
            $.ajax({
                'url' : 'http://localhost:3000/search',
                'type' : 'GET',
                'data': {searchValue: $("#searchField").val()},
                dataType: "json",
                error: function(data) {
                    if(data.responseJSON.result.status != '200') {
                        $('#name, #pokeID, #types, #height, #weight, #speciesName, #habitat, #enText').text('');
                        $('img').attr('src', '');
                        $('#errorMessage').text(data.responseJSON.result.message);
                    }
                },
                'success' : function(data) {
                    $('#errorMessage').text('')
                    $('#name').text(data.result.name)
                    $('#pokeID').text(data.result.id)
                    $('#height').text(data.result.height)
                    $('#weight').text(data.result.weight)
                    $("img").prop("src", data.result.spritesBackDefault)
                    var types = "";
                    var len = data.result.types.length;
                    for(var i = 0; i < len; ++i) {
                        types += data.result.types[i].type.name
                        if(i != len - 1) {
                            types +=',';
                        }
                    }
                    $('#types').text(types)
                    $('#speciesName').text(data.result.speciesName)
                    $('#habitat').text(data.result.habitat)
                    $('#enText').text(data.result.englishText)

                }
            });
        });
    });
});