const { ipcMain, } = require('electron');

module.exports = {
    setWindow, showStatus, showValue
}
const { ndac_mode1_display_TD } = require('./js/manage/ndac_jump_interface.js')
const { mode1_parameter, initialize_KB_value,
    query_mode1_tran, enter_mode1_debug, query_board_version, restore_mode1_baudRate, exit_mode1_debug, get_channels_values,batch_KB_write } = require('./mode/mode1/mode1_client.js');
var mainWindow = null;
function setWindow(theWindow) {
    mainWindow = theWindow;
}

var Operation_tips;//操作提示

//关闭窗口方法
function closeWindow() {
    mainWindow.close();
}
//窗口最小化
function minWindow() {
    mainWindow.minimize();
}
//重置窗口
function reloadWindow() {
    mainWindow.reload();
}

//返回上一页
function backWindow() {
    mainWindow.webContents.goBack();
}


ipcMain.on('Buttoned', async (event, id) => {
    switch (id) {
        case 1://关闭界面
            Operation_tips = "#1关闭窗口";
            closeWindow();
            break;
        case 2://最小化界面
            Operation_tips = "#2最小化窗口";
            minWindow()
            break;
        case 3:
            Operation_tips = "#3系统设置";
            // reloadWindow();
            break;
        case 4://重置窗口
            Operation_tips = "#4重置窗口";
            reloadWindow();
            break;
        case 5://返回上一页
            Operation_tips = "#5返回上一页";
            backWindow();
            break;
        case 100://mode1查询透传命令
            Operation_tips = "#100mode1设备参数";
            mode1_parameter();
            break;
        case 101://查询透传模式和波特率
            Operation_tips = "#101查询透传模式及波特率";
            query_mode1_tran();
            break;
        case 102://获取查询的透传模式和波特率参数
            Operation_tips = "#102恢复透传模式及波特率";
            restore_mode1_baudRate();
            break;

    }
    console.log(`ipc = Buttoned ${id},${Operation_tips}`);
});

ipcMain.on('toMain2', async (event, id, d1) => {
    switch (id) {
        case 1:
            Operation_tips = `#1进入${d1}界面`;
            mainWindow.loadFile("./html/" + d1);
            break;
        case 100:
            Operation_tips = `#100显示校准系统配置值`;
            ndac_mode1_display_TD(id, d1);
            break;
        case 101://查看板卡版本号
            Operation_tips = "#101查看板卡版本号";
            query_board_version(id, d1);
            break;
        case 102://进入调试模式
            Operation_tips = "#102进入调试状态";
            enter_mode1_debug(id, d1);
            break;
        case 103:
            Operation_tips = "#103退出调试状态";
            exit_mode1_debug(id, d1);
            break;
    }
    console.log(`ipc =toMain2 ${id},${Operation_tips}`);

});


ipcMain.on('toMain3', async (event, id, d1, d2) => {
    switch (id) {
        case 1:
            Operation_tips = "#1显示通道数据";
            get_channels_values(id, d1, d2);
            break;
        case 100:
            Operation_tips = "#100初始化K/B值";
            initialize_KB_value(id, d1, d2);
            break;
        case 101:
            Operation_tips = "#101批量下发K/B值";
            batch_KB_write(id, d1, d2);
            break;
    }
    console.log(`ipc =toMain3 ${id},${Operation_tips}`);
});


function showStatus(value) {
    console.log(`showStatus: ${value}`);
    if (mainWindow != null) {
        mainWindow.webContents.send('status_update', value);
    }
}


function showValue(id, value) {
    if (mainWindow != null) {
        mainWindow.webContents.send('multi_data', id, value);
    }
}

// function showValue2(id, value1, value2) {
//     if (mainWindow != null) {
//         mainWindow.webContents.send('multi_data2', id, value1, value2);
//     }
// }



