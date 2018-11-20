const express = require('express');
const router = express.Router();
// const category = require('./router/category');

// const template = require('./template');
	  
const main = require('./router/main'),
    user = require('./router/user'),
    userview = require('./router/userview'),
    tracking = require('./router/tracking'),
    accident = require("./router/accident"),
    led = require("./router/led"),
    category = require("./router/category");
//       lecture = require('./router/lecture'),
//       email = require('./router/email'),
//       error = require('./router/error'),
//       verifyStudent = require('./router/verifyStudent'),
//       eduPromotion = require('./router/eduPromotion'),
//       eduBanner = require('./router/eduBanner'),
//       eduNotice = require('./router/eduNotice');

// router.get('/', function(req, res) {
// 	res.send('Hello helper-internal-server!');
// });

router.get('/', function(req, res) { res.redirect('/main'); });
router.use('/main', main);
router.use('/tracking', tracking);
router.use('/user', user);
router.use('/userview', userview);
router.use('/accident', accident);
router.use('/led', led);
router.use('/category', category);

// router.use('/category', category);

// router.get('/', function(req, res) { res.redirect('/main'); });
// router.use('/main', main);
// router.use('/user', user);
// router.use('/lecture', lecture);
// router.use('/email', email.router);
// router.use('/error', error);
// router.use('/verify-student', verifyStudent);
// router.use('/edu-promotion', eduPromotion);
// router.use('/edu-banner', eduBanner);
// router.use('/edu-notice', eduNotice);

router.get('*', function(req, res) {
    res.json('접근할 수 없는 페이지입니다.');
});


module.exports = router;
