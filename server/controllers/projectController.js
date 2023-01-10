const { User, Build } = require('../models');

module.exports = {
	
	async addProject({ body }, res) {
		const userUp = await User.findOneAndUpdate(
			{ _id: body.userId },
			{
				$push: {
					builds: {
						buildCode: body.buildCode,
						description: body.description,
						title: body.title,
					},
				},
			}
		);
		if (!userUp) {
			return res.status(400).json({ message: 'wrong credentials!' });
		}
		res.json({ message: 'Added Project successfully' });
	},

	async findAllProjects({ user = null, params }, res) {
		const userData = await User.findOne({
			$or: [
				{ _id: user ? user._id : params.id },
				{ username: params.username },
			],
		}).populate('builds');
		if (!userData) {
			return res
				.status(400)
				.json({ message: 'no user found, please try again' });
		}
		res.json(userData);
	},
	
	async findProject({ body }, res) {
		const userData = await User.aggregate([
			{$match: {_id: body.userId}},
			{$eq:{builds: body.build}}
		])
		if (!userData) {
			return res
				.status(400)
				.json({ message: 'no user found, please try again' });
		}
		res.json(userData);
	},

	// async deleteProject({user, params}, res) {
	// 	const user = await User.findOneAndUpdate(
	// 		{ _id: user._id },
	// 		{ $pull: { builds: { _id: params.projectId } } },
	// 		{new: true}
	// 	);
	// 	if (!user) {
	// 		return res
	// 			.status(400)
	// 			.json({ message: 'unable to delete, please try again'});
	// 	}
	// 	res.json(user);
	// }
};
