const audioError = new Audio('./wrong.mp3');
const heratBroken = new Audio('./heart.mp3');
let wordDetected;
let score = 0;


function randomPlaces() {
    const randomPosn = Math.floor(Math.random() * 90);
    return randomPosn;
}

function randomColor() {
    const hex = "0123456789ABCDEF"
    let color = "#";
    for (let a = 0; a < 6; a++) {
        color += hex[Math.floor(Math.random() * 16)];
    }
    return color;
}

function randomWord() {

    const simpleEnglishWords = [
        'apple', 'baby', 'ball', 'book', 'car', 'cat', 'dog', 'door', 'eat', 'fish',
        'flower', 'friend', 'go', 'good', 'happy', 'hat', 'hello', 'house', 'juice', 'love',
        'man', 'mom', 'money', 'moon', 'morning', 'name', 'night', 'no', 'one', 'pen',
        'pencil', 'please', 'rain', 'red', 'run', 'school', 'see', 'shirt', 'shoe', 'sky',
        'sleep', 'smile', 'star', 'stop', 'sun', 'table', 'tree', 'water', 'woman',
        'yes', 'you', 'your', 'ball', 'book', 'boy', 'bread', 'buy', 'cake', 'chair', 'color',
        'cow', 'day', 'door', 'egg', 'father', 'flower', 'food', 'friend', 'fruit', 'girl',
        'goodbye', 'hat', 'hello', 'home', 'house', 'milk', 'money', 'morning', 'mother', 'night',
        'pencil', 'rain', 'read', 'school', 'shoe', 'sky', 'smile', 'sun', 'water',
        'window', 'you', 'apple', 'ball', 'banana', 'beach', 'bird', 'blue', 'book', 'boy', 'bread', 'cake',
        'cat', 'chair', 'child', 'cloud', 'coffee', 'cookie', 'dog', 'door', 'drink', 'ear',
        'eat', 'egg', 'family', 'father', 'flower', 'food', 'friend', 'fruit', 'girl', 'good',
        'green', 'hat', 'hello', 'home', 'house', 'ice', 'juice', 'kite', 'light', 'love',
        'man', 'map', 'milk', 'money', 'moon', 'morning', 'mother', 'mountain', 'music', 'night',
        'orange', 'pencil', 'phone', 'picture', 'pizza', 'rain', 'read', 'red', 'sand', 'school',
        'sea', 'shirt', 'shoe', 'sky', 'sleep', 'smile', 'star', 'street', 'sun', 'table', 'tea',
        'teacher', 'tree', 'water', 'window', 'woman', 'yellow', 'yes', 'you', 'your',
        'zoo', 'apple', 'ball', 'banana', 'beach', 'bird', 'blue', 'book', 'boy', 'bread', 'cake',
        'cat', 'chair', 'child', 'cloud', 'coffee', 'cookie', 'dog', 'door', 'drink', 'ear', 'be',
        'have', 'do', 'say', 'get', 'make', 'go', 'know', 'take', 'see',
        'come', 'think', 'look', 'want', 'give', 'use', 'find', 'tell', 'ask', 'work',
        'seem', 'feel', 'try', 'leave', 'call', 'need', 'feel', 'become', 'leave', 'put',
        'mean', 'keep', 'let', 'begin', 'seem', 'help', 'talk', 'turn', 'start', 'show', 'hear',
        'play', 'run', 'move', 'like', 'live', 'believe', 'hold', 'bring'
    ];
    //240
    const randomPosn = Math.floor(Math.random() * 240);
    return simpleEnglishWords[randomPosn];
}

let wordArr = [];
let lifes = 1;
let time = 0;

