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

    // 선수 검색
    searchPlayer = async (player) => {
        try {
            const playerList = await this.nexonRepository.searchPlayer(player);

            return playerList;
        } catch (error) {
            throw error;
        }
    };

    // 선수 검색 시즌 이미지 가져오기위함
    searchPlayerSeason = async (playerId) => {
        try {
            const playerList = await this.nexonRepository.searchPlayerSeason(playerId);

            return playerList;
        } catch (error) {
            throw error;
        }
    };

    // 특정 선수 평균 데이터 가져오기
    getPlayerDetail = async (player, position) => {
        try {
            const arrInfo = [
                {
                    id: player,
                    po: position,
                },
            ];
            const json = JSON.stringify(arrInfo);
            const encodedJSON = encodeURIComponent(json);

            const result = await axios.get(
                `${startUrl}/fconline/v1/ranker-stats?matchtype=50&players=${encodedJSON}`,
                {
                    headers: {
                        'x-nxopen-api-key': process.env.NEXON_API_KEY,
                    },
                },
            );

            if (result.data.length == 0) {
                throw new Error('해당 포지션의 대한 데이터가 없습니다.');
            }

            result.data[0]['spPosition'] = POSITION[result.data[0]['spPosition']];

            return result.data;
        } catch (error) {
            throw error;
        }
    };

    searchMatch = async (nickname, type) => {
        try {
            let matchDetailResult = [];
            const gameType = type == 'manager' ? '52' : '50';

            // 유저 ouid 조회
            const ouid = await this.nexonRepository.getOuid(nickname);

            // 유저 매치 기록 조회 (일단 공식 경기만)
            const matchIdResult = await axios.get(
                `${startUrl}/fconline/v1/user/match?ouid=${ouid.ouid}&matchtype=${gameType}&offset=0&limit=20`,
                {
                    headers: {
                        'x-nxopen-api-key': process.env.NEXON_API_KEY,
                    },
                },
            );

            const results = await Promise.all(
                matchIdResult.data.map(async (id) => {
                    const detailData = await axios.get(
                    `${startUrl}/fconline/v1/match-detail?matchid=${id}`,
                    {
                        headers: { 'x-nxopen-api-key': process.env.NEXON_API_KEY },
                    }
                    );
                    return [detailData.data.matchDate, detailData.data.matchInfo];
                })
            );

            matchDetailResult = results;

            for (const data of matchDetailResult) {
                data[1][0].player.sort((a, b) => a.spPosition - b.spPosition);
                data[1][1].player.sort((a, b) => a.spPosition - b.spPosition);

                await processPlayerGroup(data[1][0].player, this);
                await processPlayerGroup(data[1][1].player, this);
            }

            return matchDetailResult;
        } catch (error) {
            console.error('Error fetching match details:', error);
            throw error;
        }
    };
}

const playerInfoCache = new Map();

async function getCachedPlayerInfo(spId) {
    if (playerInfoCache.has(spId)) return playerInfoCache.get(spId);
    const info = await this.nexonRepository.getPlayerInfoByspId(String(spId));
    playerInfoCache.set(spId, info);
    return info;
}

async function processPlayerGroup(players, ctx) {
    return await Promise.all(
        players.map(async (player) => {
            if (player.spPosition !== 28) {
                player.spPosition = POSITION[player.spPosition];
                const info = await getCachedPlayerInfo.call(ctx, player.spId);
                player.playerName = info.playerName;
                player.playerImg = info.playerImg;
                player.seasonName = info.seasonName;
                player.seasonImg = info.img;
            }
        }),
    );
}

module.exports = nexonService;
