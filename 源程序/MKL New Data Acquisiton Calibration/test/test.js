function toggleSelectAll() {
    const selectAll = document.getElementById('selectAll');
    const invertSelection = document.getElementById('invertSelection');
    const channelCheckboxes = document.querySelectorAll('.channel-checkbox');

    if (selectAll.checked) {
        invertSelection.checked = false; // 确保反选不被选中
        channelCheckboxes.forEach(checkbox => {
            checkbox.checked = true;
        });
    } else {
        channelCheckboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
    }
}

function toggleInvertSelection() {
    const selectAll = document.getElementById('selectAll');
    const invertSelection = document.getElementById('invertSelection');
    const channelCheckboxes = document.querySelectorAll('.channel-checkbox');

    if (invertSelection.checked) {
        selectAll.checked = false; // 确保全选不被选中
        channelCheckboxes.forEach(checkbox => {
            checkbox.checked = !checkbox.checked;
        });
    } else {
        channelCheckboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
    }
}