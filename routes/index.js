const express = require('express');
const router = express.Router();

const nexon = require('./nexon.routes');

// 넥슨 API 라우터
router.use('/nexon', nexon);

module.exports = router;
