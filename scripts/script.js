// randomizer
const rand = (min, max) => {
    if (min >= 0) {
        return Math.ceil(Math.random() * (max - min) + min);
    } else {
        return Math.ceil(Math.random() * min + max / 2);
    }
}

const randColorPicker = (rMin = 20, rMax = 80, gMin = 20, gMax = 80, bMin = 20, bMax = 80) => {
    let rRand = rand(rMin, rMax);
    let gRand = rand(gMin, gMax);
    let bRand = rand(bMin, bMax);
    return "rgb(" + rRand + "," + gRand + "," + bRand + ")";
}

// DOM OBJECTS
const tod = document.getElementById("tod"),
    bodyOverlay = document.getElementById('body_overlay'),
    mainMenuButtons = document.querySelectorAll("header nav .menu_item"),
    footerMenuButtons = document.querySelectorAll("footer nav .menu_item"),
    firstContentPLetter = document.querySelector("#content p:first-of-type::first-letter"),
    links = document.querySelectorAll('main a'),
    cards = document.getElementsByClassName("card"),
    cardDescriptions = document.getElementsByClassName("card_desc"),
    expandButtons = document.getElementsByClassName("card_expand"),
    menus = document.querySelectorAll('footer menu, main menu, h1'),
    footerCopyright = document.getElementById('footer_copyright'),
    contentImg = document.querySelectorAll('#content img');

// DATE
let dayName = undefined;
const time = () => {
    const currentTime = new Date();
    return {
        dow: currentTime.getDay(),
        month: currentTime.getMonth() + 1,
        day: currentTime.getDate(),
        year: currentTime.getFullYear(),
        addNull(num) {
            return num < 10 ? '0' + num : num
        },
        hours: currentTime.getHours(),//this.addNull(currentTime.getHours()),
        minutes: currentTime.getMinutes(),//this.addNull(currentTime.getMinutes()),
        seconds: currentTime.getSeconds(),//this.addNull(currentTime.getSeconds()),
        offsetFormat: ' (GMT' + (currentTime.getTimezoneOffset() < 0 ? '+' + -(currentTime.getTimezoneOffset() / 60) : (currentTime.getTimezoneOffset() / 60)) + ')',
    }
}

const clockTick = () => {
    const addNull = num => {
        return num < 10 ? '0' + num : num;
    }

    let hours = addNull(time().hours);
    let minutes = addNull(time().minutes);
    let seconds = addNull(time().seconds);
    switch (time().dow) {
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
        case 0:
            dayName = 'Sunday';
            break;
        default: undefined;
    }

    const tod = document.getElementById('tod');
    // here we get the element with the id of "date" and change the content to the text variable we made above
    if (window.matchMedia("only screen and (min-width: 1201px)").matches) {
        var todText = (dayName + ', <br>' + time().month + "/" + time().day + "/" + time().year + '<br>' + '' + hours + ':' + minutes + ':' + seconds + ' ' + time().offsetFormat);
    } else if (window.matchMedia("only screen and (max-width: 1200px)").matches) {
        var todText = (dayName + ', ' + time().month + "/" + time().day + "/" + time().year + ' ' + '' + hours + ':' + minutes + ':' + seconds + ' ' + time().offsetFormat);
    }
    tod.innerHTML = todText;
}

// here we run the clockTick function every 100ms
setInterval(clockTick, 100);

const dynEffects = (className) => {
    var elements = document.getElementsByClassName(className);
    for (let item of elements) {
        item.onmouseenter = mouseEnter;
        item.onmouseleave = mouseLeave;
        item.onmousedown = tap;
        item.onmouseup = unTap;
    }
}

// FOOTER COPYRIGHT
footerCopyright.innerHTML = '<b>Copyright © WARMIN GAHOO ' + time().year + '<b>';

//firstContentPLetter.style.color = "rgb(" + rand(50, 100) + "," + rand(50, 100) + "," + rand(50, 100) + ")";
// EVENT HANDLERS
const resizeImg = event => {
    bodyOverlay.style.visibility = 'visible';
    event.target.classList.add("content_img_clicked");
}

