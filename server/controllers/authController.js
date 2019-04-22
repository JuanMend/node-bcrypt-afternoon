const bcrypt = require('bcryptjs');

const register = async (req, res) => {
	const { username, password, isAdmin } = req.body;
	const result = await req.app.get('db').get_user([ username ]).catch((err) => console.log(err));
	const existingUser = result[0];
	if (existingUser) {
		res.status(403).json('Username taken');
	}
	const salt = bcrypt.genSaltSync(10);
	const hash = bcrypt.hashSync(password, salt);
	const registerUser = await req.app.get('db').register_user([ isAdmin, username, hash ]);

	const user = registerUser[0];
	req.session.user = { isAdmin: user.is_admin, username: user.username, id: user.id };
	res.status(201).json(req.session.user);
};

const login = async (req, res) => {
	const { username, password } = req.body;
	const db = req.app.get('db');

	const foundUser = await db.get_user([ username ]);
	const user = foundUser[0];
	if (!user) {
		res.status(403).json('User not found. Please register as a new user before logging in');
	}

	const isAuthenticated = bcrypt.compareSync(password, user.hash);
	if (!isAuthenticated) {
		res.status(403).json('Incorrect Password');
	}

	req.session.user = { isAdmin: user.is_admin, username: user.username, id: user.id };
	res.status(200).json(req.session.user);
};

const logout = (req, res) => {
	req.session.destroy();
	res.sendStatus(200);
};

module.exports = {
	bcrypt,
	register,
	login,
	logout
};
