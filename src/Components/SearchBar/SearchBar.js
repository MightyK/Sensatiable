import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            categories: '',
            location: '',
            sortBy: 'best_match',
        };
        
        this.resetSearchBar = this.resetSearchBar.bind(this);
        this.handleSortByChange = this.handleSortByChange.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleSearch = this.handleSearch.bind(this);

        this.sortByOptions = {
            'Best Match': 'best_match',
            'Highest Rated': 'rating',
            'Most Reviewed': 'review_count'
        }; 
    }

    resetSearchBar() {
        this.setState({
          categories: '',
          location: '',
          sortBy: 'best_match',
        });
    }
    
    getSortByClass(sortByOption) {
        if (this.state.sortBy === sortByOption) {
            return 'active';
        } else {
            return '';
        };
    }
    
    handleSortByChange(sortByOption) {
        this.setState({
            sortBy: sortByOption
        });
    }
    
    handleCategoryChange(event) {
        this.setState({
            categories: event.target.value
        });
    }
    
    handleLocationChange(event) {
        this.setState({
            location: event.target.value
        });
    }
    
    handleSearch(event) {
        if (this.state.location !== '') {
            this.props.searchYelp(this.state.categories, this.state.location, this.state.sortBy);
            this.props.toggleSearch();
        }
        event.preventDefault();
    }
    
    handleKeyPress(event) {
        if (event.key === 'Enter') {
            if (this.state.location !== '') {  
                this.props.searchYelp(this.state.categories, this.state.location, this.state.sortBy);
                this.props.toggleSearch();
            }
        }

    }

    renderSortByOptions() {
        return Object.keys(this.sortByOptions).map(sortByOption => {
            let sortByOptionValue = this.sortByOptions[sortByOption];
            return <li key={sortByOptionValue} className={this.getSortByClass(sortByOptionValue)} onClick={this.handleSortByChange.bind(this, sortByOptionValue)}>{sortByOption}</li>;
        });
    }
    
    render() {
        return (
            <div className="SearchBar">
                <div className="SearchBar-sort-options">
                    <ul onClick={this.handleSearch}>
                        {this.renderSortByOptions()}
                    </ul>
                </div>
                <div className="SearchBar-fields">
                    <input id='category' placeholder="Search Restaurants" value={this.state.categories} onChange={this.handleCategoryChange} />
                    <input id='location' placeholder="Where?" value={this.state.location} onChange={this.handleLocationChange} onKeyDown={this.handleKeyPress} />
                </div>
                <div className="SearchBar-submit">
                    <a href="www.#.com" onClick={this.handleSearch}>Let's Go!</a>
                </div>
            </div>
        );
    };
}

export default SearchBar;