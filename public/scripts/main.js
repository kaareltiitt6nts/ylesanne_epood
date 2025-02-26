import { displayProducts } from "./views/products.js"
import { getFavorites, getProductsByCategory, getProductsData } from "./api.js"
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
    const shopName = document.querySelector("#shopName")
    const toProducts = document.querySelector("#toProducts")
    const toCart = document.querySelector("#toCart")
    const toFavorites  = document.querySelector("#toFavorites")
    const favorites = await getFavorites()

    toProducts.onclick = (event) => {
        event.preventDefault()
        navigateTo("products")
    }
    toCart.onclick = (event) => {
        event.preventDefault()
        navigateTo("cart", cart)
    }
    toFavorites.onclick = (event) => {
        event.preventDefault()
        navigateTo("favorites", customer.favorites)
    }
    shopName.onclick = (event) => {
        event.preventDefault()
        navigateTo("products")
    }

    customer.favorites = favorites
    setNavFavItemCount(favorites.length)

    displayProducts()
}

document.addEventListener("DOMContentLoaded", init)