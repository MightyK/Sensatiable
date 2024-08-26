import React from 'react';
import './Restaurant.css';
import * as FavoritesList from '../../Files/FavoritesList/FavoritesList';

class Restaurant extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            isFavorite: this.checkFavorites(this.props.restaurant),
        };
    }

    addToFavorites(restaurant) {
        FavoritesList.pushFavorites(restaurant);
    }

    checkFavorites(restaurant) {
        return FavoritesList.isRestaurantInFavorites(restaurant);
    }

    deleteFavorite(restaurant) {
        FavoritesList.removeFavorite(restaurant);
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ show: true });
        }, 1200);
    }

    toggleFavorite = () => {
        if (this.checkFavorites(this.props.restaurant)) {
            this.deleteFavorite(this.props.restaurant);
            this.setState(() => ({
                isFavorite: false,
            }));
        } else {
            this.addToFavorites(this.props.restaurant);
            this.setState(() => ({
                isFavorite: true,
            }));
        }
    }

    render() {
        const { show, isFavorite } = this.state;
        return (
            <div className={`Restaurant ${isFavorite ? 'favorite' : ''} ${show ? 'show' : ''}`}>
                <div className='image-container'>
                    <img src={this.props.restaurant.imageSrc} alt='' />
                    <div className={`favorite-icon ${isFavorite ? 'favorited' : ''}`} onClick={this.toggleFavorite}>
                        &#9733;
                    </div>
                </div>
                <h2>{this.props.restaurant.name}</h2>
                <div className='Restaurant-information'>
                    <div className='Restaurant-address'>
                        <p>{this.props.restaurant.address}</p>
                        <p>{this.props.restaurant.city}</p>
                        <p>
                            {this.props.restaurant.state} {this.props.restaurant.zipCode}
                        </p>
                    </div>
                    <div className='Restaurant-reviews'>
                        <h3>{this.props.restaurant.category}</h3>
                        <h3 className='rating'>Rating: {this.props.restaurant.rating}</h3>
                        <h3>{this.props.restaurant.reviewCount} Reviews</h3>
                    </div>
                </div>
            </div>
        );
    }
};

export default Restaurant;
