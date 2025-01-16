export const VAT = 24 // käibemaksu % (json? cart? idk)

export const PRODUCT_CATEGORIES = { // kategooriate tõlked (TEE JSON!!!)
    "fruits": "Puuviljad",
    "all": "Koik",
    "electronics": "Elektroonika",
    "women's clothing": "Naiste riided",
    "men's clothing": "Meeste riided",
    "jewelery": "Ehted",
    "select": "Vali kategooria"
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