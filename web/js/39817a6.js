function search(e,t){SC.initialize({client_id:"c381048a8c48b7a419f2be16c079f8da"}),SC.get("/tracks",{q:e,limit:t},function(e){for(var t="",i=0;i<e.length;i++)t+='<li data-link="'+e[i].permalink_url+'"><div class="panel__avatar"><img src="'+e[i].user.avatar_url+'"></div><div class="panel__title"><strong>'+e[i].title+"</strong>"+e[i].user.username+"</div></li>";$(".header__userExperience__panel").empty().html(t)})}function SoundcloudFind(e){SC.initialize({client_id:"c381048a8c48b7a419f2be16c079f8da"}),SC.get("/resolve",{url:e},function(e){musicCurrent=e,console.log("musicCurrent ",musicCurrent);var t=e.stream_url+"?client_id=c381048a8c48b7a419f2be16c079f8da";playerLaunch(t,musicCurrent)})}function playerLaunch(e,t){$(".header__userExperience__panel").empty(),pButton.classList.remove("icon-arrow"),pButton.classList.add("icon-pause-button-outline"),$(".player__cover").animate({opacity:"0"},{queue:!1,duration:500,complete:function(){null==t.artwork_url?cover="http://blog.grainedephotographe.com/wp-content/uploads/2014/03/%C2%A9-Danny-Santos-Portraits-of-Strangers-17.jpg":cover=t.artwork_url,$(".player__cover").css({background:"url("+cover+")","background-repeat":"no-repeat","background-size":"cover"}),$(".player__cover").animate({opacity:"1"},900)}}),$(".player__describe__playlist, .player__describe__title, .player__duration__time").animate({top:"50px"},{queue:!1,duration:500,complete:function(){$(".player__describe__title").text("").text(t.title),$(".player__describe__playlist").text("").text(t.user.username),$(".player__describe__playlist, .player__describe__title, .player__duration__time").animate({top:"0px"},500)}}),music.setAttribute("src",e),music.play()}function countTimeSong(e,t){var i=Math.floor(e),a=Math.floor(t),l=a-i,n=l.toString().slice(-4,-2),r=l.toString().slice(-2);a=""==n?"0:"+r:n+":"+r,$(".player__duration__time").text(a)}function clickPercent(e){return(e.pageX-timeline.offsetLeft)/timelineWidth}function mouseDown(){onplayhead=!0,window.addEventListener("mousemove",moveplayhead,!0),music.removeEventListener("timeupdate",timeUpdate,!1)}function mouseUp(e){1==onplayhead&&(moveplayhead(e),window.removeEventListener("mousemove",moveplayhead,!0),music.currentTime=duration*clickPercent(e),music.addEventListener("timeupdate",timeUpdate,!1)),onplayhead=!1}function moveplayhead(e){var t=e.pageX-timeline.offsetLeft;t>=0&&t<=timelineWidth&&(playhead.style.marginLeft=t+"px",timelineCurrent.style.width=t+"px"),t<0&&(playhead.style.marginLeft="0px",timelineCurrent.style.width="0px"),t>timelineWidth&&(playhead.style.marginLeft=timelineWidth+"px",timelineCurrent.style.width=timelineWidth+"px")}function timeUpdate(){var e=timelineWidth*(music.currentTime/duration);playhead.style.marginLeft=e+"px",timelineCurrent.style.width=e+"0px",music.currentTime==duration&&(console.log(music.currentTime),$("#play").removeClass("icon-pause-button-outline"),$("#play").addClass("icon-arrow"),playhead.style.marginLeft="0px",timelineCurrent.style.width="0px",modePlaylist&&nextPlaylist())}function play(){music.paused?(music.play(),$("#play").removeClass("icon-arrow"),$("#play").addClass("icon-pause-button-outline")):(music.pause(),$("#play").removeClass("icon-pause-button-outline"),$("#play").addClass("icon-arrow"))}function initMp3Player(){context=new AudioContext,analyser=context.createAnalyser(),canvas=document.getElementById("analyser_render"),canvas.setAttribute("width",document.querySelector(".player__audioplayer").offsetWidth),ctx=canvas.getContext("2d"),source=context.createMediaElementSource(music),source.connect(analyser),analyser.connect(context.destination),frameLooper()}function frameLooper(){window.requestAnimationFrame(frameLooper),fbc_array=new Uint8Array(analyser.frequencyBinCount),analyser.getByteFrequencyData(fbc_array),ctx.clearRect(0,0,canvas.width,canvas.height);var e=ctx.createRadialGradient(0,0,50,0,150,300);e.addColorStop(0,"#65c6bb"),e.addColorStop(.5,"#4c43c4"),ctx.fillStyle=e,bars=1600;for(var t=0;t<bars;t++)bar_x=10*t,bar_width=2,bar_height=-(fbc_array[t]/2),ctx.fillRect(bar_x,canvas.height,bar_width,bar_height)}function clickPlaylist(e){modePlaylist=!0,numberIndexPlaylist=e,SoundcloudFind(playlist[e]),songSelectPlaylist(e,"click")}function nextPlaylist(){if("undefined"!=typeof playlist){var e=playlist.length-1,t=numberIndexPlaylist+1;if(t<=e)clickPlaylist(t),songSelectPlaylist(t,"next");else if(t>e){songSelectPlaylist(t,"next");var t=0;numberIndexPlaylist=0,clickPlaylist(t)}}}function previousPlaylist(){if("undefined"!=typeof playlist){var e=playlist.length-1,t=numberIndexPlaylist-1;if(t>=0)clickPlaylist(t),songSelectPlaylist(t,"previous");else if(t<0){var t=e;numberIndexPlaylist=e,clickPlaylist(t),songSelectPlaylist(t,"previous")}}}function songSelectPlaylist(e,t){"next"==t?($(".listPlaylist__table tr").removeClass("song__active"),$(".listPlaylist__table tr").eq(e+1).addClass("song__active"),$(".listPlaylist__table tr").eq(e).children().eq(0).children().removeClass("icon-pause-button-outline").addClass("icon-arrow"),$(".listPlaylist__table tr").eq(e+1).children().eq(0).children().removeClass("icon-arrow").addClass("icon-pause-button-outline")):"previous"==t?(console.log("direction ",e),$(".listPlaylist__table tr").removeClass("song__active"),$(".listPlaylist__table tr").eq(e-1).addClass("song__active"),$(".listPlaylist__table tr").eq(e).children().eq(0).children().removeClass("icon-pause-button-outline").addClass("icon-arrow"),$(".listPlaylist__table tr").eq(e-1).children().eq(0).children().removeClass("icon-arrow").addClass("icon-pause-button-outline")):"click"==t&&(console.log("bonjour"),$(".listPlaylist__table tr").removeClass("song__active"),$(".listPlaylist__table tr").eq(e+1).addClass("song__active"),$(".listPlaylist__table tr td i").removeClass("icon-pause-button-outline").addClass("icon-arrow"),$(".listPlaylist__table tr").eq(e).children().eq(0).children().addClass("icon-pause-button-outline"))}var musicCurrent;$(".header__userExperience__search input").keyup(function(){var e=$(this).val();e.length>0?($(".header__userExperience__panel").show(),search(e,6)):($(".header__userExperience__panel").empty(),$(".header__userExperience__panel").hide())}),$("body").on("click",".header__userExperience__panel li",function(){SoundcloudFind($(this).data("link")),modePlaylist=!1}),$(".header__logo").click(function(){$(this).toggleClass("toggle--active"),$(".wrapper").toggleClass("wrapper--menu"),$(".menu").slideToggle(800)});var duration,modePlaylist,music=document.getElementById("player__music"),pButton=document.getElementById("play"),playhead=document.getElementById("playhead"),timeline=document.getElementById("timeline"),timelineCurrent=document.getElementById("timeline__current"),onplayhead=!1,timelineWidth=timeline.offsetWidth-playhead.offsetWidth;music.crossOrigin="anonymous",timeline.addEventListener("click",function(e){moveplayhead(e),music.currentTime=duration*clickPercent(e)},!1),playhead.addEventListener("mousedown",mouseDown,!1),window.addEventListener("mouseup",mouseUp,!1),$("#play").click(function(){play()}),music.addEventListener("canplaythrough",function(){duration=music.duration},!1),music.addEventListener("timeupdate",timeUpdate,!1);var canvas,ctx,source,context,analyser,fbc_array,bars,bar_x,bar_width,bar_height;window.addEventListener("load",initMp3Player,!1);var numberIndexPlaylist,playlist=["https://soundcloud.com/ngusrunsdon/be-real-ft-dej-loaf-explicit","https://soundcloud.com/hotnewexclusive/meek-mill-heaven-or-hell-ft","https://soundcloud.com/detoto/detoto-the-buckeye-party-mix","https://soundcloud.com/itspraddy/ed-sheeran-photograph-acoustic-version"];$(".listPlaylist__table tr").click(function(){var e=$(this).index()-1;console.log("click :",$(this).index()),clickPlaylist(e)}),$(".player__controll__prev").click(function(){previousPlaylist()}),$(".player__controll__next").click(function(){nextPlaylist()});