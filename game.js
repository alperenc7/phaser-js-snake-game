var game = new Phaser.Game(600, 600, Phaser.AUTO, '',{preload:preload,create:create,update:update});

var snake = new Array();
var initialSnakeLength = 7;
var speed = 4;
var count = speed;
var direction = "right";
var characterScale = 2;
var squareSize = 15 * characterScale;
var apple;
var width,height;
var updateXY = {up: {x: 0, y: -1}, down: {x: 0, y: 1}, left: {x: -1, y: 0}, right: {x: 1, y: 0}};
var cursors;


function preload() {
    this.game.load.image('snake', 'assets/gfx/snake.png');
    this.game.load.image('apple', 'assets/gfx/apple.png');
};

function create() {

    width  = Math.floor(this.game.world.width / squareSize);
    height = Math.floor(this.game.world.height / squareSize);

    apple = this.game.add.sprite(0, 0, 'apple');
    apple.scale.set(characterScale);
    apple.visible = false;

    cursors = this.game.input.keyboard.createCursorKeys();   


    console.log(game);

    createSnake();
    drawApple();
};


function update() {

    updateDirection();
    moveSnake();
    snakeEatApple();
    snakeOut();
    checkGameOver();
};

function createSnake(){
    for (var i = 0; i < initialSnakeLength; ++i) {
        // var t = snake.push(this.game.add.sprite(50,50, 'snake'));
        var t = this.game.add.sprite(this.game.world.centerX + i * squareSize, this.game.world.centerY, 'snake');
        t.scale.set(characterScale);
        snake.push(t);
    }
}

function drawApple(){
    var posX = this.game.rnd.integerInRange(0, width - 1);
    var posY = this.game.rnd.integerInRange(0, height - 1);
    var collidingWithSnake = false;
    for (var i = 0; i < snake.length; ++i) {
        if (posX == snake[i].x && posY == snake[i].y) {
            collidingWithSnake = true;
            break;
        }
    }
    if (!collidingWithSnake) apple.reset(posX * squareSize, posY * squareSize);
    else drawApple();
}


function updateDirection(){
    if (cursors.up.isDown && direction != "down") {
        direction = "up";
    }
    else if (cursors.down.isDown && direction != "up") {
        direction = "down";
    }
    else if (cursors.left.isDown && direction != "right") {
        direction = "left";
    }
    else if (cursors.right.isDown && direction != "left") {
        direction = "right";
    }
}

function moveSnake(){
    --count;
    if (count == 0) {
        count = speed;
        var tail = snake.shift();
        tail.x = snake[snake.length - 1].x + updateXY[direction].x * squareSize;
        tail.y = snake[snake.length - 1].y + updateXY[direction].y * squareSize;
        snake.push(tail);
    }
}

function snakeEatApple(){
    var head = snake[snake.length - 1];
    if (head.x == apple.x && head.y == apple.y) {
        console.log("alperen");
        growSnake();
        drawApple();
    }
}

function growSnake() {
    var tail = snake[0];
    var x = snake[snake.length - 1].x + updateXY[direction].x * squareSize;
    var y = snake[snake.length - 1].y + updateXY[direction].y * squareSize;
    var t = this.game.add.sprite(x, y, 'snake');
    t.scale.set(characterScale);
    snake.push(t);
}

function snakeOut(){

    if(snake[snake.length-1].x > this.game.width){
        snake[snake.length-1].x = 0;
        direction = "right";
    }
    if(snake[snake.length-1].x < 0){
        snake[snake.length-1].x = this.game.width;
        direction = "left";
    }
    if(snake[snake.length-1].y < 0){
        snake[snake.length-1].y = this.game.height;
        direction = "up";
    }
    if(snake[snake.length-1].y > this.game.height){
        snake[snake.length-1].y = 0;
        direction = "down";
    }

    console.log(snake[snake.length-1].y);
}

function checkGameOver(){
    var head = snake[snake.length - 1];
    for (var i = 0; i < snake.length - 1; ++i) {
        if (head.x == snake[i].x && head.y == snake[i].y) {
            // olmadı
            this.game.state.restart();
        }
    }
}


