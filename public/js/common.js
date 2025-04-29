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

function debounce(delay, func) {
    let timeout;
    return function (...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), delay);
    };
};