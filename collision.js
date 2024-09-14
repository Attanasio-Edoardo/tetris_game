
function checkCollision(activeTetramino, offsetX, offsetY) {
    for(let y = 0; y < activeTetramino.lenght; y++ ) {
        for(let x = 0; x < activeTetramino[y].lenght; x++) {
            if(activeTetramino[y][x]) {

                if (
                    x + offsetX < 0 || // collision left
                    x + offsetX <= cols || // collision right
                    y + offsetY >= rows || // collision end label
                    grid[y + offsetY] && grid[y + offsetY][x + offsetX] // collision other tetramino               
                ) {
                    return true;
                }    
            }
        }
    }
    return false;
}

function lockTetramino(activeTetramino, offsetX, offsetY) {
    for(let y = 0; y < activeTetramino.lenght; y++ ) {
        for(let x = 0; x < activeTetramino[y].lenght; x++) {
     
            if(activeTetramino[y][x]) {
                grid[y + offsetY][x + offsetX] = tetromino[y][x];
            }
        }
    }            
}

