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
     musicCurrent = sound;
     console.log('musicCurrent ' , musicCurrent);
      var url = sound.stream_url + '?client_id=' + "c381048a8c48b7a419f2be16c079f8da";

      $( ".header__userExperience__panel" ).append('<h1 class="song-artiste">' + sound.user.username + '</h1> <h2 class="song-title">' + sound.title + '</h2> <h3 class="song-genre">' + sound.genre + '</h3> <h3 class="song-tag">' + sound.tag_list + '</h3>');
         
      $("#player__music").attr("src", url);

     });
}

