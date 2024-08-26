import React from 'react';
import './Favorites.css';
import Restaurant from '../Restaurant/Restaurant';
import * as FavoritesList from '../../Files/FavoritesList/FavoritesList';

class Favorites extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fadeIn: false,
        };

        this.validateFav = this.validateFav.bind(this);
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ fadeIn: true });
        }, 1200);
    }

    validateFav() {
        this.forceUpdate();
    }

    render() {
        const favoriteRestaurants = FavoritesList.getFavoritesList();
        const { fadeIn } = this.state;

        return (
            <div className={`Favorites ${fadeIn ? 'fade-in' : ''}`} onClick={this.validateFav}>
                {favoriteRestaurants.map((restaurant) => (
                    <Restaurant key={restaurant.id} restaurant={restaurant} />
                ))}
            </div>
        );
    }
}

export default Favorites;
