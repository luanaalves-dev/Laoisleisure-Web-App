(function ($) {
  "use strict";

  // Spinner
  var spinner = function () {
    setTimeout(function () {
      if ($("#spinner").length > 0) {
        $("#spinner").removeClass("show");
      }
    }, 1);
  };
  spinner(0);

  // Newsletter Form Handler com feedback visual
  $("#newsletter-form").on("submit", function (e) {
    e.preventDefault();

    const email = $("#email-input").val();
    const $message = $("#message");
    const $loader = $("#loader");

    // Reset estado
    $message.removeClass("text-success text-danger").text("");
    $loader.removeClass("d-none"); // mostra o spinner

    $.ajax({
      url: "http://localhost:3000/subscribe",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({ email }),
      success: function (data) {
        $loader.addClass("d-none");
        $message
          .text("Subscription confirmed! Thank you for joining us.")
          .addClass("text-success")
          .hide()
          .fadeIn();
        $("#newsletter-form")[0].reset();

        setTimeout(() => {
          $message.fadeOut();
        }, 5000);
      },
      error: function (xhr) {
        $loader.addClass("d-none");
        const errorMsg = xhr.responseJSON?.message || "Error registering.";
        $message.text(errorMsg).addClass("text-danger").hide().fadeIn();

        setTimeout(() => {
          $message.fadeOut();
        }, 5000);
      },
    });
  });

  // Initiate the wowjs
  new WOW().init();

  // Sticky Navbar
  $(window).scroll(function () {
    if ($(this).scrollTop() > 45) {
      $(".navbar").addClass("sticky-top shadow-sm");
    } else {
      $(".navbar").removeClass("sticky-top shadow-sm");
    }
  });

  // Hero Header carousel
  $(".header-carousel").owlCarousel({
    animateOut: "slideOutDown",
    items: 1,
    autoplay: true,
    smartSpeed: 1000,
    dots: false,
    loop: true,
    nav: true,
    navText: [
      '<i class="bi bi-arrow-left"></i>',
      '<i class="bi bi-arrow-right"></i>',
    ],
  });

  // International carousel
  $(".testimonial-carousel").owlCarousel({
    autoplay: true,
    items: 1,
    smartSpeed: 1500,
    dots: true,
    loop: true,
    margin: 25,
    nav: true,
    navText: [
      '<i class="bi bi-arrow-left"></i>',
      '<i class="bi bi-arrow-right"></i>',
    ],
  });
  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });
})(jQuery);
