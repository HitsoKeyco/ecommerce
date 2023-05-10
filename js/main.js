


window.addEventListener('load', function() {
  var miLoad = document.querySelector('.load');
  setTimeout(function() {
    miLoad.classList.add('miLoadocultar');
  }, 3000); // cambiar 3000 por el tiempo en milisegundos que desees
});


//* Menu hamburguesa

const menu = document.querySelector(".menu");
const links = document.querySelectorAll(".menu li");
const boxMenu = document.querySelector(".menu_hamburguesa");

function nav(){
const navbarHMTL = document.querySelector(".nav_efect");
const navHMTL = document.querySelector(".nav");

function animationScroll() {
    let y = window.scrollY;

    if (y > 50) {
      navbarHMTL.classList.add("nav_efect_show");
      
    } else {
      navbarHMTL.classList.remove("nav_efect_show");
      
    }
}
window.onscroll = () => animationScroll();
}


var enlaces = document.getElementsByClassName("color-enlace");
for (var i = 0; i < enlaces.length; i++) {
   enlaces[i].addEventListener("click", function(event) {
       event.preventDefault(); /* Prevenir el comportamiento predeterminado del enlace */
      for (var j = 0; j < enlaces.length; j++) {
         enlaces[j].classList.remove("active"); /* Eliminar la clase "active" de todos los enlaces */
      }

      this.classList.add("active"); /* Agregar la clase "active" al enlace actual */
      this.blur(); /* Remover el enfoque del enlace */
   });
}
// -------------------------------------------------------



//--------------------------------
function mostrarMenu() {
    menu.classList.toggle("menu_show");
}

boxMenu.addEventListener("click", mostrarMenu);

links.forEach((link) => {
    link.addEventListener("click", mostrarMenu);

});

function navlink() {
    const links = document.querySelectorAll(".link_menu");
  
    links.forEach((link) => {
      link.addEventListener("click", () => {
          links.forEach((link) => {
            link.classList.remove("menu_show");
          });

          link.classList.add("menu_show");
      });
    });
}

function buttonSelected() {
  const links = document.querySelectorAll(".button_category");

  links.forEach((link) => {
    link.addEventListener("click", () => {
      links.forEach((link) => {
        link.classList.remove("button_category_selected");
      });

      link.classList.add("button_category_selected");
    });
  });
}

function toggleDarkMode() {
  const body = document.body;
  const moonIcon = document.querySelector(".moon_icon");

  let isDarkMode = false;

  moonIcon.addEventListener("click", () => {
    isDarkMode = !isDarkMode;
    body.classList.toggle("dark_mode", isDarkMode);
    body.classList.toggle("light_mode", !isDarkMode);
  });
}

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
        JSON.parse(window.localStorage.getItem("products")) ||
        (await getProducts()),
      cart: JSON.parse(window.localStorage.getItem("cart")) || {},
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
    mixIupclon(db);
    toggleDarkMode();
    buttonSelected();
    nav()
    
  
}

main();



function modal(){

    // Agregar evento de clic a la descripción del producto
  const descriptionProducts = document.querySelectorAll(".description_product");
  descriptionProducts.forEach((descriptionProduct) => {
    descriptionProduct.addEventListener("click", () => {
        // Obtener los datos del producto del atributo "data-"
        const description = descriptionProduct.getAttribute("data-description");        
        const image = descriptionProduct.getAttribute("data-image");
        const price = descriptionProduct.getAttribute("data-price");
        const stock = descriptionProduct.getAttribute("data-stock");
        const name = descriptionProduct.getAttribute("data-name");

      // Crear el contenido HTML para el modal
        const modalHTML = `
        <div class="modal-container">
          <img class = "img_modal"src="${image}" alt="imagen">
          <h1 class = "modal_name">${name}</h1>
          <h2 class="modal_description">${description}</h2>
          <p class="modal_precio">$${price}.00</p>
          <p class="modal_stock">Stock: ${stock}</p>
          <div class="add_modal">
                ${product.quantity ? `<i class='bx bx-plus plus_modal' id = '${product.id}'></i>` : '<p class="soldOut">sold out</p>'}
              </div>
          </div>
        `;

      // Mostrar un modal con la descripción del producto y su información
        Swal.fire({            
            html: modalHTML,
            showCloseButton: true,
            showConfirmButton: false
        });
    });
  });
}


