var allEnemies = [];

function makeRandomY() {
    var yArray = [50,100,150,200,250, 300, 350];
    return yArray[Math.floor(Math.random() * yArray.length)];
}

function makeRandomSpeed() {
    var speedArray = [100, 200, 300, 400];
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

// This is the Player's update function
Player.prototype.update = function(dt) {
    
    if (this.y == -75) {
        var myVar = setTimeout(this.returnToStart(),10000);
        alert("You WON!");
        
    }
};

//This is the Player's render function
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//This function returns the player to the Start
Player.prototype.returnToStart = function() {
    this.x = 200;
    this.y = 425;
    var enemy1 = new Enemy(makeRandomY(), makeRandomSpeed());
    var enemy2 = new Enemy(makeRandomY(), makeRandomSpeed());
    var enemy3 = new Enemy(makeRandomY(), makeRandomSpeed());
    allEnemies = [enemy1, enemy2, enemy3];
};

// a handleInput() method.
Player.prototype.handleInput = function(keyCode) {
    if(keyCode === 'left' && this.x >= 50)
        { this.x -= 100}
    if(keyCode === 'right' && this.x <= 350)
        {this.x += 100}
    if (keyCode === 'down' && this.y < 420)
        {this.y += 100}
    if (keyCode === 'up' && this.y >= 0) {
        this.y -= 100}
};

//This function checks for collisions
var checkCollisions = function(allEnemies, player) {
    for (var i = 0; i < allEnemies.length; i++) {
        if (((allEnemies[i].x - player.x) < 60) &&
            ((player.x - allEnemies[i].x) < 60)&&
            ((player.y - allEnemies[i].y) < 60)&& 
            ((allEnemies[i].y - player.y) < 60)) {
                alert("You LOST!  Please try again.");
                player.returnToStart();
            }
        }
};
// Now instantiate your objects.
var enemy1 = new Enemy(makeRandomY(), makeRandomSpeed());
var enemy2 = new Enemy(makeRandomY(), makeRandomSpeed());
var enemy3 = new Enemy(makeRandomY(), makeRandomSpeed());

// Place all enemy objects in an array called allEnemies
allEnemies = [enemy1, enemy2, enemy3];

// Place the player object in a variable called player
var player = new Player(200, 425);


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
