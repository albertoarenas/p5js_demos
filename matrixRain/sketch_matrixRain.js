// video reference https://www.youtube.com/watch?v=SneR61OG4ZI
// video reference 2 https://www.newsweek.com/matrix-code-mystery-keanu-reeves-693993
// javascript tutorial https://www.youtube.com/watch?v=NCwa_xi0Uuc

let matrixSymbol;
let matrixStream;

let matrixStreams = [];

let symbolSize = 30;

// Call once at the begining of the script
function setup() {
    createCanvas(
        window.innerWidth,
        window.innerHeight
    );
    background(0);

    // matrixSymbol = new MatrixSymbol(width/2, 0, random(5,10));
    // matrixSymbol.setToRandomSymbol();

    // matrixStream = new MatrixStream();
    // let y = 0;
    // let x = width / 2;
    // matrixStream.generateSymbols(x, y);

    // Create all streams
    let x = 0;
    let y = 0;
    let stream;
    for (var i=0; i<= width/symbolSize; i++) {
        stream = new MatrixStream();
        stream.generateSymbols(x, round(random(-1000, 0)));
        matrixStreams.push(stream);
        x += symbolSize;
    }

    textFont('Consolas');
    textSize(symbolSize);
}

// Call 60 times per second
function draw() {
    background(0, 70);
    // matrixSymbol.render();
    // matrixStream.render();

    matrixStreams.forEach(function(stream){
        stream.render();
    });
}

class MatrixSymbol {
    constructor(x, y, speed, first) {
        this.x = x;
        this.y = y;
        this.value;
        this.speed = speed;
        this.switchInterval = round(random(20, 30));
        this.first = first;
    }

    // Reference Katakana https://www.wikiwand.com/en/Katakana_(Unicode_block)
    setToRandomSymbol() {
        this.value = String.fromCharCode(
            0x030A0 + round(random(0,96))
        );
    }

    render() {
        if(this.first){
            fill(200, 255, 200);
        } else {
            fill(0, 255, 70);
        }
        
        text(this.value, this.x, this.y);
        this.rain();
        if (frameCount % this.switchInterval == 0) {
            this.setToRandomSymbol();
        }
    }

    rain() {
        this.y = (this.y >= height) ? 0 : this.y += this.speed;        
    }
}

class MatrixStream {

    constructor() {
        this.symbols = [];
        this.totalSymbols = round(random(5,20));
        this.speed = round(random(2, 10));
    }

    generateSymbols(x, y) {
        let symbol;
        let first = round(random(0, 4)) == 1;
        for(let i=0; i <= this.totalSymbols; i++) {
            symbol = new MatrixSymbol(x, y, this.speed, first);
            symbol.setToRandomSymbol();
            this.symbols.push(symbol);
            y -= symbolSize; 
            first = false;
        }
    }

    render() {
        this.symbols.forEach(function(symbol) {
            symbol.render();
        });
    }
}
