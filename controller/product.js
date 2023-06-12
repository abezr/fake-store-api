const Product = require('../model/product');
const AWS = require("aws-sdk");

module.exports.getAllProducts = (req, res) => {
    // const limit = Number(req.query.limit) || 0;
    // const sort = req.query.sort == 'desc' ? -1 : 1;
    //
    // Product.find()
    //     .select(['-_id'])
    //     .limit(limit)
    //     .sort({id: sort})
    //     .then((products) => {
    //         res.json(products);
    //     })
    //     .catch((err) => console.log(err));
    const params = {
        TableName: 'products'
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

module.exports.getProduct = (req, res) => {
    const id = req.params.id;

    Product.findOne({
        id,
    })
        .select(['-_id'])
        .then((product) => {
            res.json(product);
        })
        .catch((err) => console.log(err));
};

module.exports.getProductCategories = (req, res) => {
    Product.distinct('category')
        .then((categories) => {
            res.json(categories);
        })
        .catch((err) => console.log(err));
};

module.exports.getProductsInCategory = (req, res) => {
    const category = req.params.category;
    // const limit = Number(req.query.limit) || 0;
    // const sort = req.query.sort == 'desc' ? -1 : 1;
        const params = {
            TableName: 'products',
            ExpressionAttributeNames: { "#name": "name" },
            ExpressionAttributeValues: {
                ':category': category
            }
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
    // Product.find({
    //     category,
    // })
    //     .select(['-_id'])
    //     .limit(limit)
    //     .sort({id: sort})
    //     .then((products) => {
    //         res.json(products);
    //     })
    //     .catch((err) => console.log(err));
};

module.exports.addProduct = async (req, res) => {
    if (typeof req.body == undefined) {
        res.json({
            status: 'error',
            message: 'data is undefined',
        });
    } else {
        let maxId = 0;
        await Product.findOne().sort('-id').exec(async function (err, item) {
            const product = {
                id: (item?.id || 0) + 1,
                title: req.body.title,
                price: req.body.price,
                description: req.body.description,
                image: req.body.image,
                category: req.body.category,
            };
            await Product.insertMany([product])
                .then(product => res.json(product))
                .catch(err => console.log(err))
        });
    }
};

module.exports.editProduct = (req, res) => {
    if (typeof req.body == undefined || req.params.id == null) {
        res.json({
            status: 'error',
            message: 'something went wrong! check your sent data',
        });
    } else {
        res.json({
            id: parseInt(req.params.id),
            title: req.body.title,
            price: req.body.price,
            description: req.body.description,
            image: req.body.image,
            category: req.body.category,
        });
    }
};

module.exports.deleteProduct = (req, res) => {
    if (req.params.id == null) {
        res.json({
            status: 'error',
            message: 'cart id should be provided',
        });
    } else {
        Product.findOne({
            id: req.params.id,
        })
            .select(['-_id'])
            .then((product) => {
                res.json(product);
            })
            .catch((err) => console.log(err));
    }
};
