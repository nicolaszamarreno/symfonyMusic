$(".header__addPlaylist").on('click', function(){
    $('.modal, .modal__popin').fadeIn();
});

$(".modal").on('click', function(){
    $('.modal, .modal__popin').fadeOut();
});

$(".icon-edit").click(function(){
    alert("bonjour");
})