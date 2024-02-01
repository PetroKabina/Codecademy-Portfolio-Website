let menuItems = document.getElementsByClassName("menu_item");
let mainMenuButtons = document.querySelectorAll("header nav #head_menu .menu_item");

var mouseEnter = (event) => {
    event.target.style.textShadow = "2px 2px 2px white";
}

var mouseLeave = (event) => {
    event.target.style.textShadow = "";
}

for (let item of menuItems) {
    item.onmouseenter = mouseEnter;
    item.onmouseleave = mouseLeave;
}

for (let item of mainMenuButtons) {
    let zIndex = Math.ceil(Math.random() * mainMenuButtons.length);
    let rotation = Math.ceil(Math.random() * 30 - 15);
    let margin = Math.ceil(Math.random() * (-10));
    let padding = Math.ceil(Math.random() * (15 - 10) + 10);
    let rRand = Math.ceil(Math.random() * (150 - 20) + 20);
    let gRand = Math.ceil(Math.random() * (150 - 70) + 70);
    let bRand = Math.ceil(Math.random() * (150 - 20) + 20);
    let randomBGColor = "rgb(" + rRand + "," + gRand + ","+ bRand + ")";
    item.style.backgroundColor = randomBGColor;
    item.style.margin = margin + "px";
    item.style.padding = padding + "px";
    item.style.rotate = rotation + "deg";
    item.style.zIndex = zIndex;
    console.log(item);
}