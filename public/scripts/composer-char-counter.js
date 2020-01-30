$(document).ready(function() {
  // --- our code goes here ---
  $("#btn").on('click', function() {
    console.log(this); //The this keyword is a reference to the button
  });

  /**
   * Calculates the the number of character the user enters in the text area
   * If the count is greater than 140 change the text red
   */
  $('textarea').on('keyup', function() {
    let charsLeft = 140 - this.value.length;
    if (charsLeft < 0) {
      $(this).siblings().last().text(charsLeft).css('color', 'red');
    } else {
      $(this).siblings().last().text(charsLeft).css('color', '#545149');
    }

  });
});