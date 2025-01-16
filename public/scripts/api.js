import { Cart } from "./constructors/cart.js"
import { Product } from "./constructors/product.js"

const API_URL = "https://fakestoreapi.com"

export const getProductsData = async () => {
    try {
        const json = await fetch(`/products/`)
        return json.json()
    }
    catch (error) {
        console.error(error)
    }
}

export const getProductById = async (productId) => {
    try {
        const productData = await fetch(`/product/${productId}`)
        const product = await productData.json()
        
        return new Product(
            product.id,
            product.title,
            product.price,
            product.category,
            0,
            product.image
        )
    }
    catch (error) {
        console.error(error)
    }
}

export const getAllCategories = async () => {
    try {
        const json = await fetch(`/products/categories`)
        return json.json()
    } catch (error) {
        console.error(error)
    }
}

export const getProductsByCategory = async (category = "all") => {
    try {
        let json = ""
        if (category === "all") {
            json = await fetch(`/products/`)
        }
        else {
            json = await fetch(`/products/category/${category}`)
        }
        
        return json.json()
    } catch (error) {
        console.error(error)
    }
}

export const getCartById = async (cartId) => {
    try {
        const cart = fetch(`/carts/${cartId}`)
        .then(result => result.json())
        .then(json => new Cart(json.userId, json.products))

        return cart
    } catch (error) {
        console.error(error)
    }
}