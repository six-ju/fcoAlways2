const express = require('express');
const router = express.Router();

// 메인
router.get('/', (req, res, next) => {
    try {
        res.render('index.ejs', { components: 'main' });
    } catch (error) {
        next(error);
    }
});

// 검색페이지
router.get('/record/:nickname', (req, res, next) => {
    try {
        res.render('index.ejs', { components: 'searchNickname' });
    } catch (error) {
        next(error);
    }
});

// 강화시뮬레이션
router.get('/simulation/upgrade', (req, res, next) => {
    try {
        res.render('index.ejs', { components: 'upgrade' });
    } catch (error) {
        next(error);
    }
});

// 공지사항
router.get('/notice', (req, res, next) => {
    try {
        res.render('index.ejs', { components: 'notice' });
    } catch (error) {
        next(error);
    }
});

// 공지사항 디테일
router.get('/notice/detail/:id', (req, res, next) => {
    try {
        res.render('index.ejs', { components: 'noticeDetail' });
    } catch (error) {
        next(error);
    }
});

// 공지사항 작성
router.get('/notice/write/:password', (req, res, next) => {
    try {
        const { password } = req.params;

        if(password != process.env.NOTICE_INSERT_PAGE_PW){
            throw new Error
        }

        res.render('index.ejs', { components: 'noticeWrite' });
    } catch (error) {
        res.render('index.ejs', { components: 'notice' });
    }
});

// 선수 포지션 별 데이터
router.get('/search/player/position', (req, res, next) => {
    try {
        res.render('index.ejs', { components: 'playerPosition' });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
