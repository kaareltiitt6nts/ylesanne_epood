import { displayCart } from "./views/cart.js";
import { displayFavorites } from "./views/favorites.js";
import { displayProduct } from "./views/product.js";
import { displayProducts } from "./views/products.js";

export function navigateTo(view, params) {
    const views = {
        products: () => displayProducts(params),
        cart: () => displayCart(params),
        product: () => displayProduct(params),
        favorites: () => displayFavorites(params)
    }

    if (views[view]) {
        views[view]()
    }
}