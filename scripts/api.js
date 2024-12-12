export const getProductsData = async () => {
    try {
        const json = await fetch("scripts/data/products.json")
        return json.json()
    } catch (error) {
        console.error(error)
    }
}