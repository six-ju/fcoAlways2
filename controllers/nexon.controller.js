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
}

module.exports = nexonController;
