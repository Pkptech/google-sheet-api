const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Enable CORS for all origins (adjust if needed)
app.use(cors());
app.use(express.json());  // For parsing application/json

// Handle POST request at /api/data
app.post('/api/data', async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Your logic to append data to Google Sheets
        const values = [[name, email, message]];
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${process.env.SHEET_ID}/values/Sheet1:append?valueInputOption=RAW&key=${process.env.API_KEY}`;

        const response = await axios.post(url, { values });
        
        // Respond with JSON
        res.json({ success: true, data: response.data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong!" });
    }
});

// Make sure to specify the correct port
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
