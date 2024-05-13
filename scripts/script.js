// randomizer
const rand = (min, max) => {
    if (min >= 0) {
        return Math.ceil(Math.random() * (max - min) + min);
    } else {
        return Math.ceil(Math.random() * min + max / 2);
    }
}

//accepts rgb components and opacity, returns random color
const randColorPicker = (rMin = 20, rMax = 80, gMin = 20, gMax = 80, bMin = 20, bMax = 80, alpha = 1) => {
    let rRand = rand(rMin, rMax);
    let gRand = rand(gMin, gMax);
    let bRand = rand(bMin, bMax);
    return "rgba(" + rRand + "," + gRand + "," + bRand + "," + alpha + ")";
}

// DOM OBJECTS
const tod = document.getElementById("tod"),
    bodyOverlay = document.getElementById('body_overlay'),
    mainMenuButtons = document.querySelectorAll("header nav .menu_item"),
    firstContentPLetter = document.querySelector("#content p:first-of-type::first-letter"),
    links = document.querySelectorAll('main a'),
    cards = document.getElementsByClassName("card"),
    cardDescriptions = document.getElementsByClassName("card_desc"),
    expandButtons = document.getElementsByClassName("card_expand"),
    menus = document.querySelectorAll('footer nav .menu_item, main nav .menu_item, h1'),
    footerCopyright = document.getElementById('footer_copyright'),
    contentImg = document.querySelectorAll('#content img.content_img'),
    lightDarkModeButton = document.getElementById('dark_mode_toggler'),
    rootElement = document.querySelector(':root'),
    body = document.body,
    dropDownButton = document.querySelectorAll('a.dropdown_button'),
    dropDownContent = document.getElementsByClassName('dropdown_content'),
    dropDownContentRevealed = document.querySelectorAll('dropdown_content_revealed');

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
        var todText =   (dayName + ', <br>' + 
                        time().month + "/" + time().day + "/" + time().year + '<br>' + 
                        '' + hours + ':' + minutes + ':' + seconds + ' ' + time().offsetFormat);
    } else if (window.matchMedia("only screen and (max-width: 1200px)").matches) {
        var todText = (dayName + ', ' + time().month + "/" + time().day + "/" + time().year + ' ' + '' + hours + ':' + minutes + ':' + seconds + ' ' + time().offsetFormat);
    }
    tod.innerHTML = todText;
}

// here we run the clockTick function every 100ms
setInterval(clockTick, 100);

// FOOTER COPYRIGHT
footerCopyright.innerHTML = '<b>Copyright © WARMIN GAHOO ' + time().year + '<b>';

// EVENT HANDLERS
const revealDropdownMenu = event => {
        //event.target.classList.add('dropdown_content_revealed');
        for(let item of dropDownContent) {
            item.classList.add('dropdown_content_revealed');
        }
    }

const hideDropdownMenu = event => {
    event.target.classList.remove('dropdown_content_revealed');
    for(let item of dropDownContentRevealed) {
        item.classList.remove('dropdown_content_revealed');
    }
    //console.log(dropDownContentRevealed.values)
}

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


// random colors and shadows for menus
const navMenuButtonsEffects = () => {
    for (let item of menus) {

        const top = rand(1, 4);
        const left = rand(1, 4);
        const spread = rand(10, 15);

        if (rootElement.style.colorScheme === 'light') {
            var shadowColor = randColorPicker(150, 255, 200, 255, 150, 255, 0.5);
            var color = randColorPicker(10, 50, 10, 50, 80, 150, 1);
        } else if (rootElement.style.colorScheme === 'dark') {
            var shadowColor = randColorPicker(0, 50, 0, 100, 0, 50, 0.5);
            var color = randColorPicker(200, 250, 200, 250, 200, 250, 1);
        }

        item.style.textShadow = top + 'px ' + left + 'px ' + spread + 'px ' + shadowColor + ', ' +
            -top + 'px ' + left + 'px ' + spread + 'px ' + shadowColor + ', ' +
            top + 'px ' + -left + 'px ' + spread + 'px ' + shadowColor + ', ' +
            -top + 'px ' + -left + 'px ' + spread + 'px ' + shadowColor;
        item.style.color = color;
    }
}

