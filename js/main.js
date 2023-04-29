const menu = document.querySelector(".menu");
const links = document.querySelectorAll(".menu li");
const boxMenu = document.querySelector(".menu_hamburguesa");

function mostrarMenu(){
    menu.classList.toggle("menu_show");
}

boxMenu.addEventListener('click', mostrarMenu);

links.forEach((link) => {
    link.addEventListener("click", mostrarMenu);

})