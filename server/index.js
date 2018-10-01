import express from 'express';
import dotenv from 'dotenv';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import connectSessionSerialize from 'connect-session-sequelize';
import bodyParser from 'body-parser';

import sql from "./util/sql";

// Import Database models
import User from "./models/user";
import Video from "./models/video";

// Configuration
const SessionStore = connectSessionSerialize(session.Store);

dotenv.config();
const port = process.env.PORT || 8080;
const cookieSecret = process.env.COOKIE_SECRET || secret;

const app = express();

app.use(cookieParser(cookieSecret));
app.use(session({
	store: new SessionStore({ db: sql }),
	secret: cookieSecret,
	resave: false,
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}))


// Routing

app.get('/', (req, res) => {
	res.json({ "message": "The server is working." });
})

app.post('/signup', (req, res) => {
	User.findOne({ where: {
		username: req.body.username
	}})
	.then((user) =>{
		if (user) {
			res.json({ "error": "That username is already taken." });
		} else {
			User.signup(req)
			.then((user) => {
				req.session.userId = user.get("uuid")+user.get("username");
				res.json(user.dataValues)
			})
		}
	})
	.catch((error) => {
		console.error(error);
	})
});

app.get('/videos/:page', (req, res) => {
	res.json({ "message": "This route is functional." });
});

app.get('/videos/:id', (req, res) => {

});

app.get('/videos/:ratio', (req, res) => {

});

app.get('/*', (req, res) => {
	res.status(404).json({ "message": "This resource does not exist." });
});



sql.sync({ force: true }).then(function() {
	console.log("Database synced");
	app.listen(port, function() {
		console.log(`Server running on port ${port}`);
	});
})
.catch((error) => {
	console.error(error);
})