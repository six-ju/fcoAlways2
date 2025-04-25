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
