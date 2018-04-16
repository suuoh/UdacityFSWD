var catList = document.getElementById("cat-list");
var catName = document.getElementById("cat-name");
var catPicture = document.getElementById("cat-picture");
var catClicks = document.getElementById("cat-clicks");
var cats = [{
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
}];


for (var i = 0; i < cats.length; i++) {
    var li = document.createElement("li");
    var a = document.createElement("a");
    a.href = "#";
    var aText = document.createTextNode(cats[i].name);
    a.addEventListener("click", (function(cat) {
        return function() {
            catName.textContent = cat.name;
            catPicture.src = cat.picture;
            catClicks.textContent = cat.clicks;
        };
    })(cats[i]));
    a.appendChild(aText);
    li.appendChild(a);
    catList.appendChild(li);
}

catPicture.addEventListener("click", function() {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
    var cat = cats.find(i => i.name === catName.textContent);
    catClicks.textContent = ++cat.clicks;
});