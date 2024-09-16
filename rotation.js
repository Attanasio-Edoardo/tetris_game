function rotateTetramino(tetramino) {
    const rotated = tetramino[0].map((_, colIndex) => tetramino.map(row => row[colIndex])).map(row => row.reverse());

    let offsetX = 0;
    if (tetraminoX + rotated[0].length > COLS) {
        offsetX = COLS - (tetraminoX + rotated[0].length);
    } else if (tetraminoX < 0) {
        offsetX = -tetraminoX;
    }

    tetraminoX += offsetX;
    return rotated;
}
