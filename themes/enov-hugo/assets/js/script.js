(function ($) {
  'use strict';

  // Preloader js
  $(window).on('load', function () {
    $('.preloader').fadeOut(100);
  });

  AOS.init({
    easing: 'ease-out',
    duration: 500,
    once: true
  });

  //   magnific popup video
  $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-zoom-in',
    removalDelay: 160,
    preloader: false,
    fixedContentPos: true
  });

  $(window).scroll(function () {

    var $this = $(this),
      st = $this.scrollTop(),
      navbar = $('.main-nav');

    if (st > 130) {
      if (!navbar.hasClass('nav-top')) {
        navbar.addClass('nav-top');
      }
    }
    if (st < 150) {
      if (navbar.hasClass('nav-top')) {
        navbar.removeClass('nav-top sleep');
      }
    }
    if (st > 250) {
      if (!navbar.hasClass('awake')) {
        navbar.addClass('awake');
      }
    }
    if (st < 250) {
      if (navbar.hasClass('awake')) {
        navbar.removeClass('awake');
        navbar.addClass('sleep');
      }
    }
  });


  $('.portfolio-single-slider').slick({
    infinite: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000

  });

  $('.clients-logo').slick({
    infinite: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000
  });

  $('.testimonial-wrap').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    dots: false,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 6000,
    responsive: [{
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }, {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }

    ]
  });


  $('.portfolio-gallery').each(function () {
    $(this).find('.popup-gallery').magnificPopup({
      type: 'image',
      gallery: {
        enabled: true
      }
    });
  });

  // Shuffle js filter and masonry
  var containerEl = document.querySelector('.shuffle-wrapper');
  if (containerEl) {
    var Shuffle = window.Shuffle;
    var myShuffle = new Shuffle(document.querySelector('.shuffle-wrapper'), {
      itemSelector: '.shuffle-item',
      buffer: 1
    });

    jQuery('input[name="shuffle-filter"]').on('change', function (evt) {
      var input = evt.currentTarget;
      if (input.checked) {
        myShuffle.filter(input.value);
      }
    });
  }

  // -----------------------------
  //  Count Up
  // -----------------------------
  function counter() {
    var oTop;
    if ($('.counter-stat').length !== 0) {
      oTop = $('.counter-stat').offset().top - window.innerHeight;
    }
    if ($(window).scrollTop() > oTop) {
      $('.counter-stat').each(function () {
        var $this = $(this),
          countTo = $this.attr('data-count');
        $({
          countNum: $this.text()
        }).animate({
          countNum: countTo
        }, {
          duration: 1000,
          easing: 'swing',
          step: function () {
            $this.text(Math.floor(this.countNum));
          },
          complete: function () {
            $this.text(this.countNum);
          }
        });
      });
    }
  }
  $(window).on('scroll', function () {
    counter();
  });

  $('.slider-parralax').on('mousemove', function(e){
  });

  var moveForce = 15; // max popup movement in pixels
  var rotateForce = 10; // max popup rotation in deg

  $('.slider').mousemove(function(e) {
    var docX = $('.slider').width();
    var docY = $('.slider').height()*2;

    var moveX = (e.pageX - docX/2) / (docX/2) * -moveForce;
    var moveY = (e.pageY - docY/2) / (docY/2) * -moveForce;

    var rotateY = (e.pageX / docX * rotateForce*2) - rotateForce;
    var rotateX = -((e.pageY / docY * rotateForce*2) - rotateForce);

    $('.slider-parralax').each(function(index, item){
      $(item)
      .css('left', moveX*(index+1)+'px')
      .css('top', moveY*(index+1)+'px')
      .css('transform', 'rotateX('+rotateX*(index+1)+'deg) rotateY('+rotateY*(index+1)+'deg)');
    });
  });

  // Select all links with hashes
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
      &&
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });

  /* apply only to forms with the action pointing to Basin */
  $('form[action^="https://usebasin.com"]').each(function (i, el) {
      var form = $(el);
      form.submit(function (e) {
          e.preventDefault();
          e.stopPropagation()
          /* stop the form from submitting */
          var form = $(e.target);
          if (form[0].checkValidity() === false) {
            form.addClass('was-validated');
            form.find(':invalid').each(function(index, item){
              if(!item.checkValidity()){
                $(item).closest('.form-group').addClass('error');
                $(item).closest('.form-group').find('.invalid-feedback').addClass('is-error').html(item.validationMessage);
              }
            });
            return;
          }
          /* get the form's action parameter and add ".json" to the end */
          var action = form.attr('action') + '.json';
          var parent = $(form.parent());
          /* submit the form via ajax */
          $.ajax({
              url: action,
              method: "POST",
              data: form.serialize(),
              dataType: "json",
              success: function (data) {
                  if (data.success) {
                      /* successful submission - hide the form and show the success message */
                      form.find('button[type=submit]').css('display', 'none');
                      form.find('.form-success').css('display', 'block');
                  } else {
                      /* failed submission - log the output to the console and show the failure message */
                      console.log(data);
                      form.find('.form-error').css('display', 'block');
                  }
              },
              error: function () {
                  /* failed submission - show the failure message */
                  form.find('.form-error').css('display', 'block');
              }
          });
      });
  });
})(jQuery);

function onContactSubmit(token) {
  $('.g-recaptcha').addClass('d-none');
  $('.g-recaptcha').siblings('button[type=submit].d-none').removeClass('d-none');
  $('#contact form').submit();
}
