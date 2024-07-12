const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Proxy endpoint
app.post('/', async (req, res) => {
    const { url, headers, body, method } = req.body;

    try {
        const response = await axios({
            method: method || 'GET',
            url,
            headers,
            data: body,
        });

        // Return the response directly
        res.status(response.status).json(response.data);
    } catch (error) {
        if (error.response) {
            res.status(error.response.status).json(error.response.data);
        } else {
            res.status(500).json({ message: 'Internal Server Error', error: error.message });
        }
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
