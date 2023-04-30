//* Menu hamburguesa
{
    const menu = document.querySelector(".menu");
    const links = document.querySelectorAll(".menu li");
    const boxMenu = document.querySelector(".menu_hamburguesa");

    function mostrarMenu() {
        menu.classList.toggle("menu_show");
    }

    boxMenu.addEventListener("click", mostrarMenu);

    links.forEach((link) => {
    link.addEventListener("click", mostrarMenu);
    });
}

//* Conexion a API - Guardado datos en localStorage -  Peticion de datos al localStorage
{
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
            cart: {},
        };

        const productsHTML = document.querySelector(".products");

        let html = "";

        for (product of db.products) {

            html += ` 
                    
                    <div class="card">

                        <div class="card_top">
                            <img class="img_producto" src="${product.image}" alt="">
                        </div>

                        <div class="card_dawn">
                            <span>$${product.price}&nbsp;&nbsp;&nbsp;</span>
                            <span> Stock: ${product.quantity}</span><br>
                            <p class = "description_product">${product.name}</p>
                            <i class='bx bx-plus' id ="${product.id}" ></i>
                        </div>      

                    </div>
                    
                `;
        }
                productsHTML.innerHTML = html;
    }

    console.log(main());
}
