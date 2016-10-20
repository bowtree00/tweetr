$(function() {
 
  var maxLength = 140;

  $(".new-tweet textarea").on("keyup", function() {

    var $counter = $(this) // Traverse the DOM and grab the counter
      .parent("form")
      .find(".counter"); 

    // var currLength = this.value.length; // NOTE: This way does not require that 'this' is wrapped as a jQuery object, and thus there is less overhead to process this line of code. But we want to be able to use .val() here, so that's what I've kept below
    
    var $currLength = $(this).val().length;
    
    $counter.text(maxLength - $currLength);

    // console.log("$counter.text(): " + $counter.text());

    if ($counter.text() < 0 ) {
      // $counter.css("color", "red");
      
      $counter.addClass("negative");  // changes colour by adding a new class to the element which is styled differently in the CSS file

      console.log("here");
    } else {
      // $counter.css("color", "black");
      $counter.removeClass("negative"); 
    }


  })





}) // EOF