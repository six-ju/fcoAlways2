const { Op } = require('sequelize');
const { User } = require('../models');

class nexonRepository {

    // API 호출된 ouid 저장
    saveOuid = async (nickname, ouid) => {
        try {
            const users = await User.create(
                {
                    nickname,
                    ouid: ouid.ouid,
                },
                {
                    raw: true,
                },
            );

            return users;
        } catch (error) {
            console.error('Error finding or creating user:', error);
        }
    };

    // 닉네임으로 ouid 조회
    getOuid = async (nickname) => {
        try {
            const attributes = ['ouid']
            const where = {
                nickname: {[Op.eq]: nickname}
            }

            const users = await User.findOne(
                {
                    attributes,
                    where,
                    raw: true,
                }
            );

            return users;
        } catch (error) {
            console.error('Error finding or creating user:', error);
        }
    };
}

module.exports = nexonRepository;
