var initialCats = [{
    clicks: 0,
    name: "April",
    picture: "img/22252709_010df3379e_z.jpg",
    attribution: "flickr.com",
    nicknames: ["Fluffy", "Jack", "Cookie"]
},
{
    name: "Pumpkin",
    picture: "https://c1.staticflickr.com/2/1126/625069434_db86b67df8_b.jpg",
    attribution: "",
    clicks: 0,
    nicknames: ["Pie", "Cupcake"]
},
{
    name: "Charlie",
    picture: "https://c1.staticflickr.com/3/2298/2290467335_89067c7b51_b.jpg",
    attribution: "",
    clicks: 0,
    nicknames: ["Carl", "C", "Charles"]
},
{
    name: "Apples",
    picture: "https://c1.staticflickr.com/4/3445/5695891871_a390aaa97b_b.jpg",
    attribution: "",
    clicks: 0,
    nicknames: ["Peanut", "Orange", "Apple"]
},
{
    name: "Chocolate",
    picture: "https://c1.staticflickr.com/4/3236/2892249030_f4d1d6dd48_b.jpg",
    attribution: "",
    clicks: 0,
    nicknames: ["Choco", "Chocolate Pie"]
},
{
    name: "Snowball",
    picture: "https://c1.staticflickr.com/4/3607/3406931492_f9420b8659_b.jpg",
    attribution: "",
    clicks: 0,
    nicknames: ["Snow", "Snowie", "Snowy Pie", "Snowflake"]
}];

var Cat = function(data) {
    this.clicks = ko.observable(data.clicks);
    this.name = ko.observable(data.name);
    this.level = ko.computed(function() {
        if (this.clicks() < 10)
            return "Newborn"
        else if (this.clicks() < 20)
            return "Child"
        else if (this.clicks() < 40)
            return "Teen"
        else if (this.clicks() < 100)
            return "Adult"
        else if (this.clicks() < 200)
            return "Senior"
    }, this);
    this.picture = ko.observable(data.picture);
    this.attribution = ko.observable(data.attribution);
    this.nicknames = ko.observableArray(data.nicknames);
}

var ViewModel = function() {
    var self = this;
    this.cats = ko.observableArray([]);
    initialCats.forEach(function(cat) {
        self.cats.push(new Cat(cat));
    });

    this.currentCat = ko.observable(this.cats()[0]);

    this.catClicked = function() {
        this.clicks(this.clicks() + 1);
        // self.currentCat().clickCount(self.currentCat().clickCount() + 1);
    };

    this.setCurrentCat = function(clickedCat) {
        console.log(clickedCat.name);
        self.currentCat(clickedCat);
    };
}

ko.applyBindings(new ViewModel());