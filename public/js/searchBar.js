$(document).ready(async function () {
    let saveSearchNickName = decodeURIComponent(window.location.pathname.split('/')[2] || '');

    searchMatch(saveSearchNickName)

    // 공식경기 전적 조회
    $('.officialSearchBtn').click(function () {
        searchMatch(saveSearchNickName)
    });

    // 감독경기 전적 조회
    $('.managerSearchBtn').click(function () {
        showModal('아직 준비중임.');
        return;

        // searchMatch(saveSearchNickName);
    });

    // 상세정보보 클릭시
    $(document).on('click', '.matchDetail', function () {
        $(this).siblings().removeClass('action');
        $(this).addClass('action');

        const $InfoWrap = $(this)
            .closest('.matchEachDetailBtnWrap')
            .siblings('.matchEachDetailInfoWrap');
        const $SquadWrap = $(this)
            .closest('.matchEachDetailBtnWrap')
            .siblings('.matchEachDetailSquadWrap');
        // 컨텐츠 영역 숨김과 보임처리
        $InfoWrap.css('display', 'flex');
        $SquadWrap.css('display', 'none');
    });

    // 스쿼드 클릭시
    $(document).on('click', '.matchSquad', function () {
        $(this).siblings().removeClass('action');
        $(this).addClass('action');

        const $InfoWrap = $(this)
            .closest('.matchEachDetailBtnWrap')
            .siblings('.matchEachDetailInfoWrap');
        const $SquadWrap = $(this)
            .closest('.matchEachDetailBtnWrap')
            .siblings('.matchEachDetailSquadWrap');

        // 컨텐츠 영역 숨김과 보임처리
        $InfoWrap.css('display', 'none');
        $SquadWrap.css('display', 'flex');
    });

    // 스쿼드내 유저 클릭시(나)
    $(document).on('click', '.mySquad', function () {
        const $this = $(this)
        $this.siblings().removeClass('action');
        $this.addClass('action');

        // 컨텐츠 영역 숨김과 보임처리
        // 스쿼드
        $this.closest('.squadUserChoice').closest('.squadPlayerWrap').prev('.squadMap').find('.otherSquadPlayerList').addClass('hide')
        $this.closest('.squadUserChoice').closest('.squadPlayerWrap').prev('.squadMap').find('.ownerSquadPlayerList').removeClass('hide')
        // 선수단
        $this.closest('.squadPlayerWrap').find('.squadPlayer').find('.otherPlayerList').addClass('hide')
        $this.closest('.squadPlayerWrap').find('.squadPlayer').find('.ownerPlayerList').removeClass('hide')
    });

    // 스쿼드내 유저 클릭시(상대)
    $(document).on('click', '.otherSquad', function () {
        const $this = $(this)
        $this.siblings().removeClass('action');
        $this.addClass('action');

        // 컨텐츠 영역 숨김과 보임처리
        // 스쿼드
        $this.closest('.squadUserChoice').closest('.squadPlayerWrap').prev('.squadMap').find('.otherSquadPlayerList').removeClass('hide')
        $this.closest('.squadUserChoice').closest('.squadPlayerWrap').prev('.squadMap').find('.ownerSquadPlayerList').addClass('hide')
        // 선수단
        $this.closest('.squadPlayerWrap').find('.squadPlayer').find('.otherPlayerList').removeClass('hide')
        $this.closest('.squadPlayerWrap').find('.squadPlayer').find('.ownerPlayerList').addClass('hide')
    });

    // 선수평가가 클릭시
    $(document).on('click', '.matchPlayerAvg', function () {
        $(this).siblings().removeClass('action');
        $(this).addClass('action');
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
            $detail.find('.matchEachDetailInfoWrap').css('display', 'flex');
        } else {
            $(this).css({ 'margin-bottom': '0px', 'border-radius': '25px 25px 0 0' });
            $detail.css('margin-bottom', '15px');

            // 버튼 색채우기
            $detail.find('.matchEachDetailBtnWrap').find('.matchDetail').addClass('action');

            $detail.find('.matchEachDetailSquadWrap').css('display', 'none');
            $detail.addClass('show').stop().slideDown(100);
        }
    });
});

async function searchNickName(nickName) {
    $.ajax({
        url: `/api/nexon/search/${nickName}`,
        type: 'GET',
        beforeSend: function () {
            $('.matchList').empty();
            showLoading();
        },
        complete: function () {
            hideLoading();
        },
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

async function searchMatch(nickName) {
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
        success: async function (data) {
            console.log(data);
            if (data) {
                await searchNickName(nickName)
                const list = matchListComponent(data, nickName)

                $('.matchList').html(list);
            }
        },
        error: function (err) {
            showModal(err.responseJSON.message);
        },
    });
}
