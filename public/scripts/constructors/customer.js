import { addFavorite, removeFavorite } from "../api.js"
import { setNavFavItemCount } from "../main.js"

export class Customer {
    constructor(id, name) {
        this.id = id
        this.name = name
        this.orderHistory = []
        this.favorites = []
    }

    hasFavorite(productId) {
        return this.favorites.find(favId => favId === productId)
    }

    toggleFavorite(productId) {
        if (!this.hasFavorite(productId)) {
            this.favorites.push(productId)
            addFavorite(productId)
        }
        else {
            this.favorites = this.favorites.filter(favId => favId !== productId)
            removeFavorite(productId)
        }

        setNavFavItemCount(this.favorites.length)
    }

    placeOrder(order) {
        this.orderHistory.push(order)
    }

    printOrderHistory() {
        this.orderHistory.forEach(order => {
            console.log(order.cart.getTotalPrice(), order.orderDate)
        })
    }
}

export const customer = new Customer(0, "Joosep")