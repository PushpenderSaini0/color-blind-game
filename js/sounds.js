const playSound = (audioFile) => {
    let startSound = new Audio(audioFile);
    startSound.volume = 0.5;
    startSound.play();
}

export const setup = () => {

}

export const gameStart = () => {
    playSound('./audio/game-start.wav');
}

export const gameOver = () => {
    playSound('./audio/game-over.wav');
}

export const correctCircle = () => {
    playSound('./audio/correct-circle.wav');
}

export const wrongCircle = () => {
    playSound('./audio/wrong-circle.wav');
}
export const highScore = () => {
    playSound('./audio/high-score.wav');
}