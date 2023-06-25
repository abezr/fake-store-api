const Product = require('../model/product');
const CyclicDb = require("@cyclic.sh/dynamodb");

module.exports.getAllProducts = async (req, res) => {
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
    const client = CyclicDb("dungarees-crowCyclicDB")
    const col = client.collection('products');
    res.contentType = 'application/json';
    res.send(await col.list());
};

module.exports.getProduct = async (req, res) => {
    const id = req.params.id;
    const client = CyclicDb("dungarees-crowCyclicDB")
    const col = client.collection('products');
    return res.json(await col.get(id));
};

module.exports.getProductCategories = async (req, res) => {
    const client = CyclicDb("dungarees-crowCyclicDB")
    const col = client.collection('products');
    const unique = [...new Set(await col.list().map(item => item.category))]; // [ 'A', 'B']
    return res.json(unique);
};

module.exports.getProductsInCategory = async (req, res) => {
    const client = CyclicDb("dungarees-crowCyclicDB")
    const col = client.collection('products');
    const category = req.params.category;
    // const limit = Number(req.query.limit) || 0;
    // const sort = req.query.sort == 'desc' ? -1 : 1;
            res.contentType = 'application/json';
            res.send(await col.filter({category:category}));
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
