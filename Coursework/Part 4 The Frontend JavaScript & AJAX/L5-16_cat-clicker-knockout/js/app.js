var ViewModel = function() {
    this.clicks = ko.observable(0);
    this.name = ko.observable("April");
    this.picture = ko.observable("img/22252709_010df3379e_z.jpg");
    this.attribution = ko.observable("https://flickr.com");

    this.catClicked = function() {
        this.clicks(this.clicks() + 1);
    };
}

ko.applyBindings(new ViewModel());