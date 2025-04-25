const nexonRepository = require('../repositories/nexon.repository');
const { default: axios } = require('axios');
const startUrl = process.env.NEXON_API_START_URL;

class playerService {
    constructor() {
        this.nexonRepository = new nexonRepository();
    }

    getPlayerAPI = async () => {
        try {
            const playerResult = await axios.get(`${startUrl}/static/fconline/meta/spid.json`);
            const playerList = [];
            playerResult.data.map((data) => {

                const player_id = (data.id).toString().substring(3)
                const seasonid = (data.id).toString().substring(0,3)
                
                playerList.push({
                    player_id,
                    season_id:seasonid,
                    playerName: data.name,
                    playerImg: `https://fco.dn.nexoncdn.co.kr/live/externalAssets/common/playersAction/p${data.id}.png`
                });
            });

            await this.nexonRepository.insertPlayer(playerList)
        } catch (error) {
            console.error(error);
        }
    };
}

module.exports = playerService;
