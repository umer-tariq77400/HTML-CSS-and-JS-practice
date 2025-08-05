let score = 0;
let cross = true;

document.onkeydown = function (e) {
    if (e.keyCode === 38) {
        jump();
    }
    if (e.keyCode === 39) {
        let dino = document.querySelector('.dino');
        let dinoX = parseInt(window.getComputedStyle(dino).getPropertyValue('left'));
        dino.style.left = (dinoX + 100 )+ 'px';
    }
    if (e.keyCode === 37) {
        let dino = document.querySelector('.dino');
        let dinoX = parseInt(window.getComputedStyle(dino).getPropertyValue('left'));
        dino.style.left = (dinoX - 100) + 'px';
    }
}

function jump() {
    let dino = document.querySelector('.dino');
    dino.classList.add('jump');
    setTimeout(function () {
        dino.classList.remove('jump');
    }, 700);
}

setInterval(function () {
    let dino = document.querySelector('.dino');
    let gameOver = document.querySelector('.gameOver');
    let obstacle = document.querySelector('.obstacle');

    dx = parseInt(window.getComputedStyle(dino).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(dino).getPropertyValue('bottom'));
    ox = parseInt(window.getComputedStyle(obstacle).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle).getPropertyValue('bottom'));

    offsetX = Math.abs(dx - ox);
    offsetY = Math.abs(dy - oy);

    if (offsetX < 73 && offsetY < 100) {
        gameOver.style.display = 'block';
        obstacle.classList.remove('moveObstacle');
        dino.style.display = 'none';
    }
    else if(offsetX < 150 && cross) {
        score += 1;
        updateScore(score);
        cross = false;
        setTimeout(function () {
            cross = true;
        }, 1000);
        setTimeout(() => {
            let aniDur = dx = parseFloat(window.getComputedStyle(obstacle).getPropertyValue('animation-duration'));
            if (aniDur > 3)
            {
                newDur = aniDur - 0.1;
                obstacle.style.animationDuration = newDur + 's';
            }
        }, 2000);
    }
}, 10);

function updateScore(score) {
    let scoreCont = document.querySelector('.scoreCont');
    scoreCont.innerHTML = "Your Score: " + score;
}