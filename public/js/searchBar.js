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
                $('#officialDate').text(data.matchResult[0].maxRank);
                $('#managerMax').text(data.matchResult[1].maxDivision);
                $('#managerDate').text(data.matchResult[1].maxRank);

                $('.userInfo').removeClass('hide')
                $('.matchInfo').removeClass('hide')
                $('#nickname').css('border-radius', '25px 25px 0 0')
                
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
        success: function (data) {
            $('.matchList').empty();
            let list = '';

            if (data) {
                data.map((info) => {
                    const matchDate = dayjs(info[0]).format('YYYY-MM-DD');
                    const userInfo = info[1][0].nickname == nickName ? info[1][0] : info[1][1];
                    const otherInfo = info[1][1].nickname == nickName ? info[1][0] : info[1][1];
                    const userMatchResult = userInfo.matchDetail.matchResult;
                    const otherMatchResult = otherInfo.matchDetail.matchResult;
                    const userMatchScore = userInfo.shoot.goalTotal;
                    const otherMatchScore = otherInfo.shoot.goalTotal;

                    list += `
                        <div class="matchEachInfo">
                            <div>${userInfo.nickname}</div>
                            <div>${userMatchResult}</div>
                            <div>${userMatchScore}</div>
                            <div>:</div>
                            <div>${otherMatchScore}</div>
                            <div>${otherMatchResult}</div>
                            <div>${otherInfo.nickname}</div>
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