// changes className by pressing on dark/light mode button
const toggleLightDarkMode = () => {

    /*if (body.className === 'light_mode') {
        body.className = 'dark_mode';
        lightDarkModeButton.innerHTML = '<section id="dark_mode_toggler"><span class="material-symbols-outlined">light_mode</span></section>'
    } else if (body.className === 'dark_mode') {
        body.className = 'light_mode';
        lightDarkModeButton.innerHTML = '<section id="dark_mode_toggler"><span class="material-symbols-outlined">dark_mode</span></section>'
    }*/

    if (rootElement.style.colorScheme === 'dark') {
        rootElement.style.colorScheme = 'light';
        lightDarkModeButton.innerHTML = '<section id="dark_mode_toggler"><span class="material-symbols-outlined">dark_mode</span></section>'        
    } else if (rootElement.style.colorScheme === 'light' || rootElement.style.colorScheme === '') {
        rootElement.style.colorScheme = 'dark';
        lightDarkModeButton.innerHTML = '<section id="dark_mode_toggler"><span class="material-symbols-outlined">light_mode</span></section>'
    }
    
    navMenuButtonsEffects();

    //const colorSchemeSelectorEl = rootElement.style.colorScheme;
    //console.log(colorSchemeSelectorEl);

    

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

            //item.style.textShadow = '1px 1px 1px rgba(255,255,255,2), 1px -1px 1px rgba(255,255,255,2), -1px 1px 1px rgba(255,255,255,2), -1px -1px 1px rgba(255,255,255,2)';
            item.style.color = randColorPicker(20, 30, 20, 50, 20, 30, 1);
            item.style.backgroundColor = randColorPicker(180, 200, 180, 255, 180, 200, 1);

        if (window.innerWidth >= 1200 && screen.orientation.type === 'landscape-primary') {
            item.style.margin = margin + "px";
            item.style.padding = padding + "px";
            item.style.zIndex = zIndex;
            item.style.border = "solid 3px " + randColorPicker();
            item.style.borderRadius = radius.lt + "% " + radius.rt + "% " + radius.lb + "% " + radius.rb + "%";
            item.style.top = top + 'px';
        } else if (window.innerWidth < 1200 && window.innerWidth >= 1000) {
            item.style.margin = "5px";
            item.style.padding = "5px";
            item.style.zIndex = "0";
            item.style.border = "solid 2px " + randColorPicker();
            item.style.borderRadius = "0px";
            item.style.top = "0px"
        } else if (window.innerWidth < 1000) {
            item.style.margin = "0px";
            item.style.padding = "0.5rem";
            item.style.zIndex = "0";
            item.style.border = "solid 1px " + randColorPicker();
            item.style.borderRadius = "0px";
            item.style.top = "0px"
        }
    }
}
// dropdown menu hover effect
if (! window.matchMedia("only screen and (max-width: 1000px)").matches) {
    for (let item of dropDownButton) {
        item.addEventListener("mouseenter", revealDropdownMenu);
    }

    for(let item of dropDownContent) {
        item.addEventListener("mouseleave", hideDropdownMenu);
    }
}

// dark/light mode toggler
lightDarkModeButton.addEventListener("click", toggleLightDarkMode);

// img effects
for (let item of contentImg) {
    item.addEventListener("mousedown", resizeImg);
    item.addEventListener("mouseup", unresizeImg);
}

// cards effets
for (let item of cards) {
    //item.addEventListener("mousedown", expandCard);
    //item.addEventListener("mouseup", collapseCard);
    //item.addEventListener("mouseenter", expandButtonsContent);
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
    /*item.style.color = randColorPicker();*/
    item.style.textDecoration = 'underline';
    item.addEventListener("mouseenter", mouseEnter);
    item.addEventListener("mouseleave", mouseLeave);
    //}
}

const dynEffects = (className) => {
    var elements = document.getElementsByClassName(className);
    for (let item of elements) {
        item.addEventListener("mouseenter", mouseEnter);
        item.addEventListener("mouseleave", mouseLeave);
        item.addEventListener("mousedown", tap);
        item.addEventListener("mouseup", unTap);
    }
}

// INITIAL EFFECTS
effectsMainMenuButtons();
navMenuButtonsEffects();
// DINAMIC EFFECTS
dynEffects('menu_item')
const delay = 1;

window.onresize = function () {
    //console.log([window.resizedFinished, delay])
    clearTimeout(window.resizedFinished);
    window.resizedFinished = setTimeout(effectsMainMenuButtons(), delay)
};
