const express = require('express');
const router = express.Router();

const NexonController = require('../controllers/nexon.controller');
const nexonController = new NexonController();

router.get('/search/:nickName', nexonController.searchNickName);


module.exports = router;
