// server.js

const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = 8000;

app.use(cors());

// 店の情報を取得する
app.get('/getHotPepperData', async (req, res) => {
    const apiEndpoint = 'https://webservice.recruit.co.jp/hotpepper/gourmet/v1/';
    const apiKey = 'db73948f6ba3c065';
    let apiUrl = `${apiEndpoint}?key=${apiKey}`;
    
    Object.keys(req.query).forEach(key => {
        if (req.query[key] !== "") {
            apiUrl += `&${key}=${req.query[key]}`;
        }
    });
    console.log(apiUrl);

    try {
        const response = await axios.get(apiUrl);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// 店のジャンルリストを取得する
app.get('/getHotPepperGenreData', async (req, res) => {
    const apiEndpoint = 'http://webservice.recruit.co.jp/hotpepper/genre/v1/';
    const apiKey = 'db73948f6ba3c065';
    let apiUrl = `${apiEndpoint}?key=${apiKey}`;
    
    Object.keys(req.query).forEach(key => {
        apiUrl += `&${key}=${req.query[key]}`;
    });
    console.log(apiUrl);

    try {
        const response = await axios.get(apiUrl);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`CORS Proxy Server is running at http://localhost:${port}`);
});
