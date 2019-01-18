const express = require('express');
const router = express.Router();
// const category = require('./router/category');

// const template = require('./template');
	  
<<<<<<< Updated upstream
const main = require('./router/main'),
    user = require('./router/user'),
    userview = require('./router/userview'),
    tracking = require('./router/tracking'),
    accident = require("./router/accident"),
    led = require("./router/led"),
    category = require("./router/category"),
    device = require("./router/deviceview");

router.get('/', function(req, res) { res.redirect('/main'); });
router.use('/main', main);
router.use('/tracking', tracking);
router.use('/user', user);
router.use('/accident', accident);
router.use('/led', led);
router.use('/category', category);

//page
router.use('/userview', userview);
router.use('/deviceview', device);

router.get('*', function(req, res) {
    res.json('접근할 수 없는 페이지입니다.');
});

=======
const main = require('./router/main');
router.use('/', main);
>>>>>>> Stashed changes

module.exports = router;
