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
var MODE1TIMER = null;

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
    const ndac_mode1_dialog = document.getElementById('ndac_mode1_dialog');
    const ndac_mode1_dialog_label = document.getElementById('ndac_mode1_dialog_label');
    //添加10秒钟检查开关状态，没开启就返回上一页
    ndac_mode1_dialog.style.display = 'block';
    ndac_mode1_dialog_label.innerText = 'DPS参数状态初始化\n进行中'
    setTimeout(() => {
        ndac_mode1_dialog.style.display = 'none';
    }, 1500); // 调整为1秒
    const mode1_query_state = document.getElementById('mode1_query_state');//控制开关
    MODE1TIMER = setTimeout(() => {
        if (!mode1_query_state.checked) {
            ndac_mode1_dialog.style.display = 'block';
            ndac_mode1_dialog_label.innerText = 'DPS参数状态初始化\n超时退出'
            setTimeout(() => {
                console.log("开关未在3秒内选中，退出界面");
                window.TheIPC.ButtonPressed(5); // 关闭窗口
            }, 1500); // 调整为1秒
        }
    }, 10000); // 10秒
    mode1_query_state.addEventListener('change', () => {
        if (mode1_query_state.checked) {
            clearTimeout(MODE1TIMER);
            console.log("开关被选中，清除定时器");
        }
    });

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
    const ndac_mode1_dialog = document.getElementById('ndac_mode1_dialog');
    const ndac_mode1_dialog_label = document.getElementById('ndac_mode1_dialog_label');
    const mode1_query_state = document.getElementById('mode1_query_state');
    if (mode1_query_state.checked) {
        ndac_mode1_dialog.style.display = 'block';
        ndac_mode1_dialog_label.innerText = '请先恢复DPS参数状态'
        setTimeout(() => {
            ndac_mode1_dialog.style.display = 'none';
        }, 1000)
    } else {
        nadc_mode1_Page_return.disabled = true;
        clearTimeout(MODE1TIMER);
        window.TheIPC.ButtonPressed(5);
    }
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
    const ndac_mode1_dialog = document.getElementById('ndac_mode1_dialog');
    const ndac_mode1_dialog_label = document.getElementById('ndac_mode1_dialog_label');
    const mode1_query_state = document.getElementById('mode1_query_state');
    if (mode1_query_state.checked) {
        ndac_mode1_dialog.style.display = 'block';
        ndac_mode1_dialog_label.innerText = '请先恢复DPS参数状态'
        setTimeout(() => {
            ndac_mode1_dialog.style.display = 'none';
        }, 1000)
    } else {
        nadc_mode1_Page_close.disabled = true;
        clearTimeout(MODE1TIMER);
        window.TheIPC.ButtonPressed(1);
    }
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

/**
* 模块名:
* 代码描述:进入/退出调试
* 作者:Crow
* 创建时间:2025/03/20 15:04:55
*/
var MODE1DEBUG = true;
const nadc_mode1_debug = document.getElementById('nadc_mode1_debug');
nadc_mode1_debug.addEventListener('click', () => {
    const nadc_mode1_debug_label = document.getElementById('nadc_mode1_debug_label');
    const nadc_mode1_debug = document.getElementById('nadc_mode1_debug');
    const nadc_mode1_debug_img = document.getElementById('nadc_mode1_debug_img');
    const ndac_mode1_board_num = document.getElementById('ndac_mode1_board_num');
    if (MODE1DEBUG == true) {
        nadc_mode1_debug_label.innerText = "退出调试";
        nadc_mode1_debug.title = "退出调试";
        nadc_mode1_debug_img.src = "../image/ndac_stop_debug.png";
        window.TheIPC.toMain2(102, Number(ndac_mode1_board_num.value));
        MODE1DEBUG = false;
    } else {
        nadc_mode1_debug_label.innerText = "进入调试";
        nadc_mode1_debug.title = "进入调试";
        nadc_mode1_debug_img.src = "../image/ndac_start_debug.png";
        window.TheIPC.toMain2(103, Number(ndac_mode1_board_num.value));
        MODE1DEBUG = true;
    }
})

