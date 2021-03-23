var mic;

function setup() {
	mic = new p5.AudioIn();
	mic.start();
}



function draw() {
	background(50);
	fill(255);
	//text('tap to start', width/2, 20);

	let micLevel = mic.getLevel();
	let y = height - micLevel * height;
	ellipse(width/2, y, 10, 10);

	ellipse(width/2, height/2, 100, micLevel*100+10);
}