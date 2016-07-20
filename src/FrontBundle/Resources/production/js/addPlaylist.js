$(".header__addPlaylist").click(function(){
    $(".modal").fadeIn();
});
$(".modal").click(function(){
    $(".modal").fadeOut();
});
$(".modal").children().click(function() {
    return false;
});

$("body").on("click", ".listPlaylist__listing tr td i.icon-edit", function(){
    return false;
});