/**
* 模块名:ndac_select_all
* 代码描述:全选
* 作者:Crow
* 创建时间:2025/03/18 16:10:24
*/
const ndac_select_all = document.getElementById('ndac_select_all');
ndac_select_all.addEventListener('click', () => {
    const ndac_select_part = document.getElementById('ndac_select_part');
    const channelCheckboxes = document.querySelectorAll('.checkbox');
    if (ndac_select_all.checked) {
        ndac_select_part.checked = false;
        channelCheckboxes.forEach(checkbox => {
            checkbox.checked = true;
        });
    } else {
        channelCheckboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
    }
})
/**
* 模块名:ndac_select_part
* 代码描述:部分选
* 作者:Crow
* 创建时间:2025/03/18 16:24:40
*/
const ndac_select_part = document.getElementById('ndac_select_part');
ndac_select_part.addEventListener('click', () => {
    const ndac_select_all = document.getElementById('ndac_select_all');
    const channelCheckboxes = document.querySelectorAll('.checkbox');
    if (ndac_select_part.checked) {
        ndac_select_all.checked = false;
        channelCheckboxes.forEach(checkbox => {
            checkbox.checked = !checkbox.checked;
        });
    } else {
        channelCheckboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
    }
})


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


window.TheIPC.onMultiData((id, data) => {
    console.log("id:", id, "data:", data);
    switch (id) {
        case 1:
            const ndac_mode1_Parameter2 = document.getElementById('ndac_mode1_Parameter2');
            const product_type = data;
            ndac_mode1_Parameter2.innerHTML = `
                      <span style="color: white;">产品类型:</span> <span style="color: #39FF14;">${product_type}</span> `
            break;
        case 100:
            mode1_open_restore(data);//开启恢复状态
            break;
        case 101:
            show_channels_data(data);//显示通道信息
            break;
        case 102:
            const mode1_debug_data = data;
            console.log("进入调试状态", mode1_debug_data);
            const mode1_debug_type = mode1_debug_data.debug_type;
            const mode1_debug_status = mode1_debug_data.debug_status;
            switch (mode1_debug_type) {
                case "voltage":
                    switch (mode1_debug_status) {
                        case true:
                            ndac_mode1_channel1_unit.innerText = 'mV';
                            ndac_mode1_channel2_unit.innerText = 'mV';
                            ndac_mode1_channel3_unit.innerText = 'mV';
                            ndac_mode1_channel4_unit.innerText = 'mV';
                            ndac_mode1_channel5_unit.innerText = 'mV';
                            ndac_mode1_channel6_unit.innerText = 'mV';
                            ndac_mode1_channel7_unit.innerText = 'mV';
                            ndac_mode1_channel8_unit.innerText = 'mV';
                            ndac_mode1_channel9_unit.innerText = 'mV';
                            ndac_mode1_channel10_unit.innerText = 'mV';
                            ndac_mode1_channel11_unit.innerText = 'mV';
                            ndac_mode1_channel12_unit.innerText = 'mV';
                            ndac_mode1_channel13_unit.innerText = 'mV';
                            ndac_mode1_channel14_unit.innerText = 'mV';
                            ndac_mode1_channel15_unit.innerText = 'mV';
                            ndac_mode1_channel16_unit.innerText = 'mV';
                            break;
                        case false:
                            ndac_mode1_channel1_unit.innerText = 'mV';
                            ndac_mode1_channel2_unit.innerText = 'mV';
                            ndac_mode1_channel3_unit.innerText = 'mV';
                            ndac_mode1_channel4_unit.innerText = 'mV';
                            ndac_mode1_channel5_unit.innerText = 'mV';
                            ndac_mode1_channel6_unit.innerText = 'mV';
                            ndac_mode1_channel7_unit.innerText = 'mV';
                            ndac_mode1_channel8_unit.innerText = 'mV';
                            ndac_mode1_channel9_unit.innerText = 'mV';
                            ndac_mode1_channel10_unit.innerText = 'mV';
                            ndac_mode1_channel11_unit.innerText = 'mV';
                            ndac_mode1_channel12_unit.innerText = 'mV';
                            ndac_mode1_channel13_unit.innerText = 'mV';
                            ndac_mode1_channel14_unit.innerText = 'mV';
                            ndac_mode1_channel15_unit.innerText = 'mV';
                            ndac_mode1_channel16_unit.innerText = 'mV';
                            break;
                    }
                    break;
                case "Temp":
                    switch (mode1_debug_status) {
                        case true:
                            ndac_mode1_channel1_unit.innerText = 'mV';
                            ndac_mode1_channel2_unit.innerText = 'mV';
                            ndac_mode1_channel3_unit.innerText = 'mV';
                            ndac_mode1_channel4_unit.innerText = 'mV';
                            ndac_mode1_channel5_unit.innerText = 'mV';
                            ndac_mode1_channel6_unit.innerText = 'mV';
                            ndac_mode1_channel7_unit.innerText = 'mV';
                            ndac_mode1_channel8_unit.innerText = 'mV';
                            ndac_mode1_channel9_unit.innerText = 'mV';
                            ndac_mode1_channel10_unit.innerText = 'mV';
                            ndac_mode1_channel11_unit.innerText = 'mV';
                            ndac_mode1_channel12_unit.innerText = 'mV';
                            ndac_mode1_channel13_unit.innerText = 'mV';
                            ndac_mode1_channel14_unit.innerText = 'mV';
                            ndac_mode1_channel15_unit.innerText = 'mV';
                            ndac_mode1_channel16_unit.innerText = 'mV';
                            break;
                        case false:
                            ndac_mode1_channel1_unit.innerText = 'mΩ';
                            ndac_mode1_channel2_unit.innerText = 'mΩ';
                            ndac_mode1_channel3_unit.innerText = 'mΩ';
                            ndac_mode1_channel4_unit.innerText = 'mΩ';
                            ndac_mode1_channel5_unit.innerText = 'mΩ';
                            ndac_mode1_channel6_unit.innerText = 'mΩ';
                            ndac_mode1_channel7_unit.innerText = 'mΩ';
                            ndac_mode1_channel8_unit.innerText = 'mΩ';
                            ndac_mode1_channel9_unit.innerText = 'mΩ';
                            ndac_mode1_channel10_unit.innerText = 'mΩ';
                            ndac_mode1_channel11_unit.innerText = 'mΩ';
                            ndac_mode1_channel12_unit.innerText = 'mΩ';
                            ndac_mode1_channel13_unit.innerText = 'mΩ';
                            ndac_mode1_channel14_unit.innerText = 'mΩ';
                            ndac_mode1_channel15_unit.innerText = 'mΩ';
                            ndac_mode1_channel16_unit.innerText = 'mΩ';
                            break;
                    }
                    break;
            }
            // const ndac_mode1_channel1_unit = document.getElementById('ndac_mode1_channel1_unit');
            // const ndac_mode1_channel2_unit = document.getElementById('ndac_mode1_channel2_unit');
            // const ndac_mode1_channel3_unit = document.getElementById('ndac_mode1_channel3_unit');
            // const ndac_mode1_channel4_unit = document.getElementById('ndac_mode1_channel4_unit');
            // const ndac_mode1_channel5_unit = document.getElementById('ndac_mode1_channel5_unit');
            // const ndac_mode1_channel6_unit = document.getElementById('ndac_mode1_channel6_unit');
            // const ndac_mode1_channel7_unit = document.getElementById('ndac_mode1_channel7_unit');
            // const ndac_mode1_channel8_unit = document.getElementById('ndac_mode1_channel8_unit');
            // const ndac_mode1_channel9_unit = document.getElementById('ndac_mode1_channel9_unit');
            // const ndac_mode1_channel10_unit = document.getElementById('ndac_mode1_channel10_unit');
            // const ndac_mode1_channel11_unit = document.getElementById('ndac_mode1_channel11_unit');
            // const ndac_mode1_channel12_unit = document.getElementById('ndac_mode1_channel12_unit');
            // const ndac_mode1_channel13_unit = document.getElementById('ndac_mode1_channel13_unit');
            // const ndac_mode1_channel14_unit = document.getElementById('ndac_mode1_channel14_unit');
            // const ndac_mode1_channel15_unit = document.getElementById('ndac_mode1_channel15_unit');
            // const ndac_mode1_channel16_unit = document.getElementById('ndac_mode1_channel16_unit');
            // switch (mode1_debug_unit) {
            //     case true:
            //         ndac_mode1_channel1_unit.innerText = 'mΩ';
            //         ndac_mode1_channel2_unit.innerText = 'mΩ';
            //         ndac_mode1_channel3_unit.innerText = 'mΩ';
            //         ndac_mode1_channel4_unit.innerText = 'mΩ';
            //         ndac_mode1_channel5_unit.innerText = 'mΩ';
            //         ndac_mode1_channel6_unit.innerText = 'mΩ';
            //         ndac_mode1_channel7_unit.innerText = 'mΩ';
            //         ndac_mode1_channel8_unit.innerText = 'mΩ';
            //         ndac_mode1_channel9_unit.innerText = 'mΩ';
            //         ndac_mode1_channel10_unit.innerText = 'mΩ';
            //         ndac_mode1_channel11_unit.innerText = 'mΩ';
            //         ndac_mode1_channel12_unit.innerText = 'mΩ';
            //         ndac_mode1_channel13_unit.innerText = 'mΩ';
            //         ndac_mode1_channel14_unit.innerText = 'mΩ';
            //         ndac_mode1_channel15_unit.innerText = 'mΩ';
            //         ndac_mode1_channel16_unit.innerText = 'mΩ';
            //         break;
            //     case false:
            //         ndac_mode1_channel1_unit.innerText = 'mV';
            //         ndac_mode1_channel2_unit.innerText = 'mV';
            //         ndac_mode1_channel3_unit.innerText = 'mV';
            //         ndac_mode1_channel4_unit.innerText = 'mV';
            //         ndac_mode1_channel5_unit.innerText = 'mV';
            //         ndac_mode1_channel6_unit.innerText = 'mV';
            //         ndac_mode1_channel7_unit.innerText = 'mV';
            //         ndac_mode1_channel8_unit.innerText = 'mV';
            //         ndac_mode1_channel9_unit.innerText = 'mV';
            //         ndac_mode1_channel10_unit.innerText = 'mV';
            //         ndac_mode1_channel11_unit.innerText = 'mV';
            //         ndac_mode1_channel12_unit.innerText = 'mV';
            //         ndac_mode1_channel13_unit.innerText = 'mV';
            //         ndac_mode1_channel14_unit.innerText = 'mV';
            //         ndac_mode1_channel15_unit.innerText = 'mV';
            //         ndac_mode1_channel16_unit.innerText = 'mV';
            //         break;
            // }
            break;
    }
});


