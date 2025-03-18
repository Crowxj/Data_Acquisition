/**
* 模块名:DOMContentLoaded
* 代码描述:初始化页面
* 作者:Crow
* 创建时间:2025/03/10 10:39:44
*/

var ndac_mode1_device_num;//设备号
var ndac_mode1_dspip_num;//DSP IP
var ndac_mode1_canfd_num;//canfd号
var ndac_mode1_canfd_port;//CANFD_端口
var ndac_mode1_port;//端口
var ndac_mode1_mode;//模式
var ndac_mode1_passbacktime;//回传时间
var NDACMODE1D;//模式显示值
var NDACDISPLAYD = {};//显示值
document.addEventListener('DOMContentLoaded', () => {
    ndac_mode1_device_num = sessionStorage.getItem('ndac_device_num');//设备号
    ndac_mode1_dspip_num = sessionStorage.getItem('ndac_dspip_num');//DSP IP
    ndac_mode1_canfd_num = sessionStorage.getItem('ndac_canfd_num');//canfd号
    ndac_mode1_canfd_port = sessionStorage.getItem('canfd_port');//canfd—端口
    ndac_mode1_port = getPort_mode1_ByCANFD(ndac_mode1_canfd_num, ndac_mode1_canfd_port);//端口
    ndac_mode1_mode = sessionStorage.getItem('ndac_mode');//模式
    if (ndac_mode1_mode == "ndacMode1") {
        NDACMODE1D = "四段校准";
    } else if (ndac_mode1_mode == "ndacMode2") {
        NDACMODE1D = "二次校准";
    }
    ndac_mode1_passbacktime = sessionStorage.getItem('ndac_passback_time');
    const ndac_mode1_Parameter1 = document.getElementById('ndac_mode1_Parameter1');//显示参数信息1
    ndac_mode1_Parameter1.innerHTML = `
    <span style="color: white;">设备号:</span> <span style="color: #39FF14;">${ndac_mode1_device_num}</span> 
    <span style="color: white;">DSP IP:</span> <span style="color: #39FF14;">${ndac_mode1_dspip_num}</span> 
    <span style="color: white;">CANFD:</span> <span style="color: #39FF14;">${ndac_mode1_canfd_num}</span> 
    <span style="color: white;">端口:</span> <span style="color: #39FF14;">${ndac_mode1_port}</span> 
    <span style="color: white;">模式:</span> <span style="color: #39FF14;">${NDACMODE1D}</span>
    <span style="color: white;">接收报文时间:</span> <span style="color: #39FF14;">${ndac_mode1_passbacktime}ms</span>
`;
    NDACDISPLAYD = {//显示值
        ndac_mode1_device_num: ndac_mode1_device_num,//设备号
        ndac_mode1_dspip_num: ndac_mode1_dspip_num,//DSP IP
        ndac_mode1_canfd_num: ndac_mode1_canfd_num,//CANFD号
        ndac_mode1_port: ndac_mode1_port,//端口号
        ndac_mode1_mode: NDACMODE1D,//模式
        ndac_mode1_passbacktime: ndac_mode1_passbacktime,//回传时间
    }
    window.TheIPC.toMain2(100, JSON.stringify(NDACDISPLAYD));//传到界面显示
    console.log("设备号:", ndac_mode1_device_num, " DSP IP:", ndac_mode1_dspip_num, " CANFD:", ndac_mode1_canfd_num, " 端口:", ndac_mode1_port, " 模式:", NDACMODE1D, " 接收报文时间:", ndac_mode1_passbacktime, "ms")
    window.TheIPC.ButtonPressed(100);//传值到主进程
    window.TheIPC.ButtonPressed(101);//查询透传及波特率
})
/**
* 模块名:
* 代码描述:根据CANFD号找端口
* 作者:Crow
* 创建时间:2025/03/10 12:53:04
*/
function getPort_mode1_ByCANFD(canfdNum, canfdValue) {
    // 将 canfdValue 从 JSON 字符串解析为 JavaScript 对象
    const canfdPortObj = JSON.parse(canfdValue);
    // 根据 canfdNum 查找对应的端口值
    const port = canfdPortObj[canfdNum];
    // 检查是否找到了对应的端口值
    if (port !== undefined) {
        console.log(`CANFD ${canfdNum} 的对应端口值是: ${port}`);
        // 在这里可以进行其他操作，比如将端口值显示在页面上
    } else {
        console.log(`未找到 CANFD ${canfdNum} 的端口值`);
        // 处理未找到端口值的情况
    }
    return port;
}

/**
* 模块名:nadc_mode1_Page_return
* 代码描述:返回上一页
* 作者:Crow
* 创建时间:2025/03/10 14:41:32
*/
const nadc_mode1_Page_return = document.getElementById('nadc_mode1_Page_return');
nadc_mode1_Page_return.addEventListener('click', () => {
    window.TheIPC.ButtonPressed(5);
})

