const Order = require('../model/order');
const AWS = require('aws-sdk');
const tableName = 'orders';
AWS.config.update({ region: 'eu-central-1' });

module.exports.getAllOrder = (req, res) => {
	var params = {
		TableName: tableName
	};
	const client = new AWS.DynamoDB.DocumentClient();
	client.scan(params, (err, data) => {
		if (err) {
			console.log(err);
		} else {
			var items = [];
			for (var i in data.Items)
				items.push(data.Items[i]);

			res.contentType = 'application/json';
			res.send(items);
		}
	});
};

module.exports.getOrder = (req, res) => {
	var params = {
		TableName: tableName,
		Key: {
			'id': req.params.id
		}
	};
	const id = req.params.id;
// Call DynamoDB to read the item from the table
	const client = new AWS.DynamoDB.DocumentClient();

	client.get(params, function(err, data) {
		if (err) {
			console.log("Error", err);
		} else {
			res.json(data.Item);
		}
	});
};

module.exports.addOrder = async (req, res) => {
	if (!req.body) {
		res.json({
			status: 'error',
			message: 'data is undefined',
		});
	} else {
		var params = {
			TableName: tableName,
			Key: {
				'id': req.params.id
			},
			ProjectionExpression: 'id',
			ScanIndexForward: false
		};
		const client = new AWS.DynamoDB.DocumentClient();

		await client.get(params, (err, data) => {
			const order = {
				id: (data.Item?.id||0) + 1,
				email: req.body.email,
				username: req.body.username,
				address: req.body.address,
				geolocation: req.body.geolocation ? {
					lat: req.body.geolocation.lat,
					long: req.body.geolocation.long,
				} : null,
				phone: req.body.phone,
				date: new Date(),
				products: req.body.products,
			};
			var params = {
				TableName: tableName,
				Item: order
			};
			client.put(params, (err, data) => {
				if (err) {
					console.error("Unable to add item.");
					console.error("Error JSON:", JSON.stringify(err, null, 2));
				} else {
					console.log("Added item:", res.json(data));
				}
			});
		});
		
	}
};

module.exports.editOrder = (req, res) => {
	if (!req.body || req.params.id == null) {
		res.json({
			status: 'error',
			message: 'something went wrong! check your sent data',
		});
	} else {
		res.json({
			id: parseInt(req.params.id),
			email: req.body.email,
			ordername: req.body.ordername,
			password: req.body.password,
			name: {
				firstname: req.body.firstname,
				lastname: req.body.lastname,
			},
			address: {
				city: req.body.address.city,
				street: req.body.address.street,
				number: req.body.number,
				zipcode: req.body.zipcode,
				geolocation: {
					lat: req.body.address.geolocation.lat,
					long: req.body.address.geolocation.long,
				},
			},
			phone: req.body.phone,
		});
	}
};

module.exports.deleteOrder = (req, res) => {
	if (req.params.id == null) {
		res.json({
			status: 'error',
			message: 'cart id should be provided',
		});
	} else {
		Order.findOne({ id: req.params.id })
			.select(['-_id'])
			.then((order) => {
				res.json(order);
			})
			.catch((err) => console.log(err));
	}
};
