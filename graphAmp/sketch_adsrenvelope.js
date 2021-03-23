var wave;
var playing;
var buttonPlay;
var env;

function setup() {
	createCanvas(200, 200);
	background(100);


	
	env = new p5.Envelope();
	env.setADSR(0.05, 0.1, 0.5, 1);
	env.setRange(0.8, 0);

	wave = new p5.Oscillator();
	wave.setType('sine');
	wave.start();
	wave.freq(440);
	wave.amp(env);

	buttonPlay = createButton('Play');
	buttonPlay.mousePressed(togglePlay);
}

function togglePlay(){
	env.play();
	// if(!playing){
	// 	playing=true;
	// 	wave.start();
	// 	wave.amp(0.1);
	// 	wave.freq(1000);
	// }
	// else{
	// 	playing=false;
	// 	wave.stop();
	// }
}

function draw() {

	if(!playing){
		background(0,255,0)
	} else {
		background(255,0,0);
	}

}