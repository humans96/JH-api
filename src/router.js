const KoaRouter = require('koa-router');
const koaBody = require('koa-body');
const router = new KoaRouter();

// user
// spaRouter.get('/user_list', require('./api').user.list);
router.post('/login', koaBody(), require('./api').user.login);
router.post('/register', koaBody(), require('./api').user.register);
router.get('/user_Infos', koaBody(), require('./api').user.infos);


router.use('/JH-api', router.routes());

module.exports = router;