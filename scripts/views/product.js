import { getProductById } from "../api.js"
import { cart } from "../constructors/cart.js"
import { customer } from "../constructors/customer.js"
import { getFormattedPrice } from "../util.js"

export const displayProduct = async (productId) => {
    const product = await getProductById(productId)

    const mainContainer = document.querySelector("#mainContainer")
    mainContainer.innerHTML = ""

    const productContainer = document.createElement("div")
    productContainer.id = "productsContainer"
    productContainer.innerHTML = "<h1>Toode</h1>"

    const productView = document.createElement("div")
    productView.id = "productView"
    productView.innerHTML = `
        <h1>${product.name}</h1>
        <div id="productDetailView">
            <p>Hind: ${getFormattedPrice(product.finalPrice)}</p>
            <p>${product.category}</p>
            <button id="favButton">Lisa lemmikuks</button>
            <form id="addToCart">
                <input type="number" id="amount" value="1" min="1">
                <input type="submit" value="Lisa korvi">
            </form>
        </div>
    `

    const favButton = productView.querySelector("#favButton")
    if (customer.hasFavorite(product)) {
        favButton.innerHTML = "Eemalda lemmikutest"
    }

    favButton.onclick = () => {
        if (!customer.hasFavorite(product)) {
            favButton.innerHTML = "Eemalda lemmikutest"
        }
        else {
            favButton.innerHTML = "Lisa lemmikuks"
        }

        customer.toggleFavorite(product)
    }

    const cartForm = productView.querySelector("#addToCart")
    cartForm.addEventListener("submit", (event) => {
        event.preventDefault()
        
        const amount = parseInt(cartForm.querySelector("#amount").value)
        cart.addProduct(product, amount)
    })

    mainContainer.append(productContainer)
    productsContainer.append(productView)
}