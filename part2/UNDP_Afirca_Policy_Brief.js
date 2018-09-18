// https://creative-coding.decontextualize.com/intro-to-ritajs/
var lines;
var counts;
var total;
var fontRegular, fontLight, fontBold;

function preload() {
  lines = loadStrings('UNDP_Africa_Policy_Brief.txt');
  fontRegular = loadFont('assets/Ubuntu-Regular.ttf');
  fontLight = loadFont('assets/Ubuntu-Light.ttf');
  fontBold = loadFont('assets/Ubuntu-Bold.ttf');
}

function setup() {
  createCanvas(windowWidth,windowHeight);

  var params = {
    ignoreStopWords: true,
    ignoreCase: true,
    ignorePunctuation: true,
  };

  counts = RiTa.concordance(lines.join(" "),
    params);
  total = totalValues(counts);
  // set drawing parameters
  background(20);
  textAlign(CENTER, CENTER);
  textSize(25);
  textFont(fontRegular);
  noStroke();
  noLoop();
}
function draw() {

  console.log(typeof(counts));
  console.log(263/total);

// https://stackoverflow.com/questions/25500316/sort-a-dictionary-by-value-in-javascript
var items = Object.keys(counts).map(function(key) {
  return [key, counts[key]];
});

items.sort(function(first, second) {
  return second[1] - first[1];
});

console.log(items.slice(0, 15));

var opacity;
  for (var k in counts) {
    if (counts.hasOwnProperty(k) && k.length > 3) {
      if (counts[k]/total > 0.0004) {
        opacity = map(counts[k]/total,0,0.04,0,0.8)
        fill('rgba(200,200,200, '+opacity+')');
        textSize((counts[k]/total) * 9000);
        text(k, random(width), random(height));
      }
    }
  }
}
function totalValues(obj) {
  var total = 0;
  for (var k in obj) {
    if (obj.hasOwnProperty(k)) {
      total += obj[k];
    }
  }
  return total;
}
