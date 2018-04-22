// Model
var model = {
    currentCat: null,

    cats: [{
        name: "Pumpkin",
        picture: "https://c1.staticflickr.com/2/1126/625069434_db86b67df8_b.jpg",
        clicks: 0
    },
    {
        name: "Charlie",
        picture: "https://c1.staticflickr.com/3/2298/2290467335_89067c7b51_b.jpg",
        clicks: 0
    },
    {
        name: "Apples",
        picture: "https://c1.staticflickr.com/4/3445/5695891871_a390aaa97b_b.jpg",
        clicks: 0
    },
    {
        name: "Chocolate",
        picture: "https://c1.staticflickr.com/4/3236/2892249030_f4d1d6dd48_b.jpg",
        clicks: 0
    },
    {
        name: "Snowball",
        picture: "https://c1.staticflickr.com/4/3607/3406931492_f9420b8659_b.jpg",
        clicks: 0
    }]

};

// Controller/Octopus
var octopus = {
    init: function() {
        // Set current cat to first cat, to start off with
        model.currentCat = model.cats[0];

        // Initialize views
        viewCatList.init();
        viewCat.init();
    },

    getCats: function() {
        return model.cats;
    },

    setCurrentCat: function(currentCat) {
        model.currentCat = currentCat;
        viewCat.render();
    },

    getCurrentCat: function() {
        return model.currentCat;
    },

    catClicked: function() {
        model.currentCat.clicks++;
        viewCat.render();
    },
};

// View of list of cats
var viewCatList = {
    init: function() {
        this.catList = document.getElementById("cat-list");
        
        viewCatList.render();
    },

    render: function() {
        var cats = octopus.getCats();
        this.catList.innerHTML = "";
        
        for (var i = 0; i < cats.length; i++) {
            // Create li and a elements for this cat
            var li = document.createElement("li");
            var a = document.createElement("a");
            a.href = "#";
            var aText = document.createTextNode(cats[i].name);
            
            // Add click listener to cat list link
            // Use closure to handle variable scope issues
            a.addEventListener("click", (function(currentCat) {
                return function() {
                    octopus.setCurrentCat(currentCat);
                };
            })(cats[i]));

            // Add elements to DOM
            a.appendChild(aText);
            li.appendChild(a);
            this.catList.appendChild(li);
        }
    }
};

// View of details on current cat
var viewCat = {
    init: function() {
        this.catName = document.getElementById("cat-name");
        this.catPicture = document.getElementById("cat-picture");
        this.catClicks = document.getElementById("cat-clicks");
        
        // Add click listener to cat picture
        this.catPicture.addEventListener("click", function() {
            octopus.catClicked();
        })

        viewCat.render();
    },
    
    render: function() {
        // Update current cat details
        var currentCat = octopus.getCurrentCat();

        this.catName.textContent = currentCat.name;
        this.catPicture.src = currentCat.picture;
        this.catClicks.textContent = currentCat.clicks;
    }
};

// Initialize app
octopus.init();