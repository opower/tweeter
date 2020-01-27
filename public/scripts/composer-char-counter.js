$(document).ready(function() {
  // --- our code goes here ---
  $("#btn").on('click', function() {
    console.log(this); //The this keyword is a reference to the button
  });

  $('textarea').on('keydown', function(){
    let charsLeft = 140 - this.value.length;
    if(charsLeft < 0){
      $(this).siblings().last().text(charsLeft).css('color', 'red');
    } else {
      $(this).siblings().last().text(charsLeft);
    }

  });
});