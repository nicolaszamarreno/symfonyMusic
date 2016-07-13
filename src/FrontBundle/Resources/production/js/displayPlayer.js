var musicCurrent;

$("body").on("click", ".header__userExperience__panel li", function(){
   SoundcloudFind($(this).data("link"));
   $(".header__userExperience__panel").hide();
   $(".header__userExperience__bar").val('');
});

function SoundcloudFind(track_url) {
     SC.initialize({
         client_id: "c381048a8c48b7a419f2be16c079f8da"
     });
     SC.get("/resolve", { url: track_url }, function(sound) {
        musicCurrent = sound; // Object of the music

        console.log('musicCurrent ' , musicCurrent);

        var url = sound.stream_url + '?client_id=' + "c381048a8c48b7a419f2be16c079f8da";

         // function permet de récupérer l'url et de lancer la musique après la recherche
        playerLaunch(url, musicCurrent);
     });
}

function playerLaunch(url, objectMusic){
    $(".header__userExperience__panel").empty();
    pButton.classList.remove("icon-arrow");
    pButton.classList.add("icon-pause-button-outline");

    // Animation title musique
    $(".player__describe__playlist, .player__describe__title").animate({
        "top" : "50px"
    },{
        queue : false,
        duration : 500,
        complete : function(){
            $(".player__describe__title").text("").text(objectMusic.title);
            $(".player__describe__playlist, .player__describe__title").animate({
                "top" : "0px"
            },500);
            music.setAttribute("src", url);
            music.play();
        }
    });
}

