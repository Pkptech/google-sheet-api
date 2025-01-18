require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

const SHEET_ID = process.env.SHEET_ID; 
const API_KEY = process.env.GOOGLE_API_KEY;

// Fetch Google Sheets Data
app.get('/api/data', async (req, res) => {
    try {
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Sheet1?key=${API_KEY}`;
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Render Home Page
app.get('/', (req, res) => {
    res.send('Google Sheets API is running 🚀');
});

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const cors = require("cors");

// Enable CORS for all origins
app.use(cors());
