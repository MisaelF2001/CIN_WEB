const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const cartClose = document.querySelector("#cart-close");
cartIcon.addEventListener("click", () => cart.classList.add("active"));
cartClose.addEventListener("click", () => cart.classList.remove("active"));

const addCartButtons = document.querySelectorAll(".add-cart");
addCartButtons.forEach(button => {
    button.addEventListener("click", event => {
        const productBox = event.target.closest(".product-box");
        addToCart(productBox);
    });
});

const cartContent = document.querySelector(".cart-content");
const addToCart = productBox => {
    const productImgSrc = productBox.querySelector("img").src;
    const productTitle = productBox.querySelector(".product-title").textContent;
    const productPrice = productBox.querySelector(".price").textContent;

    const cartItem = cartContent.querySelectorAll(".cart-product-title");
    for(let item of cartItem){
        if(item.textContent === productTitle){
            alert("Este producto ya está en su carrito :D");
            return;
        }
    }

    const cartBox = document.createElement("div");
    cartBox.classList.add("cart-box");
    cartBox.innerHTML = `<img src="${productImgSrc}" class="cart-img">
					<div class="cart-detail">
						<h2 class="cart-product-title">${productTitle}</h2>
						<span class="cart-price">${productPrice}</span>
						<div class="cart-quantity">
							<button id="decrement">-</button>
							<span class="number">1</span>
							<button id="increment">+</button>
						</div>
                        <p>PACK DE 6 UNIDADES</p>
                        <b>Toda compra debe ser mayor a 140 Bs </b>
					</div>
					<i class="ri-delete-bin-line cart-remove"></i>`;
    cartContent.appendChild(cartBox);
    
    cartBox.querySelector(".cart-remove").addEventListener("click", () => {
        cartBox.remove();

        updateCartCount(-1);

        updateTotalPrice();
    });

    cartBox.querySelector(".cart-quantity").addEventListener("click", event => {
        const numberElement = cartBox.querySelector(".number");
        const decrementButton = cartBox.querySelector("#decrement");
        let quantity = numberElement.textContent;

        if(event.target.id === "decrement" && quantity > 1){
            quantity--;
            if(quantity === 1){
                decrementButton.style.color = "#999";
            }
        } else if(event.target.id === "increment"){
            quantity++;
            decrementButton.style.color = "#333";
        }

        numberElement.textContent = quantity;

        updateTotalPrice();
    });
    updateCartCount(1);
    updateTotalPrice();
};

const updateTotalPrice = () => {
    const totalPriceElement = document.querySelector(".total-price");
    const cartBoxes = cartContent.querySelectorAll(".cart-box");
    let total = 0;
    cartBoxes.forEach(cartBox => {
        const priceElement = cartBox.querySelector(".cart-price");
        const quantityElement = cartBox.querySelector(".number");
        const price = priceElement.textContent.replace("BOB", "");
        const quantity = quantityElement.textContent;
        total += price * quantity;
    });
    totalPriceElement.textContent = `BOB ${total}`;
};

let cartItemCount = 0;
const updateCartCount = change => {
    const cartItemCountBadge = document.querySelector(".cart-item-count");
    cartItemCount += change;
    if(cartItemCount > 0){
        cartItemCountBadge.style.visibility = "visible";
        cartItemCountBadge.textContent = cartItemCount;
    }else{
        cartItemCountBadge.style.visibility = "hidden";
        cartItemCountBadge.textContent = "";
    }
}; 

const buyNowButton = document.querySelector(".btn-buy");
buyNowButton.addEventListener("click", () => {
    const cartBoxes = cartContent.querySelectorAll(".cart-box");
    if(cartBoxes.length === 0){
        alert("No hay productos en su carrito :(");
        return;
    }

    cartBoxes.forEach(cartBox => cartBox.remove());

    cartItemCount = 0;
    updateCartCount(0);

    updateTotalPrice();

    alert("Compra realizada con éxito! Gracias por su compra.");
});

var MenuItems = document.getElementById("MenuItems");

            MenuItems.style.maxHeight = "0px";
            function menutoggle(){
                if(MenuItems.style.maxHeight == "0px"){
                    MenuItems.style.maxHeight = "200px";
                }else{
                    MenuItems.style.maxHeight = "0px";
                }
 
            } 