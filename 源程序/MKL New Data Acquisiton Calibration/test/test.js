document.addEventListener('DOMContentLoaded', function () {
    const channelCheckboxes = [
        document.getElementById('channel1Checkbox'),
        document.getElementById('channel2Checkbox'),
        document.getElementById('channel3Checkbox')
    ];

    const channelInputs = [
        document.getElementById('channel1Input'),
        document.getElementById('channel2Input'),
        document.getElementById('channel3Input')
    ];

    const applyButton = document.getElementById('applyButton');

    // 点击按钮时触发
    applyButton.addEventListener('click', function () {
        // 找到第一个选中的通道
        let selectedIndex = -1;
        for (let i = 0; i < channelCheckboxes.length; i++) {
            if (channelCheckboxes[i].checked) {
                selectedIndex = i;
                break;
            }
        }

        // 如果没有选中任何通道，提示用户
        if (selectedIndex === -1) {
            alert('请先选择一个通道作为模板！');
            return;
        }

        // 获取第一个选中通道的数据
        const templateData = channelInputs[selectedIndex].value;

        // 将数据应用到其他选中的通道
        for (let i = 0; i < channelCheckboxes.length; i++) {
            if (i !== selectedIndex && channelCheckboxes[i].checked) {
                channelInputs[i].value = templateData;
            }
        }

        // alert('模板数据已成功应用到其他选中的通道！');
    });
});