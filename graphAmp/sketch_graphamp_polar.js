
let song;
let amp;
let buttonPlay;
let sliderVolume;
let volHistory = [];


function setup() {
	createCanvas(300, 300);
	angleMode(DEGREES);

	let song1File = "audio/Digi GAlessio - darix togni.mp3";
	let song2File = "audio/Monkey Warhol - Lunar Phases.mp3";

	// Load song
	song = loadSound(song1File, loaded)	
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
		amp = new p5.Amplitude();
		amp.setInput(song);
		buttonPlay.html("Pause")
	}
	else{
		song.stop();
		amp = null;
		buttonPlay.html("Play")
	}
}

function draw() {
	background(0);
	

	if (song.isPlaying()){
		// Set slider volumen
		song.setVolume(sliderVolume.value());
		
		let vol = amp.getLevel();
		let y = map(vol, 0, 1, 50, width/2);
		volHistory.push(y);


		stroke(255);
		noFill();

		translate(width/2, height/2);
		beginShape();
		for(let i = 0; i < 360; i++) {
			let r = volHistory[i];
			let x = r * cos(i);
			let y = r * sin(i);

			vertex(x, y);
			//console.log(i, y)
		}
		endShape();

		if (volHistory.length > 360) {
			volHistory.splice(0, 1);
		}

	}
	else{
		volHistory = [];
	}
	//console.log(vol)
}