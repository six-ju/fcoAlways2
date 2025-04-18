const { sequelize } = require('../models');
const nexonRepository = require('../repositories/nexon.repository');
const { default: axios, get } = require('axios');
const startUrl = process.env.NEXON_API_START_URL;

class playerImgService {
    constructor() {
        this.nexonRepository = new nexonRepository();
    }

    getPlayerImgAPI = async () => {
        try {
            const transaction = await sequelize.transaction();
            const getPlayers = await this.nexonRepository.getPlayers();

            for (const data of getPlayers) {
                const spid = String(data.season_id) + data.player_id;
                data.playerImg = `https://fco.dn.nexoncdn.co.kr/live/externalAssets/common/playersAction/p${spid}.png`;
            }

            await this.nexonRepository.updatePlayer(getPlayers, transaction);

            await transaction.commit();
        } catch (error) {
            await transaction.rollback();

            console.error(error);
        }
    };
}

module.exports = playerImgService;
