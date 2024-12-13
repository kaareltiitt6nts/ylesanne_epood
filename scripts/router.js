import { displayCart } from "./views/cart.js";
import { displayFavorites } from "./views/favorites.js";
import { displayProduct } from "./views/product.js";
import { displayProducts } from "./views/products.js";

export function navigateTo(view, params) {
    const views = {
        products: () => displayProducts(params || "all"),
        product: () => displayProduct(params),
        cart: () => displayCart(),
        favorites: () => displayFavorites()
    }

    if (views[view]) {
        views[view]()
    }
}