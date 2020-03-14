const maxQty = 10;
const articleIdKey = "article";
const orderIdKey = "order";
const inputIdKey = "qty";
const purchaseIdKey = "purchase";
const removeIdKey = "remove";
var quantityId = "";
var TotalCoast;

const catalog = [{
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
        coast of selected products
*/
var total = 0;


var init = () => {
    createShop();
}

window.addEventListener("load", init);

/* */
var createShop = () => {
    let shop = document.getElementById("shop");
    for (var i = 0; i < catalog.length; i++) {
        shop.appendChild(createProduct(catalog[i], i));
    }
}


/* Create a div article*/
var createProduct = (article, index) => {
    let block = document.createElement("div");
    block.className = "article";
    block.id = index + "-" + articleIdKey;
    block.appendChild(createBlock('h4', article.name));
    block.appendChild(createFigureBlock(article));
    block.appendChild(createBlock('div', article.description, "description"));
    block.appendChild(createBlock('div', article.price, "prix"));
    block.appendChild(createOrderControlBlock(index));
    return block;
}


var createFigureBlock = (article) => {
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


var createBlock = (tag, content, cssClass) => {
    let element = document.createElement(tag);
    if (cssClass != undefined) {
        element.className = cssClass;
    }
    element.innerHTML = content;
    return element;
}



var createOrderControlBlock = (index) => {
    let control = document.createElement("div");
    control.className = "control";

    //Create input qty element
    let input = document.createElement("input");
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

    inputKeyup(input);
    inputValueChange(input, button, index);

    return control;
}

var inputKeyup = (itemHtml) => {
    itemHtml.addEventListener("keyup", () => {
        if (isNaN(itemHtml.value)) {
            alert("cette valeur n'est pas un nbre");
            itemHtml.value = "0";
        }
        if (itemHtml.value > maxQty) {
            alert("Commande maximum: 10Kg/produit!");
            itemHtml.value = "0";
        }
    });
}

var inputValueChange = (itemHtml, buttonHtml, position) => {

    itemHtml.addEventListener("change", () => {
        let articleSelected = "";
        let quantityArt = 0;
        if (itemHtml.value > itemHtml.min) {
            quantityArt = parseInt(itemHtml.value);
            buttonHtml.style.opacity = 1;
            let buttonCde = document.getElementById(buttonHtml.id);
            let idOrder = (buttonHtml.id);

            buttonCde.addEventListener("click", () => {
                let purchasesItems = document.getElementById("purchases");
                let purchaseItems = purchasesItems.getElementsByClassName('purchase');
                if (purchaseItems.length === 0) {
                    createShip(position, articleSelected, quantityArt);
                } else {
                    let indice = 0;
                    let initialSize = purchaseItems.length;
                    while (indice <= initialSize) {
                        console.log(`L'indice tableau : ${indice}`);
                        if (purchaseItems[indice].id[0] === idOrder[0]) {
                            console.log(`Id selection article: ${idOrder}`);
                        } else {
                            createShip(position, articleSelected, quantityArt);
                        }
                        purchaseItems.length = initialSize;
                        indice++;
                    }
                }
                itemHtml.value = "0";
                buttonHtml.style.opacity = 0.25;
            });
        } else {
            buttonHtml.style.opacity = 0.25;
        }
    });
}



var calculatePrice = (qty, price) => {
    (qty > 1) ? price = qty * price: price;
    return price;
}

var createShip = (id, article, qtyArticle) => {
    console.log('Dans create ship');
    let shipPrice = 0;
    for (var i = 0; i < catalog.length; i++) {
        console.log('dans la boucle ship');
        if (id === i) {
            article = catalog[i];
            createPurchaseBlock(article, id, qtyArticle);
            shipPrice = article.price;
        }
    }
    TotalCoast = document.getElementById("montant");
    TotalCoast.textContent = Number(TotalCoast.textContent) + shipPrice;
}


let purchases = document.getElementById("purchases");
var createPurchaseBlock = (article, index, qty) => {
    console.log(`Dans createpurchase le qty vaut:${qty}`);
    let block = document.createElement('div');
    block.className = "purchase";
    block.id = index + "-" + purchaseIdKey;
    block.appendChild(createFigureBlock(article));
    block.appendChild(createBlock("h4", article.name));
    block.appendChild(createBlock("div", qty, "qty"));
    block.appendChild(createBlock("div", article.price, "prix"));

    /* Create button remove */
    let controlDiv = document.createElement("div");
    controlDiv.className = "control";
    let button = document.createElement("button");
    button.className = "remove";
    button.id = index + "-" + removeIdKey;
    button.click = removeItem();
    controlDiv.append(button);
    block.appendChild(controlDiv);
    purchases.appendChild(block);
    return purchases;
}


var removeItem = () => {
    document.addEventListener('click', (e) => {
        let str = e.target.id;
        let indice = str[0];
        let idRemove = indice + "-" + removeIdKey;
        if (str === idRemove) {
            let idArticle = indice + "-" + purchaseIdKey;
            let selectedArticle = document.getElementById(idArticle);
            let itemPrice = selectedArticle.getElementsByClassName("prix")[0];
            console.log(itemPrice.length);
            console.log(itemPrice.textContent);
            TotalCoast.textContent = Number(TotalCoast.textContent) - Number(itemPrice.textContent);
            selectedArticle.innerHTML = "";
            selectedArticle.backgroundColor = "white";

        }
    });
}

/* Function to search a article*/
let input = document.querySelector("input");
let filter = document.getElementById("filter");
let shop = document.getElementById("shop");

filter.addEventListener("keyup", () => {
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