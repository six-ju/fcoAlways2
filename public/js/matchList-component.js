function matchListComponent(data, nickName){
    let list = '';

    data.map((info) => {
        const userInfo = info[1][0].nickname == nickName ? info[1][0] : info[1][1];
        const otherInfo = info[1][1].nickname == nickName ? info[1][0] : info[1][1];
        const userMatchResult = userInfo.matchDetail.matchResult;
        const otherMatchResult = otherInfo.matchDetail.matchResult;
        const userMatchScore = userInfo.shoot.goalTotal;
        const otherMatchScore = otherInfo.shoot.goalTotal;

        let squadMapHTML = '';
        let squadPlayerHTML = '';
        let squadOtherMapHTML = '';
        let squadOtherPlayerHTML = '';

        for (let i = 0; i <= 10; i++) {
            const p = userInfo.player[i];
            const pOther = otherInfo.player[i];
            const imgId = parseInt(p?.spId.toString().slice(3));
            const seasonClass = `s${p?.seasonImg.split('season/')[1].split('.')[0]}`;
            const gradeClass = `en_level${p?.spGrade}`;
            const imgIdOther = parseInt(pOther?.spId.toString().slice(3));
            const seasonClassOther = `s${
                pOther?.seasonImg.split('season/')[1].split('.')[0]
            }`;
            const gradeClassOther = `en_level${pOther?.spGrade}`;
            
            // 사용자
            squadMapHTML += `
                <div class="playerSeasonAndGrade fieldPlayer" data-position="${p?.spPosition}">
                    <img src="https://fco.dn.nexoncdn.co.kr/live/externalAssets/common/playersAction/p${p?.spId}.png"
                    loading="lazy" 
                    onerror="this.onerror=null; this.src='https://fco.dn.nexoncdn.co.kr/live/externalAssets/common/players/p${imgId}.png';" />
                    <div class="seasonAndGradeWrap">
                        <div class="eachPlayerName ${seasonClass}"></div>
                        <div class="eachPlayerGrade ${gradeClass}">${p?.spGrade}</div>
                    </div>
                </div>
            `;

            // 사용자
            squadPlayerHTML += `
                <div class="eachPlayerWrap">
                    <div class="eachPlayerPosition">${p?.spPosition}</div>
                    <div class="eachPlayerSeason">${p?.playerName}</div>
                    <div class="eachPlayerAvg">${p?.status.spRating}</div>
                </div>
            `;

            // 상대방
            squadOtherMapHTML += `
                <div class="playerSeasonAndGrade fieldPlayer"  data-position="${pOther?.spPosition}">
                    <img src="https://fco.dn.nexoncdn.co.kr/live/externalAssets/common/playersAction/p${pOther?.spId}.png"
                    loading="lazy" 
                    onerror="this.onerror=null; this.src='https://fco.dn.nexoncdn.co.kr/live/externalAssets/common/players/p${imgIdOther}.png';" />
                    <div class="seasonAndGradeWrap">
                        <div class="eachPlayerName ${seasonClassOther}"></div>
                        <div class="eachPlayerGrade ${gradeClassOther}">${pOther?.spGrade}</div>
                    </div>
                </div>
            `;

            // 상대방
            squadOtherPlayerHTML += `
                <div class="eachPlayerWrap">
                    <div class="eachPlayerPosition">${pOther?.spPosition}</div>
                    <div class="eachPlayerSeason">${pOther?.playerName}</div>
                    <div class="eachPlayerAvg">${pOther?.status.spRating}</div>
                </div>
            `;
        }

        list += `
            <div class="matchEachInfo ">
                <div class="matchEachSimple ${userMatchResult == '승' ? '' : 'lose'}">
                    <div class="nickNameDiv">${userInfo.nickname}</div>
                    <div class="resultDiv">${userMatchResult}</div>
                    <div class="scoreDiv">${userMatchScore}</div>
                    <div>:</div>
                    <div class="scoreDiv">${otherMatchScore}</div>
                    <div class="resultDiv">${otherMatchResult}</div>
                    <div class="nickNameDiv">${otherInfo.nickname}</div>
                </div>
                <div class="matchEachDetail hide">
                    <div>
                        <div class="matchEachDetailInfo">
                            <div class="matchEachDetailBtnWrap">
                                <div class="matchDetail">상세정보</div>
                                <div class="matchSquad">스쿼드</div>
                                <div class="matchPlayerAvg">선수평가</div>
                            </div>
                            <div class="matchEachDetailInfoWrap">
                                <div class="matchEachDetailOwnerPlace">
                                    <div>${userInfo.matchDetail.possession}</div>
                                    <div>${
                                        Math.round(
                                            userInfo.matchDetail.averageRating * 100,
                                        ) / 100
                                    }</div>
                                    <div>${userInfo.shoot.goalTotalDisplay}</div>
                                    <div>${userInfo.shoot.shootTotal}</div>
                                    <div>${userInfo.shoot.effectiveShootTotal}</div>
                                    <div>${userInfo.shoot.ownGoal}</div>
                                    <div>${userInfo.shoot.shootFreekick}</div>
                                    <div>${userInfo.shoot.shootPenaltyKick}</div>
                                    <div>${userInfo.pass.passTry}</div>
                                    <div>${userInfo.pass.longPassTry}</div>
                                    <div>${userInfo.pass.throughPassTry}</div>
                                    <div>${userInfo.matchDetail.cornerKick}</div>
                                    <div>${userInfo.matchDetail.offsideCount}</div>
                                    <div>${userInfo.matchDetail.foul}</div>
                                    <div>${userInfo.matchDetail.injury}</div>
                                    <div>${userInfo.matchDetail.yellowCards}</div>
                                    <div>${userInfo.matchDetail.redCards}</div>
                                </div>
                                <div class="matchEachDetailMiddlePlace">
                                    <div>점유율</div>
                                    <div>경기평점</div>
                                    <div>골</div>
                                    <div>슈팅수</div>
                                    <div>유효슛</div>
                                    <div>자책골</div>
                                    <div>프리킥</div>
                                    <div>패널티킥</div>
                                    <div>패스</div>
                                    <div>롱패스</div>
                                    <div>스루패스</div>
                                    <div>코너킥</div>
                                    <div>오프사이드</div>
                                    <div>파울</div>
                                    <div>부상</div>
                                    <div>옐로카드</div>
                                    <div>레드카드</div>
                                </div>
                                <div class="matchEachDetailOtherPlace">
                                    <div>${otherInfo.matchDetail.possession}</div>
                                    <div>${
                                        Math.round(
                                            otherInfo.matchDetail.averageRating * 100,
                                        ) / 100
                                    }</div>
                                    <div>${otherInfo.shoot.goalTotalDisplay}</div>
                                    <div>${otherInfo.shoot.shootTotal}</div>
                                    <div>${otherInfo.shoot.effectiveShootTotal}</div>
                                    <div>${otherInfo.shoot.ownGoal}</div>
                                    <div>${otherInfo.shoot.shootFreekick}</div>
                                    <div>${otherInfo.shoot.shootPenaltyKick}</div>
                                    <div>${otherInfo.pass.passTry}</div>
                                    <div>${otherInfo.pass.longPassTry}</div>
                                    <div>${otherInfo.pass.throughPassTry}</div>
                                    <div>${otherInfo.matchDetail.cornerKick}</div>
                                    <div>${otherInfo.matchDetail.offsideCount}</div>
                                    <div>${otherInfo.matchDetail.foul}</div>
                                    <div>${otherInfo.matchDetail.injury}</div>
                                    <div>${otherInfo.matchDetail.yellowCards}</div>
                                    <div>${otherInfo.matchDetail.redCards}</div>
                                </div>
                            </div>
                            <div class="matchEachDetailSquadWrap">
                                <div class="squadMap">
                                    <div class="ownerSquadPlayerList">
                                        ${squadMapHTML}
                                    </div>
                                    <div class="otherSquadPlayerList hide">
                                        ${squadOtherMapHTML}
                                    </div>
                                </div>
                                <div class="squadPlayerWrap">
                                    <div class="squadUserChoice">
                                        <div class="mySquad action">${
                                            userInfo.nickname
                                        }</div>
                                        <div class="otherSquad">${
                                            otherInfo.nickname
                                        }</div>
                                    </div>
                                    <div class="squadPlayer">
                                        <div class="ownerPlayerList">
                                            ${squadPlayerHTML}
                                        </div>
                                        <div class="otherPlayerList hide">
                                            ${squadOtherPlayerHTML}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    return list
}