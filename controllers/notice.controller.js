const noticeService = require('../services/notice.service');

class noticeController {
    constructor() {
        this.noticeService = new noticeService();
    }

    getNoticeList = async (req, res) => {
        try {
            const result = await this.noticeService.getNoticeList();

            return res.status(200).json(result);
        } catch (error) {
            return res.status(error.status || 400).json({ message: error.message });
        }
    };

    getNoticeDetailById = async (req, res) => {
        try {
            const { id } = req.params;

            const result = await this.noticeService.getNoticeDetailById(id);

            return res.status(200).json(result);
        } catch (error) {
            return res.status(error.status || 400).json({ message: error.message });
        }
    };

    InsertNotice = async (req, res) => {
        try {
            const {type, title, content} = req.body

            const result = await this.noticeService.InsertNotice(type, title, content);

            return res.status(200).json(result);
        } catch (error) {
            return res.status(error.status || 400).json({ message: error.message });
        }
    };

}

module.exports = noticeController;
