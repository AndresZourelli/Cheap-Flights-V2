require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

// enable all CORS requests
app.use(cors());

// use bodyParser to parse application/json content-type
app.use(bodyParser.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/../client/build')));

app.listen(process.env.PORT || 5000, () => console.log('Listening on port 5000'));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + '/../client/build/index.html'));
});
