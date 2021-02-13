import {update as updateSnake, draw as drawSnake, getSnakeHead, snakeIntersection, SNAKE_SPEED} from './snake.js'
import {update as updateFood, draw as drawFood} from './food.js'
import {outsideGrid} from './grid.js'

let lastRenderTime = 0;
let gameOver = false;
const gameBoard = document.getElementById('game-board')
const start = document.getElementById('start-text')
const end = document.getElementById('game-over-text')

//Game Loop
function main(currentTime){
    if(gameOver){
       end.classList.add('visible');
       setInterval(()=>{ window.location.reload(); }, 3000);
       return
    }
    window.requestAnimationFrame(main);
    start.addEventListener('click', ()=>{
        start.classList.remove('visible');
    });
    start.addEventListener('touchstart', ()=>{
        start.classList.remove('visible');
});
    const secondSinceLastRender = (currentTime - lastRenderTime) / 1000;
    if (secondSinceLastRender < 1 /SNAKE_SPEED) return
    lastRenderTime = currentTime;

    update()
    draw()
}

window.requestAnimationFrame(main)
window.addEventListener('scroll', noScroll);

function noScroll() {
    window.scrollTo(0, 0);
}

function update(){
    updateSnake();
    updateFood();
    checkDeath();
}

function draw(){
    gameBoard.innerHTML = '';
    drawSnake(gameBoard);
    drawFood(gameBoard)  
}

function checkDeath(){
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
}