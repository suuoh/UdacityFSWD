var Cat = function() {
    this.clicks = ko.observable(0);
    this.name = ko.observable("April");
    this.level = ko.computed(function() {
        if (this.clicks() < 10)
            return "Newborn"
        else if (this.clicks() < 40)
            return "Teen"
        else if (this.clicks() < 100)
            return "Adult"
        else if (this.clicks() < 200)
            return "Senior"
    }, this);
    this.picture = ko.observable("img/22252709_010df3379e_z.jpg");
    this.attribution = ko.observable("https://flickr.com");
    this.nicknames = ko.observableArray(["Fluffy", "Jack", "Cookie"]);
}

var ViewModel = function() {
    this.currentCat = ko.observable(new Cat());

    this.catClicked = function() {
        this.currentCat().clicks(this.currentCat().clicks() + 1);
    };
}

ko.applyBindings(new ViewModel());