$(document).ready(function () {
    $('#nickname').keydown(function (e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            const nickName = $(this).val().trim();

            if (nickName != '') {
                window.location.href = `/record/${nickName}`
            }
        }
    });

    $('.searchButton').click(function () {
        const nickName = $('#nickname').val().trim();

        if (nickName != '') {
            window.location.href = `/record/${nickName}`
        }
    });
})