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

let tetraminoX = 4;
let tetraminoY = 0;

let activeTetramino = [I, O, L, T, S, Z];

function newTetramino() {
    const randomTetramino = Math.floor(Math.random() * activeTetramino.length);
    return activeTetramino[randomTetramino];
    
}


let Tetrandom = newTetramino();

function drawTetramino(){
    Tetrandom.forEach((row, rowIndex) => {
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


document.addEventListener('keydown',moveTetramino);


function automovementTetr(){
    clearTetromino();
    tetraminoY++;
     if (checkCollision(Tetrandom, tetraminoX, tetraminoY)) {
        tetraminoY--; 
        lockTetramino(Tetrandom, tetraminoX, tetraminoY);

        delatedTetramino(grid);

        Tetrandom = newTetramino();
        tetraminoX = 4; 
        tetraminoY = 0;
    }
    drawTetramino();
}

function checkCollision(Tetrandom, offsetX, offsetY) {
    for(let y = 0; y < Tetrandom.length; y++ ) {
        for(let x = 0; x < Tetrandom[y].length; x++) {
            if(Tetrandom[y][x]) {

                if (
                    x + offsetX < 0 || // collision left
                    x + offsetX >= COLS || // collision right
                    y + offsetY >= ROWS || // collision end label
                    grid[y + offsetY] && grid[y + offsetY][x + offsetX] // collision other tetramino               
                ) {
                    return true;
                }  
            }
        }
    }
    return false;
}

function lockTetramino(Tetrandom, offsetX, offsetY) {
    for(let y = 0; y < Tetrandom.length; y++ ) {
        for(let x = 0; x < Tetrandom[y].length; x++) {
     
            if(Tetrandom[y][x]) {
                grid[y + offsetY][x + offsetX] = Tetrandom[y][x];

                const cell = document.getElementById(`cell-${y + offsetY}-${x + offsetX}`);
                if (cell) {
                    cell.classList.add('locked');
                }
            }
        }
    }            
}


window.onload = function() {

    let startTime = Date.now();
    let min = 0;


    setInterval(function() {

        let stopWatch = Date.now() - startTime;

        let seconds = Math.floor(stopWatch / 1000);

        let label = document.getElementsByClassName("time_label")[0];

        if (seconds === 60){
            seconds = 0;
            startTime = Date.now();
            min = min + 1;
        } 

        label.innerText = String(min) + ":" + String(seconds) ;

    }, 1000);

};


setInterval(automovementTetr,1000);



let points = 0;

let label_points = document.getElementsByClassName("score_label")[0];
label_points.innerText = points; 

function addPoints(){
    
    points += 100;

    label_points.innerText = points;    
}


//background


const numPoints = 200; 
const pointsContainer = document.querySelector('.points-container');

for (let i = 0; i < numPoints; i++) {
  const point = document.createElement('div');
  point.classList.add('point');

  // Posizione casuale nel body
  const randomX = Math.random() * window.innerWidth;
  const randomY = Math.random() * window.innerHeight;

  point.style.left = `${randomX}px`;
  point.style.top = `${randomY}px`;

  pointsContainer.appendChild(point);
}
