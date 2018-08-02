state = {
	ndots: parseInt(document.getElementById('ndots').value),
	ellipse: [],
	percentConform: parseInt(document.getElementById('percentConform').value),
	canvasX: 200,
	canvasY: 200,
	maxLife: 60,
	speed: parseInt(document.getElementById('speed').value),
	dotSize: 7,
}

function setup() {
	createCanvas(state.canvasX, state.canvasY);
	// noSmooth();
	renderDots();
	updateSpeed();
	// Event Handlers
	document.getElementById('ndots').onchange = renderDots;
	document.getElementById('percentConform').onchange = moveDots;
	document.getElementById('speed').onchange = updateSpeed;
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
		state.ellipse.push({x: x, y: y, life: ceil(random(state.maxLife))});
	}
}

function moveDots() {
	background(255);
	state.percentConform = parseInt(document.getElementById('percentConform').value);
	document.getElementById('percentConfirmValue').innerHTML = state.percentConform;
	numDotsMove = ceil((state.percentConform/100) * state.ndots);
	for (var i = 0; i <= numDotsMove; i++) {
		state.ellipse[i].x = state.ellipse[i].x + state.speed;
		state.ellipse[i].life -= 1;
		if (state.ellipse[i].life < 0) { respawn(i); }
		ellipse(state.ellipse[i].x, state.ellipse[i].y, state.dotSize).fill(51);

		if (state.ellipse[i].x > state.canvasX) { // bring dot back on screen
			state.ellipse[i].x = 0;
		}
	}
	for (var i = numDotsMove; i <= state.ndots; i++){
		state.ellipse[i].life -= 1;
		if (state.ellipse[i].life < 0) { respawn(i); }
		state.ellipse[i].x = state.ellipse[i].x + random(-1, 1)*state.speed;
		state.ellipse[i].y = state.ellipse[i].y + random(-1, 1)*state.speed;
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