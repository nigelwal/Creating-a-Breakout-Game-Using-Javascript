//Setup the canvas
var canvas = document.getElementById("myCanvas");

//the ctx variable sets up the 2d context so we can paint on it
var ctx = canvas.getContext("2d");

//Setup other variables for the ball size and position
var ballColour = "#0095DD"
var ballRadius = 10;
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;

//Setup some bricks
var brickRowCount = 5;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

//Hold the bricks in a two-dimensional array - think of it as rows and columns
var bricks = [];
for(c=0; c<brickColumnCount; c++) {
	bricks[c] = [];
	for(r=0; r<brickRowCount; r++) {
		bricks[c][r] = { x: 0, y: 0, status: 1 };
	}
}

//This function draws the bricks
function drawBricks() {
	for(c=0; c<brickColumnCount; c++) {
		for(r=0; r<brickRowCount; r++) {
			var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
			var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
			bricks[c][r].x = brickX;
			bricks[c][r].y = brickY;
			ctx.beginPath();
			ctx.rect(brickX, brickY, brickWidth, brickHeight);
			ctx.fillStyle = "#0095DD";
			ctx.fill();
			ctx.closePath();
		}
	}
}

//Now Define the paddle
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;

//Monitor the document for events that move the paddle
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
}
function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
}

//This function draws the ball on the canvas
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = ballColour;
    ctx.fill();
    ctx.closePath();
}

//This function draws the paddle
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function draw() {
	//Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	//Draw the ball
    drawBall();
	
	//Draw the paddle
    drawPaddle();
	
	//Draw the bricks
	drawBricks();
    
//Bounce the ball off three walls - if it drops off the bottom - Game Over!
if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
	dx = -dx;
}
if(y + dy < ballRadius) {
	dy = -dy;
} else if (y + dy > canvas.height-ballRadius) {
	//Check if the ball is hitting the Paddle
	if(x > paddleX && x < paddleX + paddleWidth) {
		dy = -dy * 1.1;
	}
	else {
	alert("GAME OVER");
	document.location.reload();
  }
}
    
    if(rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += 4;
    }
    else if(leftPressed && paddleX > 0) {
        paddleX -= 4;
    }
    
    x += dx;
    y += dy;
}

setInterval(draw, 10);