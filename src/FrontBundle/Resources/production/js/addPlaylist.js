var linkSong;
var titleSong;
$(".header__addPlaylist").click(function(){
    $(".modal").fadeIn();
    $(".modal__popin").fadeIn();

});

$(".modal").click(function(){
    $(this).fadeOut();
    $(".modal__popin").fadeOut();

});

$("body").on("click", ".listPlaylist__listing tr td i.icon-edit", function(){
    linkSong = $(this).parent().parent().attr('data-label');
    titleSong = $(this).parent().parent().children().eq(2).text();
    var posElement = $(this).position();
    $(".your").css({
        "position" : "absolute",
        "top" : posElement.top + 27,
        "left" : posElement.left - 40
    }).fadeIn();
    return false;
});

$(".wrapper").click(function(){
    $(".your").fadeOut();
})

function constructModal(object){
    var modal = '<ul class="your">';
    $.each(object, function() {
        modal += '<li data-playlist="' + this.id + '">' + this.title + '</li>';
    });
    modal += '</ul>';
    $("body").append(modal);
}

$("body").on("click", ".your li", function(){
    var nbPlaylist = $(this).attr('data-playlist');
    AddSongPlaylist(linkSong, titleSong, nbPlaylist);
});


