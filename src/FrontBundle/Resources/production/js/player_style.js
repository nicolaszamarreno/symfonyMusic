var music = document.getElementById('player__music'); // id for audio element
var duration;
var pButton = document.getElementById('play'); // play button
var playhead = document.getElementById('playhead'); // playhead
var timeline = document.getElementById('timeline'); // timeline
var timelineCurrent = document.getElementById('timeline__current');

// timeline width adjusted for playhead
var timelineWidth = timeline.offsetWidth - playhead.offsetWidth;

//POur génération du canvas
music.crossOrigin = "anonymous";


// timeupdate event listener
music.addEventListener("timeupdate", timeUpdate, false);

//Makes timeline clickable
timeline.addEventListener("click", function (event) {
    moveplayhead(event);
    music.currentTime = duration * clickPercent(event);
}, false);

// returns click as decimal (.77) of the total timelineWidth
function clickPercent(e) {
    return (e.pageX - timeline.offsetLeft) / timelineWidth;
}

// Makes playhead draggable
playhead.addEventListener('mousedown', mouseDown, false);
window.addEventListener('mouseup', mouseUp, false);

// Boolean value so that mouse is moved on mouseUp only when the playhead is released
var onplayhead = false;
// mouseDown EventListener
function mouseDown() {
    onplayhead = true;
    window.addEventListener('mousemove', moveplayhead, true);
    music.removeEventListener('timeupdate', timeUpdate, false);
}
// mouseUp EventListener
// getting input from all mouse clicks
function mouseUp(e) {
    if (onplayhead == true) {
        moveplayhead(e);
        window.removeEventListener('mousemove', moveplayhead, true);
        // change current time
        music.currentTime = duration * clickPercent(e);
        music.addEventListener('timeupdate', timeUpdate, false);
    }
    onplayhead = false;
}
// mousemove EventListener
// Moves playhead as user drags
function moveplayhead(e) {
    var newMargLeft = e.pageX - timeline.offsetLeft;
    if (newMargLeft >= 0 && newMargLeft <= timelineWidth) {
        playhead.style.marginLeft = newMargLeft + "px";
        timelineCurrent.style.width = newMargLeft + "px";

    }
    if (newMargLeft < 0) {
        playhead.style.marginLeft = "0px";
        timelineCurrent.style.width = "0px";
    }
    if (newMargLeft > timelineWidth) {
        playhead.style.marginLeft = timelineWidth + "px";
        timelineCurrent.style.width = timelineWidth  + "px";
    }
}

// timeUpdate
// Synchronizes playhead position with current point in audio
function timeUpdate() {
    var playPercent = timelineWidth * (music.currentTime / duration);
    playhead.style.marginLeft = playPercent + "px";
    timelineCurrent.style.width = playPercent + "0px";

    if (music.currentTime == duration) {
        $("#play").removeClass("icon-pause-button-outline");
        $("#play").addClass("icon-arrow");
        playhead.style.marginLeft = "0px";
        timelineCurrent.style.width = "0px";
    }
}

$("#play").click(function(){
    play();
})

function play() {
    // start music
    if (music.paused) {
        music.play();
        // remove play, add pause
        $("#play").removeClass("icon-arrow");
        $("#play").addClass("icon-pause-button-outline");
    } else { // pause music
        music.pause();
        // remove pause, add play
        $("#play").removeClass("icon-pause-button-outline");
        $("#play").addClass("icon-arrow");
    }
}

// Gets audio file duration
music.addEventListener("canplaythrough", function () {
    duration = music.duration;
}, false);

// Create a new instance of an audio object and adjust some of its properties

// Establish all variables that your Analyser will use
var canvas, ctx, source, context, analyser, fbc_array, bars, bar_x, bar_width, bar_height;
// Initialize the MP3 player after the page loads all of its HTML into the window
window.addEventListener("load", initMp3Player, false);
function initMp3Player(){
    context = new AudioContext(); // AudioContext object instance
    analyser = context.createAnalyser(); // AnalyserNode method
    canvas = document.getElementById('analyser_render');
    ctx = canvas.getContext('2d');
    // Re-route audio playback into the processing graph of the AudioContext
    source = context.createMediaElementSource(music);
    source.connect(analyser);
    analyser.connect(context.destination);
    frameLooper();
}
// frameLooper() animates any style of graphics you wish to the audio frequency
// Looping at the default frame rate that the browser provides(approx. 60 FPS)
function frameLooper(){
    window.requestAnimationFrame(frameLooper);

    fbc_array = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(fbc_array);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Add Gradient Elements
    var gradient = ctx.createRadialGradient(0,0,50,0,150,300);
    gradient.addColorStop(0,"#65c6bb");
    gradient.addColorStop(0.9,"#4c43c4");
    ctx.fillStyle = gradient;
    //ctx.fillStyle = '#65c5ba'; // Color of the bars
    bars = 1600;
    for (var i = 0; i < bars; i++) {
        bar_x = i * 10;
        bar_width = 2;
        bar_height = -(fbc_array[i] / 2);
        //  fillRect( x, y, width, height ) // Explanation of the parameters below
        ctx.fillRect(bar_x, canvas.height, bar_width, bar_height);
    }
}


// Count the duration music and put into layout
$("#player__music").on(
    "timeupdate",
    function(event){
        onTrackedVideoFrame(this.currentTime, this.duration);
});

function onTrackedVideoFrame(currentTime, duration){
    var musicCurrentTime = Math.floor(currentTime);
    var musicDuration = Math.floor(duration);
    var musicRest = musicDuration - musicCurrentTime;
    var musicRestMinute = musicRest / 60;

    var musicDuration = musicRestMinute.toString().slice(-4, -2) + ":" + musicRestMinute.toString().slice(-2);
    console.log(musicDuration);
}





