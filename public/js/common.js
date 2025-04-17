function showModal(message) {
    $('#alertMessage').text(message);
    $('#alertModal').fadeIn();
}

function closeModal() {
    $('#alertModal').fadeOut();
}
