const Order = require('../model/order');

module.exports.getAllOrder = (req, res) => {
	const limit = Number(req.query.limit) || 0;
	const sort = req.query.sort == 'desc' ? -1 : 1;

	Order.find()
		.select(['-_id'])
		.limit(limit)
		.sort({
			id: sort,
		})
		.then((orders) => {
			res.json(orders);
		})
		.catch((err) => console.log(err));
};

module.exports.getOrder = (req, res) => {
	const id = req.params.id;

	Order.findOne({
		id,
	})
		.select(['-_id'])
		.then((order) => {
			res.json(order);
		})
		.catch((err) => console.log(err));
};

module.exports.addOrder = async (req, res) => {
	if (!req.body) {
		res.json({
			status: 'error',
			message: 'data is undefined',
		});
	} else {
		await Order.findOne().sort('-id').exec(async function (err, item) {
			const order = {
				id: (item?.id||0) + 1,
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
			await Order.insertMany([order])
				.then(order => res.json(order))
				.catch(err => console.log(err))
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
