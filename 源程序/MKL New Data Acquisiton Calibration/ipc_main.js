const { ipcMain } = require('electron');

module.exports = {
    setWindow,
}
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
    mainWindow.webContents.navigationHistory.goBack();
}


ipcMain.on('Buttoned', async (event, id) => {
    switch (id) {
        case 1://关闭界面
            Operation_tips = "关闭窗口";
            closeWindow();
            break;
        case 2://最小化界面
            Operation_tips = "最小化窗口";
            minWindow()
            break;
        case 3:
            Operation_tips = "系统设置";
            // reloadWindow();
            break;
        case 4://重置窗口
            Operation_tips = "重置窗口";
            reloadWindow();
            break;
        case 5://返回上一页
            Operation_tips = "返回上一页";
            backWindow();
            break;

    }
    console.log(`ipc =Buttoned ${id},${Operation_tips}`);
});

ipcMain.on('toMain2', async (event, id, d1) => {
    switch (id) {
        case 1:
            Operation_tips = `进入${d1}界面`;
            mainWindow.loadFile("./html/" + d1);
            break;
    }
    console.log(`ipc =toMain2 ${id},${Operation_tips}`);
});



// ipcMain.on('toMain3', async (event, id, d1, d2) => {
//     switch (id) {
//         case 1:
//             operate = "设置透传的ip和端口及传输方式";
//             read_Connect_Settings_File(id, d1, d2);
//             break;
//     }

// });

// ipcMain.on('Buttoned', (_event, btn) => {

// });


// function showStatus(value) {
//     if (mainWindow != null) {
//         mainWindow.webContents.send('status_update', value);
//     }
// }




// function showValue(id, value) {
//     if (mainWindow != null) {
//         mainWindow.webContents.send('multi_data', id, value);
//     }
// }

// function showValue2(id, value1, value2) {
//     if (mainWindow != null) {
//         mainWindow.webContents.send('multi_data2', id, value1, value2);
//     }
// }


// /**
//  * 选择Connect_Settings_Configuration.json文件
//  */
// ipcMain.on('dsp-json', (_event) => {
//     dialog.showOpenDialog(mainWindow, {
//         title: 'Open JSON File',
//         properties: ['openFile'],
//         filters: [
//             { name: 'JSON', extensions: ['json'] }
//         ]
//     }).then(result => {
//         if (result.canceled == false) {
//             const dsp_file = result.filePaths[0];
//             if (dsp_file != null && path.basename(dsp_file) === 'DSP_Burn_Port_Channel_Profile.json') {
//                 //读文件显示
//                 mainWindow.webContents.send('dsp-file', dsp_file);
//                 showStatus(`>>> ${getTimestamp()} 已选择烧录通道配置文件：DSP_Burn_Port_Channel_Profile.json`);
//             } else {
//                 mainWindow.webContents.send('dsp-file', "");
//                 showStatus(`>>> ${getTimestamp()} 请选择烧录通道配置文件：DSP_Burn_Port_Channel_Profile.json`);
//             }
//         }
//     }).catch(err => {
//         console.log(err);
//         showStatus(`>>> ${getTimestamp()} ${err}`);
//     });
// });

// /**
//  * 选择dsp文件
//  */
// ipcMain.on('dsp-hex', (_event) => {
//     dialog.showOpenDialog(mainWindow, {
//         Title: 'Open DSP program file',
//         properties: ['openFile'],
//         filters: [
//             { name: 'HEX', extensions: ['hex'] }]
//     }).then(result => {
//         if (result.canceled == false) {
//             const hex_file = result.filePaths[0];
//             console.log(`dsp_file: ${hex_file}`);
//             if (hex_file != null) {
//                 mainWindow.webContents.send('dsp-hex', hex_file);
//                 const fileName = path.basename(hex_file);
//                 showStatus(`>>> ${getTimestamp()} 已选择 ${fileName} 烧录文件`);
//             } else {
//                 showStatus(`>>> ${getTimestamp()} 烧录文件未选择，请选择.hex格式的烧录文件`);
//             }
//         }
//     })
//         .catch(err => {
//             console.log(err);
//             showStatus(`>>> ${getTimestamp()} ${err}`);
//         });
// });

