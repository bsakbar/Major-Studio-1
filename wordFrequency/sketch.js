var textX = 0;
var myText1, myText2;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(35);
    // loadStrings('sotu-t-2.txt', callback);
    myText1 = new Text('sotu-t-1.txt', height/3);
    myText2 = new Text('sotu-t-2.txt', height/3*2);
}

function Text(fileName, yPos) {
    console.log(fileName);
    var dictionary = [];
    loadStrings(fileName, callback);

    this.display = function() {
       push();
        // background('lightgray');
       //push();
        translate(textX, yPos);
        for (var i=0; i<dictionary.length; i++) {
            textSize(dictionary[i].count);
            var txtWidth = textWidth(dictionary[i].word);
            text(dictionary[i].word, 0, 0);
            fill(random(255));
            translate(txtWidth, 0);
        }
        pop();
        console.log('Horizontal Speed', mouseX-pmouseX);
        pop();
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
        // myText1.display();
        // myText2.display();

        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
        // dictionary.sort(function(a, b) {
        //     return  b.count - a.count;
        // });
    }
}

function mouseDragged() {
    background(240);
    myText1.display();
    // translate(0, 50);
    myText2.display();
    textX += mouseX-pmouseX;
}
