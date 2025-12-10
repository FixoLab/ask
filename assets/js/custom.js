/**
 * Table of contents
 * -----------------------------------
 * 1.HEADER STICKY
 * 2.HEADER ACTIVE ADD CLASS
 * 3.HEADER COLLAPSE
 * 4.FIXED HEADER
 * 6.GLIGHTBOX VIDEO HERO
 * 7.ODOMETER JS
 * 8.TESTIMONIAL SLIDER
 * 12.SERVICE SLIDER
 * 18.SMOOTH SCROLL ON BUTTON CLICK
 * 19.SCREENSHOT SLIDER
 * DARK VERSION
 */

(function ($) {
  "use strict";
  var PATH = {};

  /******************** 1.HEADER STICKY ********************/
  PATH.HeaderSticky = function () {
    $(".navbar-toggler").on("click", function (a) {
      a.preventDefault(), $(".navbar").addClass("navbar_fixed");
    });
  };

  /******************** 2.HEADER ACTIVE ADD CLASS ********************/
  PATH.HeaderOnePageNav = function () {
    $(".scroll").onePgaeNav({
      activeClass: "active",
      wrapper: "#onepage-nav",
      navStop: 60,
      navStart: 70,
    });
  };

  /******************** 3.HEADER COLLAPSE ********************/
  PATH.MenuClose = function () {
    $(".navbar-nav li").on("click", function () {
      var toggle = $(".navbar-toggler").is(":visible");
      if (toggle) {
        $(".navbar-collapse").collapse("hide");
      }
    });
  };

  /******************** 4.FIXED HEADER ********************/
  PATH.HeaderFixed = function () {
    var varHeaderFix = $(window).scrollTop() >= 60,
      $navbar = $(".header");
    if (varHeaderFix) {
      $navbar.addClass("navbar_fixed");
    } else {
      $navbar.removeClass("navbar_fixed");
    }
  };

  /******************** 5.GLIGHTBOX VIDEO HERO ********************/
  PATH.videoModal = function () {
    GLightbox({
      selector: ".glightbox3",
    });
  };

  /******************** 7.ODOMETER JS  ********************/
  PATH.OdoMeter = function () {
    $(".odometer").appear(function (e) {
      var odo = $(".odometer");
      odo.each(function () {
        var countNumber = $(this).attr("data-count");
        $(this).html(countNumber);
      });
    });
  };

  /******************** 8.TESTIMONIAL SLIDER  ********************/
  PATH.TestimonialSlide = function () {
    new Swiper(".testimonialSlider", {
      spaceBetween: 18,
      loop: true,

      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  };

  /******************** 18.SMOOTH SCROLL ON BUTTON CLICK  ********************/
  $(document).on("click", "a.smooth", function (event) {
    event.preventDefault();
    $("html, body").animate(
      {
        scrollTop: $($.attr(this, "href")).offset().top,
      },
      1000
    );
  });

  /******************** DOCUMENT READY FUNCTION ********************/
  $(function () {
    PATH.HeaderSticky();
    PATH.HeaderOnePageNav();
    // PATH.MenuClose();
    PATH.videoModal();
    PATH.OdoMeter();
    PATH.TestimonialSlide();
  });

  /******************** WINDOW ON SCROLL FUNCTION ********************/
  $(window).on("scroll", function () {
    PATH.HeaderFixed();
  });

  /******************** WINDOW ON LOAD FUNCTION ********************/
  $(window).on("load", function () {});
})(jQuery);

/******************** DARK VERSION ********************/
function setTheme(themeName) {
  localStorage.setItem("ask-faq", themeName);
  document.documentElement.className = themeName;
}
function toggleTheme() {
  if (localStorage.getItem("ask-faq") === "theme-dark") {
    setTheme("theme-light");
  } else {
    setTheme("theme-dark");
  }
}
(function () {
  if (localStorage.getItem("ask-faq") === "theme-dark") {
    setTheme("theme-dark");
    document.getElementById("slider").checked = false;
  } else {
    setTheme("theme-light");
    document.getElementById("slider").checked = true;
  }
})();
