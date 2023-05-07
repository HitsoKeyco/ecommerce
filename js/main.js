//* Menu hamburguesa

    const menu = document.querySelector(".menu");
    const links = document.querySelectorAll(".menu li");
    const boxMenu = document.querySelector(".menu_hamburguesa");
    const navbarHMTL = document.querySelector(".nav")


// -------------------------------------------------------
//* Nav Transparente


function animationScroll() {
    let y = window.scrollY;

    if (y > 200) {        
        navbarHMTL.classList.add("nav_show");
    } else {
        
        navbarHMTL.classList.remove("nav_show");
    }
}
window.onscroll = () => animationScroll();


// -------------------------------------------------------

function mostrarMenu() {
        menu.classList.toggle("menu_show");
}

boxMenu.addEventListener("click", mostrarMenu);

links.forEach((link) => {
    link.addEventListener("click", mostrarMenu);
});


function navlink(){
    const links = document.querySelectorAll('.link_menu');

    links.forEach(link => {
        link.addEventListener('click', () => {
            links.forEach(link => {
                link.classList.remove('link_menu_active');
        });

            link.classList.add('link_menu_active');
        });
    });
}


function buttonSelected(){
    
    const links = document.querySelectorAll('.button_category');

    links.forEach(link => {
        link.addEventListener('click', () => {
            links.forEach(link => {
                link.classList.remove('button_category_selected');
                
        });

            link.classList.add('button_category_selected');
            
        });
    });
}
buttonSelected();

function toggleDarkMode() {
    const body = document.body;
    const moonIcon = document.querySelector(".moon_icon");

    let isDarkMode = false;

    moonIcon.addEventListener('click', () => {
        isDarkMode = !isDarkMode;
        body.classList.toggle('dark_mode', isDarkMode);
        body.classList.toggle('light_mode', !isDarkMode);
    });
}


toggleDarkMode();


//* Conexion a API - Guardado datos en localStorage -  Peticion de datos al localStorage

  // Promesa asincrona
    async function getProducts() {
        try {
        //asignamos a variable la peticion a la API
        const data = await fetch(
            "https://ecommercebackend.fundamentos-29.repl.co/"
        );

        //conversion de string a arreglo
        const res = await data.json();

        // permite q se guarde datos en el localStorage -solo acepta string
        window.localStorage.setItem("Products", JSON.stringify(res));

        //Devolvemos elarreglo
        return res;

        } catch (error) {

        //devuelve error por consola en caso de encontrarlo
        console.log("existe un problema de conexion con la API");
        }
    }



  //* codigo accionador "arranca"para q espere nuestra promesa + guardar informacion en el localStorage

    async function main() {
        const db = {
            products:
                    JSON.parse(window.localStorage.getItem('products')) || (await getProducts()),
            cart:   
                    JSON.parse(window.localStorage.getItem('cart')) || {},
        };
        navlink();
        pintarProducts(db);
        mostrarCart();
        insertarProductosAlCart(db);
        validarDatosCart(db);
        manejoDatosCart(db);
        logicacompra(db);
        infoDeCompra(db);
        cantidaiconcarrito(db);

    }

    main();

function pintarProducts(db){
    const productsHTML = document.querySelector(".products");

    let html = "";

    for (product of db.products) {

        html += ` 
                
                <div class="card">

                    <div class="card_top">
                        <img class="img_producto" src="${product.image}" alt="imagen">
                    </div>

                    <div class="card_dawn">
                        <span>$${product.price}&nbsp;&nbsp;&nbsp;</span>

                        <span> Stock: ${product.quantity}</span><br>

                        <p class = "description_product">${product.name}</p>

                        <div class = "add">
                            
                            ${product.quantity ? `<i class='bx bx-plus plus ' id ='${product.id}' ></i>` : '<p class="soldOut">sold out</p>'}
                                
                            
                        </div>
                    </div>      

                </div>
                
            `;
    }    
    productsHTML.innerHTML = html;
}


function mostrarCart() {
    const cartIconHTML =document.querySelector('.cart_icon');
    const cartHTML =document.querySelector('.cart');

    cartIconHTML.addEventListener('click',function(){
        cartHTML.classList.add('cart_show');
    });

    const hiddenCartHTML = document.querySelector('.cart_cerrar')

    hiddenCartHTML.addEventListener('click',function(){
        cartHTML.classList.remove('cart_show');
    })
}


