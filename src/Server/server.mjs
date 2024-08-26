import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

const apiKey = process.env.YELP_API_KEY; 
const baseUrl = process.env.YELP_API_URL;

// Middleware
app.use(cors({
    origin: 'https://sensatiable-v2-daba7050f8d7.herokuapp.com/'
}));
app.use(express.json()); // Parse JSON bodies

// API endpoint for Yelp data
app.get('/api/yelp', async (req, res) => {
    const { categories, location, sortBy } = req.query;

    const url = `${baseUrl}?term=${encodeURIComponent(categories)}/Restaurant&location=${encodeURIComponent(location)}&radius=10000&sort_by=${encodeURIComponent(sortBy)}&limit=50`;

    try {
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${apiKey}`,
            },
        });

        if (!response.ok) {
            return res.status(response.status).json({ error: 'Failed to fetch data from Yelp API' });
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get the directory of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../../build')));

// Serve the React app for any other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../build', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