const unresizeImg = event => {
    event.target.classList.remove("content_img_clicked");
    bodyOverlay.style.visibility = 'hidden';
    document.body.style = "";
}

const mouseEnter = event => {
    event.target.classList.add("nav_hovered");
}

const mouseLeave = event => {
    event.target.classList.remove("nav_hovered");
}

const tap = event => {
    event.target.classList.add("nav_hovered");
}

const unTap = event => {
    event.target.classList.remove("nav_hovered");
}

const effectsMainMenuButtons = () => {
    for (let item of mainMenuButtons) {

        // RANDOM VALUES DECLARATION
        let top = rand(10, 35),
            zIndex = rand(0, mainMenuButtons.length),
            radius = {
                lt: rand(80, 40),
                rt: rand(80, 40),
                lb: rand(80, 40),
                rb: rand(80, 40),
            },
            margin = rand(-10, 0),
            padding = 5 + rand(-15, 40);

        if (window.innerWidth >= 1200 && screen.orientation.type === 'landscape-primary') {
            item.style.textShadow = '';
            item.style.color = randColorPicker(150, 180, 150, 180, 150, 255, 150, 180);
            item.style.backgroundColor = randColorPicker();
            item.style.margin = margin + "px";
            item.style.padding = padding + "px";
            item.style.zIndex = zIndex;
            item.style.border = "solid 3px " + randColorPicker();
            item.style.borderRadius = radius.lt + "% " + radius.rt + "% " + radius.lb + "% " + radius.rb + "%";
            item.style.top = top + 'px';
        } else if (window.innerWidth < 1200 && window.innerWidth >= 1000  ) {
            item.style.textShadow = 'none';
            item.style.color = randColorPicker(150, 180, 150, 180, 150, 255, 150, 180);
            item.style.backgroundColor = randColorPicker();
            item.style.margin = "5px";
            item.style.padding = "5px";
            item.style.zIndex = "0";
            item.style.border = "solid 2px " + randColorPicker();
            item.style.borderRadius = "0px";
            item.style.top = "0px"
        } else if (window.innerWidth < 1000 ) {
            item.style.textShadow = 'none';
            item.style.color = randColorPicker(150, 180, 150, 180, 150, 255, 150, 180);
            item.style.backgroundColor = randColorPicker();
            item.style.margin = "0px";
            item.style.padding = "0px";
            item.style.zIndex = "0";
            item.style.border = "solid 1px " + randColorPicker();
            item.style.borderRadius = "0px";
            item.style.top = "0px"
        }
    }
}

// img effects
for (let item of contentImg) {
    item.onmousedown  = resizeImg;
    item.onmouseup = unresizeImg;
}

// cards effets
for (let item of cards) {
    //item.onmousedown = expandCard;
    //item.onmouseup = collapseCard;
    //item.onmouseenter = expandButtonsContent;
}

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

// INITIAL EFFECTS
effectsMainMenuButtons();
// DINAMIC EFFECTS
dynEffects('menu_item')
const delay = 1;

window.onresize = function () {
    //console.log([window.resizedFinished, delay])
    clearTimeout(window.resizedFinished);
    window.resizedFinished = setTimeout(effectsMainMenuButtons(), delay)
};

for (let item of menus) {
    const top = rand(1, 5);
    const left = rand(1, 5);
    const spread = rand(10, 20);
    const color = randColorPicker(150, 255, 200, 255, 150, 255, 150, 255);
    item.style.textShadow = top + 'px ' + left + 'px ' + spread + 'px ' + color + ', ' + -top + 'px ' + left + 'px ' + spread + 'px ' + color + ', ' + top + 'px ' + -left + 'px ' + spread + 'px ' + color + ', ' + -top + 'px ' + -left + 'px ' + spread + 'px ' + color;
    item.style.color = randColorPicker(10, 50, 10, 50, 80, 150, 20, 80);
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