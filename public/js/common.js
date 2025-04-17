function showModal(message) {
    $('#alertMessage').text(message);
    $('#alertModal').fadeIn();
}

function closeModal() {
    $('#alertModal').fadeOut();
}

function showLoading() {
    $('#loadingWrap').fadeIn();
}

function hideLoading() {
    $('#loadingWrap').fadeOut();
}
