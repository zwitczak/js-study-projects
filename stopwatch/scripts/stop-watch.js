const timeDisplay = document.querySelector("#timeDisplay")
const startBtn = document.querySelector("#startBtn")
const pauseBtn = document.querySelector("#pauseBtn")
const resetBtn = document.querySelector("#resetBtn")

let startTime = 0;
let elapsedTime = 0;
let currentTime = 0;
let paused = true;
let intervalId;
let hrs = 0;
let mins = 0;
let secs = 0;
let msecs = 0;

startBtn.addEventListener("click", ()=>{
    if (paused){
        paused = false;
        startTime = Date.now() - elapsedTime;
        intervalId = setInterval(updateTime, 75)
    }
});

pauseBtn.addEventListener("click", () =>{
    if(!paused){
        paused = true;
        elapsedTime = Date.now() - startTime;
        clearInterval(intervalId);
    }
});
resetBtn.addEventListener("click", () => {
    paused = true;
    clearInterval(intervalId);
    startTime = 0;
    elapsedTime = 0;
    currentTime = 0;
    hrs = 0;
    mins = 0;
    secs = 0;
    msecs = 0;
    timeDisplay.textContent = "00:00:00:000"

});


function updateTime(){
    elapsedTime = Date.now() - startTime;

    msecs = Math.floor(elapsedTime%1000)
    secs = Math.floor(elapsedTime/1000 % 60)
    mins = Math.floor(elapsedTime/(60000) % 60)
    hrs = Math.floor(elapsedTime/(60000*60) % 60)


    secs = pad(secs, 2)
    mins = pad(mins, 2)
    hrs = pad(hrs, 2)
    msecs = pad(msecs, 3)

    timeDisplay.textContent = `${hrs}:${mins}:${secs}:${msecs}`

    function pad(unit, len){
        const zeros = "0".repeat(len-1);
        return((zeros) + unit).length > len ? unit: zeros + unit
    }

}
