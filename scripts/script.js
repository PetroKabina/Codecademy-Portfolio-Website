// randomizer
const rand = (min, max) => {
    if (min >= 0) {
        return Math.ceil(Math.random() * (max - min) + min);
    } else {
        return Math.ceil(Math.random() * min + max / 2);
    }
}

const randColorPicker = (rMin=20, rMax=80, gMin=20, gMax=80, bMin=20, bMax=80) => {
    let rRand = rand(rMin, rMax);
    let gRand = rand(gMin, gMax);
    let bRand = rand(bMin, bMax);
    return "rgb(" + rRand + "," + gRand + "," + bRand + ")";
}

const clockTick = () => {
    let currentTime = new Date(),
        dow = currentTime.getDay(),
        month = currentTime.getMonth() + 1,
        day = currentTime.getDate(),
        year = currentTime.getFullYear(),
        hours = currentTime.getHours(),
        minutes = currentTime.getMinutes(),
        seconds = currentTime.getSeconds(),
        offset = currentTime.getTimezoneOffset(),
        dayName = undefined;
    const addNull = num => {
        return num < 10 ? '0' + num : num;
    }

    hours = addNull(hours);
    minutes = addNull(minutes);
    seconds = addNull(seconds);
    switch (dow) {
        case 1:
            dayName = 'Monday';
            break;
        case 2:
            dayName = 'Tuesday';
            break;
        case 3:
            dayName = 'Wednesday';
            break;
        case 4:
            dayName = 'Thursday';
            break;
        case 5:
            dayName = 'Friday';
            break;
        case 6:
            dayName = 'Saturday';
            break;
        case 7:
            dayName = 'Sunday';
            break;
        default: undefined;
    }

    let offsetFormat = ' (GMT' + (offset < 0 ? '+' + -(offset / 60) : (offset / 60)) + ')';
    const tod = document.getElementById('tod');
    // here we get the element with the id of "date" and change the content to the text variable we made above
    if (window.matchMedia("only screen and (max-width: 1000px)").matches) {
        var todText = (dayName + ', <br>' + month + "/" + day + "/" + year + '<br>' + '' + hours + ':' + minutes + ':' + seconds + ' ' + offsetFormat);
    } else {
        var todText = (dayName + ', ' + month + "/" + day + "/" + year + ' ' + '' + hours + ':' + minutes + ':' + seconds + ' ' + offsetFormat);
    }
    tod.innerHTML = todText;
}

const applyEffectsOnClass = (className) => {
    var elements = document.getElementsByClassName(className);
    for (let item of elements) {
        item.onmouseenter = mouseEnter;
        item.onmouseleave = mouseLeave;
    }
}
// here we run the clockTick function every 100ms
setInterval(clockTick, 100);

// INTERACTIVE ELEMENTS SELECTORS
const tod = document.getElementById("tod"),
    mainMenuButtons = document.querySelectorAll("header nav .menu_item"),
    footerMenuButtons = document.querySelectorAll("footer nav .menu_item"),
    firstContentPLetter = document.querySelector("#content p:first-of-type::first-letter"),
    links = document.querySelectorAll('main a'),
    cards = document.getElementsByClassName("card"),
    cardDescriptions = document.getElementsByClassName("card_desc"),
    expandButton = document.getElementsByClassName("expand_button"),
    menus = document.querySelectorAll('nav, menu');

//firstContentPLetter.style.color = "rgb(" + rand(50, 100) + "," + rand(50, 100) + "," + rand(50, 100) + ")";

/*const expandCard = event => {
    event.target.style.minHeigth = 'fit-content';
    event.target.style.overflow = 'visible';
}*/

const mouseEnter = event => {
    event.target.style.textShadow = "1px 1px 1px black";
    event.target.style.color = "lightgray";
    event.target.style.filter = "saturate(0)";
}

const mouseLeave = event => {
    event.target.style.color = randColorPicker(100,180,120,180,80,150,120,180);
    event.target.style.textShadow = "";
    event.target.style.filter = "";
}

//expand card
/*for (let item of cards) {
    item.onmouseclick = expandCard;
}*/

//if (window.matchMedia("(min-width: 1000px)").matches) {
// mouse hover effects
for (let item of links) {
    /*if (window.matchMedia("only screen and (max-width: 1000px)").matches) {
        item.style.color = randColorPicker();
        item.style.textDecoration = 'underline';
        item.onmouseenter = mouseEnter;
        item.onmouseleave = mouseLeave; 
    } else {*/
        item.style.color = randColorPicker();
        item.style.textDecoration = 'underline';
        item.onmouseenter = mouseEnter;
        item.onmouseleave = mouseLeave; 
    //}
}

applyEffectsOnClass('menu_item');

// MAIN MENU EFFECTS
for (let item of mainMenuButtons) {
    /*if (window.matchMedia("only screen and (max-width: 1000px)").matches) {
    //DISABLE RANDOMITY
        item.style.color = 'green';
        item.style.backgroundColor = 'black';
        item.style.margin = "0px";
        item.style.padding = "0px";
        item.style.zIndex = 0;
        item.style.border = "none";
        item.style.borderRadius = '0px';
        item.style.top = '0px';
    } else {*/
    // RANDOM VALUES DECLARATION
    let top = rand(0, 20),
        zIndex = rand(0, mainMenuButtons.length),
        radius = {
            lt: rand(80, 40),
            rt: rand(80, 40),
            lb: rand(80, 40),
            rb: rand(80, 40),
        },
        margin = rand(-5, 0),
        padding = 5 + rand(-15, 40);
    // RANDOMIZING THE LAYOUT
    item.style.textShadow = 'none';
    item.style.color = randColorPicker(100,180,120,180,80,150,120,180);
    item.style.backgroundColor = randColorPicker();
    item.style.margin = margin + "px";
    item.style.padding = padding + "px";
    item.style.zIndex = zIndex;
    item.style.border = "solid 3px " + randColorPicker();
    item.style.borderRadius = radius.lt + "% " + radius.rt + "% " + radius.lb + "% " + radius.rb + "%";
    item.style.top = top + 'px';
    //}
}

for (let item of menus) {
    const top = rand(1,5);
    const left = rand(1,5);
    const spread = rand(10, 20);
    const color = randColorPicker(150,255,200,255,150,255,150,255);
    item.style.textShadow = top + 'px ' + left + 'px ' + spread + 'px ' + color + ', ' + -top + 'px ' + left + 'px ' + spread + 'px ' + color + ', ' + top + 'px ' + -left + 'px ' + spread + 'px ' + color + ', ' + -top + 'px ' + -left + 'px ' + spread + 'px ' + color;
    item.style.color = randColorPicker(10,50,10,50,80,150,20,80);
}

for (let item of footerMenuButtons) {
    let rRand = rand(20, 80);
    let gRand = rand(20, 80);
    let bRand = rand(20, 80);
    let randomBGColor = "rgb(" + rRand + "," + gRand + "," + bRand + ")";
    item.style.color = randomBGColor;
}

//} else {
/*    for (let item of mainMenuButtons) {
        item.style.borderRadius = "0px";
    };
*/
//}