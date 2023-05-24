//initializes
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');

const myEnv = dotenv.config();
dotenvExpand.expand(myEnv);

//app
const app = express();

//port
const port = process.env.PORT || 6400;

//routes
const productRoute = require('./routes/product');
const homeRoute = require('./routes/home');
const cartRoute = require('./routes/cart');
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const Product = require("./model/product");

//middleware
app.use(cors());

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//view engine
app.set('view engine', 'ejs');
app.set('views', 'views');

app.disable('view cache');

app.use('/', homeRoute);
app.use('/products', productRoute);
app.use('/carts', cartRoute);
app.use('/users', userRoute);
app.use('/auth', authRoute);

//mongoose
mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);
mongoose
	.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
	.then(() => {
		app.listen(port, () => {
			console.log('connect');
			Product.find().then(products => {
				const existingIdsMc = products.map(x => x.id);
				const seedMc = [{"id":16888521949,"title":"ДАБЛ РОЯЛ ЧІЗБУРГЕР","price":196,"image":"https://d3tqkqn8yl74v5.cloudfront.net/TPO-cso_ua_2186_royal_double.png","category":"McDonalds"},{"id":16888521941,"title":"БІГ ТЕЙСТІ","price":190,"image":"https://d3tqkqn8yl74v5.cloudfront.net/TPO-cso_ua_2089_Big_TastyA.png","category":"McDonalds"},{"id":16888521950,"title":"РОЯЛ ФРЕШ","price":163,"image":"https://d3tqkqn8yl74v5.cloudfront.net/TPO-cso_ua_2188_royal_fresh.png","category":"McDonalds"},{"id":16888521947,"title":"РОЯЛ ЧІЗБУРГЕР","price":130,"image":"https://d3tqkqn8yl74v5.cloudfront.net/TPO-cso_ua_2142_ROYAL_CHEESEBURGER.png","category":"McDonalds"},{"id":16888521938,"title":"БІГ МАК","price":115,"image":"https://d3tqkqn8yl74v5.cloudfront.net/TPO-chf_ua_2050_Big Mac.png","category":"McDonalds"},{"id":16888521940,"title":"МАКЧІКЕН","price":100,"image":"https://d3tqkqn8yl74v5.cloudfront.net/TPO-cso_ua_2070_McChiken1.png","category":"McDonalds"},{"id":16888521939,"title":"ФІЛЕ-О-ФІШ","price":97,"image":"https://d3tqkqn8yl74v5.cloudfront.net/TPO-chf_ua_2060_File-o-Fish.png","category":"McDonalds"},{"id":16888521936,"title":"ДАБЛ ЧІЗБУРГЕР","price":97,"image":"https://d3tqkqn8yl74v5.cloudfront.net/TPO-cso_ua_2030_DoubleCheeseburger.png","category":"McDonalds"},{"id":16888521937,"title":"ЧІЗБУРГЕР З БЕКОНОМ","price":81,"image":"https://d3tqkqn8yl74v5.cloudfront.net/TPO-cso_ua_2040_Cheeseburger_bacon.png","category":"McDonalds"},{"id":16888521935,"title":"ЧІЗБУРГЕР","price":64,"image":"https://d3tqkqn8yl74v5.cloudfront.net/TPO-cso_ua_2010_Cheeseburger.png","category":"McDonalds"},{"id":16888521971,"title":"ЧІКЕН ДЖУНІОР","price":64,"image":"https://d3tqkqn8yl74v5.cloudfront.net/TPO-chf_ua_3425_CHICKEN_JUNIOR.png","category":"McDonalds"},{"id":16888521934,"title":"ГАМБУРГЕР","price":55,"image":"https://d3tqkqn8yl74v5.cloudfront.net/TPO-cso_ua_2000_Gamburger.png","category":"McDonalds"},{"id":16888521932,"title":"ТОСТ ІЗ СИРОМ","price":39,"image":"https://d3tqkqn8yl74v5.cloudfront.net/TPO-cso_ua_1160_McToast.png","category":"McDonalds"}]
					.filter(x => existingIdsMc.indexOf(x.id) === -1);
				Product.insertMany(seedMc);
			});
		});
	})
	.catch((err) => {
		console.log(err);
	});

module.exports = app;
