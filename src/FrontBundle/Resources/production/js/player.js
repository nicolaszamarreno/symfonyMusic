var duration;
var modePlaylist; // Check it's a search or playlist
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
function countTimeSong(currentTime, duration){
    var musicCurrentTime = Math.floor(currentTime);
    var musicDuration = Math.floor(duration);
    var musicRest = musicDuration - musicCurrentTime;

    var musicMinute = musicRest.toString().slice(-4, -2);
    var musicSecond = musicRest.toString().slice(-2);

    if(musicMinute == ""){
        musicDuration =  "0:" + musicSecond;
    }
    else {
        musicDuration = musicMinute  + ":" + musicSecond;
    }

    $('.player__duration__time').text(musicDuration);
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
    var playPercent = timelineWidth * (music.currentTime / duration);
    playhead.style.marginLeft = playPercent + "px";
    timelineCurrent.style.width = playPercent + "0px";

    if (music.currentTime == duration) {
        console.log(music.currentTime);
        $("#play").removeClass("icon-pause-button-outline");
        $("#play").addClass("icon-arrow");
        playhead.style.marginLeft = "0px";
        timelineCurrent.style.width = "0px";

        if(modePlaylist){
            nextPlaylist(); // if playlist mode, player pass in the next song
        }
    }
}

/**
 * Play or Pause Song
 */
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

var numberIndexPlaylist; // Index for play playlist
var playlist = ["https://soundcloud.com/ngusrunsdon/be-real-ft-dej-loaf-explicit",
    "https://soundcloud.com/hotnewexclusive/meek-mill-heaven-or-hell-ft",
    "https://soundcloud.com/detoto/detoto-the-buckeye-party-mix",
    "https://soundcloud.com/itspraddy/ed-sheeran-photograph-acoustic-version"
]; // Variable tab for twig


$(".listPlaylist__table tr").click(function(){
    var indexOfMusic = $(this).index() - 1;
    console.log("click :", $(this).index());
    clickPlaylist(indexOfMusic);
});

$(".player__controll__prev").click(function(){
    previousPlaylist();
});

$(".player__controll__next").click(function(){
    nextPlaylist();
});

function clickPlaylist (indexList){
    modePlaylist = true; // Give Mode;
    numberIndexPlaylist = indexList; // Give the new index
    SoundcloudFind(playlist[indexList]);
    songSelectPlaylist(indexList, "click");
}

function nextPlaylist(){
    if(typeof playlist !== 'undefined'){

        var totalPlaylist = playlist.length - 1; // On regarde le nombre total de la playlist
        var indexOfMusic = numberIndexPlaylist + 1;

        if(indexOfMusic <= totalPlaylist){
            clickPlaylist(indexOfMusic);
            songSelectPlaylist(indexOfMusic, "next");
        }
        else if(indexOfMusic > totalPlaylist) {
            songSelectPlaylist(indexOfMusic, "next");
            var indexOfMusic = 0;
            numberIndexPlaylist = 0; // On remet la playlist à Zéro
            clickPlaylist(indexOfMusic);
        }
    }
}

function previousPlaylist(){
    if(typeof playlist !== 'undefined'){

        var totalPlaylist = playlist.length - 1; // On regarde le nombre total de la playlist
        var indexOfMusic = numberIndexPlaylist - 1;

        if(indexOfMusic >= 0){
            clickPlaylist(indexOfMusic);
            songSelectPlaylist(indexOfMusic, "previous");
        }
        else if(indexOfMusic < 0) {
            var indexOfMusic = totalPlaylist;
            numberIndexPlaylist = totalPlaylist; // On remet la playlist à Zéro
            clickPlaylist(indexOfMusic);
            songSelectPlaylist(indexOfMusic, "previous");
        }
    }
}

function songSelectPlaylist(index, direction){
    if(direction == "next") {
        $(".listPlaylist__table tr").removeClass("song__active");
        $(".listPlaylist__table tr").eq(index + 1).addClass("song__active");
        $(".listPlaylist__table tr").eq(index).children().eq(0).children().removeClass("icon-pause-button-outline").addClass('icon-arrow');
        $(".listPlaylist__table tr").eq(index + 1).children().eq(0).children().removeClass("icon-arrow").addClass('icon-pause-button-outline');
    }
    else if(direction == "previous") {
        console.log("direction ", index);
        $(".listPlaylist__table tr").removeClass("song__active");
        $(".listPlaylist__table tr").eq(index - 1).addClass("song__active");
        $(".listPlaylist__table tr").eq(index).children().eq(0).children().removeClass("icon-pause-button-outline").addClass('icon-arrow');
        $(".listPlaylist__table tr").eq(index - 1).children().eq(0).children().removeClass("icon-arrow").addClass('icon-pause-button-outline');
    }

    else if(direction == "click") {
        console.log("bonjour");
        $(".listPlaylist__table tr").removeClass("song__active");
        $(".listPlaylist__table tr").eq(index + 1).addClass("song__active");
        $(".listPlaylist__table tr td i").removeClass("icon-pause-button-outline").addClass("icon-arrow");
        $(".listPlaylist__table tr").eq(index).children().eq(0).children().addClass('icon-pause-button-outline');
    }
}

$("body").click(function(){
    $(".footer").slideToggle();

})






