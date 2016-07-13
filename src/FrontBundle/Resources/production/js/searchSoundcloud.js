/**
 * Search on keyup the word in the input
 */
$(".navbar__userExperience__search input").keyup(function() {
  var term = $(this).val();

  if(term.length > 0) {
    $(".navbar__userExperience__panel").show();
    search(term, 6);
  } else {
    $(".navbar__userExperience__panel").empty();
    $(".navbar__userExperience__panel").hide();
  }
});

/**
 * @param  {string} termSearch [word for search]
 * @param  {int} nbreResult [number of result]
 * @return {[type]}
 */
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
    $(".navbar__userExperience__panel").empty().html(result);
  });
}

