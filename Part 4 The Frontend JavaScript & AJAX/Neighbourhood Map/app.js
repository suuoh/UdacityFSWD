var map;
var places = [
{
    name: "Terroni",
    category: "Restaurant",
    location: {lat: 43.650916, lng: -79.375685},
    place_id: "ChIJT1kRzTPL1IkRqYD-w3lcprg"
},
{
    name: "Miku",
    category: "Restaurant",
    location: {lat: 43.6412346, lng: -79.3773697},
    place_id: "ChIJbRVhVirL1IkRKu9XddGTiKU"
},
{
    name: "Chase Fish and Oyster",
    category: "Restaurant",
    location: {lat: 43.651082, lng: -79.379378},
    place_id: "ChIJ13xO78EzK4gRdwEiU8N4oCk"
},
{
    name: "Ripley's Aquarium of Canada",
    category: "Attraction",
    location: {lat: 43.64240299999999, lng: -79.385971},
    place_id: "ChIJWwS21dU0K4gRPSGMKRkar40"
},
{
    name: "CN Tower",
    category: "Attraction",
    location: {lat: 43.6425662, lng: -79.3870568},
    place_id: "ChIJmzrzi9Y0K4gRgXUc3sTY7RU"
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
        center: {lat: 43.6596746, lng: -79.3929231},
        zoom: 14,
        mapTypeControl: false
    });

    for (var i = 0; i < places.length; i++) {
        // Create marker in map
        var name = places[i].name;
        var position = places[i].location;
        var marker = new google.maps.Marker({
            position: position,
            title: name,
            animation: google.maps.Animation.DROP,
            id: i,
            map: map
        });

        // Add marker to array
        markers.push(marker);

        // Open InfoWindow when marker is clicked
        marker.addListener("click", function() {
            if (infoWindow.marker != this) {
                infoWindow.marker = this;
                infoWindow.setContent("<h3>" + this.name + "</h3>");
                infoWindow.open(map, this);
                // Close InfoWindow
                infoWindow.addListener("closeclick", function() {
                    infoWindow.marker = null;
                });
            }
        });
    }
}

var ViewModel = function() {
    var self = this;
    // Category filters
    self.categories = ko.observableArray(["Restaurant", "Attraction"]);
    self.results = ko.observableArray([]);

    self.filterMap = function() {};
};

document.addEventListener("DOMContentLoaded", () => {
    ko.applyBindings(new ViewModel());
});