title = "Hitobashira";

description = `
Escape
`;

const G = {
	WIDTH: 100,
	HEIGHT: 150
	
}

characters = [`
   RR
  RRRR
  RRRR
  RRRR
   RR
   RR
`
];

var mousedownID = -1;

options = {
	viewSize: {x: G.WIDTH, y: G.HEIGHT},
	theme: "dark",
	isCapturing: true,
	isCapturingGameCanvasOnly: true,
	captureCanvasScale: 2,
	seed: 27
};

/**
 * @typedef {{
 * pos: Vector,
 * direction: number
 * }} Player
 */

/**
 * @type { Player }
 */
let player;

document.addEventListener("mousedown", mousedown);
document.addEventListener("mouseup", mouseup);

function update() {
	if (!ticks) {
		player = {
			pos: vec(G.WIDTH * 0.5, G.HEIGHT-4),
			direction: 1
		};

	}
	color("light_black");
	rect(0,0,15+ticks * .01,G.HEIGHT);
	rect(G.WIDTH,0,-15-ticks * .01,G.HEIGHT);
	color("red");
	char("a", player.pos);
	const isCollidingWithWall = char("a", player.pos).isColliding.rect.light_black;
	if(isCollidingWithWall){
		player.direction *= -1;
		play("hit");
		if(player.pos.x < 50){
			player.pos.x += 2;
		}
		else{
			player.pos.x -= 2;
		}
	}
	if(ticks >= 3600){
		end();
		color("black")
		text("You Can't", G.WIDTH * 0.25, G.HEIGHT * 0.25);
	}
	
}

function mousedown(){
	if(mousedownID==-1)  //Prevent multimple loops!
    mousedownID = setInterval(whilemousedown, 100 /*execute every 100ms*/);
}

function mouseup(){
	if (player.direction == 1){
		player.direction = -1;
	}
	else{
		player.direction = 1;
	}
	if(mousedownID!=-1) {  //Only stop if exists
		clearInterval(mousedownID);
		mousedownID=-1;
	  }
}

function whilemousedown(){
	if (player.direction == 1){
		player.pos.x++;
	}
	else{
		player.pos.x--;
	}
}