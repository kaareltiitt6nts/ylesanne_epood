import { customer } from "../constructors/customer.js"
import { createProductCard } from "./products.js"

export function displayFavorites() {
    const mainContainer = document.querySelector("#mainContainer")
    mainContainer.innerHTML = ""

    const favContainer = document.createElement("div")
    favContainer.id = "productsContainer"
    favContainer.innerHTML = "<h1>Lemmikud</h1>"

    const favView = document.createElement("div")
    favView.id = "productsView"

    const favorites = customer.favorites

    mainContainer.append(favContainer)
    favContainer.append(favView)

    if (favorites.length === 0) {
        favView.innerHTML = "Te pole ühtegi lemmikut toodet lisanud."
    }
    else {
        favorites.forEach(product => {
            favView.append(createProductCard(product))
        });
    }
}    