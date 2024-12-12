import { cart } from "../constructors/cart.js"
import { customer } from "../constructors/customer.js"
import { Order } from "../constructors/order.js"
import { setNavCartItemCount } from "../main.js"
import { calculateVatTotalPrice, calculateVat, getFormattedPrice } from "../util.js"

function createCartItem(product, amount) {
    let element = document.createElement("div")
    element.id = "cartItem"

    element.innerHTML = `
        <h2>${product.name}</h2>
        <div>
            <div id="cartAmount">
                <span id="amount">${amount}</span>
                <div>
                    <button id="addButton">+</button>
                    <button id="removeButton">-</button>
                </div>
            </div>
            <p>Hind: ${getFormattedPrice(product.finalPrice * amount)}</p>
        </div>
        <button id="removeFromCart">Eemalda</button>
    `

    const removeFromCart = element.querySelector("#removeFromCart")
    const addButton = element.querySelector("#addButton")
    const removeButton = element.querySelector("#removeButton")

    removeFromCart.onclick = () => {
        cart.removeProduct(product)
        displayCart(cart)
    }

    addButton.onclick = () => {
        cart.updateProductAmount(product, 1)
        displayCart(cart)
    }

    removeButton.onclick = () => {
        const result = cart.updateProductAmount(product, -1)

        if (result.amount === 0) {
            cart.removeProduct(product)
        }

        displayCart(cart)
    }

    return element
}

export function displayCart(cart) {
    const mainContainer = document.querySelector("#mainContainer")
    mainContainer.innerHTML = ""

    const cartContainer = document.createElement("div")
    cartContainer.id = "cartContainer"
    cartContainer.innerHTML = 
    `
        <h1>Ostukorv</h1>
        <div id="cartView"></div>
        <h2 id="totalPrice"></h2>
        <h2 id="vat"></h2>
        <h2 id="totalPriceVat"></h2>
        <button id="submitPurchase">Soorita ost</button>
    `

    const cartView = cartContainer.querySelector("#cartView")
    const totalPrice = cartContainer.querySelector("#totalPrice")
    const vat = cartContainer.querySelector("#vat")
    const totalPriceVat = cartContainer.querySelector("#totalPriceVat")
    const submitPurchase = cartContainer.querySelector("#submitPurchase")

    const price = cart.getTotalPrice()

    totalPrice.innerHTML = `Koguhind: ${getFormattedPrice(price)}`
    vat.innerHTML = `Käibemaks: ${getFormattedPrice(calculateVat(price))}`
    totalPriceVat.innerHTML = `Koguhind + km: ${getFormattedPrice(calculateVatTotalPrice(price))}`

    if (cart.items.length === 0) {
        cartView.innerHTML = `<p>Ostukorv on tühi!</p>`
    }
    else { 
        cart.items.forEach(item => {
            cartView.append(createCartItem(item.product, item.amount))     
        });
    }

    submitPurchase.onclick = () => {
        if (cart.totalItems > 0) {
            alert("Ost sooritatud!")
            customer.placeOrder(new Order(0, cart)) // tee id
            cart.clear()
            displayCart(cart)
            setNavCartItemCount(cart.totalItems)
        }
        else {
            alert("Ostukorv on tühi!")
        }
    }

    mainContainer.append(cartContainer)
}