/**
* 模块名:
* 代码描述:查询板卡信息
* 作者:Crow
* 创建时间:2025/03/19 08:44:45
*/
const nadc_mode1_version = document.getElementById('nadc_mode1_version');
nadc_mode1_version.addEventListener('click', () => {
    const ndac_mode1_board_num = document.getElementById('ndac_mode1_board_num');
    const ndac_mode1_dialog = document.getElementById('ndac_mode1_dialog');
    const ndac_mode1_dialog_label = document.getElementById('ndac_mode1_dialog_label');
    ndac_mode1_dialog.style.display = 'block';
    ndac_mode1_dialog_label.innerText = '查询板卡程序版本信息'
    window.TheIPC.toMain2(101, Number(ndac_mode1_board_num.value));
    setTimeout(() => {
        ndac_mode1_dialog.style.display = 'none';
    }, 1000)

})

/**
* 模块名:mode1_open_restore
* 代码描述:恢复开关开启状态
* 作者:Crow
* 创建时间:2025/03/17 11:00:18
*/
function mode1_open_restore(data) {
    const ndac_mode1_dialog = document.getElementById('ndac_mode1_dialog');
    const ndac_mode1_dialog_label = document.getElementById('ndac_mode1_dialog_label');
    const mode1_query_state = document.getElementById('mode1_query_state');
    const nadc_mode1_Page_return = document.getElementById('nadc_mode1_Page_return');//返回按钮恢复
    const nadc_mode1_Page_close = document.getElementById('nadc_mode1_Page_close');//返回关闭恢复
    const nadc_mode1_restore = document.getElementById('nadc_mode1_restore');//恢复状态
    const ndac_mode1_board_num = document.getElementById('ndac_mode1_board_num');//板卡号
    const ndac_mode1_cali_part = document.getElementById('ndac_mode1_cali_part');//定标段
    const nadc_mode1_version = document.getElementById('nadc_mode1_version');//板卡版本
    const nadc_mode1_testValue1 = document.getElementById('nadc_mode1_testValue1');//获取测试值1恢复
    const nadc_mode1_testValue2 = document.getElementById('nadc_mode1_testValue2');//获取测试值2恢复
    const nadc_mode1_debug = document.getElementById('nadc_mode1_debug');//获取进入调试恢复
    const ndac_select_all = document.getElementById('ndac_select_all');//全选恢复
    const ndac_select_part = document.getElementById('ndac_select_part');//部分选恢复
    const nadc_mode1_demarc = document.getElementById('nadc_mode1_demarc');//分界点恢复
    const nadc_mode1_application = document.getElementById('nadc_mode1_application');//一键应用恢复
    const nadc_mode1_count = document.getElementById('nadc_mode1_count');//计算kb值恢复
    const nadc_mode1_initialize = document.getElementById('nadc_mode1_initialize');//初始化K/B值恢复
    const nadc_mode1_batch_send = document.getElementById('nadc_mode1_batch_send');//批量发送KB值恢复
    const fieldset_mode1 = document.getElementById('fieldset_mode1');//fieldset恢复
    const restore_state = data;
    if (restore_state === true) {
        mode1_query_state.checked = true;
        nadc_mode1_Page_return.disabled = false;//返回恢复
        nadc_mode1_Page_close.disabled = false;//关闭恢复
        nadc_mode1_restore.disabled = false;//恢复状态可以点击
        ndac_mode1_board_num.disabled = false;//板卡号恢复
        ndac_mode1_cali_part.disabled = false;//定标段恢复
        nadc_mode1_version.disabled = false;//查询板卡版本恢复
        nadc_mode1_testValue1.disabled = false;//获取测试值1恢复
        nadc_mode1_testValue2.disabled = false;//获取测试值2恢复
        nadc_mode1_debug.disabled = false;//调试恢复
        ndac_select_all.disabled = false;//全选恢复
        ndac_select_part.disabled = false;//部分选恢复
        nadc_mode1_demarc.disabled = false;//分界点恢复
        nadc_mode1_application.disabled = false;//一键应用恢复
        nadc_mode1_count.disabled = false;//计算kb值恢复
        nadc_mode1_initialize.disabled = false;//初始化K/B值恢复
        nadc_mode1_batch_send.disabled = false;//批量发送K/B值恢复
        fieldset_mode1.disabled = false;//fieldset恢复
        ndac_mode1_dialog.style.display = 'block';
        ndac_mode1_dialog_label.innerText = 'DPS参数状态初始化\n完成'
        clearTimeout(MODE1TIMER);
        setTimeout(() => {
            ndac_mode1_dialog.style.display = 'none';
        }, 1000)
    } else if (restore_state == false) {
        const ndac_mode1_dialog = document.getElementById('ndac_mode1_dialog');
        const ndac_mode1_dialog_label = document.getElementById('ndac_mode1_dialog_label');
        ndac_mode1_dialog.style.display = 'block';
        ndac_mode1_dialog_label.innerText = 'DPS参数状态恢复\n完成'
        mode1_query_state.checked = false;
        nadc_mode1_restore.disabled = true;//恢复状态不可以点击
        ndac_mode1_board_num.disabled = true;//板卡号不可点
        ndac_mode1_cali_part.disabled = true;//定标段不可点
        nadc_mode1_version.disabled = true;//查询板卡版本不可点
        nadc_mode1_testValue1.disabled = true;//获取测试值1不可点
        nadc_mode1_testValue2.disabled = true;//获取测试值2不可点
        nadc_mode1_debug.disabled = true;//调试恢复
        ndac_select_all.disabled = true;//全选不可选
        ndac_select_part.disabled = true;//部分选不可选
        nadc_mode1_demarc.disabled = true;//分界点不可选
        nadc_mode1_application.disabled = true;//一键应用不可选
        nadc_mode1_count.disabled = true;//计算kb值恢复不可选
        nadc_mode1_initialize.disabled = true;//初始化KB值不可选
        nadc_mode1_batch_send.disabled = true;//批量发送K/B值不可选
        fieldset_mode1.disabled = true;//fieldset恢复
        setTimeout(() => {
            ndac_mode1_dialog.style.display = 'none';
        }, 1000); // 调整为1秒
    } else {
        throw new Error('恢复状态未开启');
    }
}


