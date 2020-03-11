


const maxQty = 10;
const articleIdKey = "article";
const orderIdKey = "order";
const inputIdKey = "qty";
const purchaseIdKey = "purchase";
var quantityId = "";
var TotalCoast;

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
        coast of selected products
*/
var total = 0;

//Function called when page is loaded
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

/* Create a figure block for a article*/
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

/* Create a block */
var createBlock = (tag, content, cssClass) => {
    let element = document.createElement(tag);
    if (cssClass != undefined) {
        element.className = cssClass;
    }
    element.innerHTML = content;
    return element;
}


/* Create a control order */
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

    /*Control the input values*/
    input.addEventListener("keyup", () => {
        if (isNaN(input.value)) {
            alert("cette valeur n'est pas un nbre");
            input.value = "0";
        } if (input.value > maxQty) {
            alert("Commande maximum: 10Kg/produit!");
            input.value = "0";
        }
    });

    input.addEventListener("change", () => {
        let articleSelected = "";
        let quantityArt = 0;
        if (input.value > input.min) {
            quantityArt = parseInt(input.value);
            button.style.opacity = 1;
            let buttonCde = document.getElementById(index + "-" + orderIdKey);
            let idOrder = (index + "-" + orderIdKey);

            console.log(` id de la selection ${idOrder}`);

            /* function create ship*/
            var createShip = () => {
                let shipPrice = 0;
                for (var i = 0; i < catalog.length; i++) {
                    if (index === i) {
                        articleSelected = catalog[i];
                        createPurchaseBlock(articleSelected, index, quantityArt);
                        shipPrice = articleSelected.price;
                    }
                }
                TotalCoast = document.getElementById("montant");
                TotalCoast.textContent = Number(TotalCoast.textContent) + shipPrice;
            }

            /*Function calculate update the price */
            let calculatePrice = (qty, price) => {
                (qty > 1) ? price = qty * price : price;
                return price;
            }

            buttonCde.addEventListener("click", () => {
                let purchasesItems = document.getElementById("purchases");
                let purchaseItems = purchasesItems.getElementsByClassName('purchase');

                /* For the first selectionne they are not article in shopping box  */
                if (purchaseItems.length === 0) {
                    createShip();

                } else { /* At less one element in shopping box*/
                    let indice = 0;
                    let initialSize = purchaseItems.length;
                    while (indice <= initialSize) {
                        console.log(`L'indice tableau : ${indice}`);
                        if (purchaseItems[indice].id[0] === idOrder[0]) {
                            console.log(`Id selection article: ${idOrder}`);
                        } else {
                            createShip();
                            // console.log(`on a ${purchaseItems.length} produit(s) dans le panier`);
                        }
                        purchaseItems.length = initialSize;
                        indice++;
                    }
                }
                input.value = "0";
                button.style.opacity = 0.25;
            });//End of click commander

        }//End of block if input.value
        else {
            button.style.opacity = 0.25;
        }
    });//End of change
    return control;
}



/*Function */
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
    button.id = index + "-" + "remove";
    button.click = removeItem();
    controlDiv.append(button);
    block.appendChild(controlDiv);
    purchases.appendChild(block);
    return purchases;
}

/*Remove an element*/
var removeItem = () => {
    document.addEventListener('click', (e) => {
        let str = e.target.id;
        let indice = str[0];
        let idRemove = indice + "-" + "remove";
        if (str === idRemove) {
            let idArticle = indice + "-" + purchaseIdKey;
            let selectedArticle = document.getElementById(idArticle);
            let itemPrice = selectedArticle.getElementsByClassName("prix")[0].textContent;
            TotalCoast.textContent = Number(TotalCoast.textContent) - itemPrice;
            selectedArticle.innerHTML = "";
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

