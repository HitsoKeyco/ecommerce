


// -----------------Funciones--------------------------- //


// scroll suave
{
// Seleccione todos los enlaces de anclaje en la página
$('a[href*="#"]')
  // Agregue un evento de clic para interceptar el clic del enlace de anclaje
  .click(function(event) {
    // Prevenir el comportamiento predeterminado del navegador
    event.preventDefault();

    // Obtener el identificador del elemento de destino del enlace de anclaje
    var target = $(this.hash);

    // Desplazarse suavemente al elemento de destino utilizando jQuery ScrollTo
    $('html, body').animate({
      scrollTop: target.offset().top
    }, 1000);
  });
}


function linksMenu(){
  const links = document.querySelectorAll(".menu li");
  const boxMenu = document.querySelector(".menu_hamburguesa");

    boxMenu.addEventListener("click", mostrarMenu);
        links.forEach((link) => {
          link.addEventListener("click", mostrarMenu);

        });
}

function loading() {
  const miLoad = document.querySelector('.load');
  const miLoadGif = document.querySelector('.load__gif');
  const shadows = document.querySelector('.shadows');

  window.addEventListener('load', function() {
    setTimeout(function() {
      miLoad.classList.add('miLoadocultar');
      miLoadGif.classList.add('miLoadocultar');
      shadows.classList.add('miLoadocultar');
      
    }, 2000);
  });
}
loading();
  
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

function mostrarMenu() {
  const menu = document.querySelector(".menu");
  menu.classList.toggle("menu_show");
}

function colorEnlaces(){
  var enlaces = document.getElementsByClassName("color-enlace");
   
  for (var i = 0; i < enlaces.length; i++) {
    enlaces[i].addEventListener("click", function(event) {
        
        for (var j = 0; j < enlaces.length; j++) {
          enlaces[j].classList.remove("active"); /* Eliminar la clase "active" de todos los enlaces */
        }

        this.classList.add("active"); /* Agregar la clase "active" al enlace actual */
        this.blur(); /* Remover el enfoque del enlace */
    });
}

}

{
const buttonFilters = document.querySelectorAll('.button_category');

buttonFilters.forEach(button => {
  button.addEventListener('click', () => {
    // Remover la clase "defect" de todos los botones
    buttonFilters.forEach(button => {
      button.classList.remove('defect');
    });
    // Agregar la clase "defect" al botón clickeado
    button.classList.add('defect');
  });
});

}

function nav(){
  const navbarHMTL = document.querySelector(".nav_efect");
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

  // Leer la preferencia del usuario del almacenamiento local
  let isDarkMode = localStorage.getItem("isDarkMode") === "true";

  // Aplicar el modo oscuro según la preferencia del usuario
  body.classList.toggle("dark_mode", isDarkMode);
  body.classList.toggle("light_mode", !isDarkMode);

  moonIcon.addEventListener("click", () => {
    isDarkMode = !isDarkMode;

    // Guardar la preferencia del usuario en el almacenamiento local
    localStorage.setItem("isDarkMode", isDarkMode);

    // Aplicar el modo oscuro según la preferencia del usuario
    body.classList.toggle("dark_mode", isDarkMode);
    body.classList.toggle("light_mode", !isDarkMode);
  });
}

