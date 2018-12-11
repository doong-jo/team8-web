const express = require('express');
const router = express.Router();
	  
const main = require('./router/main'),
    user = require('./router/user'),
    tracking = require('./router/tracking'),
    accident = require("./router/accident"),
    led = require("./router/led"),
    category = require("./router/category"),
    devicetest = require("./router/devicetest"),
    viewPage = require("./router/viewpage");

router.get('/', (req, res, err) => { res.redirect('/main');});
router.use('/main', main);
router.use('/tracking', tracking);
router.use('/user', user);
router.use('/accident', accident);
router.use('/led', led);
router.use('/category', category);
router.use('/devicetest', devicetest);

// pages
router.use(['/analysis/user', '/analysis/devicetest', '/analysis/accident'], viewPage);

// router.get('*', (req, res, next) => {
//     console.log('index all route!');
//     next();
// })

module.exports = router;
