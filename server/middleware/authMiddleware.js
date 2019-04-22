const usersOnly = (req, res, next) => {
	if (!req.session.user) {
		res.status(401).json('Please log in');
	}
	next();
};

const adminsOnly = (req, res, next) => {
	if (!req.session.user.isAdmin) {
		res.status(401).json('You are not an admin');
	}
	next();
};

module.exports = {
	usersOnly,
	adminsOnly
};
