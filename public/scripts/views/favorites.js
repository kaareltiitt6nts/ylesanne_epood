import { getProductById } from "../api.js"
import { customer } from "../constructors/customer.js"
import { getFavorites } from "../localstorage.js"
import { createProductCard } from "./products.js"

export async function displayFavorites() {
    const mainContainer = document.querySelector("#mainContainer")
    mainContainer.innerHTML = ""

    const favContainer = document.createElement("div")
    favContainer.id = "productsContainer"
    favContainer.innerHTML = "<h1>Lemmikud</h1>"

    const favView = document.createElement("div")
    favView.id = "productsView"

    const favorites = await getFavorites()

    mainContainer.append(favContainer)
    favContainer.append(favView)

    if (favorites.length === 0) {
        favView.innerHTML = "Te pole ühtegi lemmikut toodet lisanud."
    }
    else {
        favorites.forEach(productId => {
            const product = getProductById(productId)
            if (product) {
                favView.append(createProductCard(product))
            }
        });
    }
}    