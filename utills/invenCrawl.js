const axios = require('axios');
const cheerio = require('cheerio');
const NexonRepository = require('../repositories/nexon.repository');
const nexonRepository = new NexonRepository();
const { sleep } = require('../utills/common');

async function crawlSequential() {
    const playerList = await nexonRepository.getPlayers();
    const result = [];

    for (const data of playerList) {
        const code = data.season_id + data.player_id;
        const url = `https://fifaonline4.inven.co.kr/dataninfo/player/?code=${code}`;
        
        try {
            const { data: html } = await axios.get(url);
            const $ = cheerio.load(html);
            const stats = {
                player_id: parseInt(code),
                overall: parseInt($('.fifa4 .pos .score').text()),
                cost: parseInt($('.fifa4 .salary .bg').text()),
            };

            $('li.fifa4.clearfix').each((_, el) => {
                const key = $(el).attr('data-rel');
                const ori = $(el).find('p.value').attr('data-ori');
                stats[key] = parseInt(ori);
            });

            result.push(stats);
        } catch (err) {
            console.error(`[ERROR] ${code} 요청 실패`, err.message);
        }

        await sleep(1000); // 1초 쉬기
    }

    console.log(result);
}

async function name(code) {
    const url = `https://fifaonline4.inven.co.kr/dataninfo/player/?code=${code}`;
    const { data: html } = await axios.get(url);
    const $ = cheerio.load(html);

    const stats = {
        player_id: parseInt(code),
        overall: parseInt($('.fifa4 .pos .score').text()),
        cost: parseInt($('.fifa4 .salary .bg').text()),
    };

    $('li.fifa4.clearfix').each((_, el) => {
        const key = $(el).attr('data-rel');
        const ori = $(el).find('p.value').attr('data-ori');
        stats[key] = parseInt(ori);
    });
}

name('100000051')

// crawlPlayerStats();