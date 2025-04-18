const nexonRepository = require('../repositories/nexon.repository');
const { default: axios } = require('axios');
const startUrl = process.env.NEXON_API_START_URL;

class seasonService {
    constructor() {
        this.nexonRepository = new nexonRepository();
    }

    getSeasonAPI = async () => {
        try {
            const seasonResult = await axios.get(`${startUrl}/static/fconline/meta/seasonid.json`);
            const seasonList = [];
            seasonResult.data.map((data) => {
                seasonList.push({
                    id: data.seasonId,
                    seasonName: data.className,
                    img: data.seasonImg,
                });
            });

            await this.nexonRepository.insertSeason(seasonList)
        } catch (error) {
            console.error(error);
        }
    };
}

module.exports = seasonService;
