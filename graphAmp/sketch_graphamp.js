
let song;

let amp;
let fft;
let ftt_bins;
let freq_width;
let peakLow;
let peakMid;
let peakHigh;

var onsetLow,beatLow;

let buttonPlay;
let sliderVolume;

let volHistory = [];
let peakLowHistory = [];
let peakMidHistory = [];
let peakHighHistory = [];
let beatLowHistory = [];
let onsetLowHistory = [];


function setup() {
	createCanvas(600, 300);
	colorMode(HSB);

	let song1File = "audio/Digi GAlessio - darix togni.mp3";
	let song2File = "audio/Monkey Warhol - Lunar Phases.mp3";
	let song3File = "audio/rock.mp3";
	let song4File = "audio/telepatia_short.mp3";

	// Load song
	song = loadSound(song3File, loaded);

	// Set FTT bins
	ftt_bins = 64;
	freq_width = width / ftt_bins;
}

function loaded(){
	// Create the button only after the song is loaded
	buttonPlay = createButton("Play");
	buttonPlay.mousePressed(togglePlaying);

	// Create volume slider
	sliderVolume = createSlider(0, 1, 0.5, 0.01);

	console.log("Song loaded");
}

function togglePlaying(){
	if (!song.isPlaying()){
		song.play();
		
		// Amplitude
		amp = new p5.Amplitude();
		amp.setInput(song);
		
		fft = new p5.FFT(0.7, ftt_bins);
		fft.setInput(song);

		peakLow = new p5.PeakDetect(40,120,threshold=0.7);
		peakMid = new p5.PeakDetect(5000,10000,threshold=0.7);
		peakHigh = new p5.PeakDetect(10000,20000,threshold=0.7);

		onsetLow = new OnsetDetect(40,120,"bass",0.025);
   		beatLow = new BeatDetect(40,120,"bass",0.95);
		
		buttonPlay.html("Stop")
	}
	else{
		song.stop();
		amp = null;
		fft = null;
		peak = null;
		buttonPlay.html("Play")
	}
}

function draw() {
	background(0);
	

	if (song.isPlaying()){
		song.setVolume(sliderVolume.value());

		let vol = amp.getLevel();
		let volMap = map(vol, 0, 1, height, 0);
		volHistory.push(volMap);

		let spectrum = fft.analyze();

		peakLow.update(fft);
		if (peakLow.isDetected) {
			peakLowHistory.push(1);
		} else {
			peakLowHistory.push(0);
		}

		peakMid.update(fft);
		if (peakMid.isDetected) {
			peakMidHistory.push(1);
		} else {
			peakMidHistory.push(0);
		}

		peakHigh.update(fft);
		if (peakHigh.isDetected) {
			peakHighHistory.push(1);
		} else {
			peakHighHistory.push(0);
		}

		// onsetLow.update(fft);
		// if (onsetLow.isDetected) {
		// 	onsetLowHistory.push(1);
		// } else {
		// 	onsetLowHistory.push(0);
		// }

		// beatLow.update(fft);
		// if (beatLow.isDetected) {
		// 	console.log('beat');
		// 	beatLowHistory.push(1);
		// } else {
		// 	beatLowHistory.push(0);
		// 	console.log('no beat');
		// }

		push();
		
		beginShape();
		noFill();
		translate(0, -height/2)
		for(var i = 0; i < volHistory.length; i++) {

			stroke(0, 0, 255);
			vertex(i, volHistory[i]);
			//console.log(i, y)

			if(peakLowHistory[i] == 1) {
				stroke(10, 255, 255);
				line(i, 0, i, height)
			}

			// if(peakMidHistory[i] == 1) {
			// 	stroke(0, 255, 0);
			// 	line(i, 0, i, height)
			// }

			// if(peakHighHistory[i] == 1) {
			// 	stroke(100, 100, 255);
			// 	line(i, 0, i, height)
			// }

			// if(beatLowHistory[i] == 1) {
			// 	stroke(255, 0, 255);
			// 	line(i, 0, i, height)
			// }

			// if(onsetLowHistory[i] == 1) {
			// 	stroke(255, 0, 255);
			// 	line(i, 0, i, height)
			// }
		}
		endShape();

		if (volHistory.length > width-50) {
			volHistory.splice(0, 1);
			peakLowHistory.splice(0, 1);
			peakMidHistory.splice(0, 1);
			peakHighHistory.splice(0, 1);
			//beatLowHistory.splice(0, 1);
		}
		pop();

		for (let i = 0; i < spectrum.length; i++) {
			let amp = spectrum[i];
			let y = map(amp, 0, 255, height, height/2);
			fill(i, 255, 255);
			//line(i*freq_width, height, i*freq_width, y); 
			rect(i*freq_width, y, freq_width, height - y);
		}

		if(peakLowHistory[volHistory.length-1] == 1) {
			stroke(1, 0, 255);
			strokeWeight(3);
		} else {
			stroke(1, 255, 255);
			strokeWeight(1);
		}
		line(volHistory.length, 0, volHistory.length, height/2);
	}
	else{
		volHistory = [];
		peakLowHistory = [];
		peakMidHistory = [];
		peakHighHistory = [];
		onsetLowHistory = [];
		beatLow = [];
	}
	//console.log(vol)
}


function OnsetDetect(f1,f2,str,thresh){
    this.isDetected = false;
    this.f1=f1;
    this.f2=f2;
    this.str = str;
    this.treshold = thresh;
    this.energy = 0;
    this.penergy =0;
    this.siz = 10;
    this.sensitivity = 10;
}

OnsetDetect.prototype.display = function(x,y) {

    if(this.isDetected == true){
        this.siz = lerp(this.siz,40,0.99);
    }
    else if (this.isDetected == false){
        this.siz = lerp(this.siz,15,0.99);
    }
    fill(255,0,0);
    ellipse(x,y,this.siz,this.siz);
    fill(0);
    text(this.str,x,y);
    text("( "+this.f1+" - "+this.f2+"Hz )",x,y+10);
}

OnsetDetect.prototype.update = function(fftObject) {
    this.energy = fftObject.getEnergy(this.f1,this.f2)/255;

    if(this.isDetected == false){
        if (this.energy-this.penergy > this.treshold){
            this.isDetected = true;
            var self = this;
            setTimeout(function () {
                self.isDetected = false;
            },this.sensitivity);
        }
    }

    this.penergy = this.energy;

}


function BeatDetect(f1,f2,str,thresh){
    this.isDetected = false;
    this.f1=f1;
    this.f2=f2;
    this.str = str;
    this.treshold = thresh;
    this.energy = 0;

    this.siz = 10;
    this.sensitivity = 500;
}

BeatDetect.prototype.display = function(x,y) {

    if(this.isDetected == true){
        this.siz = lerp(this.siz,40,0.99);
    }
    else if (this.isDetected == false){
        this.siz = lerp(this.siz,15,0.99);
    }
    fill(255,0,0);
    ellipse(x,y,this.siz,this.siz);
    fill(0);
    text(this.str,x,y);
    text("( "+this.f1+" - "+this.f2+"Hz )",x,y+10);
}

BeatDetect.prototype.update = function(fftObject) {
    this.energy = fftObject.getEnergy(this.f1,this.f2)/255;

	console.log(this.energy)

    if(this.isDetected == false){
        if (this.energy > this.treshold){
            this.isDetected = true;
            var self = this;
            setTimeout(function () {
                self.isDetected = false;
            },this.sensitivity);
        }
    }   
}
