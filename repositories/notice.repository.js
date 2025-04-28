const { Op, where } = require('sequelize');
const { Notice } = require('../models');

class noticeRepository {
    getNoticeList = async () => {
        try {
            const result = await Notice.findAll({
                raw: true,
            });

            return result;
        } catch (error) {
            console.error('Error finding or creating user:', error);
        }
    };

    getNoticeDetailById = async (id) => {
        try {
            const result = await Notice.findOne({ where: { id }, raw: true });

            return result;
        } catch (error) {
            console.error('Error finding or creating user:', error);
        }
    };

    InsertNotice = async (type, title, content) => {
        try {
            const result = await Notice.create(
                {
                    type,
                    title,
                    content,
                },
                {
                    raw: true,
                },
            );

            return result;
        } catch (error) {
            console.error('Error finding or creating user:', error);
        }
    };
}

module.exports = noticeRepository;
