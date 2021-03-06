document.addEventListener("DOMContentLoaded", function () {

  // Custom JS
  //---------- Preloader -------------------------------------------------------
  // $(window).on('load', function () {
  //     $preloader = $('.wrap_preloader'),
  //         $loader = $preloader.find('.cssload-loader');
  //     $loader.fadeOut();
  //     $preloader.delay(350).fadeOut('slow');
  // });
  //------------------------------------------------------------------------------
  //------------ menu hamburger ----------------------------------
  $(".hamburger-btn").click(function () {
    $(this).toggleClass("active");
    $(".header__nav").toggleClass("open");
    $("body").toggleClass("locked");
  });
  $(".header__nav").click(function () {
    $(this).removeClass("active");
    $(".hamburger-btn").removeClass("active");
    $(".header__nav").removeClass("open");
    $("body").removeClass("locked");
  });
  //---------------------------------------------------------------------------
  //------------ wow.js ---------------------------------------------
  // Для упрощения добавления одинаковым элементам классов анимации - добавляю их с помощью jQuery.
  // $('section').addClass('wow fadeInUp');
  $('.topic').first().addClass('wow animate__zoomInUp');
  // $('.portfolio-list__item').addClass('wow bounceIn');
  // var plus = 0;
  // $('.filter-btns button').addClass('wow animate__zoomInDown').each(function(i) {
  //   plus += 0.2;
  //   $(this).attr('data-wow-delay', plus + 's');
  // });
  var plus = 0;
  $('.filter-btns button').addClass('wow animate__zoomInDown').each(function(i) {
    plus += 0.2;
    $(this).attr('data-wow-delay', plus + 's');
  });
  // var plus = 0;
  // $('.contacts__list li').addClass('wow animate__fadeInUp').each(function(i) {
  //   plus += .3;
  //   $(this).attr({'data-wow-delay': plus + 's' , 'data-wow-duration':'.8s'});
  // });
  // var plus = 0;
  // $('.tec img:nth-child(even)').addClass('wow animate__bounceIn').each(function(i) {
  //   plus += 0.25;
  //   $(this).attr({'data-wow-delay': plus + 's' , 'data-wow-duration':'.8s'});
  // });
  // $('.tec img:nth-child(odd)').addClass('wow animate__bounceIn').each(function(i) {
  //   plus += 0.25;
  //   $(this).attr({'data-wow-delay': plus + 's' , 'data-wow-duration':'.8s'});
  // });

  wow = new WOW(
    {
      boxClass: 'wow',      // default
      animateClass: 'animate__animated', // default
      offset: 0,          // default
      mobile: false,       // default
      live: true,        // default
      callback: function (box) {
        // the callback is fired every time an animation is started
        // the argument that is passed in is the DOM node being animated
      },
      scrollContainer: null,    // optional scroll container selector, otherwise use window,
      resetAnimation: true,     // reset animation on end (default is true)
    }
  );
  wow.init();
  //-------------------------------------------------------------------------
  // Скрипт для присвоения пункту меню класса актив при скролле ---------------
  // $(document).on("scroll", onScroll);

  $('a[href^="#"]').on('click', function (e) {
    e.preventDefault();
    $(document).off("scroll");

    // $(this).each(function () {
    //   $(this).removeClass('active');
    // });
    // $(this).addClass('active');

    var target = this.hash;
    $target = $(target);
    $('html, body').stop().animate({
      'scrollTop': $target.offset().top
    }, 500, 'swing', function () {
      window.location.hash = target;
      $(document).on("scroll", onScroll);
    });
  });

  $(window).scroll(function () {
    var scrollDistance = $(window).scrollTop();
    $('section').each(function (i) {
      if ($(this).position().top - 120 <= scrollDistance) {
        // $('#menu a.active').removeClass('active');
        // $('#menu a').eq(i).addClass('active');
      }
    });
  }).scroll();

  // function onScroll(event) {
  //   var scrollPosition = $(document).scrollTop();
  //   $('nav a').each(function () {
  //     var currentLink = $(this);
  //     var refElement = $(currentLink.attr("href"));
  //     if (refElement.position().top - 120 <= scrollPosition && refElement.position().top + refElement.height() > scrollPosition) {
  //       $('nav ul li a').removeClass("active");
  //       currentLink.addClass("active");
  //     }
  //     else {
  //       currentLink.removeClass("active");
  //     }
  //   });
  // };
  //-----------------------------------------------------------------------
  //Добавление и удаление классов по ширене экрана  ----------
  var wsize = 768
  var windowWidth = $(window).width();
  if (windowWidth < wsize) $("header").addClass("mob-header");
  else $("header").removeClass("mob-header");

  $(window).resize(function () {
    var windowWidth = $(window).width();
    if (windowWidth < wsize) $("header").addClass("mob-header");
    else $("header").removeClass("mob-header");
  });
  //----------------------------------------------------------------------------
  //Скрытие хедера при скроле вверх  ------------------------------------
  // var prevScrollpos = window.pageYOffset;
  // window.onscroll = function() {
  //   var currentScrollPos = window.pageYOffset;
  //   if (prevScrollpos > currentScrollPos) {
  //     document.getElementById("header").style.cssText = "top:0; box-shadow:0 0 7px rgba(0,0,0,.3);";
  //   } else {
  //     document.getElementById("header").style.top = "-120px";
  //   }
  //   // if (prevScrollpos > currentScrollPos) {
  //   //   document.getElementsByClassName("mob-header").style.top = "0";
  //   // } else {
  //   //   document.getElementsByClassName("mob-header").style.top = "-100px";
  //   // }
  //   prevScrollpos = currentScrollPos;
  // };

  (function (document, window, index) {
    'use strict';

    var elSelector = '.mob-header',
      element = document.querySelector(elSelector);

    if (!element) return true;

    var elHeight = 0,
      elTop = 0,
      dHeight = 0,
      wHeight = 0,
      wScrollCurrent = 0,
      wScrollBefore = 0,
      wScrollDiff = 0;

    window.addEventListener('scroll', function () {
      elHeight = element.offsetHeight;
      dHeight = document.body.offsetHeight;
      wHeight = window.innerHeight;
      wScrollCurrent = window.pageYOffset;
      wScrollDiff = wScrollBefore - wScrollCurrent;
      elTop = parseInt(window.getComputedStyle(element).getPropertyValue('top')) + wScrollDiff;

      if (wScrollCurrent <= 0) // scrolled to the very top; element sticks to the top
        element.style.top = '0px';

      else if (wScrollDiff > 0) // scrolled up; element slides in
        element.style.top = (elTop > 0 ? 0 : elTop) + 'px';

      else if (wScrollDiff < 0) // scrolled down
      {
        if (wScrollCurrent + wHeight >= dHeight - elHeight)  // scrolled to the very bottom; element slides in
          element.style.top = ((elTop = wScrollCurrent + wHeight - dHeight) < 0 ? elTop : 0) + 'px';

        else // scrolled down; element slides out
          element.style.top = (Math.abs(elTop) > elHeight ? -elHeight : elTop) + 'px';
      }

      wScrollBefore = wScrollCurrent;
    });

  }(document, window, 0));
  //----------------------------------------------------------------------------
  // window.replainSettings = { id: '0fb0562e-fab7-4e25-9136-9c6eb3bebbfb' };
  // (function(u){var s=document.createElement('script');s.type='text/javascript';s.async=true;s.src=u;
  //   var x=document.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);
  // })('https://widget.replain.cc/dist/client.js');
  //--------------------------------------------------------------------------
  //Замена src у iframe на href ссылки по клику -----------------------------
  $('.portfolio-list__item').on('click', '.pages a, .url', function (e) {
    e.preventDefault();
    $('.popup.active iframe').attr('src', this.href);

    $('.pages a').each(function () {
      $(this).removeClass('active');
    });
    $(this).addClass('active');

    var thisParent = $(this).closest('.portfolio-list__item');
    thisParent.find('.project').animate({
      scrollTop: thisParent.find('iframe').offset().top
    }, 1000);
  })
  //------------------------------------------------------------------------
  // Вызов попапа проекта --------------------------------------------------
  $('.production a').attr('title','Посмотртеть продакшн');

  $('body').on('click', '.open-popup', function (e) {
    e.preventDefault();

    var thisParent = $(this).closest('.portfolio-list__item');
    var dataPopupSrc = 'projects/' + $(this).attr('data-popup-src')

    thisParent.find('.popup').addClass('active').load(dataPopupSrc);
    // thisParent.find('.popup').addClass('active');
    // thisParent.find('iframe').attr('src', this.href);
    $('body').addClass('locked');
  })

  $('.popup').on('click', '.close-btn, .overlay', function () {
    $('.popup, .popup__box').removeClass('active');
    setTimeout(function () {
      $('body').removeClass('locked');
    }, 300)
    $('.pages a').removeClass('active');
  })

  //--------------------------------------------------------------------------
  // Фильтр проектов ---------------------------------------------------------
  $(".filter-btns button").on('click', function () {
    $(this).siblings().removeClass('active');
    $(this).addClass('active');
    var selectedClass = $(this).attr("data-filter");
    $(".portfolio-list").fadeTo(100, 0.1);
    $(".portfolio-list__item").not("." + selectedClass).fadeOut().removeClass('show');
    setTimeout(function () {
      $("." + selectedClass).fadeIn().addClass('show');
      $(".portfolio-list").fadeTo(300, 1);
    }, 350);
  });
  //--------------------------------------------------------------------------
  // Фильтр технологий ---------------------------------------------------------
  $(".tec__filter button").on('click', function () {
    $(this).siblings().removeClass('active');
    $(this).addClass('active');
    var selectedClass = $(this).attr("data-filter");
    $(".tec__list").fadeTo(100, 0.1);
    $(".tec__item").not("." + selectedClass).fadeOut().removeClass('show');
    setTimeout(function () {
      $("." + selectedClass).fadeIn().addClass('show');
      $(".tec__list").fadeTo(300, 1);
    }, 350); 
  });
  //--------------------------------------------------------------------------
})

