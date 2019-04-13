(function (){
    var $menuItems = (".menu ul");

    //Masque les contenus de menu
    $menuItems.hide();

    //Enroulage et déroulage des menus
    (".menu-header").click(function(ev){
        $menuItems.hide(800);
        (this).next().show(800);
    });
});
