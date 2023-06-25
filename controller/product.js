const Product = require('../model/product');
const CyclicDb = require("@cyclic.sh/dynamodb");

module.exports.getAllProducts = async (req, res) => {
    const client = CyclicDb("dungarees-crowCyclicDB")
    const products = client.collection('products');
    const existingIdsMc = [];
    const seedMc = [{"id":16888521949,"title":"ДАБЛ РОЯЛ ЧІЗБУРГЕР","price":196,"image":"https://d3tqkqn8yl74v5.cloudfront.net/TPO-cso_ua_2186_royal_double.png","category":"McDonalds"},{"id":16888521941,"title":"БІГ ТЕЙСТІ","price":190,"image":"https://d3tqkqn8yl74v5.cloudfront.net/TPO-cso_ua_2089_Big_TastyA.png","category":"McDonalds"},{"id":16888521950,"title":"РОЯЛ ФРЕШ","price":163,"image":"https://d3tqkqn8yl74v5.cloudfront.net/TPO-cso_ua_2188_royal_fresh.png","category":"McDonalds"},{"id":16888521947,"title":"РОЯЛ ЧІЗБУРГЕР","price":130,"image":"https://d3tqkqn8yl74v5.cloudfront.net/TPO-cso_ua_2142_ROYAL_CHEESEBURGER.png","category":"McDonalds"},{"id":16888521938,"title":"БІГ МАК","price":115,"image":"https://d3tqkqn8yl74v5.cloudfront.net/TPO-chf_ua_2050_Big Mac.png","category":"McDonalds"},{"id":16888521940,"title":"МАКЧІКЕН","price":100,"image":"https://d3tqkqn8yl74v5.cloudfront.net/TPO-cso_ua_2070_McChiken1.png","category":"McDonalds"},{"id":16888521939,"title":"ФІЛЕ-О-ФІШ","price":97,"image":"https://d3tqkqn8yl74v5.cloudfront.net/TPO-chf_ua_2060_File-o-Fish.png","category":"McDonalds"},{"id":16888521936,"title":"ДАБЛ ЧІЗБУРГЕР","price":97,"image":"https://d3tqkqn8yl74v5.cloudfront.net/TPO-cso_ua_2030_DoubleCheeseburger.png","category":"McDonalds"},{"id":16888521937,"title":"ЧІЗБУРГЕР З БЕКОНОМ","price":81,"image":"https://d3tqkqn8yl74v5.cloudfront.net/TPO-cso_ua_2040_Cheeseburger_bacon.png","category":"McDonalds"},{"id":16888521935,"title":"ЧІЗБУРГЕР","price":64,"image":"https://d3tqkqn8yl74v5.cloudfront.net/TPO-cso_ua_2010_Cheeseburger.png","category":"McDonalds"},{"id":16888521971,"title":"ЧІКЕН ДЖУНІОР","price":64,"image":"https://d3tqkqn8yl74v5.cloudfront.net/TPO-chf_ua_3425_CHICKEN_JUNIOR.png","category":"McDonalds"},{"id":16888521934,"title":"ГАМБУРГЕР","price":55,"image":"https://d3tqkqn8yl74v5.cloudfront.net/TPO-cso_ua_2000_Gamburger.png","category":"McDonalds"},{"id":16888521932,"title":"ТОСТ ІЗ СИРОМ","price":39,"image":"https://d3tqkqn8yl74v5.cloudfront.net/TPO-cso_ua_1160_McToast.png","category":"McDonalds"}]
        .concat([{"id":2438,"title":"САЛЬСА БУРГЕР","price":90,"image":"http://www.kfc-ukraine.com/admin/files/4179.png","description":"Гострий соус Сальса, філе в оригінальній паніровці, мариновані огірочки на пшеничній булочці з чорно-білим кунжутом","category":"KFC"},{"id":2439,"title":"САЛЬСА БУРГЕР ГОСТРИЙ","price":90,"image":"http://www.kfc-ukraine.com/admin/files/4180.png","description":"Гострий соус Сальса, філе в гострій паніровці, мариновані огірочки на пшеничній булочці з чорно-білим кунжутом","category":"KFC"}])
        .concat([{"id":12438,"title":"Californian BBQ Double","price":90,"image":"https://cdn.sanity.io/images/czqk28jt/prod_bk_gb/8184caf521f4b5da696fcf6c88e5da9166b091fa-870x570.png?w=320&q=40&fit=max&auto=format","description":"Tuck into two flame-grilled Whopper. patties, topped with American cheese, fresh slices of tomato and crisp lettuce, and finished with a swirl of zesty BBQ sauce and golden crispy onions.","category":"BurgerKING"},
            {"id":12439,"title":"Californian BBQ Single","price":91,"image":"https://cdn.sanity.io/images/czqk28jt/prod_bk_gb/652b503d37a9fe190cc8b2764b98a499378e5b8f-870x570.png?w=320&q=40&fit=max&auto=format","description":"Tuck into a flame-grilled Whopper patty, topped with American cheese, fresh slices of tomato and crisp lettuce, and finished with a zesty BBQ sauce and golden crispy onions.","category":"BurgerKING"},
            {"id":12440,"title":"Californian BBQ Royale","price":92,"image":"https://cdn.sanity.io/images/czqk28jt/prod_bk_gb/34e0b8b27f979cff1d7d60481b677489daebf5e3-870x570.png?w=320&q=40&fit=max&auto=format","description":"Chicken Royale patty, topped with two slices of American cheese, fresh tomato slices, crisp lettuce, and a scatter of golden crispy onions.","category":"BurgerKING"}])
        .filter(x => existingIdsMc.indexOf(x.id) === -1);
    const chunkSize = 1;
    for (let i = 0; i < seedMc.length; i += chunkSize) {
        //const chunk = seedMc.slice(i, i + chunkSize);
        var params = {
            TableName: 'products',
            Item: seedMc[i]
        };
        const item = seedMc[i];
        await products.set(item.id, item);

        // client.batchWrite({RequestItems: {'products':chunk.map(x => {PutRequest:{Item:x}})}}, function(err, data) {
        // 	if (err) {
        // 		console.log("Error", err);
        // 	} else {
        // 		console.log("Success", data);
        // 	}
        // });
    }
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
