function SoundcloudFind(e){SC.initialize({client_id:"c381048a8c48b7a419f2be16c079f8da"}),SC.get("/resolve",{url:e},function(a){musicCurrent=a,console.log("musicCurrent ",musicCurrent);var r=a.stream_url+"?client_id=c381048a8c48b7a419f2be16c079f8da";$(".header__userExperience__panel").append('<h1 class="song-artiste">'+a.user.username+'</h1> <h2 class="song-title">'+a.title+'</h2> <h3 class="song-genre">'+a.genre+'</h3> <h3 class="song-tag">'+a.tag_list+"</h3>"),$(".like").attr("add_link",e),$("#player").attr("src",r)})}function search(e,a){SC.initialize({client_id:"c381048a8c48b7a419f2be16c079f8da"}),SC.get("/tracks",{q:e,limit:a},function(e){for(var a="",r=0;r<e.length;r++)a+='<li data-link="'+e[r].permalink_url+'"><div class="panel__avatar"><img src="'+e[r].user.avatar_url+'"></div><div class="panel__title"><strong>'+e[r].title+"</strong>"+e[r].user.username+"</div></li>";$(".header__userExperience__panel").empty().html(a)})}var musicCurrent;$("body").on("click",".header__userExperience__panel li",function(){SoundcloudFind($(this).data("link")),$(".header__userExperience__panel").hide(),$(".header__userExperience__bar").val("")}),$(".header__logo").click(function(){$(this).toggleClass("toggle--active")}),$(".header__userExperience__search input").keyup(function(){var e=$(this).val();e.length>0?($(".header__userExperience__panel").show(),search(e,6)):($(".header__userExperience__panel").empty(),$(".header__userExperience__panel").hide())});