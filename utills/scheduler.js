const cron = require('node-cron');
const seasonService = require('../services/season.service');
const playerSevice = require('../services/player.service');
const playerImgService = require('../services/playerImg.service');
const PlayerImgService = new playerImgService();
const PlayerService = new playerSevice();
const SeasonService = new seasonService();

cron.schedule('10 44 13 * * *', async () => {
    console.log('시즌을 위한 스케줄러 시작');

    // 선수 이미지 저장
    // await PlayerImgService.getPlayerImgAPI();
    // 선수저장
    // await PlayerService.getPlayerAPI();
    // 시즌저장
    // await SeasonService.getSeasonAPI();
});

console.log('스케줄러가 시작되었습니다.');
