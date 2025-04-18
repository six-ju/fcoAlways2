$(document).ready(function () {
    let saveSearchNickName = '';

    $('#nickname').keydown(function (e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            const nickName = $(this).val().trim();

            if (nickName != '') {
                searchNickName(nickName);
                saveSearchNickName = nickName;
            }
        }
    });

    $('.searchButton').click(function () {
        const nickName = $('#nickname').val().trim();

        if (nickName != '') {
            searchNickName(nickName);
            saveSearchNickName = nickName;
        }
    });

    $('.officialSearchBtn').click(function () {
        // showModal('아직 준비중임.');
        // return;
        if (saveSearchNickName == '') {
            alert('닉네임 검색후 이용 가능합니다.');
            return;
        }
        searchMatch(saveSearchNickName);
    });

    $('.managerSearchBtn').click(function () {
        showModal('아직 준비중임.');
        return;

        // searchMatch(saveSearchNickName);
    });

    // 간단 정보를 클릭시 액션
    $(document).on('click', '.matchEachSimple', function () {
        const $detail = $(this).next();

        const isOpen = $detail.hasClass('show');

        if (isOpen) {
            $(this).css({ 'margin-bottom': '15px', 'border-radius': '25px' });
            $detail.css('margin-bottom', '0px');

            // 버튼 색채우기
            $detail.find('.matchEachDetailBtnWrap').find('.matchDetail').removeClass('action');
            $detail.find('.matchEachDetailBtnWrap').find('.matchSquad').removeClass('action');
            $detail.find('.matchEachDetailBtnWrap').find('.matchPlayerAvg').removeClass('action');

            $detail.removeClass('show').stop().slideUp(100);
        } else {
            $(this).css({ 'margin-bottom': '0px', 'border-radius': '25px 25px 0 0' });
            $detail.css('margin-bottom', '15px');

            // 버튼 색채우기
            $detail.find('.matchEachDetailBtnWrap').find('.matchDetail').addClass('action');

            $detail.addClass('show').stop().slideDown(100);
        }
    });
    // $('.matchEachInfo').click(function () {});
});

function searchNickName(nickName) {
    $.ajax({
        url: `/api/nexon/search/${nickName}`,
        type: 'GET',
        success: function (data) {
            if (data) {
                $('#name').text(data.nickName);
                $('#level').text(data.level);
                $('#officialMax').text(data.matchResult[0].maxDivision);
                $('#managerMax').text(data.matchResult[1].maxDivision);

                $('.userInfo').removeClass('hide');
                $('.matchInfo').removeClass('hide');
                $('#nickname').css('border-radius', '25px 25px 0 0');
            }
        },
        error: function (err) {
            showModal(err.responseJSON.message);
        },
    });
}

function searchMatch(nickName) {
    $.ajax({
        url: `/api/nexon/match/${nickName}`,
        type: 'GET',
        beforeSend: function () {
            $('.matchList').empty();
            $('.officialSearchBtn').addClass('action');
            showLoading();
        },
        complete: function () {
            hideLoading();
        },
        success: function (data) {
            $('.matchList').empty();
            let list = '';
            console.log(data);
            if (data) {
                data.map((info) => {
                    const userInfo = info[1][0].nickname == nickName ? info[1][0] : info[1][1];
                    const otherInfo = info[1][1].nickname == nickName ? info[1][0] : info[1][1];
                    const userMatchResult = userInfo.matchDetail.matchResult;
                    const otherMatchResult = otherInfo.matchDetail.matchResult;
                    const userMatchScore = userInfo.shoot.goalTotal;
                    const otherMatchScore = otherInfo.shoot.goalTotal;

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
                                            <div>${Math.round((userInfo.matchDetail.averageRating) * 100) / 100 }</div>
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
                                            <div>${Math.round((otherInfo.matchDetail.averageRating) * 100) / 100 }</div>
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
                                </div>
                                </div>
                            </div>
                        </div>
                    `;
                });

                $('.matchList').html(list);
            }
        },
        error: function (err) {
            showModal(err.responseJSON.message);
        },
    });
}
