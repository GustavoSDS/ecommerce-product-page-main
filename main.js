// Cambio de cantidad de articulos ingresado por el usuario.

const minusBtn = document.querySelector('.input__minus');
const plusBtn = document.querySelector('.input__plus');
let userInput = document.querySelector('.input__number');


let userInputNumber = 0;
userInput.value = 0;

minusBtn.addEventListener('click', () => {
    if (userInputNumber > 0) {
        userInputNumber--;
    }
    userInput.value = userInputNumber;
});

plusBtn.addEventListener('click', () => {
    userInputNumber++;
    userInput.value = userInputNumber;
});

// Agregar en total de productos cuando se presiona el boton ADD TO CART
const addToCartBtn = document.querySelector('.details__button');
let cartNotification = document.querySelector('.header__cart--notification');
let lastValue = parseInt(cartNotification.innerText);

addToCartBtn.addEventListener('click', () => {
    lastValue += userInputNumber;

    cartNotification.innerText = lastValue;
    if (lastValue > 0) {
        cartNotification.style.display = 'block';
        drawProductModal();
    }
});

// Mostrar el modal con el detalle del carrito
const cartIconBtn = document.querySelector('.header__cart');
const cartModal = document.querySelector('.cart-modal');
const productContainer = document.querySelector('.cart-modal__checkout-container');

cartIconBtn.addEventListener('click', () => {
    cartModal.classList.toggle('show');
    if (lastValue === 0) {
        productContainer.innerHTML = '<p class="cart-empty">Your cart is empty</p>';
    }
});


// Borrar el contenido del carrito.
function deleteProduct() {
    const deleteProductBtn = document.querySelector('.cart-modal__delete');
    deleteProductBtn.addEventListener('click', () => {
        productContainer.innerHTML = '<p class="cart-empty">Your cart is empty</p>';
        lastValue = 0;
        cartNotification.innerText = lastValue;
        cartNotification.style.display = 'none';
    });
}

// Cambiar imagenes cuando se presione los botones flecha.
const imageContainer = document.querySelector('.gallery__image-container');
const previousGalleryBtn = document.querySelector('.gallery__previous');
const nextGalleryBtn = document.querySelector('.gallery__next');
let imgIndex = 1;

nextGalleryBtn.addEventListener('click', () => {
    changeNextImage(imageContainer);
});

previousGalleryBtn.addEventListener('click', () => {
    changePreviousImage(imageContainer);
});


// Mostrar el modal de imagenes cuando hago click en la imagen principal.
const imagesModal = document.querySelector('.modal-gallery__background');
const closeModalBtn = document.querySelector('.modal-gallery__close');

imageContainer.addEventListener('click', () => {
    if(window.innerWidth>=1115){
        imagesModal.style.display = 'grid';
    }
});

closeModalBtn.addEventListener('click', ()=>{
    imagesModal.style.display = 'none';
});

// Cambiar las imagenes principales desde los thumbnailsModal
let thumbnails = document.querySelectorAll('.gallery__thumnail');
let imageModal = document.querySelector('.modal-gallery__image-container');
thumbnails = [...thumbnails];

thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', event=>{
        console.log(event.target.id);
        imageContainer.style.backgroundImage = `url('../images/image-product-${event.target.id}.jpg')`;
    });
});

// Cambiar las imagenes del Modal desde los thumbnails 
let modalThumbneils = document.querySelectorAll('.modal-gallery__thumnail');
modalThumbneils = [...modalThumbneils];
modalThumbneils.forEach(modalThumbneil => {
    modalThumbneil.addEventListener('click', event=>{
        console.log(event.target.id.slice(-1));
        imageModal.style.backgroundImage = `url('../images/image-product-${event.target.id.slice(-1)}.jpg')`;
    });
});



// Cambiar imagenes del modal con los botones de next and previous
const previousModalGalleryBtn = document.querySelector('.modal-gallery__previous');
const nextModalGalleryBtn = document.querySelector('.modal-gallery__next');

nextModalGalleryBtn.addEventListener('click', () => {
    changeNextImage(imageModal);
});

previousModalGalleryBtn.addEventListener('click', () => {
    changePreviousImage(imageModal);
});


// Mostrar el navbar cuando presiono el menu de hamburguesa
const hamburguerMenu = document.querySelector('.header__menu');
const closeModalNavbar = document.querySelector('.modal-navbar__close-icon');
let modalNavbar = document.querySelector('.modal-navbar__background');

hamburguerMenu.addEventListener('click', ()=>{
    modalNavbar.style.display = 'block';
});
closeModalNavbar.addEventListener('click', ()=>{
    modalNavbar.style.display = 'none';
});




// Funciones
function drawProductModal() {

    productContainer.innerHTML = ` 
    <div class="cart-modal__details-container">
        <img class="cart-modal__image" src="./images/image-product-1-thumbnail.jpg" alt="thumbnail">
        <div>
            <p class="cart-modal__product">Autumn Limited Edition...</p>
            <p class="cart-modal__price">$125 x${lastValue} <span>$${lastValue * 125}.00</span></p>
        </div>
        <img class="cart-modal__delete" src="./images/icon-delete.svg" alt="delete">
    </div>
    <button class="cart-modal__checkout">Checkout</button>
    `
    deleteProduct();
    // let priceModal = document.querySelector('.cart-modal__price');
    // priceModal.innerHTML = `$125 x${lastValue} <span>$${lastValue * 125}.00</span>`
}

// Funciones para cambiar las imagenes
function changeNextImage(imageContainer) {
    if (imgIndex === 4) {
        imgIndex = 0;
    }
    imgIndex++;
    imageContainer.style.backgroundImage = `url('../images/image-product-${imgIndex}.jpg')`;
}

function changePreviousImage(imageContainer) {
    if (imgIndex === 1) {
        imgIndex = 5;
    }
    imgIndex--;
    imageContainer.style.backgroundImage = `url('../images/image-product-${imgIndex}.jpg')`;
}

