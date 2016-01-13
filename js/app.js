var allEnemies = [];

function makeRandomY() {
    var yArray = [50,100,150,200,250, 300, 350];
    return yArray[Math.floor(Math.random() * yArray.length)];
}

function makeRandomSpeed() {
    var speedArray = [100, 200, 300, 400, 500, 600];
    return speedArray[Math.floor(Math.random() * speedArray.length)];
}

// Enemies our player must avoid
var Enemy = function(y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = -2;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x > 505) {
        this.returnToStart();
    } else {
        this.x = this.x + dt * this.speed;
    }
};

Enemy.prototype.returnToStart = function returnToStart() {
    this.x = 0;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
var Player = function(x,y) {

    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
};

// This class requires an update(), render() and
Player.prototype.update = function(dt) {
    
    if (this.y < -50) {
        this.returnToStart();
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.returnToStart = function() {
    this.x = 200;
    this.y = 400;
};

// a handleInput() method.
Player.prototype.handleInput = function(keyCode) {
    if(keyCode === 'left')
        { this.x -= 100}
    if(keyCode === 'right')
        {this.x += 100}
    if (keyCode === 'down')
        {this.y += 100}
    if (keyCode === 'up') {
        this.y -= 100}
};


// Now instantiate your objects.
var enemy1 = new Enemy(makeRandomY(), makeRandomSpeed());
var enemy2 = new Enemy(makeRandomY(), makeRandomSpeed());
var enemy3 = new Enemy(makeRandomY(), makeRandomSpeed());

// Place all enemy objects in an array called allEnemies
allEnemies = [enemy1, enemy2, enemy3];

// Place the player object in a variable called player
var player = new Player(200, 420);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
