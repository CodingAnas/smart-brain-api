const getProfile = (db) => (req, res) => {
	const {id} = req.params;
	db.select('*').from('users').where({id})
		.then(user => {
			if(user.id)
				res.json(user[0])
			else
				res.status(400).json('User Not Found')
		})
		.catch(err => res.status(400).json('User Not Found'))
}

module.exports = {
    getProfile : getProfile
}