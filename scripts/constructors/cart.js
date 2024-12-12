import { setNavCartItemCount } from "../main.js"

export class Cart {
    constructor() {
        this.items = []
    }

    get totalItems() {
        return this.items.length
    }

    findProduct(product) {
        return this.items.find((el) => {
            return el.product.id === product.id
        })
    }

    addProduct(product, amount) {
        let result = this.findProduct(product)
        if (!result) {
            this.items.push({
                "product": product,
                "amount": amount
            })
        }
        else {
            result.amount += amount
        }

        setNavCartItemCount(cart.totalItems)
    }

    updateProductAmount(id, amountToAdd) {
        let result = this.findProduct(id)
        if (result) {
            result.amount += amountToAdd
        }

        return result
    }

    setProductAmount(id, amount) {
        let result = this.findProduct(id)
        if (result) {
            result.amount = amount
        }

        return result
    }

    removeProduct(product) {
        this.items = this.items.filter(el => {
            return el.product.id !== product.id
        })

        setNavCartItemCount(cart.totalItems)
    }

    getTotalPrice() {
        return this.items.reduce((acc, item) => {
           return acc + (item.product.finalPrice * item.amount)
        }, 0)
    }

    clear() {
        this.items = []
    }
}

export const cart = new Cart()