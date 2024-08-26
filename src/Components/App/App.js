import React from 'react';
import './App.css';
import Yelp from '../../Utility/Yelp';
import Header from '../Header/Header';
import Landing from '../Landing/Landing';
import SearchBar from '../SearchBar/SearchBar';
import Favorites from '../Favorites/Favorites';
import Recommendations from '../Recommendations/Recommendations';
import RestaurantList from '../RestaurantList/RestaurantList';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: [],
      restaurants: [],
      showPopup: true,
      displayFavorites: false,
      displayRecommendations: false,
    };

    this.searchBarRef = React.createRef();
    this.searchYelp = this.searchYelp.bind(this);
    this.toggleHome = this.toggleHome.bind(this);
    this.toggleSearch = this.toggleSearch.bind(this);
    this.togglePopup = this.togglePopup.bind(this);
    this.toggleRecommendations = this.toggleRecommendations.bind(this);
    this.toggleDisplayFavorites = this.toggleDisplayFavorites.bind(this);
  }

  toggleHome() {
    this.setState({ restaurants: [] });
    this.setState({ location: '', categories: '' })
    this.searchBarRef.resetSearchBar();
    this.toggleSearch();
    this.forceUpdate();
  }

  toggleSearch() {
    if(this.state.showPopup) {
      this.togglePopup();
    }

    if(this.state.displayFavorites) {
      this.toggleDisplayFavorites()
    }
    
    if(this.state.displayRecommendations) {
      this.toggleRecommendations();
    }
  }

  togglePopup() {
    this.setState((prevState) => ({
      showPopup: !prevState.showPopup,
    }));
  }

  toggleRecommendations () {
    this.setState((prevState) => ({
      displayRecommendations: !prevState.displayRecommendations,
      displayFavorites:false,
    }));
  }
  
  toggleDisplayFavorites () {
    this.setState((prevState) => ({
      displayFavorites: !prevState.displayFavorites,
      displayRecommendations: false,
    }));
  }

  searchYelp(categories, location, sortBy) {
    Yelp.search(categories, location, sortBy).then((restaurants) => {
      this.setState({ restaurants: restaurants });
    });
  }

  render() {
    return (
      <div className="App">
        <Header toggleHome={this.toggleHome} toggleFavorites={this.toggleDisplayFavorites} toggleRecommendations={this.toggleRecommendations} />
        <SearchBar searchYelp={this.searchYelp} toggleSearch={this.toggleSearch} ref={(ref) => (this.searchBarRef = ref)} />
        {this.state.showPopup && (
          <Landing 
            onLogin={() => console.log('Login')}
            onSignUp={() => console.log('Sign Up')}
            onGuest={this.togglePopup}
          />
        )}
        {this.state.displayFavorites ? (
          <div className='favorited-restaurants'>
            <h2>Favorites</h2>
            <Favorites favoriteRestaurants={this.state.favorites} />
          </div>
        ) : this.state.displayRecommendations ? (
            <div className='recommended-restaurants'>
              <h2>Recommendations</h2>
              <Recommendations recommendations={this.state.recommendations} />
            </div>
          ) : (
          <RestaurantList restaurants={this.state.restaurants} addToFavorites={this.addToFavorites} />
        )}
      </div>
    );
  }
};

export default App;