function pintarProducts(db) {

  const productsHTML = document.querySelector(".products");

  let html = "";

  for (product of db.products) {
    html += `
        <div class="card element ${product.category.toLowerCase()}">
          <div class="card_top">
              <img class="img_producto" src="${product.image}" alt="imagen">
          </div>

          <div class="card_dawn">
              <span class='stock_product'> $${product.price}&nbsp;&nbsp;&nbsp;</span>
              <span> Stock: ${product.quantity}</span>
              <p class="description_product" data-description="${product.description}" data-image="${product.image}" data-price="${product.price}" data-stock="${product.quantity}" data-name="${product.name}" data-id="${product.id}">${product.name}</p>
              <div class="add">
                ${product.quantity ? `<i class='bx bx-plus plus' id='${product.id}'></i>` : '<p class="soldOut">sold out</p>'}
              </div>
          </div>
        </div>
    `
  }

  productsHTML.innerHTML = html;
  modal();
  
  
}


function mixIupclon(db) {

    function renderProducts(products){
    let html = "";

      for (product of products) {
          html += ` 
              <div class="card element" id="product-${product.id}">
                <div class="card_top">
                      <img class="img_producto" src="${product.image}" alt="imagen">
                </div>
                <div class="card_dawn">
                  <span>$${product.price}&nbsp;&nbsp;&nbsp;</span>
                  <span> Stock: ${product.quantity}</span><br>
                  <p class="description_product" onclick="showProductModal(${product.id})">${product.name}</p>
                  <div class = "add">${product.quantity? `<i class='bx bx-plus plus' id ='${product.id}' ></i>`: '<p class="soldOut">sold out</p>'}
                </div>
                </div>      
              </div>
          `;
      }
      const productsHTML = document.querySelector(".products");
      productsHTML.innerHTML = html;

    }

  
      const btnAll = document.querySelector(".all");
      const btnShirt = document.querySelector(".shirt");
      const btnHoddies = document.querySelector(".hoddies");
      const btnSweater = document.querySelector(".sweater");

          btnAll.addEventListener("click", function () {                     
                pintarProducts(db);
          });

          btnShirt.addEventListener("click", function () {
            const category = "shirt";
            const productsByCategory = db.products.filter(
                (product) => product.category === category);
                renderProducts(productsByCategory);                
          });


          btnHoddies.addEventListener("click", function () {
            const category = "hoddie";
            const productsByCategory = db.products.filter(
                (product) => product.category === category);
                renderProducts(productsByCategory);
            });


            btnSweater.addEventListener("click", function () {
              const category = "sweater";
              const productsByCategory = db.products.filter(
                (product) => product.category === category);              
                renderProducts(productsByCategory);
               
            });
            
}
          

function mostrarCart() {
   const cartIconHTML = document.querySelector(".cart_icon");
   const cartHTML = document.querySelector(".cart");
   
   cartIconHTML.addEventListener("click", function () {
      cartHTML.classList.add("cart_show");
   });

   const hiddenCartHTML = document.querySelector(".cart_cerrar");

   hiddenCartHTML.addEventListener("click", function () {
      cartHTML.classList.remove("cart_show");
   });
}
mostrarCart();


function insertarProductosAlCart(db) {
  const cardProducts = document.querySelector(".card_products");

  let html = "";

  for (const product in db.cart) {
      const { quantity, price, name, image, id, amount } = db.cart[product];
      html += `
            <div class= "contenedor_cart_product">
                <div class = "card_product">
                  <div class = "card_product--img">
                      <img class = "img_cart_in"src="${image}" alt = "image" />
                  </div>

                <div class = "card_product_body">
                      <h4 class="name_product_cart">${name}</h4>
                      <p class = "stock_cart"> Stock: ${quantity} | <span class="precio_cart">$${price}</span></p>
                      <p class="subtotal_cart">Subtotal: ${"$" + price * amount}</p>

                      <div class = "card_product_ body_op" id="${id}">
                        <i class='bx bx-minus'></i>
                        <span class = "units_car">${amount} unit </span>
                        <i class='bx bx-plus plus_add'></i>                        
                        <i class='bx bxs-trash' ></i>
                      </div>
               </div>
            </div>
            </div>
         `;
   }
   infoDeCompra(db);
   cantidaiconcarrito(db);
   cardProducts.innerHTML = html;
   

}

