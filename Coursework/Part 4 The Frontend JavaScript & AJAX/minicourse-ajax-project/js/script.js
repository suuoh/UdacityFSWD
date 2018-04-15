function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text('');
    $nytElem.text('');

    // load streetview
    var gmapsURL = 'https://maps.googleapis.com/maps/api/streetview?';
    gmapsURL += 'location=' + $('#street').val() + ', ' + $('#city').val();
    gmapsURL += '&size=800x600&key=AIzaSyCQNbqwSHXe0XzTjrGUdzlGDCdcTTxeo80';
    $greeting.text('So, you want to live at ' + $('#street').val() + ', ' + $('#city').val() + '?');
    $('body').append('<img class="bgimg" src="' + gmapsURL + '">');

    // YOUR CODE GOES HERE!

    return false;
};

$('#form-container').submit(loadData);
