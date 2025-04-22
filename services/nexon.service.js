const nexonRepository = require('../repositories/nexon.repository');
const { default: axios } = require('axios');
const { MATCH_TYPE, DIVISION, POSITION } = require('../config/variables');
const dayjs = require('dayjs');
const { sleep } = require('../utills/common');
const startUrl = process.env.NEXON_API_START_URL;

class nexonService {
    constructor() {
        this.nexonRepository = new nexonRepository();
    }

    searchNickName = async (nickName) => {
        try {
            let ouid = '';
            // 유저 ouid 조회
            if (nickName !== '') {
                ouid = await this.nexonRepository.getOuid(nickName);
            }

            // 등록된 유저가 없다면 API 호출후 ouid 저장
            if (ouid == null) {
                const ouidResult = await axios.get(
                    `${startUrl}/fconline/v1/id?nickname=${nickName}`,
                    {
                        headers: {
                            'x-nxopen-api-key': process.env.NEXON_API_KEY,
                        },
                        validateStatus: () => true, // ✔ 모든 응답을 catch로 보내지 않고 처리
                    },
                );

                if (ouidResult.status !== 200) {
                    throw new Error('닉네임 조회중 오류가 발생했습니다.');
                }

                // 유저 ouid 저장
                await this.nexonRepository.saveOuid(nickName, ouidResult.data);
                ouid = ouidResult.data.ouid;
            } else {
                ouid = ouid.ouid;
            }

            // 유저 기본정보 조회
            const basicResult = await axios.get(`${startUrl}/fconline/v1/user/basic?ouid=${ouid}`, {
                headers: {
                    'x-nxopen-api-key': process.env.NEXON_API_KEY,
                },
            });

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

    searchMatch = async (nickname) => {
        try {
            const matchDetailResult = [];

            // 유저 ouid 조회
            const ouid = await this.nexonRepository.getOuid(nickname);

            // 유저 매치 기록 조회 (일단 공식 경기만)
            const matchIdResult = await axios.get(
                `${startUrl}/fconline/v1/user/match?ouid=${ouid.ouid}&matchtype=50&offset=0&limit=20`,
                {
                    headers: {
                        'x-nxopen-api-key': process.env.NEXON_API_KEY,
                    },
                },
            );

            for (const id of matchIdResult.data) {
                const detailData = await axios.get(
                    `${startUrl}/fconline/v1/match-detail?matchid=${id}`,
                    {
                        headers: {
                            'x-nxopen-api-key': process.env.NEXON_API_KEY,
                        },
                    },
                );
                matchDetailResult.push([detailData.data.matchDate, detailData.data.matchInfo]);

                // await sleep(80); // 100ms 쉬고 다음 요청
            }

            matchDetailResult.map(async (data) => {
                data[1][0].player.sort((a, b) => a.spPosition - b.spPosition);
                data[1][1].player.sort((a, b) => a.spPosition - b.spPosition);

                await Promise.all(
                    data[1][0].player.map(async (player) => {
                        if (player.spPosition !== 28) {
                            player.spPosition = POSITION[player.spPosition];
                            const playerDetailInfo = await this.nexonRepository.getPlayerInfoByspId(
                                String(player.spId),
                            );
                            player.playerName = playerDetailInfo.playerName;
                            player.playerImg = playerDetailInfo.playerImg;
                            player.seasonName = playerDetailInfo.seasonName;
                            player.seasonImg = playerDetailInfo.img;
                        }
                    }),
                );

                await Promise.all(
                    data[1][1].player.map(async (player) => {
                        if (player.spPosition !== 28) {
                            player.spPosition = POSITION[player.spPosition];
                            const playerDetailInfo = await this.nexonRepository.getPlayerInfoByspId(
                                String(player.spId),
                            );
                            player.playerName = playerDetailInfo.playerName;
                            player.playerImg = playerDetailInfo.playerImg;
                            player.seasonName = playerDetailInfo.seasonName;
                            player.seasonImg = playerDetailInfo.img;
                        }
                    }),
                );
            });
            console.log(matchDetailResult);
            return matchDetailResult;
        } catch (error) {
            console.error('Error fetching match details:', error);
            throw error;
        }
    };
}

module.exports = nexonService;
