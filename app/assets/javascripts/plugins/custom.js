
function scrollUp() {
  // browser window scroll (in pixels) after which the "back to top" link is shown
  var offset = 300,
    //browser window scroll (in pixels) after which the "back to top" link opacity is reduced
    offset_opacity = 1200,
    //duration of the top scrolling animation (in ms)
    scroll_top_duration = 700,
    //grab the "back to top" link
    $back_to_top = $('.cd-top');

  //hide or show the "back to top" link
  $(window).scroll(function(){
    ( $(this).scrollTop() > offset ) ? $back_to_top.addClass('cd-is-visible') : $back_to_top.removeClass('cd-is-visible cd-fade-out');
    if( $(this).scrollTop() > offset_opacity ) {
      $back_to_top.addClass('cd-fade-out');
    }
    var scroll = $(window).scrollTop();

    if (scroll > 0 ) {
      $('nav#main-nav').addClass('scrolled');
    }

    if (scroll <= 0 ) {
      $('nav#main-nav').removeClass('scrolled');
    }

  });

  //smooth scroll to top
  $back_to_top.on('click', function(event){
    event.preventDefault();
    $('body,html').animate({
      scrollTop: 0 ,
      }, scroll_top_duration
    );
  });

};

function flexSlider() {
  $('#diaporama').flexslider({
    animation: "slide",
    //controlNav: false,
    //animationLoop: false,
    //slideshow: false,
    // directionNav:false,
  });

  $('#galerie-photos').flexslider({
    animation: "slide",
    //controlNav: false,
    //animationLoop: false,
    //slideshow: false,
    // directionNav:false,
  });

  $('#slide-actions').flexslider({
    animation: "slide",
    animationLoop: false,
    itemWidth: 310,
    itemMargin: 20,
    slideshow:false,
    minItems: 1,
    // smoothHeight: true,
  });

};



$(document).on('ready page:load', function () {
  scrollUp();
  flexSlider();
});