function validarDatosCart(db) {
  const productHTML = document.querySelector(".products");

  productHTML.addEventListener("click", function (e) {
    if (e.target.classList.contains("bx-plus")) {
      const id = Number(e.target.id);

      const productFind = db.products.find((product) => product.id === id);

      if (db.cart[productFind.id]) {
        if (productFind.quantity === db.cart[productFind.id].amount)
          return alert("No disponemos de mas en bodega");
        db.cart[productFind.id].amount++;
      } else {
        db.cart[productFind.id] = { ...productFind, amount: 1 };
      }

      window.localStorage.setItem("cart", JSON.stringify(db.cart));
      insertarProductosAlCart(db);
      infoDeCompra(db);
    }
  });
}

function manejoDatosCart(db) {
  const cartProducts = document.querySelector(".card_products");

  cartProducts.addEventListener("click", function (e) {
    if (e.target.classList.contains("bx-plus")) {
      const id = Number(e.target.parentElement.id);
      const productFind = db.products.find((product) => product.id === id);

      if (productFind.quantity === db.cart[productFind.id].amount)
        return alert("no tenemos mas en bodega");

      db.cart[id].amount++;
    }
    if (e.target.classList.contains("bx-minus")) {
      const id = Number(e.target.parentElement.id);
      if (db.cart[id].amount === 1) {
        const response = confirm(
          "¿estas seguro de que quieres eliminar este producto?"
        );
        if (!response) return;
        delete db.cart[id];
      } else {
        db.cart[id].amount--;
      }
    }
    if (e.target.classList.contains("bxs-trash")) {
      const id = Number(e.target.parentElement.id);
      const response = confirm(
        "¿estas seguro de que quieres eliminar este producto?"
      );
      if (!response) return;
      delete db.cart[id];
    }

    window.localStorage.setItem("cart", JSON.stringify(db.cart));
    insertarProductosAlCart(db);
  });
}

function logicacompra(db) {
  const btnBuy = document.querySelector(".btn_comprar");
  btnBuy.addEventListener("click", function () {
    if (!Object.values(db.cart).length)
      return alert("No lleva productos en el carrito");
    const response = confirm("seguro que quieres comprar");
    if (!response) return;

    const actInventario = [];
    for (const product of db.products) {
      const productCart = db.cart[product.id];
      if (product.id === productCart?.id) {
        actInventario.push({
          ...product,
          quantity: product.quantity - productCart.amount,
        });
        const agradecimiento = confirm(
          "su compra ha sido generada con exito!!"
        );
      } else {
        actInventario.push(product);
      }
    }

    db.products = actInventario;
    db.cart = {};

    window.localStorage.setItem("products", JSON.stringify(db.products));
    window.localStorage.setItem("cart", JSON.stringify(db.cart));

    pintarProducts(db);
    insertarProductosAlCart(db);
  });
}

function infoDeCompra(db) {
  const infoTotal = document.querySelector(".info_total");
  const infoCantidad = document.querySelector(".info_cantidad");

  let totalProducts = 0;
  let cantidadProducts = 0;

  for (const product in db.cart) {
    const { amount, price } = db.cart[product];
    totalProducts += price * amount;
    cantidadProducts += amount;
  }

  infoTotal.textContent = "Total: $ " + totalProducts + ".00";
  infoCantidad.textContent = cantidadProducts + " item";
}

function cantidaiconcarrito(db) {
  const cantidaddeProductos = document.querySelector(".cantidad_de_productos");

  let cantidad = 0;

  for (const product in db.cart) {
    cantidad += db.cart[product].amount;
  }

  cantidaddeProductos.textContent = cantidad;
}