/**
* 模块名:
* 代码描述:显示通道信息
* 作者:Crow
* 创建时间:2025/03/21 08:37:30
*/
function show_channels_data(data) {
    const mode1_channels_data = data;
    const mode1_channels_type = mode1_channels_data.channels_type;
    //通道1的数据
    const ndac_mode1_channel1_data = document.getElementById('ndac_mode1_channel1_data');
    ndac_mode1_channel1_data.innerText = mode1_channels_data.channel1_value;
    ndac_mode1_channel1_data.value = mode1_channels_data.channel1_value;
    //通道2的数据
    const ndac_mode1_channel2_data = document.getElementById('ndac_mode1_channel2_data');
    ndac_mode1_channel2_data.innerText = mode1_channels_data.channel2_value;
    ndac_mode1_channel2_data.value = mode1_channels_data.channel2_value;
    //通道3的数据
    const ndac_mode1_channel3_data = document.getElementById('ndac_mode1_channel3_data');
    ndac_mode1_channel3_data.innerText = mode1_channels_data.channel3_value;
    ndac_mode1_channel3_data.value = mode1_channels_data.channel3_value;
    //通道4的数据
    const ndac_mode1_channel4_data = document.getElementById('ndac_mode1_channel4_data');
    ndac_mode1_channel4_data.innerText = mode1_channels_data.channel4_value;
    ndac_mode1_channel4_data.value = mode1_channels_data.channel4_value;
    //通道5的数据
    const ndac_mode1_channel5_data = document.getElementById('ndac_mode1_channel5_data');
    ndac_mode1_channel5_data.innerText = mode1_channels_data.channel5_value;
    ndac_mode1_channel5_data.value = mode1_channels_data.channel5_value;
    //通道6的数据
    const ndac_mode1_channel6_data = document.getElementById('ndac_mode1_channel6_data');
    ndac_mode1_channel6_data.innerText = mode1_channels_data.channel6_value;
    ndac_mode1_channel6_data.value = mode1_channels_data.channel6_value;
    //通道7的数据
    const ndac_mode1_channel7_data = document.getElementById('ndac_mode1_channel7_data');
    ndac_mode1_channel7_data.innerText = mode1_channels_data.channel7_value;
    ndac_mode1_channel7_data.value = mode1_channels_data.channel7_value;
    //通道8的数据
    const ndac_mode1_channel8_data = document.getElementById('ndac_mode1_channel8_data');
    ndac_mode1_channel8_data.innerText = mode1_channels_data.channel8_value;
    ndac_mode1_channel8_data.value = mode1_channels_data.channel8_value;
    //通道9的数据
    const ndac_mode1_channel9_data = document.getElementById('ndac_mode1_channel9_data');
    ndac_mode1_channel9_data.innerText = mode1_channels_data.channel9_value;
    ndac_mode1_channel9_data.value = mode1_channels_data.channel9_value;
    //通道10的数据
    const ndac_mode1_channel10_data = document.getElementById('ndac_mode1_channel10_data');
    ndac_mode1_channel10_data.innerText = mode1_channels_data.channel10_value;
    ndac_mode1_channel10_data.value = mode1_channels_data.channel10_value;
    //通道11的数据
    const ndac_mode1_channel11_data = document.getElementById('ndac_mode1_channel11_data');
    ndac_mode1_channel11_data.innerText = mode1_channels_data.channel11_value;
    ndac_mode1_channel11_data.value = mode1_channels_data.channel11_value;
    //通道12的数据
    const ndac_mode1_channel12_data = document.getElementById('ndac_mode1_channel12_data');
    ndac_mode1_channel12_data.innerText = mode1_channels_data.channel12_value;
    ndac_mode1_channel12_data.value = mode1_channels_data.channel12_value;
    //通道13的数据
    const ndac_mode1_channel13_data = document.getElementById('ndac_mode1_channel13_data');
    ndac_mode1_channel13_data.innerText = mode1_channels_data.channel13_value;
    ndac_mode1_channel13_data.value = mode1_channels_data.channel13_value;
    //通道14的数据
    const ndac_mode1_channel14_data = document.getElementById('ndac_mode1_channel14_data');
    ndac_mode1_channel14_data.innerText = mode1_channels_data.channel14_value;
    ndac_mode1_channel14_data.value = mode1_channels_data.channel14_value;
    //通道15的数据
    const ndac_mode1_channel15_data = document.getElementById('ndac_mode1_channel15_data');
    ndac_mode1_channel15_data.innerText = mode1_channels_data.channel15_value;
    ndac_mode1_channel15_data.value = mode1_channels_data.channel15_value;
    //通道16的数据
    const ndac_mode1_channel16_data = document.getElementById('ndac_mode1_channel16_data');
    ndac_mode1_channel16_data.innerText = mode1_channels_data.channel16_value;
    ndac_mode1_channel16_data.value = mode1_channels_data.channel16_value;
    //显示每个通道的单位
    const ndac_mode1_channel1_unit = document.getElementById('ndac_mode1_channel1_unit');
    const ndac_mode1_channel2_unit = document.getElementById('ndac_mode1_channel2_unit');
    const ndac_mode1_channel3_unit = document.getElementById('ndac_mode1_channel3_unit');
    const ndac_mode1_channel4_unit = document.getElementById('ndac_mode1_channel4_unit');
    const ndac_mode1_channel5_unit = document.getElementById('ndac_mode1_channel5_unit');
    const ndac_mode1_channel6_unit = document.getElementById('ndac_mode1_channel6_unit');
    const ndac_mode1_channel7_unit = document.getElementById('ndac_mode1_channel7_unit');
    const ndac_mode1_channel8_unit = document.getElementById('ndac_mode1_channel8_unit');
    const ndac_mode1_channel9_unit = document.getElementById('ndac_mode1_channel9_unit');
    const ndac_mode1_channel10_unit = document.getElementById('ndac_mode1_channel10_unit');
    const ndac_mode1_channel11_unit = document.getElementById('ndac_mode1_channel11_unit');
    const ndac_mode1_channel12_unit = document.getElementById('ndac_mode1_channel12_unit');
    const ndac_mode1_channel13_unit = document.getElementById('ndac_mode1_channel13_unit');
    const ndac_mode1_channel14_unit = document.getElementById('ndac_mode1_channel14_unit');
    const ndac_mode1_channel15_unit = document.getElementById('ndac_mode1_channel15_unit');
    const ndac_mode1_channel16_unit = document.getElementById('ndac_mode1_channel16_unit');
    switch (mode1_channels_type) {
        case 0x01:
        case 0x02:
        case 0x03:
        case 0x04:
        case 0x05:
        case 0x06:
        case 0x07:
        case 0x08:
            ndac_mode1_channel1_unit.innerText = 'mV';
            ndac_mode1_channel2_unit.innerText = 'mV';
            ndac_mode1_channel3_unit.innerText = 'mV';
            ndac_mode1_channel4_unit.innerText = 'mV';
            ndac_mode1_channel5_unit.innerText = 'mV';
            ndac_mode1_channel6_unit.innerText = 'mV';
            ndac_mode1_channel7_unit.innerText = 'mV';
            ndac_mode1_channel8_unit.innerText = 'mV';
            ndac_mode1_channel9_unit.innerText = 'mV';
            ndac_mode1_channel10_unit.innerText = 'mV';
            ndac_mode1_channel11_unit.innerText = 'mV';
            ndac_mode1_channel12_unit.innerText = 'mV';
            ndac_mode1_channel13_unit.innerText = 'mV';
            ndac_mode1_channel14_unit.innerText = 'mV';
            ndac_mode1_channel15_unit.innerText = 'mV';
            ndac_mode1_channel16_unit.innerText = 'mV';
            break;
        case 0x31:
        case 0x32:
        case 0x33:
        case 0x34:
        case 0x35:
        case 0x36:
        case 0x37:
        case 0x38:
            ndac_mode1_channel1_unit.innerText = 'mΩ';
            ndac_mode1_channel2_unit.innerText = 'mΩ';
            ndac_mode1_channel3_unit.innerText = 'mΩ';
            ndac_mode1_channel4_unit.innerText = 'mΩ';
            ndac_mode1_channel5_unit.innerText = 'mΩ';
            ndac_mode1_channel6_unit.innerText = 'mΩ';
            ndac_mode1_channel7_unit.innerText = 'mΩ';
            ndac_mode1_channel8_unit.innerText = 'mΩ';
            ndac_mode1_channel9_unit.innerText = 'mΩ';
            ndac_mode1_channel10_unit.innerText = 'mΩ';
            ndac_mode1_channel11_unit.innerText = 'mΩ';
            ndac_mode1_channel12_unit.innerText = 'mΩ';
            ndac_mode1_channel13_unit.innerText = 'mΩ';
            ndac_mode1_channel14_unit.innerText = 'mΩ';
            ndac_mode1_channel15_unit.innerText = 'mΩ';
            ndac_mode1_channel16_unit.innerText = 'mΩ';
            break;
        case 0x51:
        case 0x52:
        case 0x53:
        case 0x54:
        case 0x55:
        case 0x56:
        case 0x57:
        case 0x58:
            ndac_mode1_channel1_unit.innerText = 'mΩ';
            ndac_mode1_channel2_unit.innerText = 'mΩ';
            ndac_mode1_channel3_unit.innerText = 'mΩ';
            ndac_mode1_channel4_unit.innerText = 'mΩ';
            ndac_mode1_channel5_unit.innerText = 'mΩ';
            ndac_mode1_channel6_unit.innerText = 'mΩ';
            ndac_mode1_channel7_unit.innerText = 'mΩ';
            ndac_mode1_channel8_unit.innerText = 'mΩ';
            ndac_mode1_channel9_unit.innerText = 'mΩ';
            ndac_mode1_channel10_unit.innerText = 'mΩ';
            ndac_mode1_channel11_unit.innerText = 'mΩ';
            ndac_mode1_channel12_unit.innerText = 'mΩ';
            ndac_mode1_channel13_unit.innerText = 'mΩ';
            ndac_mode1_channel14_unit.innerText = 'mΩ';
            ndac_mode1_channel15_unit.innerText = 'mΩ';
            ndac_mode1_channel16_unit.innerText = 'mΩ';
            break;
    }
}


/**
* 模块名:
* 代码描述:展开模块
* 作者:Crow
* 创建时间:2025/03/18 16:49:10
*/
function toggleCollapse(header) {
    const content = header.nextElementSibling;
    const arrow = header.querySelector('.arrow');
    content.classList.toggle('open');
    arrow.classList.toggle('open');
}