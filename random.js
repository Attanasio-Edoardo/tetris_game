
let activeTetramino = [I, O, L, T, S, Z];

function newTetramino() {
    const randomTetramino = (Math.random() * activeTetramino.length);
    return activeTetramino[randomTetramino];
}

