var wave;
var playing;
var buttonPlay;
var sliderFreq;

function setup() {
	createCanvas(200, 200);
	background(100);

	wave = new p5.Oscillator();
	wave.setType('sine');
	

	buttonPlay = createButton('Play');
	buttonPlay.mousePressed(togglePlay);

	sliderFreq = createSlider(100, 1200, 440)
}

function togglePlay(){
	if(!playing){
		playing=true;
		wave.start();
		wave.amp(0.1);
		wave.freq(1000);
	}
	else{
		playing=false;
		wave.stop();
	}
}

function draw() {
	wave.freq(sliderFreq.value())
	if(!playing){
		background(0,255,0)
	} else {
		background(255,0,0);
	}

}