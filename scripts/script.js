const rand = (min, max) => {
    if (min >= 0) {
        return Math.ceil(Math.random() * (max - min) + min);
    } else {
        return Math.ceil(Math.random() * min + max/2);
    }
}

const menuItems = document.getElementsByClassName("menu_item");
const mainMenuButtons = document.querySelectorAll("header nav #head_menu .menu_item");
const firstContentPLetter = document.querySelector("#content p:first-of-type::first-letter");
const link = document.querySelector('#content a');

var mouseEnter = (event) => {
    event.target.style.textShadow = "1px 1px 1px black";
}

var mouseLeave = (event) => {
    event.target.style.textShadow = "";
}
// mouse hover effects
//link.onmouseenter = mouseEnter;
//link.onmouseleave = mouseLeave;

for (let item of menuItems) {
    item.onmouseenter = mouseEnter;
    item.onmouseleave = mouseLeave;
}

// MAIN MENU EFFECTS
for (let item of mainMenuButtons) {
    // RANDOM VALUES DECLARATION
    let top = rand(0, 20)
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
    // RANDOMIZING THE LAYOUT
    item.style.backgroundColor = randomBGColor;
    item.style.margin = margin + "px";
    item.style.padding = padding + "px";
    item.style.rotate = rotation + "deg";
    item.style.zIndex = zIndex;
    item.style.border = "solid 3px " + "rgb(" + (rRand - 50) + "," + (gRand - 50) + ","+ (bRand - 50) + ")";;
    item.style.borderRadius = radius.lt + "% " + radius.rt + "% " + radius.lb + "% " + radius.rb + "%";
    item.style.top = top + 'px';
}

//firstContentPLetter.style.color = "rgb(" + rand(50, 100) + "," + rand(50, 100) + "," + rand(50, 100) + ")";