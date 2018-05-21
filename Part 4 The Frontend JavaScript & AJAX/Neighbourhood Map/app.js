var map;
var mapStyles = [{
   "featureType": "administrative",
   "elementType": "labels.text.fill",
   "stylers": [{
      "color": "#444444"
  }]
}, {
   "featureType": "landscape",
   "elementType": "all",
   "stylers": [{
      "color": "#f2f2f2"
  }]
}, {
   "featureType": "poi",
   "elementType": "all",
   "stylers": [{
      "visibility": "off"
  }]
}, {
   "featureType": "road",
   "elementType": "all",
   "stylers": [{
      "saturation": -100
  }, {
      "lightness": 45
  }]
}, {
   "featureType": "road.highway",
   "elementType": "all",
   "stylers": [{
      "visibility": "simplified"
  }]
}, {
   "featureType": "road.arterial",
   "elementType": "labels.icon",
   "stylers": [{
      "visibility": "off"
  }]
}, {
   "featureType": "transit",
   "elementType": "all",
   "stylers": [{
      "visibility": "off"
  }]
}, {
   "featureType": "water",
   "elementType": "all",
   "stylers": [{
      "color": "#46bcec"
  }, {
      "visibility": "on"
  }]
}];
var initialPlaces = [{
 name: "April",
 category: "Restaurant"
}, {
 name: "April",
 category: "Restaurant"
}];
var categories = ["", ""];

function initMap() {
 map = new google.maps.Map(document.getElementById("map"), {
    center: {
       lat: 43.6596746,
       lng: -79.3929231
   },
   zoom: 14
});
};

var Place = function(data) {

}

var ViewModel = function() {
    var self = this;
    self.places = ko.observableArray([]);
    self.categories = ko.observableArray([]);
    /*initialPlaces.forEach(function(place) {
        self.places.push(new Place(place));
    });*/
    self.results = ko.observableArray([]);

    self.filterMap = function() {

    };
}

ko.applyBindings(new ViewModel());

document.addEventListener('DOMContentLoaded', () => {
});