const mode1_reply_state = document.getElementById('mode1_reply_state');
mode1_reply_state.addEventListener('click', () => {
    if (mode1_reply_state.checked) {
        alert("1请先设置回传时间");
    } else {
        alert("2请先设置回传时间");
    }
})