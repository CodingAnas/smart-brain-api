const handleSignIn = (db, bcrypt) => (req, res) => {
	const {email, password} = req.body;
    console.log(email, password)
	db.select('email', 'hash').from('login')
	.where({email})
	.then(data => {
		bcrypt.compare(password, data[0].hash, (err, result) => {
			if(result)
			{
				db.select('*').from('users')
				.where({email})
				.then(user => {
					res.json(user[0])
				})
				.catch(err => res.status(400).json("Cant access User"))
			}
			else
				res.status(400).json("Incorrect Credentials")
		})
	})
	.catch(err => res.status(400).json("User doesnt exist"))
}

module.exports = {
    handleSignIn : handleSignIn
}