function insertarProductosAlCart(db) {
    const cardProducts = document.querySelector('.card_products');

    let html = '';

    for(const product in db.cart){
        const {quantity, price, name, image, id, amount} = db.cart[product];
        html += `
            <div class= "contenedor_cart_product">
            <div class = "card_product">
                <div class = "card_product--img">
                    <img class = "img_cart_in"src="${image}" alt = "image" />
                </div>
                <div class = "card_product_body">
                    <h4 class="name_product_cart">${name}</h4>
                    <p class = "stock_cart"> Stock: ${quantity} | <span class="precio_cart">$${price}</span></p>
                    <span class="subtotal_cart">Subtotal: ${'$' + price * amount}</span>

                    <div class = "card_product_ body_op" id="${id}">
                        <i class='bx bx-minus'></i>
                        <span class = "units_car">${amount} unit </span>
                        <i class='bx bx-plus plus_add'></i>                        
                        <i class='bx bxs-trash' ></i>
                    </div>

                </div>
                
            </div>
            </div>
        `
        
    }
    infoDeCompra(db);
    cantidaiconcarrito(db)
    cardProducts.innerHTML = html;

}


function validarDatosCart(db){

        const productHTML = document.querySelector('.products')

        productHTML.addEventListener('click', function(e){
            if(e.target.classList.contains('bx-plus')){
                const id = Number(e.target.id);
                
                const productFind = db.products.find(
                    (product) => product.id === id
                    
                );
        
                if(db.cart[productFind.id]){
                    if(productFind.quantity === db.cart[productFind.id].amount) return alert ('No disponemos de mas en bodega');
                    db.cart[productFind.id].amount++;
                }else{
                    db.cart[productFind.id] = {...productFind, amount: 1};
                }
        
                window.localStorage.setItem('cart', JSON.stringify(db.cart));
                insertarProductosAlCart(db);
                infoDeCompra(db);
            }
        
        });

}


function manejoDatosCart(db){
            const cartProducts = document.querySelector('.card_products');

            cartProducts.addEventListener('click',function(e){
                
                if(e.target.classList.contains('bx-plus')){
                    const id = Number(e.target.parentElement.id);
                    const productFind = db.products.find(
                        (product) => product.id ===id
                    );

                    if(productFind.quantity === db.cart[productFind.id].amount)
                        return alert('no tenemos mas en bodega');

                    db.cart[id].amount++;
                }
                if(e.target.classList.contains('bx-minus')){
                    const id = Number(e.target.parentElement.id);
                    if(db.cart[id].amount === 1){
                        const response = confirm('¿estas seguro de que quieres eliminar este producto?')
                        if(!response) return;                        
                        delete db.cart[id];
                    }else{
                        db.cart[id].amount--;
                    }

                    
                }
                if(e.target.classList.contains('bxs-trash')){
                    const id = Number(e.target.parentElement.id);
                    const response = confirm('¿estas seguro de que quieres eliminar este producto?')
                        if(!response) return;   
                    delete db.cart[id];
                }

                window.localStorage.setItem('cart', JSON.stringify(db.cart))
                insertarProductosAlCart(db);

                
                
        });
}


function logicacompra(db) {
    const btnBuy = document.querySelector('.btn_comprar');
    btnBuy.addEventListener('click', function () {
        if(!Object.values(db.cart).length) return alert('No lleva productos en el carrito');
        const response = confirm('seguro que quieres comprar');
        if(!response) return;

        const actInventario = [];
        for (const product of db.products){
            const productCart = db.cart[product.id]
            if(product.id === productCart?.id){
                actInventario.push({
                    ...product,
                    quantity: product.quantity - productCart.amount,
                    
                });
                const agradecimiento = confirm('Nos vimos y nos conocimos, hasta siempre!!')
            }else{
                actInventario.push(product);
            }           
    }

    db.products = actInventario;
    db.cart = {};

    window.localStorage.setItem('products', JSON.stringify(db.products));
    window.localStorage.setItem('cart', JSON.stringify(db.cart));
    
    pintarProducts(db);
    insertarProductosAlCart(db);

    });
}


function infoDeCompra(db) {
    const infoTotal = document.querySelector(".info_total");
    const infoCantidad = document.querySelector(".info_cantidad");

    let totalProducts = 0;
    let cantidadProducts = 0;

    for (const product in db.cart){
        const {amount, price} = db.cart[product];
        totalProducts += price * amount; 
        cantidadProducts += amount;
    
    }

    infoTotal.textContent = "Total: $ " + totalProducts + '.00';
    infoCantidad.textContent = cantidadProducts + ' item';       
    

}


function cantidaiconcarrito(db) {
    const cantidaddeProductos = document.querySelector('.cantidad_de_productos');

    let cantidad = 0;

    for (const product in db.cart){
        cantidad += db.cart[product].amount;
    }

    cantidaddeProductos.textContent = cantidad;
}