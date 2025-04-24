const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    try {
        res.render('index.ejs', { components: 'main' });
    } catch (error) {
        next(error);
    }
});

router.get('/search/:nickname', (req, res, next) => {
    try {
        res.render('index.ejs', { components: 'searchNickname' });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
