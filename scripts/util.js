export const VAT = 24 // käibemaksu %

export const PRODUCT_CATEGORIES = { // kategooriate tõlked (jsoni?)
    fruits: "Puuviljad",
    electronics: "Elektroonika"
}

export function calculateVat(totalPrice) {
    return totalPrice * (VAT / 100)
} 

export function calculateVatTotalPrice(totalPrice) {
    return totalPrice + calculateVat(totalPrice)
}

export function getFormattedPrice(price) {
    if (!isNaN(price)) {
        return price.toFixed(2) + "€"
    }
}