function filtrado(db){
  const btnAll = document.querySelector(".all");
  const btnShirt = document.querySelector(".shirt");
  const btnHoddies = document.querySelector(".hoddies");
  const btnSweater = document.querySelector(".sweater");
  const productsHTML = document.querySelector(".products");

      btnAll.addEventListener("click", function () {                     
            pintarProducts(db);
      });

      btnShirt.addEventListener("click", function () {
        const category = "shirt";
        const productsByCategory = db.products.filter(
            (product) => product.category === category);
            
            let html = "";

            for (product of productsByCategory) {
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
      });

      btnHoddies.addEventListener("click", function () {
        const category = "hoddie";
        const productsByCategory = db.products.filter(
            (product) => product.category === category);
            
            let html = "";

            for (product of productsByCategory) {
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
      });

      
      btnSweater.addEventListener("click", function () {
        const category = "sweater";
        const productsByCategory = db.products.filter(
            (product) => product.category === category);
            
            let html = "";

            for (product of productsByCategory) {
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
      });
      
}

function modal(){

          
          // Agregar evento de clic a la descripción del producto
          const descriptionProducts = document.querySelectorAll(".description_product");
          descriptionProducts.forEach((descriptionProduct) => {
          descriptionProduct.addEventListener("click", () => {
            
        
          // Obtener los datos del producto del atributo "data-"
          const description = descriptionProduct.getAttribute("data-description");        
          const id = descriptionProduct.getAttribute("data-id");
          
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
            <p class="modal_id">id: ${id}</p>
            
                  ${product.quantity ? `<i class='bx bx-plus plus_modal' id = '${product.id}'></i>` : '<p class="soldOut">sold out</p>'}
                
            </div>
    
          `;


        // Mostrar un modal con la descripción del producto y su información
          Swal.fire({            
              html: modalHTML,
              showCloseButton: false,
              showConfirmButton: false,
              scrollbarPadding: false,
              didOpen: () => {            
                
                idModal(id);

              }
              
              
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

function cerrarCart() {
  const cartHTML = document.querySelector(".cart");

  hiddenCartHTML.addEventListener("click", function () {
    cartHTML.classList.remove("cart_show");
  });
}

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
    window.localStorage.setItem("cart", JSON.stringify(db.cart));


}

function validarDatosCart(db) {
  const productHTML = document.querySelector(".products");

  productHTML.addEventListener("click", function (e) {
    if (e.target.classList.contains("bx-plus")) {   /*plus_modal*/
      const id = Number(e.target.id);

      const productFind = db.products.find((product) => product.id === id);

      if (db.cart[productFind.id]) {
        if (productFind.quantity === db.cart[productFind.id].amount) {
          Swal.fire({
            title: `Lo siento, solo disponemos de ${productFind.quantity} unidades.`,
            icon: "error",
            confirmButtonText: "Aceptar",
            scrollbarPadding: false,

          });
        } else {
          Swal.fire({
            icon: "success",
            text: "Producto agregado al carrito",
            timer: 1000,
            timerProgressBar: true,
            scrollbarPadding: false,
            

          });              
          db.cart[productFind.id].amount++;
          
        }
      } else {          
         window.localStorage.setItem("cart", JSON.stringify(db.cart));
        db.cart[productFind.id] = { ...productFind, amount: 1 }; 
        Swal.fire({
          icon: "success",
          text: "Producto agregado al carrito",
          timer: 1000,
          timerProgressBar: true,
          scrollbarPadding: false,
          
        });   
      }

      window.localStorage.setItem("cart", JSON.stringify(db.cart));
      insertarProductosAlCart(db);
      infoDeCompra(db);
      modal(db)
    }
  })

  
}



function logicacompra(db) {
  
  const btnBuy = document.querySelector(".btn_comprar");
  btnBuy.addEventListener("click", function () {
    
    if (!Object.values(db.cart).length) {
      Swal.fire({
        title: "¡El carrito está vacío!",
        icon: "error",
        confirmButtonText: "Aceptar",
        scrollbarPadding: false,
            
      });
      return;
    }

    Swal.fire({
      title: "¿Está seguro que desea comprar?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, comprar",
      cancelButtonText: "Cancelar",
      scrollbarPadding: false,
            
      
    }).then((result) => {
      if (result.isConfirmed) {
        const actInventario = [];
        let compraGenerada = false;
        for (const product of db.products) {
          const productCart = db.cart[product.id];
          if (product.id === productCart?.id) {
            actInventario.push({
              ...product,
              quantity: product.quantity - productCart.amount,
            });
            compraGenerada = true;
          } else {
            actInventario.push(product);
          }
        }

        if (compraGenerada) {
          db.products = actInventario;
          db.cart = {};

          window.localStorage.setItem("products", JSON.stringify(db.products));
          window.localStorage.setItem("cart", JSON.stringify(db.cart));

          Swal.fire({
            title: "¡Gracias por su compra!",
            icon: "success",
            confirmButtonText: "Aceptar",
            scrollbarPadding: false,
            
            
          }).then(() => {
            pintarProducts(db);
            insertarProductosAlCart(db);
          });
        } else {
          Swal.fire({
            title: "¡No hay productos en el carrito que se puedan comprar!",
            icon: "error",
            confirmButtonText: "Aceptar",
            scrollbarPadding: false,
            
          });
        }
      }
      
    });
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

async function main() {
  const db = {
      products:
        JSON.parse(window.localStorage.getItem("products")) ||
        (await getProducts()),
      cart: JSON.parse(window.localStorage.getItem("cart")) || {},
  };

    navlink();    
    mostrarCart();
    insertarProductosAlCart(db);
    validarDatosCart(db);
    
    logicacompra(db);
    infoDeCompra(db);
    cantidaiconcarrito(db);    
    toggleDarkMode();
    buttonSelected();
    nav();    
    pintarProducts(db);   
    
    filtrado(db);
    nav();
    colorEnlaces();
    linksMenu();
    mostrarCart();
    loading();
    manejoDatosCart(db)
    
    
    

}
main();

function removeProductFromCart(productId) {
  const cart = JSON.parse(localStorage.getItem('cart'));

  if (cart.hasOwnProperty(productId)) {
    delete cart[productId];
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log(`El producto con id ${productId} ha sido eliminado del carrito.`);
  } else {
    console.log(`No se encontró ningún producto con id ${productId} en el carrito.`);
  }
}


function manejoDatosCart(db) {

    const cartProducts = document.querySelector(".card_products");
    cartProducts.addEventListener("click", function (e) {
    if (e.target.classList.contains("bx-plus")) {      

      const id = Number(e.target.parentElement.id);
      console.log('el ide es' + id);

      const productFind = db.products.find((product) => product.id === id);

      console.log('he ecnontrado un filtro' + productFind);
      if (productFind.quantity === db.cart[productFind.id].amount) {
        // Mostrar un modal de confirmación utilizando Sweet Alert
        Swal.fire({
          title: `Lo siento, solo disponemos de ${productFind.quantity} unidades.`,
          icon: "error",
          confirmButtonText: "Aceptar",
          scrollbarPadding: false,
            
        });
      } else {
        db.cart[id].amount++;
        insertarProductosAlCart(db);
        window.localStorage.setItem("cart", JSON.stringify(db.cart));
        
        
      }
    }
    if (e.target.classList.contains("bx-minus")) {
      const id = Number(e.target.parentElement.id);
      if (db.cart[id].amount === 1) {
        // Mostrar un modal de confirmación utilizando Sweet Alert
        Swal.fire({
          title: "¿Estás seguro de que quieres eliminar este producto?",
          showCancelButton: true,
          confirmButtonText: "Eliminar",
          cancelButtonText: "Cancelar",
          scrollbarPadding: false,
            
          
        }).then((result) => {
          if (result.isConfirmed) {
            delete db.cart[id];
            insertarProductosAlCart(db);
            window.localStorage.setItem("cart", JSON.stringify(db.cart));
            
                  
          }
        });
      } else {
        db.cart[id].amount--;
        insertarProductosAlCart(db);
        window.localStorage.setItem("cart", JSON.stringify(db.cart));
        
        
      }
    }
    if (e.target.classList.contains("bxs-trash")) {
      const id = Number(e.target.parentElement.id);
      // Mostrar un modal de confirmación utilizando Sweet Alert
      Swal.fire({
        title: "¿Estás seguro de que quieres eliminar este producto?",
        showCancelButton: true,
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar",
        scrollbarPadding: false,
            
        
      }).then((result) => {
        if (result.isConfirmed) {
          delete db.cart[id];
          insertarProductosAlCart(db);
          
          window.localStorage.setItem("cart", JSON.stringify(db.cart));
          
          
        }
      });
    }
  });
}


async function idModal(id) {  
  console.log(typeof(id));

  const db = {
    products:
      JSON.parse(window.localStorage.getItem("products")) ||
      (await getProducts()),
    cart: JSON.parse(window.localStorage.getItem("cart")) || {},
  };



  const plusModal = document.querySelector('.plus_modal')

  plusModal.addEventListener('click', function(){
  

    const idModal = Number(id);
    
    
    const productFind = db.products.find((product) => product.id === idModal);
    
    if (db.cart[productFind.id]) {
      if (productFind.quantity === db.cart[productFind.id].amount) {
        Swal.fire({
          title: `Lo siento, solo disponemos de ${productFind.quantity} unidades.`,
          icon: "error",
          confirmButtonText: "Aceptar",          
        });
        window.localStorage.setItem("cart", JSON.stringify(db.cart));
      } else {
        Swal.fire({
          icon: "success",
          text: "Producto agregado al carrito",
          timer: 1000,
          timerProgressBar: true,
        });              
        db.cart[productFind.id].amount++;
        window.localStorage.setItem("cart", JSON.stringify(db.cart));
      }
    } else {          
      db.cart[productFind.id] = { ...productFind, amount: 1 };
      window.localStorage.setItem("cart", JSON.stringify(db.cart)); 
      Swal.fire({
        icon: "success",
        text: "Producto agregado al carrito",
        timer: 1000,
        timerProgressBar: true,
      });
         
    }
        window.localStorage.setItem("cart", JSON.stringify(db.cart));
        insertarProductosAlCart(db);
        manejoDatosCart(db)
  })

  
}



