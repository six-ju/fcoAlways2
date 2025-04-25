const cron = require('node-cron');
const seasonService = require('../services/season.service');
const playerSevice = require('../services/player.service');
const playerImgService = require('../services/playerImg.service');
const PlayerImgService = new playerImgService();
const PlayerService = new playerSevice();
const SeasonService = new seasonService();

cron.schedule('15 57 16 * * *', async () => {
    console.log('시즌을 위한 스케줄러 시작');

    require('../utills/invenCrawl')
    // 선수 이미지 저장
    // console.log('선수 이미지 저장 시작');
    // await PlayerImgService.getPlayerImgAPI();
    // console.log('선수 이미지 저장 끝');

    // 선수저장
    // console.log('선수 저장 시작')
    // await PlayerService.getPlayerAPI();
    // console.log('선수 저장 끝')

    // console.log('시즌 저장 시작')
    // // 시즌저장
    // await SeasonService.getSeasonAPI();
    // console.log('시즌 저장 끝')
});

console.log('스케줄러가 시작되었습니다.');
