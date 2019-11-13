const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const request = require('request')
const app = express()

const DARKSKYKEY = process.env.DSKey

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.get('/api/weather', (req,res) => {
    request(
        { url: 'https://api.darksky.net/forecast/DARKSKYKEY/30.2672,-97.7431' },
        (error, response, body) => {
            if (error || response.statusCode !== 200) {
                return res.status(500).json({type: 'error', message: error.message });
            }

            res.json(JSON.parse(body));
        }
    )
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log('Listening on port ' + PORT))
