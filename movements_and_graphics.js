const ROWS = 14;
const COLS = 10;

const gridElement = document.getElementById('game_label');
let grid = Array.from({ length: ROWS }, () => Array(COLS).fill(0));

function createGrid() {
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
          const cell = document.createElement('div');
          cell.classList.add('cell');
          cell.id = `cell-${row}-${col}`;
          gridElement.appendChild(cell);
      }
    }
}

createGrid();

const I = [
    [0,0,0],
    [1,1,1],
    [0,0,0]
]

const O = [
    [1,1,0],
    [1,1,0],
    [0,0,0]
]

const L = [
    [1,0,0],
    [1,1,1],
    [0,0,0]
]

const T = [
    [1,1,1],
    [0,1,0],
    [0,1,0]
]

const S = [
    [0,1,1],
    [1,1,0],
    [0,0,0]
]

const Z = [
    [1,1,0],
    [0,1,1],
    [0,0,0]
]

let tetraminoX = 6;
let tetraminoY = 0;

function drawTetramino(){
    O.forEach((row, rowIndex) => {
        row.forEach((value,colIndex)=> {
            if(value === 1){
                const cell = document.getElementById(`cell-${tetraminoY + rowIndex}-${tetraminoX + colIndex}`);
                if(cell){
                    cell.classList.add('active');
                }
            }
        });
    });
}

function clearTetromino() {
    const activeCells = document.querySelectorAll('.active');
    activeCells.forEach(cell => {
      cell.classList.remove('active');
    });
  }

function moveTetramino(event){

    clearTetromino();
    tetraminoY++;
    let direction = event.key;
    switch(direction){
        case "ArrowRight":
            tetraminoX++;
            break;
        case "ArrowLeft":
            tetraminoX = tetraminoX - 1;
            break;
        case "ArrowDown":
            tetraminoY++;
            break;
    }

    drawTetramino();
}
document.addEventListener('keydown',moveTetramino);


function automovementTetr(){
    clearTetromino();
    tetraminoY++;
    drawTetramino();
}

setInterval(automovementTetr,1000);