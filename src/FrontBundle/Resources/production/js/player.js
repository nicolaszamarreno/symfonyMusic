var duration;
var modePlaylist; // Check it's a search or playlist
var onLaunch = true; // First launch musique, i show the player
var music = document.getElementById('player__music'); // id for audio element
var pButton = document.getElementById('play'); // play button
var playhead = document.getElementById('playhead'); // playhead
var timeline = document.getElementById('timeline'); // timeline
var timelineCurrent = document.getElementById('timeline__current'); // Timeline Blue
// Boolean value so that mouse is moved on mouseUp only when the playhead is released
var onplayhead = false;

// timeline width adjusted for playhead
var timelineWidth = timeline.offsetWidth - playhead.offsetWidth;

//POur génération du canvas
music.crossOrigin = "anonymous";

/******************
 ******************
 ******************
 * EVENTS
 ******************
 ******************
 ******************/

//Makes timeline clickable
timeline.addEventListener("click", function (event) {
    moveplayhead(event);
    music.currentTime = duration * clickPercent(event);
}, false);

// Makes playhead draggable
playhead.addEventListener('mousedown', mouseDown, false);
window.addEventListener('mouseup', mouseUp, false);

$("#play").click(function(){
    play();
});

// Gets audio file duration
music.addEventListener("canplaythrough", function () {
    duration = music.duration;
}, false);

music.addEventListener("timeupdate", timeUpdate, false);


/******************
 ******************
 ******************
 * EVENTS
 ******************
 ******************
 ******************/
function countTimeSong(){ // Calcul Time of Song
    var audioCurrentTime = music.currentTime;
    var minutes = "0" + Math.floor(audioCurrentTime / 60);
    var seconds = "0" + Math.floor(audioCurrentTime % 60);
    var chrono = minutes.substr(-2) + ":" + seconds.substr(-2);

    $('.player__duration__time').text(chrono);
}

/**
 * returns click as decimal (.77) of the total timelineWidth
 */
function clickPercent(e) {
    return (e.pageX - timeline.offsetLeft) / timelineWidth;
}

/**
 * mouseDown EventListener
 */
function mouseDown() {
    onplayhead = true;
    window.addEventListener('mousemove', moveplayhead, true);
    music.removeEventListener('timeupdate', timeUpdate, false);
}

/**
* mouseUp EventListener
* getting input from all mouse clicks
 */
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

/**
* mousemove EventListener
* Moves playhead as user drags
 */
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

/**
 * timeUpdate
 * Synchronizes playhead position with current point in audio
 */
function timeUpdate() {
    countTimeSong(); // Calcul time of chanson
    var playPercent = timelineWidth * (music.currentTime / duration);
    playhead.style.marginLeft = playPercent + "px";
    timelineCurrent.style.width = playPercent + "0px";

    if (music.currentTime == duration) {
        $("#play").removeClass("icon-pause-button-outline");
        $("#play").addClass("icon-arrow");
        playhead.style.marginLeft = "0px";
        timelineCurrent.style.width = "0px";

        if(modePlaylist){
            countDay(indexSongCurrent); // On enleve une lecture pour aujourd'hui
            nextPlaylist(indexSongCurrent); // if playlist mode, player pass in the next song
        }
    }
}

/**
 * Play or Pause Song
 */
function play() {
    // start music
    if (music.paused) {
        if(modePlaylist) {
            $(".listPlaylist__listing tr ").eq(indexSongCurrent).children().eq(0).children().removeClass("icon-arrow").addClass('icon-pause-button-outline');
        }

        music.play();
        // remove play, add pause
        $("#play").removeClass("icon-arrow");
        $("#play").addClass("icon-pause-button-outline");
    } else { // pause music
        $(".listPlaylist__listing tr ").eq(indexSongCurrent).children().eq(0).children().removeClass("icon-pause-button-outline").addClass('icon-arrow');
        music.pause();
        // remove pause, add play
        $("#play").removeClass("icon-pause-button-outline");
        $("#play").addClass("icon-arrow");
    }
}


/**
 * Construct
 */
