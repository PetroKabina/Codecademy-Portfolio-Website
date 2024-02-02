const rand = (min, max) => {
    if (min >= 0) {
        return Math.ceil(Math.random() * (max - min) + min);
    } else {
        return Math.ceil(Math.random() * min + max/2);
    }
}

let menuItems = document.getElementsByClassName("menu_item");
let mainMenuButtons = document.querySelectorAll("header nav #head_menu .menu_item");
let firstContentPLetter = document.querySelector("#content p:first-of-type::first-letter");

var mouseEnter = (event) => {
    event.target.style.textShadow = "1px 1px 2px white";
}

var mouseLeave = (event) => {
    event.target.style.textShadow = "";
}

for (let item of menuItems) {
    item.onmouseenter = mouseEnter;
    item.onmouseleave = mouseLeave;
}

for (let item of mainMenuButtons) {
    let zIndex = rand(0, mainMenuButtons.length);
    let radius = {lt: rand(80,40),
                  rt: rand(80,40),
                  lb: rand(80,40),
                  rb: rand(80,40),};
    let rotation = rand(-30,30);
    let margin = rand(-5, 0);
    let padding = 5 + rand(-15, 40);
    let rRand = rand(20, 150);
    let gRand = rand(70, 150);
    let bRand = rand(70, 150);
    let randomBGColor = "rgb(" + rRand + "," + gRand + ","+ bRand + ")";
    item.style.backgroundColor = randomBGColor;
    item.style.margin = margin + "px";
    item.style.padding = padding + "px";
    item.style.rotate = rotation + "deg";
    item.style.zIndex = zIndex;
    item.style.border = "solid 3px " + "rgb(" + (rRand - 50) + "," + (gRand - 50) + ","+ (bRand - 50) + ")";;
    item.style.borderRadius = radius.lt + "% " + radius.rt + "% " + radius.lb + "% " + radius.rb + "%";
    console.log(item, radius.lb + " " + radius.lt);
}

console.dir(firstContentPLetter)
firstContentPLetter.style.color = "rgb(" + rand(50, 100) + "," + rand(50, 100) + "," + rand(50, 100) + ")";