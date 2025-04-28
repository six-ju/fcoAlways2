const express = require('express');
const router = express.Router();

const NoticeController = require('../controllers/notice.controller');
const noticeController = new NoticeController();

// 공지사항 리스트
router.get('/list', noticeController.getNoticeList);

// // 공지사항 디테일
router.get('/detail/:id', noticeController.getNoticeDetailById);

// 공지사항 작성
router.post('/write', noticeController.InsertNotice);

module.exports = router;
