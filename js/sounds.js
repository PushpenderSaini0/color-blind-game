const playSound = (audioFile) => {
    let startSound = new Audio(audioFile);
    startSound.volume = 0.5;
    startSound.play();
}

let blobs = []

export const setup = (blobArr) => {
    blobs = blobArr;
}

export const gameStart = () => {
    playSound(blobs[0]);
}

export const gameOver = () => {
    playSound(blobs[1]);
}

export const correctCircle = () => {
    playSound(blobs[2]);
}

export const wrongCircle = () => {
    playSound(blobs[3]);
}