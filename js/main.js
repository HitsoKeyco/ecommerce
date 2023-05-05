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

        pintarProducts(db);
        mostrarCart();
        insertarProductosAlCart(db);
        validarDatosCart(db);
        manejoDatosCart(db);

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
            <div class = "card_product">
                <div class = "card_product--img">
                    <img class = "img_cart_in"src="${image}" alt = "image" />
                </div>
                <div class = "card_product_body">
                    <h4>${name}</h4>
                    <p>Stock: ${quantity} | <span class="precio_cart">$${price}</span></p>
                    <span class="subtotal_cart">Subtotal:</span>

                    <div class = "card_product_ body_op" id="${id}">
                        <i class='bx bx-minus'></i>
                        <span>${amount} unit </span>
                        <i class='bx bx-plus plus_add' ></i>                        
                        <i class='bx bxs-trash' ></i>
                    </div>

                </div>
                
            </div>
        `
        
    }
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
                insertarProductosAlCart(db)
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
                    if(db.cart[id].amount ===1){
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
    