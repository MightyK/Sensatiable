import React from 'react';
import '../RestaurantList/RestaurantList.css';
import Yelp from '../../Utility/Yelp';
import Restaurant from '../Restaurant/Restaurant';
import * as FavoritesList from '../../Files/FavoritesList/FavoritesList';

class Recommendations extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fadeIn: false,
            recommendations: [],
        };
        this.recommendation = this.recommendation.bind(this);
    }

    componentDidMount() {
        this.recommendation(this.recommendationInfo());
        setTimeout(() => {
            this.setState({ fadeIn: true });
        }, 1200);
    }

    recommendationInfo() {
        return FavoritesList.randomFavorite();
    }

    recommendation(restaurant) {
        let location = restaurant.city;
        let typeFood = restaurant.category;
        if (restaurant) {
            Yelp.search(typeFood, location, 'best_match').then((restaurants) => {
                this.setState({ recommendations: restaurants });
            });
        } else {
            Yelp.search('', 'boca_raton', 'best_match').then((restaurants) => {
                this.setState({ recommendations: restaurants });
            });
        }    
    }

    render() {
        const { fadeIn } = this.state;
        const recommendations = this.state.recommendations;
        return (
            <div className={`RestaurantList ${fadeIn ? 'fade-in' : ''}`}>
                {recommendations.map((restaurant) => (
                    <Restaurant key={restaurant.id} restaurant={restaurant} />
                ))}
            </div>
        );
    }
}

export default Recommendations;