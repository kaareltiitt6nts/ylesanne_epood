export class Order {
    constructor(id, cart) {
        this.id = id
        this.orderDate = new Date()
        this.cart = cart
    }

    printOrder() {
        console.log(this.orderDate)

        this.cart.items.forEach(element => {
            console.log(element.product.name)
        });
        
        console.log(this.cart.getTotalPrice())
    }
}