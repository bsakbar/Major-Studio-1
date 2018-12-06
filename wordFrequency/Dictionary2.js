var dictionary = [];
var textX = 0;



function setup() {
    createCanvas(windowWidth, windowHeight);
    loadStrings('sotu-t-1.txt', callback);
    noCursor();
}

function display() {
    background(240);
    translate(textX, 0);
    push();
    for (var i=0; i<dictionary.length; i++) {
      textSize(dictionary[i].count);
      var txtWidth = textWidth (dictionary[i].word);
      text(dictionary[i].word, 0, height/2);
      fill(random(255));
      translate(txtWidth,0);
    }
      pop();
      console.log('Horizontal Speed', mouseX-pmouseX);
    }

function mouseDragged(){
    display();
    textX = mouseX-pmouseX;

}

function callback(sotu) {
    // console.log(sotu);

    sotu.forEach(function(phrases) {
        // console.log(phrases);

        var words = phrases.split(' ');
        words.forEach(function(word){

            // var filteredWords = dictionary.filter(function(el) {
            //     return el.word == word;
            //     // return el.toLowerCase().indexOf(query.toLowerCase()) > -1;
            // })
            // console.log('Filtered Words', filteredWords);
            // // dictionary.push({'word': word, 'count': 1});

            // The filter() method creates a new array with all elements that pass the test implemented by the provided function.
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
            var filteredWords = dictionary.filter(function(element) {
              return element.word == word;
            });

            if (filteredWords.length)
              filteredWords[0].count++;
            else
              dictionary.push({word: word, count: 1});

        });
    });

    console.log(dictionary);
}
