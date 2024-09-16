function clearTetromino() {
    const activeCells = document.querySelectorAll('.active');
    activeCells.forEach(cell => {
      cell.classList.remove('active');
    });
  }

  function moveTetramino(event) {
    clearTetromino();
    let direction = event.key;

    let newX = tetraminoX;
    let newY = tetraminoY;
    let newTetramino = Tetrandom;

    switch (direction) {
        case "ArrowRight":
            newX++;
            break;
        case "ArrowLeft":
            newX--;
            break;
        case "ArrowDown":
            newY++;
            break;
        case "ArrowUp":
            const rotatedTetramino = rotateTetramino(Tetrandom);
            if (!checkCollision(rotatedTetramino, tetraminoX, tetraminoY)) {
                newTetramino = rotatedTetramino;
            }
            break;
        default:
            break;
    }

   
    if (!checkCollision(newTetramino, newX, newY)) {
        tetraminoX = newX;
        tetraminoY = newY;
        Tetrandom = newTetramino;
    } else if (direction === "ArrowDown") {
        
        lockTetramino(Tetrandom, tetraminoX, tetraminoY);
        Tetrandom = newTetramino();
        tetraminoX = 4;  
        tetraminoY = 0;  
    }

    drawTetramino();
}
