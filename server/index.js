require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const bcrypt = require('bcryptjs');
const app = express();
const { register, login, logout } = require('./controllers/authController');
const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env;
const {
	dragonTreasure,
	getUserTreasure,
	addUserTreasure,
	getAllTreasure
} = require('./controllers/treasureController');
const { usersOnly, adminsOnly } = require('./middleware/authMiddleware');
massive(CONNECTION_STRING).then((db) => {
	app.set('db', db);
	console.log('db connected');
});

app.use(
	session({
		resave: true,
		saveUninitialized: false,
		secret: SESSION_SECRET
	})
);

app.use(express.json());

app.post('/auth/register', register);
app.post('/auth/login', login);
app.get('/auth/logout', logout);

app.get('/api/treasure/dragon', dragonTreasure);
app.get('/api/treasure/user', usersOnly, getUserTreasure);
app.post('/api/treasure/user', usersOnly, addUserTreasure);
app.get('/api/treasure/all', usersOnly, adminsOnly, getAllTreasure);
app.listen(SERVER_PORT, () => {
	console.log(`listening on ${SERVER_PORT}`);
});
