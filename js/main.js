const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

const getRandomColor2 = () => {
    const letters = '0123456789';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 10)];
    }
    return color;
}

let circlesTimeout = null;
const circlesColorLoop = () => {
    const circles = [...document.getElementsByTagName('circle')]
    circles.forEach(c => c.setAttribute('fill', getRandomColor()))
    circlesTimeout = setTimeout(circlesColorLoop, 500);
}


const makeGrid = (color1, color2, color2pos) => {

    for (let i = 0; i < 9; i++) {
        if (i != color2pos)
            document.getElementById("play-field").appendChild(createCircleWithColor(color1, 'c' + i))
        else
            document.getElementById("play-field").appendChild(createCircleWithColor(color2, 'c' + i))
    }

}

function addHexColor(c1, c2) {
    var hexStr = (parseInt(c1, 16) + parseInt(c2, 16)).toString(16);
    while (hexStr.length < 6) { hexStr = '0' + hexStr; }
    return hexStr;
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    };
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

const getCloseColor = (color, threshold) => {
    const colorRGB = hexToRgb(color);
    let r = colorRGB.r;
    let g = colorRGB.g;
    let b = colorRGB.b;
    let eqdis = Math.floor(threshold / 3);
    r += eqdis;
    g += eqdis;
    b += eqdis;
    g += threshold % 3;
    return rgbToHex(r, g, b);
}


const startGameBtn = () => {
    clearTimeout(circlesTimeout);
    document.body.innerHTML = "<div id='timer'></div><div id='play-filed-container'><div id='play-field'></div></div>";
    const c1 = getRandomColor2();
    const c2 = getCloseColor(c1, 100);
    makeGrid(c1, c2, Math.floor(Math.random() * 9));
}

const createCircleWithColor = (color, id) => {
    const circle = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
    circle.setAttribute('cx', '50');
    circle.setAttribute('cy', '50');
    circle.setAttribute('r', '40');
    circle.setAttribute('class', 'circle-not-selected');
    circle.setAttribute('fill', color);
    circle.setAttribute('id', id);


    const svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
    svg.setAttribute('height', '100');
    svg.setAttribute('width', '100');
    svg.appendChild(circle);
    return svg;
}




circlesColorLoop();
document.getElementById("button-start").addEventListener("click", startGameBtn);