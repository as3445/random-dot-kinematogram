state = {
	ndots: parseInt(document.getElementById('ndots').value),
	ellipse: [],
	percentConform: parseInt(document.getElementById('percentConform').value),
	canvasX: 200,
	canvasY: 200,
	maxLife: 30,
	speed: parseInt(document.getElementById('speed').value),
	direction: parseInt(document.getElementById('direction').value),
	dotSize: 7,
}

function setup() {
	createCanvas(state.canvasX, state.canvasY);
	// noSmooth();
	renderDots();
	updateSpeed();
	updateDirection();
	// Event Handlers
	document.getElementById('ndots').onchange = renderDots;
	document.getElementById('percentConform').onchange = moveDots;
	document.getElementById('speed').onchange = updateSpeed;
	document.getElementById('direction').onchange = updateDirection;
}

function draw() {
	moveDots();
}

function renderDots() {
	background(255);
	state.ndots = parseInt(document.getElementById('ndots').value);
	document.getElementById('nDotsValue').innerHTML = state.ndots;
	for (var i = 0; i <= state.ndots; i++) {
		x = ceil(random(state.canvasX));
		y = ceil(random(state.canvasY));
		ellipse(x, y, state.dotSize).fill(51);
		direction = generateDirection()
		state.ellipse.push({
			x: x,
			y: y,
			life: ceil(random(state.maxLife)),
			directionX: direction[0],
			directionY: direction[1],
		});
	}
}

function moveDots() {
	background(255);
	state.percentConform = parseInt(document.getElementById('percentConform').value);
	document.getElementById('percentConfirmValue').innerHTML = state.percentConform;
	numDotsMove = ceil((state.percentConform/100) * state.ndots);

	// Move conforming dots
	for (var i = 0; i <= numDotsMove; i++) {
		state.ellipse[i].x = state.ellipse[i].x + (state.speed*generateDirection(state.direction)[0]);
		state.ellipse[i].y = state.ellipse[i].y + (state.speed*generateDirection(state.direction)[1]);
		state.ellipse[i].life -= 1;
		if (state.ellipse[i].life < 0) { respawn(i); }
		ellipse(state.ellipse[i].x, state.ellipse[i].y, state.dotSize).fill(51);

		if (isOutOfCanvas(i)) { // bring dot back on screen
			respawn(i);
		}
	}

	// Move nonconforming dots
	for (var i = numDotsMove; i <= state.ndots; i++){
		state.ellipse[i].life -= 1;
		if (state.ellipse[i].life < 0) { respawn(i); }
		state.ellipse[i].x = state.ellipse[i].x + state.ellipse[i].directionX*state.speed;
		state.ellipse[i].y = state.ellipse[i].y + state.ellipse[i].directionY*state.speed;
		ellipse(state.ellipse[i].x, state.ellipse[i].y, state.dotSize).fill(51);
	}
	
}

function respawn(dotIndex) {
	x = ceil(random(state.canvasX));
	y = ceil(random(state.canvasY));
	state.ellipse[dotIndex].x = x;
	state.ellipse[dotIndex].y = y;
	state.ellipse[dotIndex].life = ceil(random(state.maxLife));
}

function updateSpeed () {
	state.speed = parseInt(document.getElementById('speed').value);
	document.getElementById('speedValue').innerHTML = state.speed;
};

function updateDirection () {
	state.direction = parseInt(document.getElementById('direction').value);
	document.getElementById('directionValue').innerHTML = state.direction;
}


// ********** Helper functions **********

function toRadians (angle) {
  return angle * (Math.PI / 180);
}

// Takes direction in degrees and returns a direction array as [x, y]
function generateDirection(direction) {
	if (!direction && direction !== 0) {
		direction = Math.random() * 2 * Math.PI;
	} else {
		direction = toRadians(direction);
	}
	return [Math.cos(direction), Math.sin(direction)];
}

function isOutOfCanvas(dotIndex) {
	return 	(state.ellipse[dotIndex].x > state.canvasX ||
			state.ellipse[dotIndex].x < 0 ||
			state.ellipse[dotIndex].y > state.canvasY ||
			state.ellipse[dotIndex].y < 0);
}