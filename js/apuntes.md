// btnShirt.addEventListener("click", function () {
//     const category = "shirt";
//     const productsByCategory = db.products.filter(
//        (product) => product.category === category
//     );
//     let html = "";
//     if (productsByCategory) {
//        for (product of productsByCategory) {
//     html += ` 
//                 <div class="card element">
//                    <div class="card_top">
//                          <img class="img_producto" src="${product.image}" alt="imagen">
//                    </div>
//                    <div class="card_dawn">
//                          <span>$${product.price}&nbsp;&nbsp;&nbsp;</span>
//                          <span> Stock: ${product.quantity}</span><br>
//                          <p class = "description_product">${product.name}</p>
//                          <div class = "add">${product.quantity? `<i class='bx bx-plus plus' id ='${product.id}' ></i>`: '<p class="soldOut">sold out</p>'
//                          }
//                          </div>
//                    </div>      
//                 </div>`;
//        }
//        const productsHTML = document.querySelector(".products");
//        productsHTML.innerHTML = html;
//     }
//     });
 