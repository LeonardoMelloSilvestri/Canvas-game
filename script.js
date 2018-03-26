var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var bloco = {
	height: 20,
	width: 140,
	x: canvas.width / 2 - 70,
	y: 570,
	speed: 30,
	score: 0,
	color: "White"
}

var bola = {
	height: 20,
	width: 20,
	x: Math.floor((Math.random() * 790) + 10),
	y: 0,
	modificador: 0,
	speed: 4 + this.modificador,
	color: "White"
}

var moveEsquerda = moveDireita = false;

window.addEventListener("keydown", teclaPressionada, false);
window.addEventListener("keyup", teclaNaoPressionada, false);

function teclaPressionada(e){
	var key = e.keyCode;
	switch (key) {
		case 37:
			moveEsquerda = true;
			break;
		case 39:
			moveDireita = true;
			break;
	}
}

function teclaNaoPressionada(e){
	var key = e.keyCode;
	switch (key) {
		case 37:
			moveEsquerda = false;
			break;
		case 39:
			moveDireita = false;
			break;
	}
}

function colisao(){
	if (bola.y + bola.height > bloco.y &&
		bola.x + bola.width > bloco.x &&
		bola.x < bloco.x + bloco.width &&
		bola.y <= bloco.y + bloco.height) {
		bloco.score++;
		bola.modificador += 1;
		bola.x = Math.floor((Math.random() * 770) + 30);
		bola.y = 0;
	}
}

function moverBloco(){
	if (moveEsquerda == true && bloco.x > 0) {
		bloco.x -= bloco.speed;
	} else if (moveDireita == true && bloco.x + bloco.width < canvas.width) {
		bloco.x += bloco.speed;
	}
}

function moveBola(){
	if (bola.y + bola.height <= canvas.height) {
		bola.y += (bola.speed + bola.modificador)
	} else {
		bola.x = Math.floor((Math.random() * 770) + 30);
		bola.y = 0;
		bloco.score = 0;
		bola.speed = 4;
		bola.modificador = 0;
	}
}

function atualizar(){
	moverBloco();
	moveBola();
	colisao();
}

function desenha(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	ctx.fillStyle = bloco.color;
	ctx.fillRect(bloco.x, bloco.y, bloco.width, bloco.height);
	ctx.fillStyle = bola.color;
	ctx.fillRect(bola.x, bola.y, bola.width, bola.height);

	ctx.font = "30px Cursive";
	ctx.fillText("Score: " + bloco.score, 10, 30);
	ctx.fillText("Velocidade: " + (bola.speed + bola.modificador - 3), 580, 30);
}

function loop(){
	window.requestAnimationFrame(loop, canvas);
	atualizar();
	desenha();
}

loop();