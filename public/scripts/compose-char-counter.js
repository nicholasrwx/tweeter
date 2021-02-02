$(document).ready(function () {
  $("#tweet-text").on("input", function () {
    let count = $(this).val().length;
    if (Number(count) > 140) {
      $(".counter").css("color", "red");
      $(".counter").html(140 - count);
    } else if (Number(count) <= 140) {
      $(".counter").css("color", "inherit");
      $(".counter").html(140 - count);
    }
  });
});
