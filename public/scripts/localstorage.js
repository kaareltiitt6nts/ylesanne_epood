export const getFavorites = () => {
    const favStorage = localStorage.getItem("favorites")
    console.log(favStorage)
    if (favStorage !== undefined || favStorage !== "") {
        return JSON.parse(favStorage) // ID-de massiiv
    }
    else {
        localStorage.setItem("favorites", JSON.stringify([]))
        return []
    }
}

export const saveFavorites = (favorites) => {
    localStorage.setItem("favorites", favorites)
}