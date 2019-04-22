const dragonTreasure = async (req, res) => {
	const db = req.app.get('db');
	const result = await db.get_dragon_treasure(1);
	res.status(200).json(result);
};

const getUserTreasure = async (req, res) => {
	const db = req.app.get('db');
	const result = await db.get_user_treasure([ req.session.user.id ]);

	res.status(200).json(result);
};

const addUserTreasure = async (req, res) => {
	const db = req.app.get('db');
	const { treasureURL } = req.body;
	const { id } = req.session.user;
	const result = await db.add_user_treasure([ treasureURL, id ]);

	res.status(200).json(result);
};

const getAllTreasure = async (req, res) => {
	const db = req.app.get('db');
	const result = await db.get_all_treasure();
	res.status(200).json(result);
};

module.exports = {
	dragonTreasure,
	getUserTreasure,
	addUserTreasure,
	getAllTreasure
};
