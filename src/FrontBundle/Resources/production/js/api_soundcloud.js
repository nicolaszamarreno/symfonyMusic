var musicCurrent; // get Back describe music current for API Search SoundCloud

/**
 * Search on keyup the word in the input
 **/
$(".header__userExperience__search input").keyup(function() {
  var term = $(this).val();

  if(term.length > 0) {
    $(".header__userExperience__panel").show();
    search(term, 6);
  } else {
    $(".header__userExperience__panel").empty();
    $(".header__userExperience__panel").hide();
  }
});

/**
 * Click on music launch function Search on SoundCloud
 **/
$("body").on("click", ".header__userExperience__panel li", function(){
    SoundcloudFind($(this).data("link"));
    modePlaylist = false;
});

/**
 * Search Word in SoundCloud's BDD
 * @param  {string} termSearch [word for search]
 * @param  {int} nbreResult [number of result]
 * @return {[HTML]}
 **/
function search (termSearch, nbreResult) {
  SC.initialize({
    client_id: 'c381048a8c48b7a419f2be16c079f8da'
  });

  SC.get('/tracks', {
    q : termSearch,
    limit : nbreResult
  }, function(tracks) {
    var result = "";
    for (var i = 0; i < tracks.length; i++) {
       result += '<li data-link="' + tracks[i].permalink_url + '"><div class="panel__avatar"><img src="' + tracks[i].user.avatar_url + '"></div><div class="panel__title"><strong>' + tracks[i].title + '</strong>' + tracks[i].user.username + '</div></li>';
    }
    $(".header__userExperience__panel").empty().html(result);
  });
}


/**
 * Search SoundCloud's BDD describe of song
 * @param  {string} track_url [url of search]
 * @return {[Object]}
 **/
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

/**
 * Search SoundCloud's BDD describe of song
 * @param  {string} url [url with code API Developper code (true URL)]
 *  @param  {object} objectMusic [object with all informations]
 * @return {[Object]}
 **/
function playerLaunch(url, objectMusic){
  $(".header__userExperience__panel").empty();
  pButton.classList.remove("icon-arrow");
  pButton.classList.add("icon-pause-button-outline");

  // Animation cover music
  $(".player__cover").animate({
    "opacity" : "0"
  },{
    queue : false,
    duration : 500,
    complete : function(){
      //verify if song has a cover
      if(objectMusic.artwork_url == null) {
        cover = "http://blog.grainedephotographe.com/wp-content/uploads/2014/03/%C2%A9-Danny-Santos-Portraits-of-Strangers-17.jpg"
      }
      else {
        cover = objectMusic.artwork_url;
      }
      $(".player__cover").css({
        "background" : "url(" + cover + ")",
        "background-repeat": "no-repeat",
        "background-size": "cover"
      });
      $(".player__cover").animate({
        "opacity" : "1"
      },900);
    }
  });

  // Animation title music
  $(".player__describe__playlist, .player__describe__title, .player__duration__time").animate({
    "top" : "50px"
  },{
    queue : false,
    duration : 500,
    complete : function(){
      $(".player__describe__title").text("").text(objectMusic.title);
      $(".player__describe__playlist").text("").text(objectMusic.user.username);
      $(".player__describe__playlist, .player__describe__title, .player__duration__time").animate({
        "top" : "0px"
      },500);
    }
  });

  music.setAttribute("src", url);
  music.play();
}



