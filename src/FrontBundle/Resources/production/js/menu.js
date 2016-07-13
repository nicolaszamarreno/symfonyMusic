$('.header__logo').click(function(){
    $(this).toggleClass('toggle--active');
    $('.wrapper').toggleClass('wrapper--menu');
    $('.menu').slideToggle(800);
});