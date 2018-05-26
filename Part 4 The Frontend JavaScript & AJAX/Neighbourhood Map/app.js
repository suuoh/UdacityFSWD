var map;
var bounds;
var places = [
    {
        id: 0,
        name: "Casa Loma",
        category: "Attraction",
        location: {lat: 43.6780371, lng: -79.4094439},
        place_id: "ChIJs6Elz500K4gRT1jWAsHIfGE",
        address: "1 Austin Terrace, Toronto, ON M5R 1X8"
    },
    {
        id: 1,
        name: "Chase Fish and Oyster",
        category: "Restaurant",
        location: {lat: 43.651082, lng: -79.379378},
        place_id: "ChIJ13xO78EzK4gRdwEiU8N4oCk",
        address: "10 Temperance St, first floor, Toronto, ON M5H 1Y4"
    },
    {
        id: 2,
        name: "CN Tower",
        category: "Attraction",
        location: {lat: 43.6425662, lng: -79.3870568},
        place_id: "ChIJmzrzi9Y0K4gRgXUc3sTY7RU",
        address: "301 Front St W, Toronto, ON M5V 2T6"
    },
    {
        id: 3,
        name: "Miku",
        category: "Restaurant",
        location: {lat: 43.6412346, lng: -79.3773697},
        place_id: "ChIJbRVhVirL1IkRKu9XddGTiKU",
        address: "10 Bay St # 105, Toronto, ON M5J 2R8"
    },
    {
        id: 4,
        name: "Ripley's Aquarium of Canada",
        category: "Attraction",
        location: {lat: 43.64240299999999, lng: -79.385971},
        place_id: "ChIJWwS21dU0K4gRPSGMKRkar40",
        address: "288 Bremner Blvd, Toronto, ON M5V 3L9"
    },
    {
        id: 5,
        name: "Royal Ontario Museum",
        category: "Attraction",
        location: {lat: 43.6677097, lng: -79.3947771},
        place_id: "ChIJE-Xa87o0K4gRkvXFHuE0hMk",
        address: "100 Queens Park, Toronto, ON M5S 2C6"
    },
    {
        id: 6,
        name: "Snakes & Lattes",
        category: "Entertainment",
        location: {lat: 43.6649006, lng: -79.4131884},
        place_id: "ChIJc-8hbJI0K4gRDhU_qf-1yII",
        address: "600 Bloor St W, Toronto, ON M6G 1K4"
    },
    {
        id: 7,
        name: "Terroni",
        category: "Restaurant",
        location: {lat: 43.650916, lng: -79.375685},
        place_id: "ChIJT1kRzTPL1IkRqYD-w3lcprg",
        address: "57 Adelaide St E, Toronto, ON M5C 1K6"
    },
    {
        id: 8,
        name: "TIFF Bell Lightbox",
        category: "Entertainment",
        location: {lat: 43.6465295, lng: -79.3904082},
        place_id: "ChIJewSvlNA0K4gRlkERDVrMZ08",
        address: "350 King St W, Toronto, ON M5V 3X5"
    },
    {
        id: 9,
        name: "Toronto City Hall",
        category: "Attraction",
        location: {lat: 43.6534399, lng: -79.38409009999999},
        place_id: "ChIJ81rnZsw0K4gR4CIzkYYawjE",
        address: "100 Queen St W, Toronto, ON M5H 2N2"
    },
    {
        id: 10,
        name: "University of Toronto",
        category: "School",
        location: {lat: 43.6628917, lng: -79.39565640000001},
        place_id: "ChIJm_0x87g0K4gR93ZadrabHY0",
        address: "27 King's College Cir, Toronto, ON M5S 3H7"
    }
];
var markers = [];
var infoWindow;
var mapStyles = [
    {
        featureType: "administrative",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#444444"
            }
        ]
    },
    {
        featureType: "landscape",
        elementType: "all",
        stylers: [
            {
                color: "#f2f2f2"
            }
        ]
    },
    {
        featureType: "poi",
        elementType: "all",
        stylers: [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "road",
        elementType: "all",
        stylers: [
            {
                saturation: -100
            },
            {
                lightness: 45
            }
        ]
    },
    {
        featureType: "road.highway",
        elementType: "all",
        stylers: [
            {
                visibility: "simplified"
            }
        ]
    },
    {
        featureType: "road.arterial",
        elementType: "labels.icon",
        stylers: [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "transit",
        elementType: "all",
        stylers: [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "water",
        elementType: "all",
        stylers: [
            {
                color: "#46bcec"
            },
            {
                visibility: "on"
            }
        ]
    }
];

function initMap() {
    // Initialize map
    map = new google.maps.Map(document.getElementById("map"), {
        center: {lat: 43.659638669778936, lng: -79.39443669999997},
        zoom: 14,
        mapTypeControl: false
    });

    for (var i = 0; i < places.length; i++) {
        // Create marker in map
        var marker = new google.maps.Marker({
            position: places[i].location,
            title: places[i].name,
            animation: google.maps.Animation.DROP,
            id: i,
            map: map
        });

        // Add marker to array
        markers.push(marker);

        // Open InfoWindow when marker is clicked
        infoWindow = new google.maps.InfoWindow();
        marker.addListener("click", function() {
            populateInfoWindow(this, infoWindow);
        });
    }
}

var ViewModel = function() {
    var self = this;
    // Category filters
    self.categories = ko.observableArray([
        "Attraction",
        "Entertainment",
        "Restaurant",
        "School"
        ]);
    self.results = ko.observableArray([]);
    places.forEach(function(place) {
        self.results.push(place);
    });

    // Open infowindow for a specific place and focus map on result
    self.focusPlace = function(place) {
        var marker = markers[place.id];
        bounds = new google.maps.LatLngBounds();
        bounds.extend(marker.position);
        updateMapBounds();

        populateInfoWindow(marker, infoWindow);
    };

    // Show all results and close any open infowindow
    self.resetFilters = function() {
        infoWindow.close();
        self.results.removeAll();
        bounds = new google.maps.LatLngBounds();

        places.forEach(function(place) {
            marker = markers[place.id];
            marker.setMap(map);
            bounds.extend(marker.position);
            self.results.push(place);
        });
        map.fitBounds(bounds);
    };

    // Filter map by category
    self.filterMap = function(category) {
        infoWindow.close();
        self.results.removeAll();
        bounds = new google.maps.LatLngBounds();

        // Find places with matching category
        for (var i = 0; i < places.length; i++) {
            if (places[i].category === category) {
                markers[i].setMap(map);
                bounds.extend(markers[i].position);
                self.results.push(places[i]);
            } else {
                markers[i].setMap(null);
            }
        }

        updateMapBounds();
    };
};

// Create and open infowindow on a given marker
function populateInfoWindow(marker, infowindow) {
    if (infowindow.marker != marker) {
        var place = places[marker.id];
        infowindow.marker = marker;
        var infoContent = "";

        // Set infowindow content to include link to Google Maps in new window
        infoContent += "<h4>" + place.name + "</h4>"; // Name of place
        infoContent += "<p><em>" + place.category + "</em></p>"; // Category
        infoContent += "<p>" + place.address + "</p>"; // Street address
        infoContent +=
        "<p><a href='https://www.google.com/maps/dir/?api=1&destination=";
        infoContent += place.name + "&destination_place_id=" + place.place_id;
        infoContent += "' target='_blank'>Get Directions</a>"; // Google Maps directions
        // If it exists, include Wikipedia link
        if (place.wikipedia)
            infoContent +=
        "<p><a href='" +
        place.wikipedia +
        "' target='_blank'>Wikipedia</a></p>";

        infowindow.setContent(infoContent);
        infowindow.open(map, marker);

        // Close InfoWindow when it is clicked
        infowindow.addListener("closeclick", function() {
            infowindow.marker = null;
        });

        bounceMarker(marker);
    }
}

// Bounce marker once
function bounceMarker(marker) {
    marker.setAnimation(google.maps.Animation.BOUNCE);
    window.setTimeout(function() {
        marker.setAnimation(null);
    }, 1000);
}

// Fit current view to map bounds with a buffer
function updateMapBounds() {
    if (bounds) {
        // Prevent map from zooming in too far
        var extendNE = new google.maps.LatLng(
            bounds.getNorthEast().lat() + 0.01,
            bounds.getNorthEast().lng() + 0.01
            );
        var extendSW = new google.maps.LatLng(
            bounds.getSouthWest().lat() - 0.01,
            bounds.getSouthWest().lng() - 0.01
            );
        bounds.extend(extendNE);
        bounds.extend(extendSW);
        map.fitBounds(bounds);
    }
}

function getWikiLinks() {
    var wikiURL = "https://en.wikipedia.org/w/api.php?";
    wikiURL += "action=opensearch&format=json";
    wikiURL += "&search=";

    places.forEach(function(place) {
        if (place.category !== "Restaurant") {
            $.ajax({
                url: wikiURL + place.name,
                dataType: "jsonp",
                success: function(data) {
                    place.wikipedia =
                    "https://en.wikipedia.org/wiki/" + data[1][0];
                }
            });
        }
    });
}

// Apply Knockout bindings when DOM is loaded
$(function() {
    ko.applyBindings(new ViewModel());
    getWikiLinks();
});
