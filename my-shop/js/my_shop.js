
const maxQty = 10;
const articleIdKey = "article";
const orderIdKey = "order";
const inputIdKey = "qty";
var quantityId = "";

const catalog = [
    {
        "name": "Abricot",
        "description": "Produit du verger St paul",
        "image": "/img/fruits/abricot.jpg",
        "price": 6.5
    },
    {
        "name": "Banane",
        "description": "Produit du verger St paul",
        "image": "/img/fruits/banane.jpg",
        "price": 6.5
    },
    {
        "name": "Kaki",
        "description": "Produit 100% bio issus de notre verger",
        "image": "/img/fruits/kaki.jpg",
        "price": 6.5
    },
    {
        "name": "Kiwi vert",
        "description": "Produit du verger St paul",
        "image": "/img/fruits/kiwi_vert.jpg",
        "price": 6.5
    },
    {
        "name": "Kiwi jaune",
        "description": "Produit du verger St paul",
        "image": "/img/fruits/kiwi_jaune.jpg",
        "price": 6.5
    },
    {
        "name": "Pomme chantereck",
        "description": "Produit du verger St paul",
        "image": "/img/fruits/p_chantereck.jpg",
        "price": 6.5
    },
    {
        "name": "Pomme golden",
        "description": "Produit du verger St paul",
        "image": "/img/fruits/p_golden.jpg",
        "price": 6.5
    },
    {
        "name": "Pomme top red",
        "description": "Produit du verger St paul",
        "image": "/img/fruits/p_top_red.jpg",
        "price": 6.5
    },
    {
        "name": "Pêche",
        "description": "Produit du verger St paul",
        "image": "/img/fruits/peche.jpg",
        "price": 6.5
    },
    {
        "name": "Poire",
        "description": "Produit du verger St paul",
        "image": "/img/fruits/poire_icare.jpg",
        "price": 6.5
    },
    {
        "name": "Poire jaune",
        "description": "Produit du verger St paul",
        "image": "/img/fruits/poire_jaune.jpg",
        "price": 6.5
    }
];


/*  ----global variable which represent the total
    coast of selected products--- 
*/
var total = 0;

//Function called when page is loaded
var init = function () {
    createShop();
}

window.addEventListener("load", init);

/* */
var createShop = function () {
    var shop = document.getElementById("shop");
    for (var i = 0; i < catalog.length; i++) {
        shop.appendChild(createProduct(catalog[i], i));
    }
}


/* Create a div article*/
const createProduct = function (article, index) {
    const block = document.createElement("div");
    block.className = "article";
    block.id = index + "-" + articleIdKey;
    block.appendChild(createBlock('h4', article.name));
    block.appendChild(createFigureBlock(article));
    block.appendChild(createBlock('div', article.description, "description"));
    block.appendChild(createBlock('div', article.price, "prix"));
    block.appendChild(createOrderControlBlock(index));
    return block;
}

/* Create a figure block for a article*/
const createFigureBlock = function (article) {
    let figure = document.createElement("figure");
    let img = document.createElement('img');
    img.className = "class_img";
    for (var i = 0; i < catalog.length; i++) {
        if (catalog[i].name === article.name) {
            img.src = catalog[i].image;
        }
    }
    return figure.appendChild(img);
}

/* Create a block */
const createBlock = function (tag, content, cssClass) {
    let element = document.createElement(tag);
    if (cssClass != undefined) {
        element.className = cssClass;
    }
    element.innerHTML = content;
    return element;
}


/* Create a control order */
const createOrderControlBlock = function (index) {
    var control = document.createElement("div");
    control.className = "control";

    //Create input qty element
    var input = document.createElement("input");
    input.id = index + "-" + inputIdKey;
    input.type = "number";
    input.step = "1";
    input.value = "0";
    input.min = "0";
    input.max = maxQty.toString();
    control.appendChild(input);


    //Create order button
    var button = document.createElement("button");
    button.className = "commander";
    button.id = index + "-" + orderIdKey;
    button.style.opacity = 0.25;
    control.appendChild(button);

    input.addEventListener("keyup", function () {
        if (isNaN(input.value)) {
            alert("cette valeur n'est pas un nbre");
            input.value = "0";
        } if (input.value > maxQty) {
            input.value = "0";
            alert("Commande maximum 10Kg/produit!");
        }
    });
    input.addEventListener("change", function () {
        if (input.value > input.min) {
            button.style.opacity = 1;
            var buttonCde = document.getElementById(index +"-"+orderIdKey);
              alert(buttonCde.outerHTML);
            // var article = div.description.textContent;
          buttonCde.addEventListener("click", function(){
              var article;
                for(var i =0; i < catalog.length; i++){
                       if(i === index){
                           article = catalog[i];
                           console.log(article);
                       }
                }
               createPurchaseBlock(article, index);
            });
        } else {
            button.style.opacity = 0.25;
        }
    });
    return control;
}


var purchases = document.getElementById("purchases");
const createPurchaseBlock = function (article, index) {
    var block = document.createElement('div');
    block.className = "purchase";
    block.id = index + "-" + articleIdKey;
    block.appendChild(createFigureBlock(article));
    block.appendChild(createBlock("h4", article.name));
    block.appendChild(createElementHtml("div", "qty"));
    block.appendChild(createElementHtml("div", "prix"));
    
   // purchases.appendChild(block);

    /* Create button remove */
    var controlDiv = document.createElement("div");
      controlDiv.className = "control";
    var button = document.createElement("button");
    button.className = "remove";
    button.id = index + "-" + "remove";
    controlDiv.append(button);
    block.appendChild(controlDiv);
    console.log(block.outerHTML);
    purchases.appendChild(block);
    
    return purchases;
}


const createElementHtml = function (tag, name) {
    var element = document.createElement(tag);
    element.className = name;
    return element;
}




/* Function to search a article*/
const input = document.querySelector("input");
const filter = document.getElementById("filter");
const shop = document.getElementById("shop");

filter.addEventListener("keyup", function () {
    let catalogFilter = [];
    let colorDisplay;
    for (var i = 0; i < catalog.length; i++) {
        if (catalog[i].name.indexOf(filter.value) === 0) {
            colorDisplay = "green";
            catalogFilter.push(catalog[i]);
            input.style.backgroundColor = colorDisplay;
        } else if (catalog[i].name.indexOf(filter.value) === -1) {
            colorDisplay = "red";
            input.style.backgroundColor = colorDisplay;
            input.textContent = "";
            init();
        } else {
            colorDisplay = "white";
            input.style.backgroundColor = colorDisplay;
            init();
        }
    }
    for (var i = 0; i < catalogFilter.length; i++) {
        console.log(catalogFilter[i].name);
        shop.innerHTML = "";
        shop.appendChild(createProduct(catalogFilter[i], i));
    }
});

