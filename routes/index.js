const express = require('express');
const router = express.Router();

const nexon = require('./nexon.routes');
const notice = require('./notice.routes');

// 넥슨 API 라우터
router.use('/nexon', nexon);

// 공지사항 API 라우터
router.use('/notice', notice);

module.exports = router;
