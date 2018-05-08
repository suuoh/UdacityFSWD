var map;

document.addEventListener('DOMContentLoaded', () => {
  console.log('Hello Bulma!');
});

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: {lat: 43.6598366, lng: -79.4105849},
    zoom: 8
  });
}
