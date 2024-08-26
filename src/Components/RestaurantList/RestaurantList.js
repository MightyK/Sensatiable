import React from 'react';
import './RestaurantList.css';
import Restaurant from '../Restaurant/Restaurant';

class RestaurantList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fadeIn: false,
        };
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ fadeIn: true });
        }, 1200);
    }

    render() {
        const { fadeIn } = this.state;
        return (
            <div className={`RestaurantList ${fadeIn ? 'fade-in' : ''}`}>
                {
                    this.props.restaurants.map(restaurant => {
                        return <Restaurant key={restaurant.id} restaurant={restaurant} />;
                    })
                }
            </div>
        );
    }
};

export default RestaurantList;