let bubbleCount;
function createBubbles() {
    if (flag) {
        return;
    }

    bubbleCount = setInterval(() => {
        wordArr.push(randomWord());
        // console.log(wordArr);
        const newBubble = document.createElement("div");

        // ------------------------------------
        let newArr = [...wordArr[wordArr.length - 1]]
        for (let index = 0; index < newArr.length; index++) {

            newBubble.insertAdjacentHTML('beforeend', `<span class="changeSpanColor">${newArr[index]}</span>`);
        }

        // ------------------------------------

        // newBubble.innerHTML = `<span class="newspan">${wordArr[wordArr.length - 1]}</span>`;
        newBubble.setAttribute("class", "bubble");
        newBubble.style.backgroundColor = randomColor();
        newBubble.style.left = `${randomPlaces()}%`
        document.querySelector("#finalBox").appendChild(newBubble);
        if (time >= 9) {
            // clearTime = setTimeout(() => {
            if (selectedBubble === 0 || selectedBubble === null) {
                selectedBubble = null;
            }
            else {
                selectedBubble--;
                // alert("array -1 ho gya");
            }

            if (wordArr[0] !== "9z") {
                heratBroken.play();
                document.querySelector(`.heart>:nth-child(${lifes})`).innerHTML = "💔";
                if (lifes < 3) {
                    lifes++;
                }
                else if (lifes == 3 && start == 1) {
                    myButton.click();
                    return;
                }
            }
            document.querySelector(".bubble").remove();
            wordArr.shift();
            // }, 9000);
        }

        time++;
    }, 1000);
}




//-----------------------------

let selectedBubble = null;

// isse se buble or arrword select krege

function match(key) {
    for (let i = 0; i < wordArr.length; i++) {
        if (wordArr[i][0] === key) {
            // document.querySelector(`#playArea>:nth-child(${selectedBubble+1})`).style.backgroundColor="black";
            selectedBubble = i;
            wordDetected = 1;
            document.querySelector(`#finalBox>:nth-child(${selectedBubble + 1})`).style.backgroundColor = "black";
            document.querySelector(`#finalBox>:nth-child(${selectedBubble + 1})>.changeSpanColor`).style.color = "green";

            return;
        }
    }
}

// arrword select hone ke baad check krege
function wordMatch(key) {
    if (wordArr[selectedBubble][wordDetected] === key) {
        document.querySelector(`#finalBox>:nth-child(${selectedBubble + 1})>:nth-child(${wordDetected + 1})`).style.color = "green";
        if (wordDetected === wordArr[selectedBubble].length - 1) {
            // alert("success");

            document.querySelector(`#finalBox>:nth-child(${selectedBubble + 1})`).style.visibility = "hidden";
            score++;
            document.querySelector(".score>.dynamicScore").innerHTML = score;
            wordArr[selectedBubble] = '9z';
            selectedBubble = null;
            return;
        }
        wordDetected++;
    }
    else {
        audioError.play();
    }
}

document.addEventListener("keypress", (event) => {
    // console.log(event);
    if (selectedBubble === null) {
        // alert("selected hai")
        match(event.key);
        // console.log(`hey i am here and selectedbuber = ${selectedBubble} and word = ${wordDetected}`)
    }
    else {
        wordMatch(event.key);
    }

})


let start = 0;
let flag;
myButton = document.querySelector(".restart");
const endDil = myButton.addEventListener('click', function () {
    if (!start) {
        const finalBox = document.createElement("div");
        finalBox.setAttribute("id", "finalBox");
        document.querySelector(".inside").appendChild(finalBox);
        flag = 0;
        // startGame();
        setTimeout(() => {
            
            createBubbles();
        }, 1000);
        document.querySelector("#descpn").style.width = "15%"
        document.querySelector("#playArea").style.width = "85%"
        
        document.querySelector("#playArea>.inside").style.visibility = "visible"
        document.querySelector(".desBox").style.borderRightWidth = "0"
        document.querySelector(".desBox").style.borderTopRightRadius = "0"
        document.querySelector(".desBox").style.borderBottomRightRadius = "0"
        myButton.innerHTML = "END";
        start = 1;
        score = 0;
        lifes = 1;
        time = 0;
        document.querySelector(".score>.dynamicScore").innerHTML = score;
        document.querySelector(`.heart>.one`).innerHTML = "❤️";
        document.querySelector(`.heart>.two`).innerHTML = "❤️";
        document.querySelector(`.heart>.three`).innerHTML = "❤️";
        selectedBubble = null;
        // console.log(wordArr);
    }
    else {
        flag = 1;
        document.querySelector("#descpn").style.width = ""
        document.querySelector("#playArea").style.width = ""
        document.querySelector("#playArea>.inside").style.visibility = ""

        document.querySelector(".desBox").style.borderRightWidth = ""
        document.querySelector(".desBox").style.borderTopRightRadius = ""
        document.querySelector(".desBox").style.borderBottomRightRadius = ""
        myButton.innerHTML = "START";
        start = 0;

        // ----------------------------
        clearInterval(bubbleCount);
        document.querySelector("#finalBox").remove();
        wordArr = [];
        // console.log(wordArr);
    }
});