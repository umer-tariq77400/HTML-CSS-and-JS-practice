// Variables
const board = document.querySelector('.board');
let direction = {x:0, y:0};
let snakeDirection = 180;
let score = 0;
let snakeArr = [
    {x: 11, y: 13, direction: snakeDirection}
];
// Ensure food always spawns within grid bounds (1..32, 1..14)
let food = {x: Math.floor(Math.random() * 32) + 1, y: Math.floor(Math.random() * 14) + 1};
let previousTime = 0;
let speed = 10;

// Starting game loop
window.requestAnimationFrame(main);

function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - previousTime)/1000 < 1/speed)
    {
        return;
    }
    previousTime = ctime;
    updateFrame();
}

// Saving high score in the local storage
if (window.localStorage.getItem('High Score') === null) {
    window.localStorage.setItem('High Score', '0');
}
let highScore = parseInt(window.localStorage.getItem('High Score'), 10) || 0;
// Initialize high score UI on load if element exists
{
    const hsEl = document.querySelector('.highScore');
    if (hsEl) hsEl.innerText = `High Score: ${highScore}`;
}

// Change direction on button clicks(up, down, left, right)
window.addEventListener('keydown', e => {
    switch(e.key) {
        case 'ArrowUp':
            if (direction.y === 1) return; // Prevent going back on itself
            direction = {x: 0, y: -1};
            snakeDirection = 180;
            // Optionally reflect rotation immediately (position update happens in next frame)
            if (snakeArr[0]) snakeArr[0].direction = snakeDirection;
            break;
        case 'ArrowDown':
            if (direction.y === -1) return; // Prevent going back on itself
            direction = {x: 0, y: 1};
            snakeDirection = 0;
            if (snakeArr[0]) snakeArr[0].direction = snakeDirection;
            break;
        case 'ArrowLeft':
            if (direction.x === 1) return; // Prevent going back on itself
            direction = {x: -1, y: 0};
            snakeDirection = 90;
            if (snakeArr[0]) snakeArr[0].direction = snakeDirection;
            break;
        case 'ArrowRight':
            if (direction.x === -1) return; // Prevent going back on itself
            direction = {x: 1, y: 0};
            snakeDirection = -90;
            if (snakeArr[0]) snakeArr[0].direction = snakeDirection;
            break;
    }
})

// Functions for game logic

function updateFrame(){
    moveSnake();

    if(isCollision()){
        // restart the game
        score = 0;
        document.querySelector('.score').innerText = `Score: ${score}`;
    snakeDirection = 180;
    snakeArr = [{x: 11, y: 13, direction: snakeDirection}];
    direction = {x: 0, y: 0};
    food = {x: Math.floor(Math.random() * 32) + 1, y: Math.floor(Math.random() * 14) + 1};
    }

    displayFood(food.x, food.y);
    if (isFoodEaten()){
        // Update score and change the location of the food
        score += 1;
        document.querySelector('.score').innerText = `Score: ${score}`;
        food = {x: Math.floor(Math.random() * 32) + 1, y: Math.floor(Math.random() * 14) + 1};
        growSnake();
    }
    // Update high score only when the current score exceeds it
    if (score > highScore) {
        highScore = score;
        window.localStorage.setItem('High Score', String(highScore));
        const hsEl = document.querySelector('.highScore');
        if (hsEl) hsEl.innerText = `High Score: ${highScore}`;
    }
}

function moveSnake(){
    // Move the snake (update positions)
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = {...snakeArr[i]};
    }
    snakeArr[0].x += direction.x;
    snakeArr[0].y += direction.y;
    // Update head rotation based on current input direction
    if (snakeArr[0]) {
        snakeArr[0].direction = snakeDirection;
    }

    // Clear previous frame before rendering to avoid duplicates
    board.innerHTML = '';

    // Displaying the snake
    snakeArr.forEach((segment, index) => {
        const snakeElement = document.createElement('div');
        if (index === 0){
            snakeElement.classList.add('snakeHead');
            snakeElement.style.transform = `scale(1.3) rotate(${segment.direction}deg)`; // Apply rotation based on direction
        }
        else {
            snakeElement.classList.add('snakeBody'); 
            snakeElement.style.transform = `rotate(${segment.direction - 90}deg)`; // Apply rotation based on direction
        }
        snakeElement.style.gridRowStart = segment.y;
        snakeElement.style.gridColumnStart = segment.x;
        board.appendChild(snakeElement);
    })
}

function isCollision(){
    // Check if the snake collides with itself or the walls
    const head = snakeArr[0];
    if (head.x < 1 || head.x > 32 || head.y < 1 || head.y > 14) {
        return true; // Collision with walls
    }
    for (let i = 1; i < snakeArr.length; i++) {
        if (snakeArr[i].x === head.x && snakeArr[i].y === head.y) {
            return true; // Collision with itself
        }
    }
    return false;
}

function displayFood(x, y){
    let foodElement = document.createElement('div');
    foodElement.classList.add('food');
    foodElement.style.gridRowStart = y;
    foodElement.style.gridColumnStart = x;
    board.appendChild(foodElement);
}

function isFoodEaten(){
    // Check if the snake's head is at the same position as the food
    return snakeArr[0].x === food.x && snakeArr[0].y === food.y;
}

function growSnake(){
    // Add a new segment to the snake
    const newSegment = {...snakeArr[snakeArr.length - 1]};
    snakeArr.push(newSegment);
}
