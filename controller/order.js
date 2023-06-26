const Order = require('../model/order');
// const AWS = require('aws-sdk');
const CyclicDb = require("@cyclic.sh/dynamodb");

const tableName = 'orders';
// AWS.config.update({ region: 'eu-central-1' });

module.exports.getAllOrder = async (req, res) => {
    var params = {
        TableName: tableName
    };
    const client = CyclicDb("dungarees-crowCyclicDB")
    const col = client.collection('orders');
    // const client = new AWS.DynamoDB.DocumentClient();
    const items = (await col.list()).results.map(x => x.props);
    console.log(items);
    res.contentType = 'application/json';
    res.send(items.map(x => JSON.parse(x.value)));
};

module.exports.getOrder = async (req, res) => {
    var params = {
        TableName: tableName,
        Key: {
            'id': req.params.id
        }
    };
    const client = CyclicDb("dungarees-crowCyclicDB")
    const col = client.collection('orders');

    res.json(await col.get(""+req.params.id));
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
        const client = CyclicDb("dungarees-crowCyclicDB")
        const col = client.collection('orders');

        const id = ((await col.latest())?.id || 0)+1;
        const order = {
            id: id,
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
console.log(order);
        await col.set(""+id, {value:JSON.stringify(order)});
        res.json(order);
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
        Order.findOne({id: req.params.id})
            .select(['-_id'])
            .then((order) => {
                res.json(order);
            })
            .catch((err) => console.log(err));
    }
};
