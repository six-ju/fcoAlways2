const nexonService = require('../services/nexon.service');

class nexonController {
    constructor() {
        this.nexonService = new nexonService();
    }

    searchNickName = async (req, res) => {
        try {
            const { nickName } = req.params;

            const result = await this.nexonService.searchNickName(nickName);

            return res.status(200).json(result);
        } catch (error) {
            return res.status(error.status || 400).json({ message: error.message });
        }
    };

    searchPlayer = async (req, res) => {
        try {
            const { player } = req.params;

            const result = await this.nexonService.searchPlayer(player);

            return res.status(200).json(result);
        } catch (error) {
            return res.status(error.status || 400).json({ message: error.message });
        }
    };

    // 선수 검색 시즌 이미지 가져오기위함
    searchPlayerSeason = async (req, res) => {
        try {
            const { playerId } = req.params;

            const result = await this.nexonService.searchPlayerSeason(playerId);

            return res.status(200).json(result);
        } catch (error) {
            return res.status(error.status || 400).json({ message: error.message });
        }
    };

    // 특정 선수 평균 데이터 가져오기
    getPlayerDetail = async (req, res) => {
        try {
            const { player, position } = req.query;
            
            const result = await this.nexonService.getPlayerDetail(player, position);

            return res.status(200).json(result);
        } catch (error) {
            return res.status(error.status || 400).json({ message: error.message });
        }
    };

    searchMatch = async (req, res) => {
        try {
            const { nickName } = req.params;
            const { type } = req.query ?? '';
            const result = await this.nexonService.searchMatch(nickName, type);

            return res.status(200).json(result);
        } catch (error) {
            return res
                .status(error.status || 400)
                .json({ message: '전적 검색 도중 오류가 발생했습니다.' });
        }
    };
}

module.exports = nexonController;
