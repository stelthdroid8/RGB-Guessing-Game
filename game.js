var numSquares = 6;
var colors = [];
var pickedColor;

var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var message = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");
init();

function init(){
    //sets up entire board with listeners
    setModeListeners();
    setSquareListeners();
    reset();
}

function setModeListeners(){
    //looping through both mode buttons to dis
    for (var i=0; i < modeButtons.length; i++){
        modeButtons[i].addEventListener("click", function(){
            //removing selected class off button to display which was selected by user
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            //adding the selected class to the correct button
            this.classList.add("selected");
            //depending on which modes, sets number of squares
            this.textContent ==="EASY" ? numSquares =3: numSquares =6;
            reset();
        })
    }
}
function setSquareListeners(){
    for (var i =0; i<squares.length; i++){
        //adds click listeners
        squares[i].addEventListener("click", function(){
            //grab color of square and compare to picked
            var clickedColor = this.style.backgroundColor;
            if(clickedColor === pickedColor){
                //properly show messages after winning
                message.textContent = "Correct!"
                resetButton.textContent="Play Again?"
                changeColors(clickedColor);
                h1.style.backgroundColor = clickedColor;
            }
            else{
                this.style.backgroundColor = "#232323";
                message.textContent ="Try Again!";
            }
        })
    }
}

function reset(){
    //generate all new colors in proper mode hard/easy
    colors = generateRandomColors(numSquares);
    //pick a new color
    pickedColor = pickColor();
    //change color display to match picked color
    colorDisplay.textContent = pickedColor;
    resetButton.textContent="New Colors";
    //change colors of square
    message.textContent="";
    for(var i=0; i< squares.length; i++){
        if(colors[i]){
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
        }
        else{
            squares[i].style.display = "none";
        }
    }
    //resetting the background to default color after reset
    h1.style.backgroundColor = "steelblue";
}

resetButton.addEventListener("click", function(){
    reset();
})

for (var i =0; i<squares.length; i++){
    //adds click listeners
    squares[i].addEventListener("click", function(){
        //grab color of square and compare to picked
        var clickedColor = this.style.backgroundColor;
        if(clickedColor === pickedColor){
            message.textContent = "Correct!"
            resetButton.textContent="Play Again?"
            changeColors(clickedColor);
            h1.style.backgroundColor = clickedColor;
        }
        else{
            this.style.backgroundColor = "#232323";
            message.textContent ="Try Again!";
        }
    })
}

function changeColors(color){
    //loops through squares and changes them to color
    for (var i=0; i < colors.length; i++){
        squares[i].style.backgroundColor = color;
    }
}

function pickColor(){
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

function generateRandomColors(num){
    var arr= [];
    for (i=0; i<num; i++){
        //generate random rgb + push into ray
        arr.push(randomColor());
    }
    return arr;
}

function randomColor(){
    //selecting the rgb number between 0-255
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    //returns the properly formatted rgb string
    return "rgb("+ r + ", "+ g +", " + b + ")"; 
}

