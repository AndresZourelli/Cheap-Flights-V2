require('dotenv').config();
var nodemailer = require('nodemailer');

var transport = {
	host: 'smtp.zoho.com',
	auth: {
		user: process.env.Mailer_User,
		pass: process.env.Mailer_Pass
	}
};

var transporter = nodemailer.createTransport(transport);

module.exports = function sendEmail(to, name, message, res) {
	const mailOptions = {
		from: 'admin@tabletopmtg.com',
		to: 'azourelli+cheapflights@gmail.com',
		subject: `Cheap flights Message from ${name}`,
		html: message
	};

	transporter.sendMail(mailOptions, (error) => {
		if (error) {
		}
		res.status(200).json({ success: 'success' });
	});
};
