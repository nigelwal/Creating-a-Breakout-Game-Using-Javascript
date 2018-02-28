//Setup the canvas
var canvas = document.getElementById("myCanvas");

//the ctx variable sets up the 2d context so we can paint on it
var ctx = canvas.getContext("2d");

//Setup other variables for the ball size and position
var ballRadius = 10;
var ballColour = "#0095DD"
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = ballColour;
    ctx.fill();
    ctx.closePath();
}

function draw() {
	//Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	//Draw the ball
    drawBall();
    
	//Bounce off the walls
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
		ballColour = "orange";
    }
    if(y + dy > canvas.height-ballRadius || y + dy < ballRadius) {
        dy = -dy;
		ballColour = "purple";
    }
    
    x += dx;
    y += dy;
}

setInterval(draw, 10);