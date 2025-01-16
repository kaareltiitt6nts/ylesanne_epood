import { getAllCategories, getProductsByCategory } from "../api.js"
import { customer } from "../constructors/customer.js"
import { Product } from "../constructors/product.js"
import { navigateTo } from "../router.js"
import { getFormattedPrice, PRODUCT_CATEGORIES } from "../util.js"

export function createProductCard(product) {
    let productCard = document.createElement("div")
    productCard.id = "productCard"

    const isDiscounted = product.discount > 0
    const priceHtml = isDiscounted ?
      `<span class="oldPrice">${getFormattedPrice(product.price)}</span> <span class="salePrice">${getFormattedPrice(product.finalPrice)}</span>`
    : `${getFormattedPrice(product.finalPrice)}`

    productCard.innerHTML = `
        <img id="productCardImage" src="${product.image}"></img>
        <div id="productCardInfo">
            <p id="productCardInfoName">${product.name}</p>
            <p id="price">${priceHtml}</p>
            <p>${PRODUCT_CATEGORIES[product.category]}</p>
            <button id="favButton">Lisa lemmikuks</button>
        </div>
    `

    const favButton = productCard.querySelector("#favButton")
    if (customer.hasFavorite(product)) {
        favButton.innerHTML = "Eemalda lemmikutest"
    }

    favButton.onclick = (event) => {
        if (!customer.hasFavorite(product)) {
            favButton.innerHTML = "Eemalda lemmikutest"
        }
        else {
            favButton.innerHTML = "Lisa lemmikuks"
        }

        event.stopPropagation()
        customer.toggleFavorite(product)
    }

    productCard.addEventListener("click", () => {
        navigateTo("product", product.id)
    })

    return productCard
}

export const displayProducts = async (category) => {
    const productsData = await getProductsByCategory(category)
    const products = productsData.map((item) => 
        new Product(item.id, item.title, item.price, item.category, item.discount, item.image)
    )

    const productCategories = await getAllCategories()

    const mainContainer = document.querySelector("#mainContainer")
    mainContainer.innerHTML = ""

    const productsContainer = document.createElement("div")
    productsContainer.id = "productsContainer"
    productsContainer.innerHTML = "<h1>Tooted</h1>"

    const productsFilter = document.createElement("select")
    productsFilter.id = "productsFilter"
    productsFilter.value = category

    const productsView = document.createElement("div")
    productsView.id = "productsView"

    mainContainer.append(productsContainer)
    productsContainer.append(productsFilter)
    productsContainer.append(productsView)

    productCategories.forEach(category => {
        const option = document.createElement("option")
        option.value = category
        option.label = PRODUCT_CATEGORIES[category]
        
        productsFilter.append(option)
    })

    products.forEach(product => {
        productsView.append(createProductCard(product))
    });

    productsFilter.onchange = (event) => {
        event.preventDefault()
        displayProducts(productsFilter.value)
    }
}