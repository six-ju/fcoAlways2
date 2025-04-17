$(document).ready(function () {
    $('#nickname').keydown(function (e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            const nickName = $(this).val().trim();

            if(nickName != ''){
                Promise.all([])
                searchNickName(nickName);
            }
        }
    });
});

function searchNickName(nickName) {
    $.ajax({
        url: `/api/nexon/search/${nickName}`,
        type: 'GET',
        success: function (data) {
            console.log(data);
            if(data){
                $('#name').text(data.nickName);
                $('#level').text(data.level);
                $('#officialMax').text(data.matchResult[0].maxDivision);
                $('#officialDate').text(data.matchResult[0].maxRank);
                $('#managerMax').text(data.matchResult[1].maxDivision);
                $('#managerDate').text(data.matchResult[1].maxRank);
            }
        },
        error: function (err) {
            console.log(err.responseJSON.message);
        },
    });
}

function searchMatch(nickName){
    $.ajax({
        url: `/api/nexon/search/${nickName}`,
        type: 'GET',
        success: function (data) {
            console.log(data);
            if(data){
                $('#name').text(data.nickName);
                $('#level').text(data.level);
                $('#officialMax').text(data.matchResult[0].maxDivision);
                $('#officialDate').text(data.matchResult[0].maxRank);
                $('#managerMax').text(data.matchResult[1].maxDivision);
                $('#managerDate').text(data.matchResult[1].maxRank);
            }
        },
        error: function (err) {
            console.log(err);
        },
    });
}