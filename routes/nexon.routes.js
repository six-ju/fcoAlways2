const express = require('express');
const router = express.Router();

const NexonController = require('../controllers/nexon.controller');
const nexonController = new NexonController();

// 닉네임 검색
router.get('/search/:nickName', nexonController.searchNickName);

// 매치검색
router.get('/match/:nickName', nexonController.searchMatch);


module.exports = router;
