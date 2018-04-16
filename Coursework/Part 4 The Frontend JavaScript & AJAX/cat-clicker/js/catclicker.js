var cat1Name = document.getElementById("cat1-name").textContent = "Joe";
var cat2Name = document.getElementById("cat2-name").textContent = "Bob";
var cat1Picture = document.getElementById("cat1-picture");
var cat2Picture = document.getElementById("cat2-picture");
var cat1Counter = document.getElementById("cat1-counter");
var cat2Counter = document.getElementById("cat2-counter");



cat1Picture.addEventListener("click", function() {
    cat1Counter.textContent++;
}, false);

cat2Picture.addEventListener("click", function() {
    cat2Counter.textContent++;
}, false);