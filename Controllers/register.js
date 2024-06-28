const handleRegister = (db, bcrypt, saltRounds) => (req, res) => {
	const {name, email, password} = req.body;
	bcrypt.genSalt(saltRounds, (err, salt) => {
		bcrypt.hash(password, salt, (err, hash) => {
			db.transaction(trx => {
				trx.insert({
					email: email,
					hash: hash
				})
				.into('login')
				.returning('email')
					.then(email => {
						trx('users')
						.returning('*')
						.insert({
							name: name,
							email: email[0].email,
							joined_at:new Date()
						})
							.then(user => {
								res.json(user[0])
							})
							.then(trx.commit)
							.catch(trx.rollback)
					})
					.catch(err => res.status(400).json('Unable to register in users'))
			})
		})
	})
}

module.exports = {
    handleRegister : handleRegister
}