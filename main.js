//Takes user input and returns an indented list.
function Parse() {
    document.getElementById("PARSE").innerHTML =
        (Parser(document.getElementById("userInput").value))
}

function Parser(str) {
    var i = 0
    var arr = []
    var startIndex = i
    var d = 0
    var startdepth = d

    /*Slices out a portion of string based on a defined separator, removes extra whitespace, and
    adds it to an array as objects for the word with the current depth value.*/
    function addWord() {
        if (i > startIndex) {
            var w = str.slice(startIndex, i);
            var pdepth = d;
            var trim = w.trim();
            w.trim();
            arr.push({ word: trim, depth: pdepth });

        }
    }
    //Increments the depth
    function addDepth() {
        if (i > startdepth) { d++ }
    }
    //Decrements depth
    function subDepth() {
        if (i > startdepth) { d-- }
    }
    //Loops through string to create array
    for (i = 0; i < str.length; i++) {
        var currenti = str[i];
        var previousi = (i > 0) ? str[i - 1] : '';
        switch (currenti) {
            case ",":
                if (previousi != ')') {
                    addWord();
                }
                startIndex = i + 1;
                break;
            case "(":
                addWord();
                addDepth();
                startIndex = i + 1;
                break;
            case ")":
                addWord();
                subDepth();
        }
    }
    //Sorts array.word alphabetically
    arr.sort((a, b) => (a.word > b.word) ? 1 : ((b.word > a.word) ? -1 : 0));

    var result = '';  
    /*Loops through array to create a string in desired list output.
      Indentation is achieved via the depth value*/
    for (n = 0, len = arr.length; n < len; n++) {
       indent(arr[n].depth);
        function indent(x) {
            var t = '-';
            var z = '';
            var res = '';
            for (z = 0; z < x; z++) { res = res + t;}
            return res;
        }
        result = result + indent(arr[n].depth) + ' ' + arr[n].word + '<br>';
        }
    return result;
}

