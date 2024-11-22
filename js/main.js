let box = document.getElementById('boxAnimat');
let target = document.getElementById('target');
let scoreDisplay = document.getElementById('score');
let score = 0;
let letStart = document.getElementById('letStart');
let al = document.getElementById('al');
let content = document.getElementById('contentNone');
let text = document.getElementById('text');
let button = document.getElementById('button');
let startGame = document.getElementById('startGame');
let time = 40;
let firework = document.getElementById('firework');
let firework1 = document.getElementById('firework1');
let firework2 = document.getElementById('firework2');
let firework3 = document.getElementById('firework3');

box.tabIndex = 0;
document.body.style.overflow = "hidden";

function moveTarget() {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const x = Math.random() * (windowWidth - target.offsetWidth);
    const y = Math.random() * (windowHeight - target.offsetHeight);

    target.style.left = x + "px";
    target.style.top = y + "px";
}

function checkCollision() {
    const rectBox = box.getBoundingClientRect();
    const rectTarget = target.getBoundingClientRect();

    return !(
        rectBox.right < rectTarget.left ||
        rectBox.left > rectTarget.right || 
        rectBox.bottom < rectTarget.top ||
        rectBox.top > rectTarget.bottom
    );
}


function aye() {
    let count = time;
    let counter = setInterval(timer, 1000); 

    function timer() {
        count = count-1;
        if (count <= 0) {
            clearInterval(counter);
            if (score >= 15) {
                al.className = 'over';
                content.className = 'content';
                text.className = 'text';
                button.className = 'button';

                text.textContent = 'Вы набрали 15 очков за ' + time + ' секунд! В следуйщем уровне у вас будет ' + (time - 5) + 'секунд';
                button.textContent = 'Следующий уровень';

                button.onclick = function() {
                    time = time - 5;
                    if (time > 15) {
                    al.className = 'al';
                    content.className = 'contentNone';
                    score = 0;
                    
                    aye();
                    }
                    else if (time <= 15) {
                        text.textContent = 'вы прошли игру';
                        button.textContent = 'играть заного';
                        firework.className = 'firework';
                        firework1.className = 'firework1';
                        firework2.className = 'firework2';
                        firework3.className = 'firework3';
                        button.onclick = function() {
                            location.reload();
                        }
                    }
                }
            }
            else if (score < 15) {
                al.className = 'over';
                content.className = 'content';
                text.className = 'text';
                button.className = 'button';

                text.textContent = 'вы проиграли';
                button.textContent = 'заного';

                button.onclick =  function() { 
                    location.reload();
                }
            }
        }
        letStart.innerHTML = 'Осталось: ' + count + ' секунд';
    }

    
}

startGame.onclick = function() {
    aye();
}

box.addEventListener("keydown", function (event) {
    if (event.code != "ArrowRight" && event.code != "ArrowLeft" && event.code != "ArrowUp" && event.code != "ArrowDown") {
        return;
    }

    let rectElem = box.getBoundingClientRect();
    let x = rectElem.x + window.scrollX;
    let y = rectElem.y + window.scrollY;

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    if (event.code == "ArrowRight") {
        x += box.offsetWidth;
    }
    if (event.code == "ArrowLeft") {
        x -= box.offsetWidth;
    }
    if (event.code == "ArrowUp") {
        y -= box.offsetHeight;
    }
    if (event.code == "ArrowDown") {
        y += box.offsetHeight;
    }

    if (x < 0) {
        x = 0; 
    } else if (x + box.offsetWidth > windowWidth) {
        x = windowWidth - box.offsetWidth;
    }
    if (y < 0) {
        y = 0; 
    } else if (y + box.offsetHeight > windowHeight) {
        y = windowHeight - box.offsetHeight;
    }

    box.style.position = "absolute";
    box.style.left = x + "px";
    box.style.top = y + "px";

    
    if (checkCollision()) {
        score++;
        scoreDisplay.textContent = "Счет: " + score;
        moveTarget(); 
    }
});


moveTarget();