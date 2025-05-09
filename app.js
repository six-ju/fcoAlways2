// app.js
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const generateSitemap = require('./public/js/sitemap/sitemapGenerator');
dotenv.config(); // .env 환경변수 로딩

const app = express();
const PORT = process.env.PORT || 3000;

generateSitemap(); 
// require('./utills/scheduler');

// EJS 템플릿 설정
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 정적 파일 경로 설정 (css, js 등)
app.use(express.static(path.join(__dirname, 'public')));

// form 데이터 받을 수 있도록
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// sitemap.xml 제공
app.get('/sitemap.xml', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'sitemap.xml'));
});

// robots.txt 제공
app.get('/robots.txt', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'robots.txt'));
});

// 라우터 연결
// const matchRouter = require('./routes/match');
// app.use('/match', matchRouter);
const router = require('./routes/index');
const ejsRouter = require('./routes/ejs.routes');
app.use('/api', router);
app.use(ejsRouter);

// 서버 실행
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
