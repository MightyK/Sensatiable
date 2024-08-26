let favoritesList = [];

export const pushFavorites = (restaurant) => {
    favoritesList.push(restaurant);
};

export const getFavoritesList = () => {
    return favoritesList;
};

export const isRestaurantInFavorites = (restaurant) => {
    return favoritesList.some((fav) => fav.id === restaurant.id);
};

export const removeFavorite = (restaurant) => {
    favoritesList = favoritesList.filter((fav) => fav.id !== restaurant.id);
}

export const randomFavorite = () => {
    if (favoritesList.length > 0) {
        let num = Math.floor(Math.random() * favoritesList.length);
        return favoritesList[num];
    }
    else return 0;
}