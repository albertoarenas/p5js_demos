var song;
var sliderVolume;
var sliderRate;
var sliderPan;
var buttonPlay;
var buttonJump;
var amp;

// function preload(){
// 	song = loadSound("audio/Monkey Warhol - Lunar Phases.mp3")
// }

function setup() {
	createCanvas(200, 200);
	song = loadSound("audio/Monkey Warhol - Lunar Phases.mp3", loaded);

	sliderVolume = createSlider(0, 1, 0.1, 0.01);
	sliderRate = createSlider(0, 3, 1, 0.01);
	sliderPan = createSlider(-1, 1, 0, 0.01);



	buttonJump = createButton("Jump");
	buttonJump.mousePressed(jumpSong);

	//song.play();
	//song.setVolume(0.5);

	background(100, 100, 100);

	// Add a callback function on a certain time 
	song.addCue(2, changeBackground, color(0,255,0));

	// Amplitude
	amp = new p5.Amplitude();
}

function changeBackground(col){
	background(col);
	console.log("changeBackground");
}

function jumpSong(){
	var len = song.duration();
	console.log(len);
	var t = random(len);
	console.log(t);
	song.jump(t);
}


function togglePlaying(){
	if (!song.isPlaying()){
		song.play();
		buttonPlay.html("Pause")
	}
	else{
		song.pause();
		buttonPlay.html("Play")
	}
}

function loaded(){
	//song.play();

	// Create the button only after the song is loaded
	buttonPlay = createButton("Play");
	buttonPlay.mousePressed(togglePlaying);
	console.log("Song loaded");
}

function draw() {

	//background(255,0,0);
	song.setVolume(sliderVolume.value());
	song.rate(sliderRate.value());
	song.pan(sliderPan.value());

	// Test song.currentTime()
	// if(song.currentTime() > 5){
	// 	background(255,0,255);
	// }

	//background(song.currentTime()*10, 0, 0)

	// Amplitude
	var vol = amp.getLevel();
	var diam = map(vol, 0, 1, 10, 2000)
	//console.log(diam)
	background(50)
	fill(255,0, 255);
	ellipse(width/2, height/2, diam, diam);
	 
}