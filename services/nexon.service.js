const nexonRepository = require('../repositories/nexon.repository');
const { default: axios } = require('axios');
const { MATCH_TYPE, DIVISION } = require('../config/variables');
const dayjs = require('dayjs');

class nexonService {
    constructor() {
        this.nexonRepository = new nexonRepository();
    }

    searchNickName = async (nickName) => {
        try {
            const startUrl = process.env.NEXON_API_START_URL;
            let ouid = '';
            // 유저 ouid 조회
            if (nickName !== '') {
                ouid = await this.nexonRepository.getOuid(nickName);
                ouid = ouid.ouid;
            }

            // 등록된 유저가 없다면 API 호출후 ouid 저장
            if (ouid == null) {
                const ouidResult = await axios.get(
                    `${startUrl}/fconline/v1/id?nickname=${nickName}`,
                    {
                        headers: {
                            'x-nxopen-api-key': process.env.NEXON_API_KEY,
                        },
                    },
                );

                if (ouidResult.status !== 200) {
                    throw new Error('닉네임 조회중 오류가 발생했습니다.');
                }

                // 유저 ouid 저장
                await this.nexonRepository.saveOuid(nickName, ouidResult.data);
                ouid = ouidResult.data.ouid
            }

            // 유저 기본정보 조회
            const basicResult = await axios.get(
                `${startUrl}/fconline/v1/user/basic?ouid=${ouid}`,
                {
                    headers: {
                        'x-nxopen-api-key': process.env.NEXON_API_KEY,
                    },
                },
            );

            // 유저 최고랭크 조회
            const maxdivisionResult = await axios.get(
                `${startUrl}/fconline/v1/user/maxdivision?ouid=${ouid}`,
                {
                    headers: {
                        'x-nxopen-api-key': process.env.NEXON_API_KEY,
                    },
                },
            );

            const matchResult = [];
            maxdivisionResult.data.map((data) => {
                if (data.matchType === 50 || data.matchType === 52) {
                    matchResult.push({
                        matchType: MATCH_TYPE[data.matchType],
                        maxDivision: DIVISION[data.division],
                        maxRank: dayjs(data.achievementDate).format('YYYY-MM-DD'),
                    });
                }
            });

            const data = {
                ouid: ouid,
                nickName,
                level: basicResult.data.level,
                matchResult,
            };

            return data;
        } catch (error) {
            throw error;
        }
    };
}

module.exports = nexonService;
