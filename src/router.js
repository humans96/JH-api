const KoaRouter = require('koa-router');

const router = new KoaRouter();

// user
// spaRouter.get('/user_list', require('./api').user.list);
// spaRouter.post('/user_Info', require('./api').user.info);
router.get('/user_Infos', require('./api').user.infos);


router.use('/JH-api', router.routes());

module.exports = router;