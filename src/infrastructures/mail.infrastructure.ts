import { createTransport, Transporter } from "nodemailer";
import SMTPTransport = require("nodemailer/lib/smtp-transport");

const transporter: Transporter<SMTPTransport.SentMessageInfo, SMTPTransport.Options> = createTransport({
	name: "live",
	host: "smtp.gmail.com",
	port: 465,
	secure: true,
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASS,
	},
});

export default transporter;