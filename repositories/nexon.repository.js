const { Op } = require('sequelize');
const { User, Player, Season } = require('../models');

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
            const attributes = ['ouid'];
            const where = {
                nickname: { [Op.eq]: nickname },
            };

            const users = await User.findOne({
                attributes,
                where,
                raw: true,
            });

            return users;
        } catch (error) {
            console.error('Error finding or creating user:', error);
        }
    };

    // 시즌 저장
    insertSeason = async (seasonList) => {
        try {
            const result = await Season.bulkCreate(seasonList, {
                ignoreDuplicates: true,
                raw: true,
            });

            return result;
        } catch (error) {
            console.error('Error finding or creating user:', error);
        }
    };

    // 선수 저장
    insertPlayer = async (playerList) => {
        try {
            const chunkSize = 500;
            for (let i = 0; i < playerList.length; i += chunkSize) {
                const chunk = playerList.slice(i, i + chunkSize);

                await Player.bulkCreate(chunk, {
                    raw: true,
                });
            }
            return;
        } catch (error) {
            console.error('Error finding or creating user:', error);
        }
    };

    // 선수 가져오기
    getPlayers = async () => {
        try {
            const users = await Player.findAll({
                raw: true,
            });

            return users;
        } catch (error) {
            console.error('Error finding or creating user:', error);
        }
    };

    // 선수 가져오기
    updatePlayer = async (getPlayers, transaction) => {
        try {
            const chunkSize = 500;
            for (let i = 0; i < getPlayers.length; i += chunkSize) {
                const chunk = getPlayers.slice(i, i + chunkSize);

                await Promise.allSettled(
                    chunk.map((p) =>
                        Player.update(
                            { playerImg: p.playerImg },
                            { where: { id: p.id }, transaction },
                        ),
                    ),
                );
                console.log(`✅ ${i + chunk.length}/${getPlayers.length} 건 삽입됨`);
            }
        } catch (error) {
            console.error('Error finding or creating user:', error);
        }
    };
}

module.exports = nexonRepository;
