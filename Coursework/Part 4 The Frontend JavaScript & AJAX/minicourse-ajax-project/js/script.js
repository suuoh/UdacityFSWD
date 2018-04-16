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
        $nytHeaderElem.text('New York Times Articles About ' + inCity);
    }).fail(function() {
        $nytHeaderElem.text('New York Times Articles Could Not Be Loaded');
    });

    // Load Wikipedia links
    var wikiURL = 'https://en.wikipedia.org/w/api.php?';
    wikiURL += 'action=opensearch&format=json';
    wikiURL += '&search=' + inCity;

    // Handle errors with timeout
    var wikiTimeout = setTimeout(function() {
        $wikiElem.text("Failed to load Wikipedia links");
    }, 5000);

    $.ajax({
        url: wikiURL,
        dataType: 'jsonp', // For cross-site request
        success: function(data) {
            for (var i = 0; i < data[1].length; i++) {
                var output = '<li><a href="';
                output += 'https://en.wikipedia.org/wiki/' + data[1][i] + '">';
                output += data[1][i] + '</a></li>';
                $wikiElem.append(output);
            }

            clearTimeout(wikiTimeout);
        }
    });

    return false;
};

$('#form-container').submit(loadData);
