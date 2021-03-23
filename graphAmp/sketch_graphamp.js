
let song;
let amp;
let buttonPlay;
let sliderVolume;
let volHistory = [];


function setup() {
	createCanvas(300, 300)

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
		song.setVolume(sliderVolume.value());
		let vol = amp.getLevel();
		let y = map(vol, 0, 1, height, 0);
		volHistory.push(y);

		push();
		stroke(255);
		beginShape();
		noFill();
		translate(0, -height/2)
		for(var i = 0; i < volHistory.length; i++) {
			
			vertex(i, volHistory[i]);
			//console.log(i, y)
		}
		endShape();

		if (volHistory.length > width-50) {
			volHistory.splice(0, 1);
		}
		pop();
		stroke(255, 0, 0);
		line(volHistory.length, 0, volHistory.length, height)
	}
	else{
		volHistory = [];
	}
	//console.log(vol)
}