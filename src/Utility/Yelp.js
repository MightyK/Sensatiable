// Yelp.js

import { response } from "express";

const Yelp = {
    async search(categories, location, sortBy) {
        const apiUrl = process.env.REACT_APP_API_URL;
        const url = `${apiUrl}/api/yelp?categories=${encodeURIComponent(categories)}&location=${encodeURIComponent(location)}&sortBy=${encodeURIComponent(sortBy)}`;

        try {
            const response = await fetch(url);
        
            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error response from server:', errorText);
                throw new Error('Network response was not ok');
            }
        
            const jsonResponse = await response.json();
            // Process jsonResponse...
            if (jsonResponse.businesses) {
                return jsonResponse.businesses.map((restaurant) => ({
                    id: restaurant.id,
                    imageSrc: restaurant.image_url,
                    name: restaurant.name,
                    address: restaurant.location.address1,
                    city: restaurant.location.city,
                    state: restaurant.location.state,
                    zipCode: restaurant.location.zip_code,
                    category: restaurant.categories[0]?.title,
                    rating: restaurant.rating,
                    reviewCount: restaurant.review_count,
                }));
            }
        } catch (error) {
            console.error('Failed to fetch Yelp data:', error);
            return [];
        }
        
        console.log(response);
    },
};

export default Yelp;
