
let song;
let fft;
let ftt_bins;
let freq_width;
let buttonPlay;
let sliderVolume;
let volHistory = [];


function setup() {
	createCanvas(400, 400);
	colorMode(HSB);

	let song1File = "audio/Digi GAlessio - darix togni.mp3";
	let song2File = "audio/Monkey Warhol - Lunar Phases.mp3";

	// Load song
	song = loadSound(song2File, loaded);

	// Set FTT bins
	ftt_bins = 64;
	freq_width = width / ftt_bins;
}

function loaded(){
	// Create the button only after the song is loaded
	buttonPlay = createButton("Play");
	buttonPlay.mousePressed(togglePlaying);

	// Create volume slider
	sliderVolume = createSlider(0, 1, 0.1, 0.01);

	console.log("Song loaded");
}

function togglePlaying(){
	if (!song.isPlaying()){
		song.play();
		// Amplitude
		fft = new p5.FFT(0.7, ftt_bins);
		fft.setInput(song);
		buttonPlay.html("Pause")
	}
	else{
		song.stop();
		fft = null;
		buttonPlay.html("Play")
	}
}

function draw() {
	background(0);
	
	
	if (song.isPlaying()){
		song.setVolume(sliderVolume.value());
		let spectrum = fft.analyze();
		//console.log(spectrum);
		//console.log(spectrum.length);
		stroke(255);
		for (let i = 0; i < spectrum.length; i++) {
			let amp = spectrum[i];
			var y = map(amp, 0, 255, height, 0);
			fill(i, 255, 255);
			//line(i*freq_width, height, i*freq_width, y); 
			rect(i*freq_width, y, freq_width, height - y);
		}

		// let y = map(vol, 0, 1, height, 0);
		// volHistory.push(y);

		// push();
		// stroke(255);
		// beginShape();
		// noFill();
		// translate(0, -height/2)
		// for(var i = 0; i < volHistory.length; i++) {
			
		// 	vertex(i, volHistory[i]);
		// 	//console.log(i, y)
		// }
		// endShape();

		// if (volHistory.length > width-50) {
		// 	volHistory.splice(0, 1);
		// }
		// pop();
		// stroke(255, 0, 0);
		// line(volHistory.length, 0, volHistory.length, height)
	}
	else{
		volHistory = [];
	}
	//console.log(vol)
}