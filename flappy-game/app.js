/* Global Variables */
let obstacle = document.querySelector(".obstacle");
let hole = document.querySelector(".pass");
let object = document.querySelector(".object");
let isObjectJumping = 0;
let totalScore = 0;

/* change the position of the hole in the obstacle after every animation */
obstacle.addEventListener("animationiteration", () => {
    //generate a number between 150 & 500
    let random = -1 * randomNumberGenerator(500, 150);
    hole.style.top = random + 'px';
    totalScore++;
});

/**
 * random number (integer) generator between max & min (inclusive)
 * @param {Number} max 
 * @param {Number} min 
 * @returns {Number} 
 */
function randomNumberGenerator(max, min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * simulate gravity - update the position of the ball every 10 milliseconds to simulate a "falling" affect
 * the setInterval() method calls a function at specified intervals
**/
setInterval(function() {
    // learnt that you cannot use .style to fetch a value, it's only to set which is why the below doesn't work
    // object.style.top = (object.style.top + 3) + "px";

    let objectTopProperty = parseInt(window.getComputedStyle(object).getPropertyValue("top"));
    let holeTopProperty = parseInt(window.getComputedStyle(hole).getPropertyValue("top"));
    let objectTopInNegative = -(500 - objectTopProperty);
    let obstacleLeftProperty = parseInt(window.getComputedStyle(obstacle).getPropertyValue("left"));

    //out of bounds detection of game object || collision detection between game object & obstacle
    if(objectTopProperty>=480 || (obstacleLeftProperty<=20 && obstacleLeftProperty>-50 && (objectTopInNegative<holeTopProperty || objectTopInNegative>holeTopProperty+(150-20)))){
        alert("Score:" + totalScore);
        totalScore = 0;
    }
    //the ball falls down only if we're not jumping
    if(isObjectJumping == false){
        object.style.top = (objectTopProperty + 3) + "px";
    }
}, 10);

/**
 * jumping logic of the game object
 */
function simulateJumping() {
    let intervalCount = 0;
    isObjectJumping = 1;

    let jumpTime = setInterval(function(){
        let objectTopProperty = parseInt(window.getComputedStyle(object).getPropertyValue("top"));
        //first condition: prevents game object from jumping away (above) from the game screen
        //second condition: after reaching 15 interval counts, don't jump or drop (just stall) to make game expereience a bit smoother?
        if(objectTopProperty >= 5 && intervalCount <= 15){
            object.style.top = (objectTopProperty - 5) + "px";
        }
        if(intervalCount > 20){
            clearInterval(jumpTime);
            isObjectJumping = 0;
            intervalCount = 0;
        }
        intervalCount ++;
    }, 10);
}
