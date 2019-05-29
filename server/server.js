require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const knex = require('knex');
const cors = require('cors');
const bodyParser = require('body-parser');
const users = require('./server components/users');
const sendEmail = require('./server components/contactform');
// enable all CORS requests
app.use(cors());

// use bodyParser to parse application/json content-type
app.use(bodyParser.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/../client/build')));

const db = knex({
	client: 'pg',
	connection: {
		user: process.env.DB_User,
		host: process.env.DB_host,
		database: process.env.DB,
		password: process.env.DB_password,
		port: process.env.DB_Port,
		ssl: true,
		debug: true
	}
});

app.listen(process.env.PORT || 5000, () => console.log('Listening on port 5000'));

app.post('/api/NewFlights', (data, res) => {
	console.log(data.body.flightData);
	db('Cities').insert(data.body.flightData).then((ress) => res.json({ payload: 'success' }));
});

app.get('/api/getCities', (req, res, next) => {
	db.select('*').table('city_names').then((ress) => {
		res.json({ payload: ress });
	});
});

app.post('/api/fetchCity', (req, res, next) => {
	db('Cities')
		.where({
			departingcity: `${req.body.cityName}`
		})
		.then((ress) => {
			res.json({ payload: ress });
		})
		.catch();
});

app.get('/api/availableCities', (req, res) => {
	db('city_names').select('*').then((ress) => {
		res.json({ payload: ress });
	});
});

app.post('/api/sendEmail', (req, res) => {
	const { to, name, message } = req.body;
	sendEmail(to, name, message, res);
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + '/../client/build/index.html'));
});
