const KoaRouter = require('koa-router');
const koaBody = require('koa-body');
const router = new KoaRouter();

// user
// spaRouter.get('/user_list', require('./api').user.list);
router.post('/login', koaBody(), require('./api').user.login);
router.post('/register', koaBody(), require('./api').user.register);
router.get('/check', koaBody(), require('./api').user.check);

router.get('/getCartNum', koaBody(), require('./api').user.getCartNum);
router.get('/getOrderNum', koaBody(), require('./api').user.getOrderNum);

router.get('/getOrderInfo', koaBody(), require('./api').product.getOrderInfo);

router.post('/addAddress', koaBody(), require('./api').user.addAddress);
router.post('/deleteAddress', koaBody(), require('./api').user.deleteAddress);
router.post('/editAddress', koaBody(), require('./api').user.editAddress);

router.get('/getAddress', koaBody(), require('./api').user.getAddress);

router.get('/product', koaBody(), require('./api').product.detail);
router.get('/allProduct', koaBody(), require('./api').product.allProduct);
router.post('/editProduct', koaBody(), require('./api').product.editProduct);
router.post('/addProduct', koaBody(), require('./api').product.addProduct);
router.get('/productList', koaBody(), require('./api').product.productList);
router.get('/order', koaBody(), require('./api').product.order);
router.get('/cart', koaBody(), require('./api').product.cart);
router.post('/addCart', koaBody(), require('./api').product.addCart);
router.get('/cartDelete', koaBody(), require('./api').product.cartDelete);

router.post('/placeOrder', koaBody(), require('./api').product.placeOrder);
router.get('/cancelOrder', koaBody(), require('./api').product.cancelOrder);
router.post('/agreeOrder', koaBody(), require('./api').product.agreeOrder);
router.post('/refuseOrder', koaBody(), require('./api').product.refuseOrder);

router.use('/JH-api', router.routes());

module.exports = router;