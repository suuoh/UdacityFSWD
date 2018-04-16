function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text('');
    $nytElem.text('');

    // Get input street and city variables
    var inStreet = $('#street').val();
    var inCity = $('#city').val();

    // load Google Maps Streetview
    var gmapsURL = 'https://maps.googleapis.com/maps/api/streetview?';
    gmapsURL += 'location=' + inStreet + ', ' + inCity;
    gmapsURL += '&size=800x600';
    gmapsURL += '&key=AIzaSyCQNbqwSHXe0XzTjrGUdzlGDCdcTTxeo80';
    $greeting.text('So, you want to live at ' + inStreet + ', ' + inCity + '?');
    $('body').append('<img class="bgimg" src="' + gmapsURL + '">');

    // load New York Times articles
    var nytimesURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?';
    nytimesURL += '&api-key=9b1a262e727547f6aa07518d82cdaac6';
    nytimesURL += '&q=' + inCity;
    nytimesURL += '&sort=newest';
    $.getJSON(nytimesURL, function(data) {
        $.each(data.response.docs, function(i, article) {
            var output = '<li class="article">';
            output += '<a href="' + article.web_url +'">' + article.headline.main + '</a>';
            output += '<p>' + article.snippet + '</p>';
            $nytElem.append(output);
        });
    });
    $nytHeaderElem.text('New York Times Articles About ' + inCity);

    return false;
};

$('#form-container').submit(loadData);
