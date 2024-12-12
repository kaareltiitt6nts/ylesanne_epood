import { setNavFavItemCount } from "../main.js"

export class Customer {
    constructor(id, name) {
        this.id = id
        this.name = name
        this.orderHistory = []
        this.favorites = []
    }

    hasFavorite(product) {
        return this.favorites.find(item => item.id === product.id)
    }

    toggleFavorite(product) {
        if (!this.hasFavorite(product)) {
            this.favorites.push(product)
        }
        else {
            this.favorites = this.favorites.filter(item => item.id !== product.id)
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