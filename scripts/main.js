import { displayProducts } from "./views/products.js"
import { getProductsData } from "./api.js"
import { Product } from "./constructors/product.js"
import { navigateTo } from "./router.js"
import { cart } from "./constructors/cart.js"
import { customer } from "./constructors/customer.js"

document.title = "E-Pood"

// todo: liiguta mujale!!
export function setNavCartItemCount(amount) {
    const element = document.querySelector("#cartItemCount")
    element.innerHTML = amount
}

export function setNavFavItemCount(amount) {
    const element = document.querySelector("#favItemCount")
    element.innerHTML = amount
}

const init = async () => {
    const productsData = await getProductsData()
    const products = productsData.map((item) => 
        new Product(item.id, item.name, item.price, item.category, item.discount)
    )

    const shopName = document.querySelector("#shopName")
    const toProducts = document.querySelector("#toProducts")
    const toCart = document.querySelector("#toCart")
    const toFavorites  = document.querySelector("#toFavorites")

    toProducts.onclick = (event) => {
        event.preventDefault()
        navigateTo("products", products)
    }
    toCart.onclick = (event) => {
        event.preventDefault()
        navigateTo("cart", cart)
    }
    toFavorites.onclick = (event) => {
        event.preventDefault()
        navigateTo("favorites", customer.favorites)
    }
    shopName.onclick = () => init() // ??

    displayProducts(products)
}

document.addEventListener("DOMContentLoaded", init)