/**
* 模块名:nadc_mode1_Page_min
* 代码描述:窗口最小化
* 作者:Crow
* 创建时间:2025/03/10 16:28:59
*/
const nadc_mode1_Page_min = document.getElementById('nadc_mode1_Page_min');
nadc_mode1_Page_min.addEventListener('click', () => {
    window.TheIPC.ButtonPressed(2);
})

/**
* 模块名:
* 代码描述:关闭窗口
* 作者:Crow
* 创建时间:2025/03/10 16:29:57
*/
const nadc_mode1_Page_close = document.getElementById('nadc_mode1_Page_close');
nadc_mode1_Page_close.addEventListener('click', () => {
    window.TheIPC.ButtonPressed(1);
})

/**
* 模块名:nadc_mode1_restore
* 代码描述:开启/关闭恢复模式
* 作者:Crow
* 创建时间:2025/03/17 11:16:21
*/
const nadc_mode1_restore = document.getElementById('nadc_mode1_restore');
nadc_mode1_restore.addEventListener('click', () => {
    window.TheIPC.ButtonPressed(102);
})
// /**
// * 模块名:nadc_mode1_transmission
// * 代码描述:开启透传模式
// * 作者:Crow
// * 创建时间:2025/03/17 14:19:45
// */
// const nadc_mode1_transmission= document.getElementById('nadc_mode1_transmission');
// nadc_mode1_transmission.addEventListener('click', () => {
//     window.TheIPC.ButtonPressed(102);
// })
/**
* 模块名:
* 代码描述:底部显示信息
* 作者:Crow
* 创建时间:2025/03/11 09:48:24
*/
const ndac_mode1_displaydata = document.getElementById('ndac_mode1_displaydata');// 获取页面上id为'status_bar'的元素，用于显示状态文本
const ndac_mode1_display = document.getElementById('ndac_mode1_display');// 获取页面上id为'displayData'的元素，用于展示数据和滚动
const ndacMode1_TD = '<tr><td style="width: 100%; color:white; font-style: italic;font-size: 15px;">'; // color: #39FF14; 定义一个表格行模板，用于包装状态文本，使其在显示时格式化
window.TheIPC.onStatus((text) => {
    // 将接收到的文本信息转换为字符串，然后添加到状态栏中
    ndac_mode1_displaydata.innerHTML += ndacMode1_TD + text.toString() + '</td></tr>';
    // 滚动条到最底端，确保用户总是能看到最新添加的信息
    ndac_mode1_display.scrollTop = ndac_mode1_display.scrollHeight;
});



var restore_state = null;//恢复状态
// var restore_parm = null;//恢复参数
// var restore_parm_state = null;//恢复参数状态
// var restore_parm_tran = null;//恢复透传状态
// var restore_parm_baudRate = null;//恢复比波特率
window.TheIPC.onMultiData((id, data) => {
    console.log("id:", id, "data:", data);
    switch (id) {
        case 100:
            restore_state = data;
            mode1_open_restore(restore_state);//开启恢复状态
            break;
        // case 101:
        //     restore_parm = data;
        //     mode1_close_restore(restore_parm);//恢复状态
        //     break;
    }
});

/**
* 模块名:mode1_open_restore
* 代码描述:恢复开关开启状态
* 作者:Crow
* 创建时间:2025/03/17 11:00:18
*/
function mode1_open_restore(data) {
    const mode1_query_state = document.getElementById('mode1_query_state');
    const nadc_mode1_restore = document.getElementById('nadc_mode1_restore');//恢复状态
    console.log("查询状态:", data);
    const restore_state = data;
    if (restore_state == true) {
        mode1_query_state.checked = true;
        nadc_mode1_restore.disabled = false;//恢复状态可以点击
    } else if (restore_state == false) {
        mode1_query_state.checked = false;
        nadc_mode1_restore.disabled = false;//恢复状态不可以点击
    } else {
        throw new Error('恢复状态未开启');
    }
}
// /**
// * 模块名:mode1_close_restore
// * 代码描述:恢复按钮关闭状态
// * 作者:Crow
// * 创建时间:2025/03/17 14:15:04
// */
// function mode1_close_restore(data) {
//     restore_parm_state = data.mode1_restore;//恢复状体
//     restore_parm_baudRate = data.mode1_baudRate;//波特率
//     restore_parm_tran = data.mode1_tran;//透传状态
//     if (restore_parm_state == false) {
//         const mode1_reply_state = document.getElementById('mode1_reply_state');
//         mode1_reply_state.checked = false;
//     } else {
//         throw new Error('恢复状态未关闭');
//     }
// }