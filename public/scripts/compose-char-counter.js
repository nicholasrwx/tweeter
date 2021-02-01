$(document).ready(function() {


$('#tweet-text').on("input", function() {
  let count = $(this).val().length;

if (Number($('.counter').html()) < 0) {
  $('.counter').css("color", "red");
  $('.counter').html(140 - count);
} else { 
  $('.counter').css("color", "inherit");
$('.counter').html(140 - count);

}

});


});
