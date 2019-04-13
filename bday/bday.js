$(function() {
  //Declaration des variables
  var $head, $item, $item2, $item3;
  $h1 = $("#header");
  $item = $("#item");$item.hide();
  $item2 = $("#item2");$item2.hide();
  $item3 = $("#item3");$item3.hide();


  $h1.click(function(){
    $item.slideDown(2500, function(){
      $("body").css("background-image", "../bday.jpg");
   });
});

  $item.click(function(){
    $item2.slideDown(2600);
    });

  $item2.click(function(){
    $item3.slideDown(3000);
  });
});
