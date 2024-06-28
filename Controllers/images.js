const searchImage = (db) => (req, res) => {
	const {id} = req.body;
	db('users').where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
		.then(entries => {
			res.json(entries[0].entries)
		})
		.catch(err => res.status(400).json('No User exist'))
}

const getClarifaiReq = () => (req, res) =>{
  
	const PAT = '29473cd21bfc4c81b7f0f37ef535957e';
	const USER_ID = 'epkj8ltuldit';
	const APP_ID = 'SmartBrain';
	const IMAGE_URL = req.body.input;
	const raw = JSON.stringify({
		"user_app_id": {
			"user_id": USER_ID,
			"app_id": APP_ID
		},
		"inputs": [
			{
				"data": {
					"image": {
						"url": IMAGE_URL
						// "base64": IMAGE_BYTES_STRING
					}
				}
			}
		]
	});
  
	const requestOptions = {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Authorization': 'Key ' + PAT
		},
		body: raw
	};
	return requestOptions;
  }

module.exports = {
    searchImage : searchImage,
	getClarifaiReq: getClarifaiReq
}