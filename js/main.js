import * as Sound from "./sounds.js";
import * as Color from "./colors.js";

let circlesTimeout = null;
const circlesColorLoop = () => {
    const circles = [...document.getElementsByTagName('circle')]
    circles.forEach(c => c.setAttribute('fill', Color.getRandomColor()))
    circlesTimeout = setTimeout(circlesColorLoop, 500);
}

const makeGrid = (color1, color2, color2pos) => {
    for (let i = 0; i < 9; i++) {
        if (i != color2pos)
            document.getElementById("play-field").appendChild(createCircleWithColor(color1, i))
        else
            document.getElementById("play-field").appendChild(createCircleWithColor(color2, i))
    }
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

let winner = null;
let level = 1;
let wrong = 0;
const startGameBtn = () => {
    clearTimeout(circlesTimeout);
    Sound.gameStart();
    setLevel();
}

let clockTimeout = null;
const setLevel = () => {
    clearTimeout(clockTimeout);
    wrong = 0;
    document.body.innerHTML = `
    <div id='timer'>
        <svg height="100" width="100">
            <circle id="clock-circle" cx="50" cy="50" r="35" />
            <text id="level-count" x="50%" y="55%" text-anchor="middle" stroke="#fff" font-size="1.5em" stroke-width="2px">${level}</text>
        </svg>
    </div>
    </div>
    <div id='play-filed-container'>
        <div id='play-field'></div>
    </div>`;
    const c1 = Color.getRandomColor2();
    let diff = 100 - 3 * level;
    if (diff < 1) { diff = 1; }
    const c2 = Color.getCloseColor(c1, diff);
    winner = Math.floor(Math.random() * 9)
    makeGrid(c1, c2, winner);
    [...document.getElementsByClassName('circle-not-selected')].forEach(c => c.addEventListener("click", circleSelected))
    clockTimeout = setTimeout(setGameOver, 10000);
}

const setGameOver = () => {
    clearTimeout(clockTimeout);
    Sound.gameOver();
    document.body.innerHTML = `
    <div id="title">
        <h1>Game Over</h1>
    </div>
    <div id="title">
        <h1>Score : ${level}</h1>
    </div>
    <div id="title">
        <h1> Best : ${localStorage.getItem("best")} </h1>
    </div>`;

}


const circleSelected = (e) => {
    if (e.target.id == winner) {
        e.target.setAttribute('class', 'circle-selected-correct');
        Sound.correctCircle();
        level += 1;
        setLevel();
    }
    else {
        e.target.setAttribute('class', 'circle-selected-wrong');
        wrong += 1;
        if (wrong == 3) {
            const best = localStorage.getItem("best") || 0;
            if (best < level) { localStorage.setItem("best", level); }
            setGameOver();
        }
        else {
            Sound.wrongCircle();
        }
    }
}

circlesColorLoop();
document.getElementById("button-start").addEventListener("click", startGameBtn);