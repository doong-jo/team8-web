const express = require('express');
const router = express.Router();
// const category = require('./router/category');

// const template = require('./template');
	  
// const main = require('./router/main'),
//       user = require('./router/user'),
//       lecture = require('./router/lecture'),
//       email = require('./router/email'),
//       error = require('./router/error'),
//       verifyStudent = require('./router/verifyStudent'),
//       eduPromotion = require('./router/eduPromotion'),
//       eduBanner = require('./router/eduBanner'),
//       eduNotice = require('./router/eduNotice');

router.get('/', function(req, res) {
	res.send('Hello helper-internal-server!');
});

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
