const bcrypt = require('bcrypt');
const knex = require('knex');
const bodyParser = require('body-parser');
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

const createUser = (request, response) => {
	const { name, email, password } = request.body;
	hash = bcrypt.hash(password, 10);
	db
		.transaction((trx) => {
			trx
				.insert({
					name: name,
					email: email,
					password: hash,
					joined: new Date()
				})
				.into('login')
				.then(trx.commit)
				.catch(trx.rollback);
		})
		.catch((err) => res.status(400).json('unable to register'));
};
