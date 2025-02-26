import { getProductById } from "../api.js"
import { getFavorites } from "../api.js"
import { createProductCard } from "./products.js"

export async function displayFavorites() {
    const mainContainer = document.querySelector("#mainContainer")
    mainContainer.innerHTML = ""

    const favContainer = document.createElement("div")
    favContainer.id = "productsContainer"
    favContainer.innerHTML = "<h1>Lemmikud</h1>"

    const favView = document.createElement("div")
    favView.id = "productsView"

    mainContainer.append(favContainer)
    favContainer.append(favView)

    const favorites = await getFavorites();

    if (favorites.length === 0) {
        favView.innerHTML = "Te pole ühtegi lemmikut toodet lisanud.";
        return;
    }

    try {
        favorites.forEach(async (id) => {
            const product = await getProductById(parseInt(id))
            
            if (product) {
                favView.append(createProductCard(product))
            }
        });

    } catch (error) {
        favView.innerHTML = "Viga lemmikute laadimisel.";
        console.error("Error loading favorites:", error);
    }
}    