var canvas, ctx, source, context, analyser, fbc_array, bars, bar_x, bar_width, bar_height;
// Initialize the MP3 player after the page loads all of its HTML into the window
window.addEventListener("load", initMp3Player, false);
function initMp3Player(){
    context = new AudioContext(); // AudioContext object instance
    analyser = context.createAnalyser(); // AnalyserNode method
    canvas = document.getElementById('analyser_render');
    canvas.setAttribute("width", document.querySelector(".player__audioplayer").offsetWidth);
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
    gradient.addColorStop(0.5,"#4c43c4");
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

/******************
 ******************
 ******************
 * Play Playlist
 ******************
 ******************
 ******************/
var totalSongPlaylist;
var indexSongCurrent;

$("body").on("click", ".listPlaylist__listing tr", function(){
    totalSongPlaylist = $(".listPlaylist__listing tr").length;
    modePlaylist = true; // Give Mode;
    indexSongCurrent = $(this).index();

    if(canPlay(indexSongCurrent)) {
        var url = $(this).attr("data-label");
        SoundcloudFind(url);
        songSelectPlaylist(indexSongCurrent);
    }
    else {
        nextPlaylist(indexSongCurrent);
    }
});

$(".player__controll__prev").click(function(){
    previousPlaylist(indexSongCurrent);
});

$(".player__controll__next").click(function(){
    nextPlaylist(indexSongCurrent);
});

function nextPlaylist(indexCurrent){
    if(modePlaylist == true){
        var  index = indexCurrent + 1;
        if(canPlay(index) && index <= totalSongPlaylist){
            var url = $(".listPlaylist__listing tr").eq(index).attr("data-label");
            indexSongCurrent = index;
            SoundcloudFind(url);
            songSelectPlaylist(index);
        }
        else if (index == totalSongPlaylist){
            indexSongCurrent = -1;
            nextPlaylist(indexSongCurrent);
        }
        else {
            indexSongCurrent = index;
            nextPlaylist(indexSongCurrent);
        }
    }
    else {
        // Add Class qui fasse vibrer le play
    }
}

function previousPlaylist(indexCurrent){
    if(modePlaylist == true){
        var  index = indexCurrent - 1;
        if(canPlay(index) && index >= 0){
            var url = $(".listPlaylist__listing tr ").eq(index).attr("data-label");
            indexSongCurrent = index;
            SoundcloudFind(url);
            songSelectPlaylist(index);
        }
        else if (index < 0){
            indexSongCurrent = totalSongPlaylist;
            previousPlaylist(indexSongCurrent);
        }
        else {
            indexSongCurrent = index;
            previousPlaylist(indexSongCurrent);
        }
    }
    else {
        // Add Class qui fasse vibrer le play
    }
}

function songSelectPlaylist(indexCurrent){
        $(".listPlaylist__listing tr").removeClass("song__active");
        $(".listPlaylist__listing tr i").removeClass("icon-pause-button-outline").addClass("icon-arrow");
        $(".listPlaylist__listing tr").eq(indexCurrent).addClass("song__active");
        $(".listPlaylist__listing tr").eq(indexCurrent).children().eq(0).children().removeClass("icon-arrow").addClass('icon-pause-button-outline');
}

function canPlay(indexCurrent){
    if($(".listPlaylist__listing tr").eq(indexCurrent).attr("data-play") == "true" ) {
        return true;
    }
    else{
        return false;
    }
}

$("body").on("click", ".listPlaylist__listing tr, #play", function(){
    if(onLaunch){
        $(".footer").animate({
           "opacity" : 1
        }, 1500);
        onLaunch = false;
    }
});

function countDay(indexCurrent) {
    var dataCountCurrent = $(".listPlaylist__listing tr").eq(indexCurrent).attr("data-time");
    var newCount = dataCountCurrent - 1;

    if(newCount == 0) {
        $(".listPlaylist__listing tr").eq(indexCurrent).attr("data-play", "false");
        $(".listPlaylist__listing tr").eq(indexCurrent).attr("data-time", newCount);
        $(".listPlaylist__listing tr").eq(indexCurrent).removeAttr("data-label");
    }else {
        $(".listPlaylist__listing tr").eq(indexCurrent).attr("data-time", newCount);
    }
}






