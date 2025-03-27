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
var SECTIONNUM = 0;//获取定标段的个数

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
    <span style="color: white;">接收通道信息时间:</span> <span style="color: #39FF14;">${ndac_mode1_passbacktime}ms</span>
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
    console.log("设备号:", ndac_mode1_device_num, " DSP IP:", ndac_mode1_dspip_num, " CANFD:", ndac_mode1_canfd_num, " 端口:", ndac_mode1_port, " 模式:", NDACMODE1D, " 接收通道信息时间:", ndac_mode1_passbacktime, "ms")
    window.TheIPC.ButtonPressed(100);//传值到主进程
    window.TheIPC.ButtonPressed(101);//查询透传及波特率
    //默认板卡通道数据为0-共16通道
    const ndac_mode1_channel1_data = document.getElementById('ndac_mode1_channel1_data');
    ndac_mode1_channel1_data.value = 0;
    const ndac_mode1_channel2_data = document.getElementById('ndac_mode1_channel2_data');
    ndac_mode1_channel2_data.value = 0;
    const ndac_mode1_channel3_data = document.getElementById('ndac_mode1_channel3_data');
    ndac_mode1_channel3_data.value = 0;
    const ndac_mode1_channel4_data = document.getElementById('ndac_mode1_channel4_data');
    ndac_mode1_channel4_data.value = 0;
    const ndac_mode1_channel5_data = document.getElementById('ndac_mode1_channel5_data');
    ndac_mode1_channel5_data.value = 0;
    const ndac_mode1_channel6_data = document.getElementById('ndac_mode1_channel6_data');
    ndac_mode1_channel6_data.value = 0;
    const ndac_mode1_channel7_data = document.getElementById('ndac_mode1_channel7_data');
    ndac_mode1_channel7_data.value = 0;
    const ndac_mode1_channel8_data = document.getElementById('ndac_mode1_channel8_data');
    ndac_mode1_channel8_data.value = 0;
    const ndac_mode1_channel9_data = document.getElementById('ndac_mode1_channel9_data');
    ndac_mode1_channel9_data.value = 0;
    const ndac_mode1_channel10_data = document.getElementById('ndac_mode1_channel10_data');
    ndac_mode1_channel10_data.value = 0;
    const ndac_mode1_channel11_data = document.getElementById('ndac_mode1_channel11_data');
    ndac_mode1_channel11_data.value = 0;
    const ndac_mode1_channel12_data = document.getElementById('ndac_mode1_channel12_data');
    ndac_mode1_channel12_data.value = 0;
    const ndac_mode1_channel13_data = document.getElementById('ndac_mode1_channel13_data');
    ndac_mode1_channel13_data.value = 0;
    const ndac_mode1_channel14_data = document.getElementById('ndac_mode1_channel14_data');
    ndac_mode1_channel14_data.value = 0;
    const ndac_mode1_channel15_data = document.getElementById('ndac_mode1_channel15_data');
    ndac_mode1_channel15_data.value = 0;
    const ndac_mode1_channel16_data = document.getElementById('ndac_mode1_channel16_data');
    ndac_mode1_channel16_data.value = 0;
    // 打开对话框
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
* 模块名:getPort_mode1_ByCANFD
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
* 模块名:ndac_mode1_board_num
* 代码描述:更换板卡数据
* 作者:Crow
* 创建时间:2025/03/18 16:10:24
*/
// const ndac_mode1_board_num = document.getElementById('ndac_mode1_board_num');
// ndac_mode1_board_num.addEventListener('change', () => {
//     const ndac_mode1_Parameter2 = document.getElementById('ndac_mode1_Parameter2');
//     ndac_mode1_Parameter2.innerHTML = `
//                       <span style="color: white;">产品类型:</span> <span style="color: #39FF14;">未查询类型</span>
//      `
//     //通道1的数据
//     const ndac_mode1_channel1_data = document.getElementById('ndac_mode1_channel1_data');
//     const ndac_mode1_channel1_unit = document.getElementById('ndac_mode1_channel1_unit');
//     ndac_mode1_channel1_data.innerText = "...";
//     ndac_mode1_channel1_data.value = 0;
//     ndac_mode1_channel1_unit.innerText = "...";
//     //通道2的数据
//     const ndac_mode1_channel2_data = document.getElementById('ndac_mode1_channel2_data');
//     const ndac_mode1_channel2_unit = document.getElementById('ndac_mode1_channel2_unit');
//     ndac_mode1_channel2_data.innerText = "...";
//     ndac_mode1_channel2_data.value = 0;
//     ndac_mode1_channel2_unit.innerText = "...";
//     //通道3的数据
//     const ndac_mode1_channel3_data = document.getElementById('ndac_mode1_channel3_data');
//     const ndac_mode1_channel3_unit = document.getElementById('ndac_mode1_channel3_unit');
//     ndac_mode1_channel3_data.innerText = "...";
//     ndac_mode1_channel3_data.value = 0;
//     ndac_mode1_channel3_unit.innerText = "...";
//     //通道4的数据
//     const ndac_mode1_channel4_data = document.getElementById('ndac_mode1_channel4_data');
//     const ndac_mode1_channel4_unit = document.getElementById('ndac_mode1_channel4_unit');
//     ndac_mode1_channel4_data.innerText = "...";
//     ndac_mode1_channel4_data.value = 0;
//     ndac_mode1_channel4_unit.innerText = "...";
//     //通道5的数据
//     const ndac_mode1_channel5_data = document.getElementById('ndac_mode1_channel5_data');
//     const ndac_mode1_channel5_unit = document.getElementById('ndac_mode1_channel5_unit');
//     ndac_mode1_channel5_data.innerText = "...";
//     ndac_mode1_channel5_data.value = 0;
//     ndac_mode1_channel5_unit.innerText = "...";
//     //通道6的数据
//     const ndac_mode1_channel6_data = document.getElementById('ndac_mode1_channel6_data');
//     const ndac_mode1_channel6_unit = document.getElementById('ndac_mode1_channel6_unit');
//     ndac_mode1_channel6_data.innerText = "...";
//     ndac_mode1_channel6_data.value = 0;
//     ndac_mode1_channel6_unit.innerText = "...";
//     //通道的数据
//     const ndac_mode1_channel7_data = document.getElementById('ndac_mode1_channel7_data');
//     const ndac_mode1_channel7_unit = document.getElementById('ndac_mode1_channel7_unit');
//     ndac_mode1_channel7_data.innerText = "...";
//     ndac_mode1_channel7_data.value = 0;
//     ndac_mode1_channel7_unit.innerText = "...";
//     //通道8的数据
//     const ndac_mode1_channel8_data = document.getElementById('ndac_mode1_channel8_data');
//     const ndac_mode1_channel8_unit = document.getElementById('ndac_mode1_channel8_unit');
//     ndac_mode1_channel8_data.innerText = "...";
//     ndac_mode1_channel8_data.value = 0;
//     ndac_mode1_channel8_unit.innerText = "...";
//     //通道9的数据
//     const ndac_mode1_channel9_data = document.getElementById('ndac_mode1_channel9_data');
//     const ndac_mode1_channel9_unit = document.getElementById('ndac_mode1_channel9_unit');
//     ndac_mode1_channel9_data.innerText = "...";
//     ndac_mode1_channel9_data.value = 0;
//     ndac_mode1_channel9_unit.innerText = "...";
//     //通道9的数据
//     const ndac_mode1_channel10_data = document.getElementById('ndac_mode1_channel10_data');
//     const ndac_mode1_channel10_unit = document.getElementById('ndac_mode1_channel10_unit');
//     ndac_mode1_channel10_data.innerText = "...";
//     ndac_mode1_channel10_data.value = 0;
//     ndac_mode1_channel10_unit.innerText = "...";
//     //通道9的数据
//     const ndac_mode1_channel11_data = document.getElementById('ndac_mode1_channel11_data');
//     const ndac_mode1_channel11_unit = document.getElementById('ndac_mode1_channel11_unit');
//     ndac_mode1_channel11_data.innerText = "...";
//     ndac_mode1_channel11_data.value = 0;
//     ndac_mode1_channel11_unit.innerText = "...";
//     //通道9的数据
//     const ndac_mode1_channel12_data = document.getElementById('ndac_mode1_channel12_data');
//     const ndac_mode1_channel12_unit = document.getElementById('ndac_mode1_channel12_unit');
//     ndac_mode1_channel12_data.innerText = "...";
//     ndac_mode1_channel12_data.value = 0;
//     ndac_mode1_channel12_unit.innerText = "...";
//     //通道9的数据
//     const ndac_mode1_channel13_data = document.getElementById('ndac_mode1_channel13_data');
//     const ndac_mode1_channel13_unit = document.getElementById('ndac_mode1_channel13_unit');
//     ndac_mode1_channel13_data.innerText = "...";
//     ndac_mode1_channel13_data.value = 0;
//     ndac_mode1_channel13_unit.innerText = "...";
//     //通道9的数据
//     const ndac_mode1_channel14_data = document.getElementById('ndac_mode1_channel14_data');
//     const ndac_mode1_channel14_unit = document.getElementById('ndac_mode1_channel14_unit');
//     ndac_mode1_channel14_data.innerText = "...";
//     ndac_mode1_channel14_data.value = 0;
//     ndac_mode1_channel14_unit.innerText = "...";
//     //通道9的数据
//     const ndac_mode1_channel15_data = document.getElementById('ndac_mode1_channel15_data');
//     const ndac_mode1_channel15_unit = document.getElementById('ndac_mode1_channel15_unit');
//     ndac_mode1_channel15_data.innerText = "...";
//     ndac_mode1_channel15_data.value = 0;
//     ndac_mode1_channel15_unit.innerText = "...";
//     //通道16的数据
//     const ndac_mode1_channel16_data = document.getElementById('ndac_mode1_channel16_data');
//     const ndac_mode1_channel16_unit = document.getElementById('ndac_mode1_channel16_unit');
//     ndac_mode1_channel16_data.innerText = "...";
//     ndac_mode1_channel16_data.value = 0;
//     ndac_mode1_channel16_unit.innerText = "...";
//     window.TheIPC.toMain3(1, Number(ndac_mode1_board_num.value), ndac_mode1_passbacktime);
// })
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
* 模块名:nadc_mode1_testValue1
* 代码描述:获取实际值1
* 作者:Crow
* 创建时间:2025/03/23 15:06:06
*/
const nadc_mode1_testValue1 = document.getElementById('nadc_mode1_testValue1');
nadc_mode1_testValue1.addEventListener('click', () => {
    const ndac_mode1_cali_part = document.getElementById('ndac_mode1_cali_part');//定标段几的值
    const ndac_mode1_cali_partValue = ndac_mode1_cali_part.value;
    const channelCheckboxes = document.querySelectorAll('.checkbox'); // 假设所有通道复选框的类名为 checkbox
    let isTestValue2Selected = false;
    // 检查是否有通道被选中
    channelCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
            isTestValue2Selected = true;
        }
    });
    if (!isTestValue2Selected) {
        const ndac_mode1_dialog = document.getElementById('ndac_mode1_dialog');
        const ndac_mode1_dialog_label = document.getElementById('ndac_mode1_dialog_label');
        ndac_mode1_dialog.style.display = 'block';
        ndac_mode1_dialog_label.innerText = '请至少选择一个通道\n获取测试值1';
        setTimeout(() => {
            ndac_mode1_dialog.style.display = 'none';
        }, 1000);
        return; // 如果没有通道被选中，直接返回，不执行后续代码
    }
    const ndac_mode1_channel1 = document.getElementById('ndac_mode1_channel1');//通道1
    const ndac_mode1_channel1_data = document.getElementById('ndac_mode1_channel1_data');//通道1的信息
    const ndac_mode1_channel2 = document.getElementById('ndac_mode1_channel2');//通道2
    const ndac_mode1_channel2_data = document.getElementById('ndac_mode1_channel2_data');//通道2的值
    const ndac_mode1_channel3 = document.getElementById('ndac_mode1_channel3');//通道3
    const ndac_mode1_channel3_data = document.getElementById('ndac_mode1_channel3_data');//通道3的数据
    const ndac_mode1_channel4 = document.getElementById('ndac_mode1_channel4');//通道4
    const ndac_mode1_channel4_data = document.getElementById('ndac_mode1_channel4_data');//通道4的数据
    const ndac_mode1_channel5 = document.getElementById('ndac_mode1_channel5');//通道5
    const ndac_mode1_channel5_data = document.getElementById('ndac_mode1_channel5_data');//通道5的数据
    const ndac_mode1_channel6 = document.getElementById('ndac_mode1_channel6');//通道6
    const ndac_mode1_channel6_data = document.getElementById('ndac_mode1_channel6_data');//通道6的数据
    const ndac_mode1_channel7 = document.getElementById('ndac_mode1_channel7');//通道7
    const ndac_mode1_channel7_data = document.getElementById('ndac_mode1_channel7_data');//通道7的数据
    const ndac_mode1_channel8 = document.getElementById('ndac_mode1_channel8');//通道8
    const ndac_mode1_channel8_data = document.getElementById('ndac_mode1_channel8_data');//通道8的数据
    const ndac_mode1_channel9 = document.getElementById('ndac_mode1_channel9');//通道9
    const ndac_mode1_channel9_data = document.getElementById('ndac_mode1_channel9_data');//通道9的数据
    const ndac_mode1_channel10 = document.getElementById('ndac_mode1_channel10');//通道10
    const ndac_mode1_channel10_data = document.getElementById('ndac_mode1_channel10_data');//通道10的数据
    const ndac_mode1_channel11 = document.getElementById('ndac_mode1_channel11');//通道11
    const ndac_mode1_channel11_data = document.getElementById('ndac_mode1_channel11_data');//通道11的数据
    const ndac_mode1_channel12 = document.getElementById('ndac_mode1_channel12');//通道12
    const ndac_mode1_channel12_data = document.getElementById('ndac_mode1_channel12_data');//通道12的数据
    const ndac_mode1_channel13 = document.getElementById('ndac_mode1_channel13');//通道13
    const ndac_mode1_channel13_data = document.getElementById('ndac_mode1_channel13_data');//通道13的数据
    const ndac_mode1_channel14 = document.getElementById('ndac_mode1_channel14');//通道14
    const ndac_mode1_channel14_data = document.getElementById('ndac_mode1_channel14_data');//通道14的数据
    const ndac_mode1_channel15 = document.getElementById('ndac_mode1_channel15');//通道15
    const ndac_mode1_channel15_data = document.getElementById('ndac_mode1_channel15_data');//通道15的数据
    const ndac_mode1_channel16 = document.getElementById('ndac_mode1_channel16');//通道16
    const ndac_mode1_channel16_data = document.getElementById('ndac_mode1_channel16_data');//通道16的数据
    switch (ndac_mode1_cali_partValue) {
        case "1":
            if (ndac_mode1_channel1.checked) {
                const ndac_mode1_channel1_one_test1 = document.getElementById('ndac_mode1_channel1_one_test1')//实际值1
                ndac_mode1_channel1_one_test1.value = ndac_mode1_channel1_data.value;
            }
            if (ndac_mode1_channel2.checked) {
                const ndac_mode1_channel2_one_test1 = document.getElementById('ndac_mode1_channel2_one_test1');
                ndac_mode1_channel2_one_test1.value = ndac_mode1_channel2_data.value;
            }
            if (ndac_mode1_channel3.checked) {
                const ndac_mode1_channel3_one_test1 = document.getElementById('ndac_mode1_channel3_one_test1');
                ndac_mode1_channel3_one_test1.value = ndac_mode1_channel3_data.value;
            }
            if (ndac_mode1_channel4.checked) {
                const ndac_mode1_channel4_one_test1 = document.getElementById('ndac_mode1_channel4_one_test1');
                ndac_mode1_channel4_one_test1.value = ndac_mode1_channel4_data.value;
            }
            if (ndac_mode1_channel5.checked) {
                const ndac_mode1_channel5_one_test1 = document.getElementById('ndac_mode1_channel5_one_test1');
                ndac_mode1_channel5_one_test1.value = ndac_mode1_channel5_data.value;
            }
            if (ndac_mode1_channel6.checked) {
                const ndac_mode1_channel6_one_test1 = document.getElementById('ndac_mode1_channel6_one_test1');
                ndac_mode1_channel6_one_test1.value = ndac_mode1_channel6_data.value;
            }
            if (ndac_mode1_channel7.checked) {
                const ndac_mode1_channel7_one_test1 = document.getElementById('ndac_mode1_channel7_one_test1');
                ndac_mode1_channel7_one_test1.value = ndac_mode1_channel7_data.value;
            }
            if (ndac_mode1_channel8.checked) {
                const ndac_mode1_channel8_one_test1 = document.getElementById('ndac_mode1_channel8_one_test1');
                ndac_mode1_channel8_one_test1.value = ndac_mode1_channel8_data.value;
            }
            if (ndac_mode1_channel9.checked) {
                const ndac_mode1_channel9_one_test1 = document.getElementById('ndac_mode1_channel9_one_test1');
                ndac_mode1_channel9_one_test1.value = ndac_mode1_channel9_data.value;
            }
            if (ndac_mode1_channel10.checked) {
                const ndac_mode1_channel10_one_test1 = document.getElementById('ndac_mode1_channel10_one_test1');
                ndac_mode1_channel10_one_test1.value = ndac_mode1_channel10_data.value;
            }
            if (ndac_mode1_channel11.checked) {
                const ndac_mode1_channel11_one_test1 = document.getElementById('ndac_mode1_channel11_one_test1');
                ndac_mode1_channel11_one_test1.value = ndac_mode1_channel11_data.value;
            }
            if (ndac_mode1_channel12.checked) {
                const ndac_mode1_channel12_one_test1 = document.getElementById('ndac_mode1_channel12_one_test1')
                ndac_mode1_channel12_one_test1.value = ndac_mode1_channel12_data.value
            }
            if (ndac_mode1_channel13.checked) {
                const ndac_mode1_channel13_one_test1 = document.getElementById('ndac_mode1_channel13_one_test1')
                ndac_mode1_channel13_one_test1.value = ndac_mode1_channel13_data.value
            }
            if (ndac_mode1_channel14.checked) {
                const ndac_mode1_channel14_one_test1 = document.getElementById('ndac_mode1_channel14_one_test1')
                ndac_mode1_channel14_one_test1.value = ndac_mode1_channel14_data.value
            }
            if (ndac_mode1_channel15.checked) {
                const ndac_mode1_channel15_one_test1 = document.getElementById('ndac_mode1_channel15_one_test1')
                ndac_mode1_channel15_one_test1.value = ndac_mode1_channel15_data.value
            }
            if (ndac_mode1_channel16.checked) {
                const ndac_mode1_channel16_one_test1 = document.getElementById('ndac_mode1_channel16_one_test1')
                ndac_mode1_channel16_one_test1.value = ndac_mode1_channel16_data.value
            }
            break;
        case "2":
            if (ndac_mode1_channel1.checked) {
                const ndac_mode1_channel1_two_test1 = document.getElementById('ndac_mode1_channel1_two_test1');
                ndac_mode1_channel1_two_test1.value = ndac_mode1_channel1_data.value;
            }
            if (ndac_mode1_channel2.checked) {
                const ndac_mode1_channel2_two_test1 = document.getElementById('ndac_mode1_channel2_two_test1');
                ndac_mode1_channel2_two_test1.value = ndac_mode1_channel2_data.value;
            }
            if (ndac_mode1_channel3.checked) {
                const ndac_mode1_channel3_two_test1 = document.getElementById('ndac_mode1_channel3_two_test1');
                ndac_mode1_channel3_two_test1.value = ndac_mode1_channel3_data.value;
            }
            if (ndac_mode1_channel4.checked) {
                const ndac_mode1_channel4_two_test1 = document.getElementById('ndac_mode1_channel4_two_test1');
                ndac_mode1_channel4_two_test1.value = ndac_mode1_channel4_data.value;
            }
            if (ndac_mode1_channel5.checked) {
                const ndac_mode1_channel5_two_test1 = document.getElementById('ndac_mode1_channel5_two_test1');
                ndac_mode1_channel5_two_test1.value = ndac_mode1_channel5_data.value;
            }
            if (ndac_mode1_channel6.checked) {
                const ndac_mode1_channel6_two_test1 = document.getElementById('ndac_mode1_channel6_two_test1');
                ndac_mode1_channel6_two_test1.value = ndac_mode1_channel6_data.value;
            }
            if (ndac_mode1_channel7.checked) {
                const ndac_mode1_channel7_two_test1 = document.getElementById('ndac_mode1_channel7_two_test1');
                ndac_mode1_channel7_two_test1.value = ndac_mode1_channel7_data.value;
            }
            if (ndac_mode1_channel8.checked) {
                const ndac_mode1_channel8_two_test1 = document.getElementById('ndac_mode1_channel8_two_test1');
                ndac_mode1_channel8_two_test1.value = ndac_mode1_channel8_data.value;
            }
            if (ndac_mode1_channel9.checked) {
                const ndac_mode1_channel9_two_test1 = document.getElementById('ndac_mode1_channel9_two_test1');
                ndac_mode1_channel9_two_test1.value = ndac_mode1_channel9_data.value;
            }
            if (ndac_mode1_channel10.checked) {
                const ndac_mode1_channel10_two_test1 = document.getElementById('ndac_mode1_channel10_two_test1');
                ndac_mode1_channel10_two_test1.value = ndac_mode1_channel10_data.value;
            }
            if (ndac_mode1_channel11.checked) {
                const ndac_mode1_channel11_two_test1 = document.getElementById('ndac_mode1_channel11_two_test1');
                ndac_mode1_channel11_two_test1.value = ndac_mode1_channel11_data.value;
            }
            if (ndac_mode1_channel12.checked) {
                const ndac_mode1_channel12_two_test1 = document.getElementById('ndac_mode1_channel12_two_test1')
                ndac_mode1_channel12_two_test1.value = ndac_mode1_channel12_data.value
            }
            if (ndac_mode1_channel13.checked) {
                const ndac_mode1_channel13_two_test1 = document.getElementById('ndac_mode1_channel13_two_test1')
                ndac_mode1_channel13_two_test1.value = ndac_mode1_channel13_data.value
            }
            if (ndac_mode1_channel14.checked) {
                const ndac_mode1_channel14_two_test1 = document.getElementById('ndac_mode1_channel14_two_test1')
                ndac_mode1_channel14_two_test1.value = ndac_mode1_channel14_data.value
            }
            if (ndac_mode1_channel15.checked) {
                const ndac_mode1_channel15_two_test1 = document.getElementById('ndac_mode1_channel15_two_test1')
                ndac_mode1_channel15_two_test1.value = ndac_mode1_channel15_data.value
            }
            if (ndac_mode1_channel16.checked) {
                const ndac_mode1_channel16_two_test1 = document.getElementById('ndac_mode1_channel16_two_test1')
                ndac_mode1_channel16_two_test1.value = ndac_mode1_channel16_data.value
            }
            break;
        case "3":
            if (ndac_mode1_channel1.checked) {
                const ndac_mode1_channel1_three_test1 = document.getElementById('ndac_mode1_channel1_three_test1');
                ndac_mode1_channel1_three_test1.value = ndac_mode1_channel1_data.value;
            }
            if (ndac_mode1_channel2.checked) {
                const ndac_mode1_channel2_three_test1 = document.getElementById('ndac_mode1_channel2_three_test1');
                ndac_mode1_channel2_three_test1.value = ndac_mode1_channel2_data.value;
            }
            if (ndac_mode1_channel3.checked) {
                const ndac_mode1_channel3_three_test1 = document.getElementById('ndac_mode1_channel3_three_test1');
                ndac_mode1_channel3_three_test1.value = ndac_mode1_channel3_data.value;
            }
            if (ndac_mode1_channel4.checked) {
                const ndac_mode1_channel4_three_test1 = document.getElementById('ndac_mode1_channel4_three_test1');
                ndac_mode1_channel4_three_test1.value = ndac_mode1_channel4_data.value;
            }
            if (ndac_mode1_channel5.checked) {
                const ndac_mode1_channel5_three_test1 = document.getElementById('ndac_mode1_channel5_three_test1');
                ndac_mode1_channel5_three_test1.value = ndac_mode1_channel5_data.value;
            }
            if (ndac_mode1_channel6.checked) {
                const ndac_mode1_channel6_three_test1 = document.getElementById('ndac_mode1_channel6_three_test1');
                ndac_mode1_channel6_three_test1.value = ndac_mode1_channel6_data.value;
            }
            if (ndac_mode1_channel7.checked) {
                const ndac_mode1_channel7_three_test1 = document.getElementById('ndac_mode1_channel7_three_test1');
                ndac_mode1_channel7_three_test1.value = ndac_mode1_channel7_data.value;
            }
            if (ndac_mode1_channel8.checked) {
                const ndac_mode1_channel8_three_test1 = document.getElementById('ndac_mode1_channel8_three_test1');
                ndac_mode1_channel8_three_test1.value = ndac_mode1_channel8_data.value;
            }
            if (ndac_mode1_channel9.checked) {
                const ndac_mode1_channel9_three_test1 = document.getElementById('ndac_mode1_channel9_three_test1');
                ndac_mode1_channel9_three_test1.value = ndac_mode1_channel9_data.value;
            }
            if (ndac_mode1_channel10.checked) {
                const ndac_mode1_channel10_three_test1 = document.getElementById('ndac_mode1_channel10_three_test1');
                ndac_mode1_channel10_three_test1.value = ndac_mode1_channel10_data.value;
            }
            if (ndac_mode1_channel11.checked) {
                const ndac_mode1_channel11_three_test1 = document.getElementById('ndac_mode1_channel11_three_test1');
                ndac_mode1_channel11_three_test1.value = ndac_mode1_channel11_data.value;
            }
            if (ndac_mode1_channel12.checked) {
                const ndac_mode1_channel12_three_test1 = document.getElementById('ndac_mode1_channel12_three_test1')
                ndac_mode1_channel12_three_test1.value = ndac_mode1_channel12_data.value
            }
            if (ndac_mode1_channel13.checked) {
                const ndac_mode1_channel13_three_test1 = document.getElementById('ndac_mode1_channel13_three_test1')
                ndac_mode1_channel13_three_test1.value = ndac_mode1_channel13_data.value
            }
            if (ndac_mode1_channel14.checked) {
                const ndac_mode1_channel14_three_test1 = document.getElementById('ndac_mode1_channel14_three_test1')
                ndac_mode1_channel14_three_test1.value = ndac_mode1_channel14_data.value
            }
            if (ndac_mode1_channel15.checked) {
                const ndac_mode1_channel15_three_test1 = document.getElementById('ndac_mode1_channel15_three_test1')
                ndac_mode1_channel15_three_test1.value = ndac_mode1_channel15_data.value
            }
            if (ndac_mode1_channel16.checked) {
                const ndac_mode1_channel16_three_test1 = document.getElementById('ndac_mode1_channel16_three_test1')
                ndac_mode1_channel16_three_test1.value = ndac_mode1_channel16_data.value
            }
            break;
        case "4":
            if (ndac_mode1_channel1.checked) {
                const ndac_mode1_channel1_four_test1 = document.getElementById('ndac_mode1_channel1_four_test1');
                ndac_mode1_channel1_four_test1.value = ndac_mode1_channel1_data.value;
            }
            if (ndac_mode1_channel2.checked) {
                const ndac_mode1_channel2_four_test1 = document.getElementById('ndac_mode1_channel2_four_test1');
                ndac_mode1_channel2_four_test1.value = ndac_mode1_channel2_data.value;
            }
            if (ndac_mode1_channel3.checked) {
                const ndac_mode1_channel3_four_test1 = document.getElementById('ndac_mode1_channel3_four_test1');
                ndac_mode1_channel3_four_test1.value = ndac_mode1_channel3_data.value;
            }
            if (ndac_mode1_channel4.checked) {
                const ndac_mode1_channel4_four_test1 = document.getElementById('ndac_mode1_channel4_four_test1');
                ndac_mode1_channel4_four_test1.value = ndac_mode1_channel4_data.value;
            }
            if (ndac_mode1_channel5.checked) {
                const ndac_mode1_channel5_four_test1 = document.getElementById('ndac_mode1_channel5_four_test1');
                ndac_mode1_channel5_four_test1.value = ndac_mode1_channel5_data.value;
            }
            if (ndac_mode1_channel6.checked) {
                const ndac_mode1_channel6_four_test1 = document.getElementById('ndac_mode1_channel6_four_test1');
                ndac_mode1_channel6_four_test1.value = ndac_mode1_channel6_data.value;
            }
            if (ndac_mode1_channel7.checked) {
                const ndac_mode1_channel7_four_test1 = document.getElementById('ndac_mode1_channel7_four_test1');
                ndac_mode1_channel7_four_test1.value = ndac_mode1_channel7_data.value;
            }
            if (ndac_mode1_channel8.checked) {
                const ndac_mode1_channel8_four_test1 = document.getElementById('ndac_mode1_channel8_four_test1');
                ndac_mode1_channel8_four_test1.value = ndac_mode1_channel8_data.value;
            }
            if (ndac_mode1_channel9.checked) {
                const ndac_mode1_channel9_four_test1 = document.getElementById('ndac_mode1_channel9_four_test1');
                ndac_mode1_channel9_four_test1.value = ndac_mode1_channel9_data.value;
            }
            if (ndac_mode1_channel10.checked) {
                const ndac_mode1_channel10_four_test1 = document.getElementById('ndac_mode1_channel10_four_test1');
                ndac_mode1_channel10_four_test1.value = ndac_mode1_channel10_data.value;
            }
            if (ndac_mode1_channel11.checked) {
                const ndac_mode1_channel11_four_test1 = document.getElementById('ndac_mode1_channel11_four_test1');
                ndac_mode1_channel11_four_test1.value = ndac_mode1_channel11_data.value;
            }
            if (ndac_mode1_channel12.checked) {
                const ndac_mode1_channel12_four_test1 = document.getElementById('ndac_mode1_channel12_four_test1')
                ndac_mode1_channel12_four_test1.value = ndac_mode1_channel12_data.value
            }
            if (ndac_mode1_channel13.checked) {
                const ndac_mode1_channel13_four_test1 = document.getElementById('ndac_mode1_channel13_four_test1')
                ndac_mode1_channel13_four_test1.value = ndac_mode1_channel13_data.value
            }
            if (ndac_mode1_channel14.checked) {
                const ndac_mode1_channel14_four_test1 = document.getElementById('ndac_mode1_channel14_four_test1')
                ndac_mode1_channel14_four_test1.value = ndac_mode1_channel14_data.value
            }
            if (ndac_mode1_channel15.checked) {
                const ndac_mode1_channel15_four_test1 = document.getElementById('ndac_mode1_channel15_four_test1')
                ndac_mode1_channel15_four_test1.value = ndac_mode1_channel15_data.value
            }
            if (ndac_mode1_channel16.checked) {
                const ndac_mode1_channel16_four_test1 = document.getElementById('ndac_mode1_channel16_four_test1')
                ndac_mode1_channel16_four_test1.value = ndac_mode1_channel16_data.value
            }
            break;
    }
})
/**
* 模块名:
* 代码描述:获取实际值2
* 作者:Crow
* 创建时间:2025/03/23 15:39:32
*/
const nadc_mode1_testValue2 = document.getElementById('nadc_mode1_testValue2');
nadc_mode1_testValue2.addEventListener('click', () => {
    const ndac_mode1_cali_part = document.getElementById('ndac_mode1_cali_part');//定标段几的值
    const ndac_mode1_cali_partValue = ndac_mode1_cali_part.value;
    const channelCheckboxes = document.querySelectorAll('.checkbox'); // 假设所有通道复选框的类名为 checkbox
    let isTestValue1Selected = false;
    // 检查是否有通道被选中
    channelCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
            isTestValue1Selected = true;
        }
    });
    if (!isTestValue1Selected) {
        const ndac_mode1_dialog = document.getElementById('ndac_mode1_dialog');
        const ndac_mode1_dialog_label = document.getElementById('ndac_mode1_dialog_label');
        ndac_mode1_dialog.style.display = 'block';
        ndac_mode1_dialog_label.innerText = '请至少选择一个通道\n获取测试值2';
        setTimeout(() => {
            ndac_mode1_dialog.style.display = 'none';
        }, 1000);
        return; // 如果没有通道被选中，直接返回，不执行后续代码
    }
    const ndac_mode1_channel1 = document.getElementById('ndac_mode1_channel1');//通道1
    const ndac_mode1_channel1_data = document.getElementById('ndac_mode1_channel1_data');//通道1的信息
    const ndac_mode1_channel2 = document.getElementById('ndac_mode1_channel2');//通道2
    const ndac_mode1_channel2_data = document.getElementById('ndac_mode1_channel2_data');//通道2的值
    const ndac_mode1_channel3 = document.getElementById('ndac_mode1_channel3');//通道3
    const ndac_mode1_channel3_data = document.getElementById('ndac_mode1_channel3_data');//通道3的数据
    const ndac_mode1_channel4 = document.getElementById('ndac_mode1_channel4');//通道4
    const ndac_mode1_channel4_data = document.getElementById('ndac_mode1_channel4_data');//通道4的数据
    const ndac_mode1_channel5 = document.getElementById('ndac_mode1_channel5');//通道5
    const ndac_mode1_channel5_data = document.getElementById('ndac_mode1_channel5_data');//通道5的数据
    const ndac_mode1_channel6 = document.getElementById('ndac_mode1_channel6');//通道6
    const ndac_mode1_channel6_data = document.getElementById('ndac_mode1_channel6_data');//通道6的数据
    const ndac_mode1_channel7 = document.getElementById('ndac_mode1_channel7');//通道7
    const ndac_mode1_channel7_data = document.getElementById('ndac_mode1_channel7_data');//通道7的数据
    const ndac_mode1_channel8 = document.getElementById('ndac_mode1_channel8');//通道8
    const ndac_mode1_channel8_data = document.getElementById('ndac_mode1_channel8_data');//通道8的数据
    const ndac_mode1_channel9 = document.getElementById('ndac_mode1_channel9');//通道9
    const ndac_mode1_channel9_data = document.getElementById('ndac_mode1_channel9_data');//通道9的数据
    const ndac_mode1_channel10 = document.getElementById('ndac_mode1_channel10');//通道10
    const ndac_mode1_channel10_data = document.getElementById('ndac_mode1_channel10_data');//通道10的数据
    const ndac_mode1_channel11 = document.getElementById('ndac_mode1_channel11');//通道11
    const ndac_mode1_channel11_data = document.getElementById('ndac_mode1_channel11_data');//通道11的数据
    const ndac_mode1_channel12 = document.getElementById('ndac_mode1_channel12');//通道12
    const ndac_mode1_channel12_data = document.getElementById('ndac_mode1_channel12_data');//通道12的数据
    const ndac_mode1_channel13 = document.getElementById('ndac_mode1_channel13');//通道13
    const ndac_mode1_channel13_data = document.getElementById('ndac_mode1_channel13_data');//通道13的数据
    const ndac_mode1_channel14 = document.getElementById('ndac_mode1_channel14');//通道14
    const ndac_mode1_channel14_data = document.getElementById('ndac_mode1_channel14_data');//通道14的数据
    const ndac_mode1_channel15 = document.getElementById('ndac_mode1_channel15');//通道15
    const ndac_mode1_channel15_data = document.getElementById('ndac_mode1_channel15_data');//通道15的数据
    const ndac_mode1_channel16 = document.getElementById('ndac_mode1_channel16');//通道16
    const ndac_mode1_channel16_data = document.getElementById('ndac_mode1_channel16_data');//通道16的数据
    switch (ndac_mode1_cali_partValue) {
        case "1":
            if (ndac_mode1_channel1.checked) {
                const ndac_mode1_channel1_one_test2 = document.getElementById('ndac_mode1_channel1_one_test2')//实际值1
                ndac_mode1_channel1_one_test2.value = ndac_mode1_channel1_data.value;
            }
            if (ndac_mode1_channel2.checked) {
                const ndac_mode1_channel2_one_test2 = document.getElementById('ndac_mode1_channel2_one_test2');
                ndac_mode1_channel2_one_test2.value = ndac_mode1_channel2_data.value;
            }
            if (ndac_mode1_channel3.checked) {
                const ndac_mode1_channel3_one_test2 = document.getElementById('ndac_mode1_channel3_one_test2');
                ndac_mode1_channel3_one_test2.value = ndac_mode1_channel3_data.value;
            }
            if (ndac_mode1_channel4.checked) {
                const ndac_mode1_channel4_one_test2 = document.getElementById('ndac_mode1_channel4_one_test2');
                ndac_mode1_channel4_one_test2.value = ndac_mode1_channel4_data.value;
            }
            if (ndac_mode1_channel5.checked) {
                const ndac_mode1_channel5_one_test2 = document.getElementById('ndac_mode1_channel5_one_test2');
                ndac_mode1_channel5_one_test2.value = ndac_mode1_channel5_data.value;
            }
            if (ndac_mode1_channel6.checked) {
                const ndac_mode1_channel6_one_test2 = document.getElementById('ndac_mode1_channel6_one_test2');
                ndac_mode1_channel6_one_test2.value = ndac_mode1_channel6_data.value;
            }
            if (ndac_mode1_channel7.checked) {
                const ndac_mode1_channel7_one_test2 = document.getElementById('ndac_mode1_channel7_one_test2');
                ndac_mode1_channel7_one_test2.value = ndac_mode1_channel7_data.value;
            }
            if (ndac_mode1_channel8.checked) {
                const ndac_mode1_channel8_one_test2 = document.getElementById('ndac_mode1_channel8_one_test2');
                ndac_mode1_channel8_one_test2.value = ndac_mode1_channel8_data.value;
            }
            if (ndac_mode1_channel9.checked) {
                const ndac_mode1_channel9_one_test2 = document.getElementById('ndac_mode1_channel9_one_test2');
                ndac_mode1_channel9_one_test2.value = ndac_mode1_channel9_data.value;
            }
            if (ndac_mode1_channel10.checked) {
                const ndac_mode1_channel10_one_test2 = document.getElementById('ndac_mode1_channel10_one_test2');
                ndac_mode1_channel10_one_test2.value = ndac_mode1_channel10_data.value;
            }
            if (ndac_mode1_channel11.checked) {
                const ndac_mode1_channel11_one_test2 = document.getElementById('ndac_mode1_channel11_one_test2');
                ndac_mode1_channel11_one_test2.value = ndac_mode1_channel11_data.value;
            }
            if (ndac_mode1_channel12.checked) {
                const ndac_mode1_channel12_one_test2 = document.getElementById('ndac_mode1_channel12_one_test2');
                ndac_mode1_channel12_one_test2.value = ndac_mode1_channel12_data.value;
            }
            if (ndac_mode1_channel13.checked) {
                const ndac_mode1_channel13_one_test2 = document.getElementById('ndac_mode1_channel13_one_test2');
                ndac_mode1_channel13_one_test2.value = ndac_mode1_channel13_data.value;
            }
            if (ndac_mode1_channel14.checked) {
                const ndac_mode1_channel14_one_test2 = document.getElementById('ndac_mode1_channel14_one_test2');
                ndac_mode1_channel14_one_test2.value = ndac_mode1_channel14_data.value;
            }
            if (ndac_mode1_channel15.checked) {
                const ndac_mode1_channel15_one_test2 = document.getElementById('ndac_mode1_channel15_one_test2');
                ndac_mode1_channel15_one_test2.value = ndac_mode1_channel15_data.value;
            }
            if (ndac_mode1_channel16.checked) {
                const ndac_mode1_channel16_one_test2 = document.getElementById('ndac_mode1_channel16_one_test2');
                ndac_mode1_channel16_one_test2.value = ndac_mode1_channel16_data.value;
            }
            break;
        case "2":
            if (ndac_mode1_channel1.checked) {
                const ndac_mode1_channel1_two_test2 = document.getElementById('ndac_mode1_channel1_two_test2');
                ndac_mode1_channel1_two_test2.value = ndac_mode1_channel1_data.value;
            }
            if (ndac_mode1_channel2.checked) {
                const ndac_mode1_channel2_two_test2 = document.getElementById('ndac_mode1_channel2_two_test2');
                ndac_mode1_channel2_two_test2.value = ndac_mode1_channel2_data.value;
            }
            if (ndac_mode1_channel3.checked) {
                const ndac_mode1_channel3_two_test2 = document.getElementById('ndac_mode1_channel3_two_test2');
                ndac_mode1_channel3_two_test2.value = ndac_mode1_channel3_data.value;
            }
            if (ndac_mode1_channel4.checked) {
                const ndac_mode1_channel4_two_test2 = document.getElementById('ndac_mode1_channel4_two_test2');
                ndac_mode1_channel4_two_test2.value = ndac_mode1_channel4_data.value;
            }
            if (ndac_mode1_channel5.checked) {
                const ndac_mode1_channel5_two_test2 = document.getElementById('ndac_mode1_channel5_two_test2');
                ndac_mode1_channel5_two_test2.value = ndac_mode1_channel5_data.value;
            }
            if (ndac_mode1_channel6.checked) {
                const ndac_mode1_channel6_two_test2 = document.getElementById('ndac_mode1_channel6_two_test2');
                ndac_mode1_channel6_two_test2.value = ndac_mode1_channel6_data.value;
            }
            if (ndac_mode1_channel7.checked) {
                const ndac_mode1_channel7_two_test2 = document.getElementById('ndac_mode1_channel7_two_test2');
                ndac_mode1_channel7_two_test2.value = ndac_mode1_channel7_data.value;
            }
            if (ndac_mode1_channel8.checked) {
                const ndac_mode1_channel8_two_test2 = document.getElementById('ndac_mode1_channel8_two_test2');
                ndac_mode1_channel8_two_test2.value = ndac_mode1_channel8_data.value;
            }
            if (ndac_mode1_channel9.checked) {
                const ndac_mode1_channel9_two_test2 = document.getElementById('ndac_mode1_channel9_two_test2');
                ndac_mode1_channel9_two_test2.value = ndac_mode1_channel9_data.value;
            }
            if (ndac_mode1_channel10.checked) {
                const ndac_mode1_channel10_two_test2 = document.getElementById('ndac_mode1_channel10_two_test2');
                ndac_mode1_channel10_two_test2.value = ndac_mode1_channel10_data.value;
            }
            if (ndac_mode1_channel11.checked) {
                const ndac_mode1_channel11_two_test2 = document.getElementById('ndac_mode1_channel11_two_test2');
                ndac_mode1_channel11_two_test2.value = ndac_mode1_channel11_data.value;
            }
            if (ndac_mode1_channel12.checked) {
                const ndac_mode1_channel12_two_test2 = document.getElementById('ndac_mode1_channel12_two_test2');
                ndac_mode1_channel12_two_test2.value = ndac_mode1_channel12_data.value;
            }
            if (ndac_mode1_channel13.checked) {
                const ndac_mode1_channel13_two_test2 = document.getElementById('ndac_mode1_channel13_two_test2');
                ndac_mode1_channel13_two_test2.value = ndac_mode1_channel13_data.value;
            }
            if (ndac_mode1_channel14.checked) {
                const ndac_mode1_channel14_two_test2 = document.getElementById('ndac_mode1_channel14_two_test2');
                ndac_mode1_channel14_two_test2.value = ndac_mode1_channel14_data.value;
            }
            if (ndac_mode1_channel15.checked) {
                const ndac_mode1_channel15_two_test2 = document.getElementById('ndac_mode1_channel15_two_test2');
                ndac_mode1_channel15_two_test2.value = ndac_mode1_channel15_data.value;
            }
            if (ndac_mode1_channel16.checked) {
                const ndac_mode1_channel16_two_test2 = document.getElementById('ndac_mode1_channel16_two_test2');
                ndac_mode1_channel16_two_test2.value = ndac_mode1_channel16_data.value;
            }
            break;
        case "3":
            if (ndac_mode1_channel1.checked) {
                const ndac_mode1_channel1_three_test2 = document.getElementById('ndac_mode1_channel1_three_test2');
                ndac_mode1_channel1_three_test2.value = ndac_mode1_channel1_data.value;
            }
            if (ndac_mode1_channel2.checked) {
                const ndac_mode1_channel2_three_test2 = document.getElementById('ndac_mode1_channel2_three_test2');
                ndac_mode1_channel2_three_test2.value = ndac_mode1_channel2_data.value;
            }
            if (ndac_mode1_channel3.checked) {
                const ndac_mode1_channel3_three_test2 = document.getElementById('ndac_mode1_channel3_three_test2');
                ndac_mode1_channel3_three_test2.value = ndac_mode1_channel3_data.value;
            }
            if (ndac_mode1_channel4.checked) {
                const ndac_mode1_channel4_three_test2 = document.getElementById('ndac_mode1_channel4_three_test2');
                ndac_mode1_channel4_three_test2.value = ndac_mode1_channel4_data.value;
            }
            if (ndac_mode1_channel5.checked) {
                const ndac_mode1_channel5_three_test2 = document.getElementById('ndac_mode1_channel5_three_test2');
                ndac_mode1_channel5_three_test2.value = ndac_mode1_channel5_data.value;
            }
            if (ndac_mode1_channel6.checked) {
                const ndac_mode1_channel6_three_test2 = document.getElementById('ndac_mode1_channel6_three_test2');
                ndac_mode1_channel6_three_test2.value = ndac_mode1_channel6_data.value;
            }
            if (ndac_mode1_channel7.checked) {
                const ndac_mode1_channel7_three_test2 = document.getElementById('ndac_mode1_channel7_three_test2');
                ndac_mode1_channel7_three_test2.value = ndac_mode1_channel7_data.value;
            }
            if (ndac_mode1_channel8.checked) {
                const ndac_mode1_channel8_three_test2 = document.getElementById('ndac_mode1_channel8_three_test2');
                ndac_mode1_channel8_three_test2.value = ndac_mode1_channel8_data.value;
            }
            if (ndac_mode1_channel9.checked) {
                const ndac_mode1_channel9_three_test2 = document.getElementById('ndac_mode1_channel9_three_test2');
                ndac_mode1_channel9_three_test2.value = ndac_mode1_channel9_data.value;
            }
            if (ndac_mode1_channel10.checked) {
                const ndac_mode1_channel10_three_test2 = document.getElementById('ndac_mode1_channel10_three_test2');
                ndac_mode1_channel10_three_test2.value = ndac_mode1_channel10_data.value;
            }
            if (ndac_mode1_channel11.checked) {
                const ndac_mode1_channel11_three_test2 = document.getElementById('ndac_mode1_channel11_three_test2');
                ndac_mode1_channel11_three_test2.value = ndac_mode1_channel11_data.value;
            }
            if (ndac_mode1_channel12.checked) {
                const ndac_mode1_channel12_three_test2 = document.getElementById('ndac_mode1_channel12_three_test2');
                ndac_mode1_channel12_three_test2.value = ndac_mode1_channel12_data.value;
            }
            if (ndac_mode1_channel13.checked) {
                const ndac_mode1_channel13_three_test2 = document.getElementById('ndac_mode1_channel13_three_test2');
                ndac_mode1_channel13_three_test2.value = ndac_mode1_channel13_data.value;
            }
            if (ndac_mode1_channel14.checked) {
                const ndac_mode1_channel14_three_test2 = document.getElementById('ndac_mode1_channel14_three_test2');
                ndac_mode1_channel14_three_test2.value = ndac_mode1_channel14_data.value;
            }
            if (ndac_mode1_channel15.checked) {
                const ndac_mode1_channel15_three_test2 = document.getElementById('ndac_mode1_channel15_three_test2');
                ndac_mode1_channel15_three_test2.value = ndac_mode1_channel15_data.value;
            }
            if (ndac_mode1_channel16.checked) {
                const ndac_mode1_channel16_three_test2 = document.getElementById('ndac_mode1_channel16_three_test2');
                ndac_mode1_channel16_three_test2.value = ndac_mode1_channel16_data.value;
            }
            break;
        case "4":
            if (ndac_mode1_channel1.checked) {
                const ndac_mode1_channel1_four_test2 = document.getElementById('ndac_mode1_channel1_four_test2');
                ndac_mode1_channel1_four_test2.value = ndac_mode1_channel1_data.value;
            }
            if (ndac_mode1_channel2.checked) {
                const ndac_mode1_channel2_four_test2 = document.getElementById('ndac_mode1_channel2_four_test2');
                ndac_mode1_channel2_four_test2.value = ndac_mode1_channel2_data.value;
            }
            if (ndac_mode1_channel3.checked) {
                const ndac_mode1_channel3_four_test2 = document.getElementById('ndac_mode1_channel3_four_test2');
                ndac_mode1_channel3_four_test2.value = ndac_mode1_channel3_data.value;
            }
            if (ndac_mode1_channel4.checked) {
                const ndac_mode1_channel4_four_test2 = document.getElementById('ndac_mode1_channel4_four_test2');
                ndac_mode1_channel4_four_test2.value = ndac_mode1_channel4_data.value;
            }
            if (ndac_mode1_channel5.checked) {
                const ndac_mode1_channel5_four_test2 = document.getElementById('ndac_mode1_channel5_four_test2');
                ndac_mode1_channel5_four_test2.value = ndac_mode1_channel5_data.value;
            }
            if (ndac_mode1_channel6.checked) {
                const ndac_mode1_channel6_four_test2 = document.getElementById('ndac_mode1_channel6_four_test2');
                ndac_mode1_channel6_four_test2.value = ndac_mode1_channel6_data.value;
            }
            if (ndac_mode1_channel7.checked) {
                const ndac_mode1_channel7_four_test2 = document.getElementById('ndac_mode1_channel7_four_test2');
                ndac_mode1_channel7_four_test2.value = ndac_mode1_channel7_data.value;
            }
            if (ndac_mode1_channel8.checked) {
                const ndac_mode1_channel8_four_test2 = document.getElementById('ndac_mode1_channel8_four_test2');
                ndac_mode1_channel8_four_test2.value = ndac_mode1_channel8_data.value;
            }
            if (ndac_mode1_channel9.checked) {
                const ndac_mode1_channel9_four_test2 = document.getElementById('ndac_mode1_channel9_four_test2');
                ndac_mode1_channel9_four_test2.value = ndac_mode1_channel9_data.value;
            }
            if (ndac_mode1_channel10.checked) {
                const ndac_mode1_channel10_four_test2 = document.getElementById('ndac_mode1_channel10_four_test2');
                ndac_mode1_channel10_four_test2.value = ndac_mode1_channel10_data.value;
            }
            if (ndac_mode1_channel11.checked) {
                const ndac_mode1_channel11_four_test2 = document.getElementById('ndac_mode1_channel11_four_test2');
                ndac_mode1_channel11_four_test2.value = ndac_mode1_channel11_data.value;
            }
            if (ndac_mode1_channel12.checked) {
                const ndac_mode1_channel12_four_test2 = document.getElementById('ndac_mode1_channel12_four_test2');
                ndac_mode1_channel12_four_test2.value = ndac_mode1_channel12_data.value;
            }
            if (ndac_mode1_channel13.checked) {
                const ndac_mode1_channel13_four_test2 = document.getElementById('ndac_mode1_channel13_four_test2');
                ndac_mode1_channel13_four_test2.value = ndac_mode1_channel13_data.value;
            }
            if (ndac_mode1_channel14.checked) {
                const ndac_mode1_channel14_four_test2 = document.getElementById('ndac_mode1_channel14_four_test2');
                ndac_mode1_channel14_four_test2.value = ndac_mode1_channel14_data.value;
            }
            if (ndac_mode1_channel15.checked) {
                const ndac_mode1_channel15_four_test2 = document.getElementById('ndac_mode1_channel15_four_test2');
                ndac_mode1_channel15_four_test2.value = ndac_mode1_channel15_data.value;
            }
            if (ndac_mode1_channel16.checked) {
                const ndac_mode1_channel16_four_test2 = document.getElementById('ndac_mode1_channel16_four_test2');
                ndac_mode1_channel16_four_test2.value = ndac_mode1_channel16_data.value;
            }
            break;
    }
})
/**
* 模块名:
* 代码描述:分界点操作，全是0代表1段定标1分界点1代表2段定标
* 作者:Crow
* 创建时间:2025/03/23 15:39:32
*/

// 分界点1
const nadc_mode1_demarc1_value = document.getElementById('nadc_mode1_demarc1_value');
nadc_mode1_demarc1_value.addEventListener('change', validateDemarcValues);
// 分界点2
const nadc_mode1_demarc2_value = document.getElementById('nadc_mode1_demarc2_value');
nadc_mode1_demarc2_value.addEventListener('change', validateDemarcValues);
// 分界点3
const nadc_mode1_demarc3_value = document.getElementById('nadc_mode1_demarc3_value');
nadc_mode1_demarc3_value.addEventListener('change', validateDemarcValues);
// 定义验证函数
function validateDemarcValues() {
    // const fieldset_mode1 = document.getElementById('fieldset_mode1');//fieldset恢复
    const ndac_mode1_cali_part = document.getElementById('ndac_mode1_cali_part');

    // 获取分界点值
    const demarc1 = parseFloat(nadc_mode1_demarc1_value.value) || 0;
    const demarc2 = parseFloat(nadc_mode1_demarc2_value.value) || 0;
    const demarc3 = parseFloat(nadc_mode1_demarc3_value.value) || 0;
    ndac_mode1_cali_part.innerHTML = '';



    // 检查是否满足 demarc1 > demarc2 > 0 && demarc3 === 0 
    if (demarc1 > demarc2 && demarc2 > 0 && demarc3 === 0) {
        const newOption1 = document.createElement('option');
        newOption1.setAttribute('value', '1');
        newOption1.textContent = '定标1段';
        const newOption2 = document.createElement('option');
        newOption2.setAttribute('value', '2');
        newOption2.textContent = '定标2段';
        const newOption3 = document.createElement('option');
        newOption3.setAttribute('value', '3');
        newOption3.textContent = '定标3段';
        ndac_mode1_cali_part.appendChild(newOption1);
        ndac_mode1_cali_part.appendChild(newOption2);
        ndac_mode1_cali_part.appendChild(newOption3);
        SECTIONNUM = 3; // 定标3段
        ndac_mode1_cali_part.disabled = false; // 解除禁用
        return true;
    }
    // 检查是否满足 demarc1 > demarc2 > demarc3 
    if (demarc1 > demarc2 && demarc2 > demarc3) {
        const newOption1 = document.createElement('option');
        newOption1.setAttribute('value', '1');
        newOption1.textContent = '定标1段';
        const newOption2 = document.createElement('option');
        newOption2.setAttribute('value', '2');
        newOption2.textContent = '定标2段';
        const newOption3 = document.createElement('option');
        newOption3.setAttribute('value', '3');
        newOption3.textContent = '定标3段';
        const newOption4 = document.createElement('option');
        newOption4.setAttribute('value', '4');
        newOption4.textContent = '定标4段';
        ndac_mode1_cali_part.appendChild(newOption1);
        ndac_mode1_cali_part.appendChild(newOption2);
        ndac_mode1_cali_part.appendChild(newOption3);
        ndac_mode1_cali_part.appendChild(newOption4);
        SECTIONNUM = 4; // 定标4段
        ndac_mode1_cali_part.disabled = false; // 解除禁用
        return true;
    }



    // 检查是否满足 demarc1 > 0 && demarc2 === 0 && demarc3 === 0 
    if (demarc1 > 0 && demarc2 === 0 && demarc3 === 0) {
        const newOption1 = document.createElement('option');
        newOption1.setAttribute('value', '1');
        newOption1.textContent = '定标1段';
        const newOption2 = document.createElement('option');
        newOption2.setAttribute('value', '2');
        newOption2.textContent = '定标2段';
        ndac_mode1_cali_part.appendChild(newOption1);
        ndac_mode1_cali_part.appendChild(newOption2);
        SECTIONNUM = 2; // 定标2段
        ndac_mode1_cali_part.disabled = false; // 解除禁用
        return true;
    }

    // 检查是否所有值为 0
    if (demarc1 === 0 && demarc2 === 0 && demarc3 === 0) {
        const newOption1 = document.createElement('option');
        newOption1.setAttribute('value', '1');
        newOption1.textContent = '定标1段';
        ndac_mode1_cali_part.appendChild(newOption1);
        SECTIONNUM = 1; // 定标1段
        ndac_mode1_cali_part.disabled = false; // 解除禁用
        return true;
    }

    // 检查是否满足 demarc1 < 0 && demarc2 < demarc1 && demarc3 < demarc2 
    if (demarc1 < 0 && demarc2 < demarc1 && demarc3 < demarc2) {
        const newOption1 = document.createElement('option');
        newOption1.setAttribute('value', '1');
        newOption1.textContent = '定标1段';
        const newOption2 = document.createElement('option');
        newOption2.setAttribute('value', '2');
        newOption2.textContent = '定标2段';
        const newOption3 = document.createElement('option');
        newOption3.setAttribute('value', '3');
        newOption3.textContent = '定标3段';
        const newOption4 = document.createElement('option');
        newOption4.setAttribute('value', '4');
        newOption4.textContent = '定标4段';
        ndac_mode1_cali_part.appendChild(newOption1);
        ndac_mode1_cali_part.appendChild(newOption2);
        ndac_mode1_cali_part.appendChild(newOption3);
        ndac_mode1_cali_part.appendChild(newOption4);
        SECTIONNUM = 4; // 定标4段
        ndac_mode1_cali_part.disabled = false; // 解除禁用
        return true;
    }

    // 检查是否满足 demarc1 < 0 && demarc2 < demarc1 && demarc3 === 0 
    if (demarc1 < 0 && demarc2 < demarc1 && demarc3 === 0) {
        const newOption1 = document.createElement('option');
        newOption1.setAttribute('value', '1');
        newOption1.textContent = '定标1段';
        const newOption2 = document.createElement('option');
        newOption2.setAttribute('value', '2');
        newOption2.textContent = '定标2段';
        const newOption3 = document.createElement('option');
        newOption3.setAttribute('value', '3');
        newOption3.textContent = '定标3段';
        ndac_mode1_cali_part.appendChild(newOption1);
        ndac_mode1_cali_part.appendChild(newOption2);
        ndac_mode1_cali_part.appendChild(newOption3);
        SECTIONNUM = 3; // 定标3段
        ndac_mode1_cali_part.disabled = false; // 解除禁用
        return true;
    }

    // 检查是否满足 demarc1 < 0 && demarc2 === 0 && demarc3 === 0 
    if (demarc1 < 0 && demarc2 === 0 && demarc3 === 0) {
        const newOption1 = document.createElement('option');
        newOption1.setAttribute('value', '1');
        newOption1.textContent = '定标1段';
        const newOption2 = document.createElement('option');
        newOption2.setAttribute('value', '2');
        newOption2.textContent = '定标2段';
        ndac_mode1_cali_part.appendChild(newOption1);
        ndac_mode1_cali_part.appendChild(newOption2);
        SECTIONNUM = 2; // 定标2段
        ndac_mode1_cali_part.disabled = false; // 解除禁用
        return true;
    }

    // 如果不满足上述条件，显示提示信息
    const ndac_mode1_dialog = document.getElementById('ndac_mode1_dialog');
    const ndac_mode1_dialog_label = document.getElementById('ndac_mode1_dialog_label');
    ndac_mode1_dialog.style.display = 'block';
    ndac_mode1_dialog_label.innerText = '请检查分界点条件为 0 \n或者 1 > 2 > 3';
    setTimeout(() => {
        ndac_mode1_dialog.style.display = 'none';
    }, 1000);
    const newOption1 = document.createElement('option');
    newOption1.setAttribute('value', '0');
    newOption1.textContent = '请检查分界点';
    ndac_mode1_cali_part.appendChild(newOption1);
    ndac_mode1_cali_part.disabled = true;//禁用
    return false;
}



/**
* 模块名:
* 代码描述:下载操作信息
* 作者:Crow
* 创建时间:2025/03/24 09:02:04
*/
const nadc_mode1_Page_operateinfo = document.getElementById('nadc_mode1_Page_operateinfo');
nadc_mode1_Page_operateinfo.addEventListener('click', () => {
    const mode1_demarc1_value = document.getElementById('mode1_demarc1_value');
    // alert(mode1_demarc1_value.value)
})

/**
* 模块名:nadc_mode1_application
* 代码描述:一键应用模板
* 作者:Crow
* 创建时间:2025/03/23 17:06:35
*/
const nadc_mode1_application = document.getElementById('nadc_mode1_application');
nadc_mode1_application.addEventListener('click', () => {
    const ndac_mode1_dialog = document.getElementById('ndac_mode1_dialog');
    const ndac_mode1_dialog_label = document.getElementById('ndac_mode1_dialog_label');
    const ndac_mode1_channel1 = document.getElementById('ndac_mode1_channel1');//通道1
    if (!ndac_mode1_channel1.checked) {
        ndac_mode1_dialog.style.display = 'block';
        ndac_mode1_dialog_label.innerText = '请选中通道1作为模板\n应用实际值数据'
        setTimeout(() => {
            ndac_mode1_dialog.style.display = 'none';
        }, 1000)
    } else {
        const channelCheckboxes = [
            document.getElementById('ndac_mode1_channel1'),
            document.getElementById('ndac_mode1_channel2'),
            document.getElementById('ndac_mode1_channel3'),
            document.getElementById('ndac_mode1_channel4'),
            document.getElementById('ndac_mode1_channel5'),
            document.getElementById('ndac_mode1_channel6'),
            document.getElementById('ndac_mode1_channel7'),
            document.getElementById('ndac_mode1_channel8'),
            document.getElementById('ndac_mode1_channel9'),
            document.getElementById('ndac_mode1_channel10'),
            document.getElementById('ndac_mode1_channel11'),
            document.getElementById('ndac_mode1_channel12'),
            document.getElementById('ndac_mode1_channel13'),
            document.getElementById('ndac_mode1_channel14'),
            document.getElementById('ndac_mode1_channel15'),
            document.getElementById('ndac_mode1_channel16'),
        ];
        const channeloneactual1 = [
            document.getElementById('ndac_mode1_channel1_one_actual1'),
            document.getElementById('ndac_mode1_channel2_one_actual1'),
            document.getElementById('ndac_mode1_channel3_one_actual1'),
            document.getElementById('ndac_mode1_channel4_one_actual1'),
            document.getElementById('ndac_mode1_channel5_one_actual1'),
            document.getElementById('ndac_mode1_channel6_one_actual1'),
            document.getElementById('ndac_mode1_channel7_one_actual1'),
            document.getElementById('ndac_mode1_channel8_one_actual1'),
            document.getElementById('ndac_mode1_channel9_one_actual1'),
            document.getElementById('ndac_mode1_channel10_one_actual1'),
            document.getElementById('ndac_mode1_channel11_one_actual1'),
            document.getElementById('ndac_mode1_channel12_one_actual1'),
            document.getElementById('ndac_mode1_channel13_one_actual1'),
            document.getElementById('ndac_mode1_channel14_one_actual1'),
            document.getElementById('ndac_mode1_channel15_one_actual1'),
            document.getElementById('ndac_mode1_channel16_one_actual1'),
        ];
        const channeloneactual2 = [
            document.getElementById('ndac_mode1_channel1_one_actual2'),
            document.getElementById('ndac_mode1_channel2_one_actual2'),
            document.getElementById('ndac_mode1_channel3_one_actual2'),
            document.getElementById('ndac_mode1_channel4_one_actual2'),
            document.getElementById('ndac_mode1_channel5_one_actual2'),
            document.getElementById('ndac_mode1_channel6_one_actual2'),
            document.getElementById('ndac_mode1_channel7_one_actual2'),
            document.getElementById('ndac_mode1_channel8_one_actual2'),
            document.getElementById('ndac_mode1_channel9_one_actual2'),
            document.getElementById('ndac_mode1_channel10_one_actual2'),
            document.getElementById('ndac_mode1_channel11_one_actual2'),
            document.getElementById('ndac_mode1_channel12_one_actual2'),
            document.getElementById('ndac_mode1_channel13_one_actual2'),
            document.getElementById('ndac_mode1_channel14_one_actual2'),
            document.getElementById('ndac_mode1_channel15_one_actual2'),
            document.getElementById('ndac_mode1_channel16_one_actual2'),
        ];
        const channeltwoactual1 = [
            document.getElementById('ndac_mode1_channel1_two_actual1'),
            document.getElementById('ndac_mode1_channel2_two_actual1'),
            document.getElementById('ndac_mode1_channel3_two_actual1'),
            document.getElementById('ndac_mode1_channel4_two_actual1'),
            document.getElementById('ndac_mode1_channel5_two_actual1'),
            document.getElementById('ndac_mode1_channel6_two_actual1'),
            document.getElementById('ndac_mode1_channel7_two_actual1'),
            document.getElementById('ndac_mode1_channel8_two_actual1'),
            document.getElementById('ndac_mode1_channel9_two_actual1'),
            document.getElementById('ndac_mode1_channel10_two_actual1'),
            document.getElementById('ndac_mode1_channel11_two_actual1'),
            document.getElementById('ndac_mode1_channel12_two_actual1'),
            document.getElementById('ndac_mode1_channel13_two_actual1'),
            document.getElementById('ndac_mode1_channel14_two_actual1'),
            document.getElementById('ndac_mode1_channel15_two_actual1'),
            document.getElementById('ndac_mode1_channel16_two_actual1'),
        ];
        const channeltwoactual2 = [
            document.getElementById('ndac_mode1_channel1_two_actual2'),
            document.getElementById('ndac_mode1_channel2_two_actual2'),
            document.getElementById('ndac_mode1_channel3_two_actual2'),
            document.getElementById('ndac_mode1_channel4_two_actual2'),
            document.getElementById('ndac_mode1_channel5_two_actual2'),
            document.getElementById('ndac_mode1_channel6_two_actual2'),
            document.getElementById('ndac_mode1_channel7_two_actual2'),
            document.getElementById('ndac_mode1_channel8_two_actual2'),
            document.getElementById('ndac_mode1_channel9_two_actual2'),
            document.getElementById('ndac_mode1_channel10_two_actual2'),
            document.getElementById('ndac_mode1_channel11_two_actual2'),
            document.getElementById('ndac_mode1_channel12_two_actual2'),
            document.getElementById('ndac_mode1_channel13_two_actual2'),
            document.getElementById('ndac_mode1_channel14_two_actual2'),
            document.getElementById('ndac_mode1_channel15_two_actual2'),
            document.getElementById('ndac_mode1_channel16_two_actual2'),
        ];
        const channelthreeactual1 = [
            document.getElementById('ndac_mode1_channel1_three_actual1'),
            document.getElementById('ndac_mode1_channel2_three_actual1'),
            document.getElementById('ndac_mode1_channel3_three_actual1'),
            document.getElementById('ndac_mode1_channel4_three_actual1'),
            document.getElementById('ndac_mode1_channel5_three_actual1'),
            document.getElementById('ndac_mode1_channel6_three_actual1'),
            document.getElementById('ndac_mode1_channel7_three_actual1'),
            document.getElementById('ndac_mode1_channel8_three_actual1'),
            document.getElementById('ndac_mode1_channel9_three_actual1'),
            document.getElementById('ndac_mode1_channel10_three_actual1'),
            document.getElementById('ndac_mode1_channel11_three_actual1'),
            document.getElementById('ndac_mode1_channel12_three_actual1'),
            document.getElementById('ndac_mode1_channel13_three_actual1'),
            document.getElementById('ndac_mode1_channel14_three_actual1'),
            document.getElementById('ndac_mode1_channel15_three_actual1'),
            document.getElementById('ndac_mode1_channel16_three_actual1'),
        ];
        const channelthreeactual2 = [
            document.getElementById('ndac_mode1_channel1_three_actual2'),
            document.getElementById('ndac_mode1_channel2_three_actual2'),
            document.getElementById('ndac_mode1_channel3_three_actual2'),
            document.getElementById('ndac_mode1_channel4_three_actual2'),
            document.getElementById('ndac_mode1_channel5_three_actual2'),
            document.getElementById('ndac_mode1_channel6_three_actual2'),
            document.getElementById('ndac_mode1_channel7_three_actual2'),
            document.getElementById('ndac_mode1_channel8_three_actual2'),
            document.getElementById('ndac_mode1_channel9_three_actual2'),
            document.getElementById('ndac_mode1_channel10_three_actual2'),
            document.getElementById('ndac_mode1_channel11_three_actual2'),
            document.getElementById('ndac_mode1_channel12_three_actual2'),
            document.getElementById('ndac_mode1_channel13_three_actual2'),
            document.getElementById('ndac_mode1_channel14_three_actual2'),
            document.getElementById('ndac_mode1_channel15_three_actual2'),
            document.getElementById('ndac_mode1_channel16_three_actual2'),
        ];
        const channelfouractual1 = [
            document.getElementById('ndac_mode1_channel1_four_actual1'),
            document.getElementById('ndac_mode1_channel2_four_actual1'),
            document.getElementById('ndac_mode1_channel3_four_actual1'),
            document.getElementById('ndac_mode1_channel4_four_actual1'),
            document.getElementById('ndac_mode1_channel5_four_actual1'),
            document.getElementById('ndac_mode1_channel6_four_actual1'),
            document.getElementById('ndac_mode1_channel7_four_actual1'),
            document.getElementById('ndac_mode1_channel8_four_actual1'),
            document.getElementById('ndac_mode1_channel9_four_actual1'),
            document.getElementById('ndac_mode1_channel10_four_actual1'),
            document.getElementById('ndac_mode1_channel11_four_actual1'),
            document.getElementById('ndac_mode1_channel12_four_actual1'),
            document.getElementById('ndac_mode1_channel13_four_actual1'),
            document.getElementById('ndac_mode1_channel14_four_actual1'),
            document.getElementById('ndac_mode1_channel15_four_actual1'),
            document.getElementById('ndac_mode1_channel16_four_actual1'),
        ];
        const channelfouractual2 = [
            document.getElementById('ndac_mode1_channel1_four_actual2'),
            document.getElementById('ndac_mode1_channel2_four_actual2'),
            document.getElementById('ndac_mode1_channel3_four_actual2'),
            document.getElementById('ndac_mode1_channel4_four_actual2'),
            document.getElementById('ndac_mode1_channel5_four_actual2'),
            document.getElementById('ndac_mode1_channel6_four_actual2'),
            document.getElementById('ndac_mode1_channel7_four_actual2'),
            document.getElementById('ndac_mode1_channel8_four_actual2'),
            document.getElementById('ndac_mode1_channel9_four_actual2'),
            document.getElementById('ndac_mode1_channel10_four_actual2'),
            document.getElementById('ndac_mode1_channel11_four_actual2'),
            document.getElementById('ndac_mode1_channel12_four_actual2'),
            document.getElementById('ndac_mode1_channel13_four_actual2'),
            document.getElementById('ndac_mode1_channel14_four_actual2'),
            document.getElementById('ndac_mode1_channel15_four_actual2'),
            document.getElementById('ndac_mode1_channel16_four_actual2'),
        ];
        const channeloneactual1_value = channeloneactual1[0].value; //定标段1实际值1
        const channeloneactual2_value = channeloneactual2[0].value; //定标段1实际值2
        const channeltwoactual1_value = channeltwoactual1[0].value; //定标段2实际值1
        const channeltwoactual2_value = channeltwoactual2[0].value; //定标段2实际值2
        const channelthreeactual1_value = channelthreeactual1[0].value;//定标段3实际值1
        const channelthreeactual2_value = channelthreeactual2[0].value;//定标段3实际值2
        const channelfouractual1_value = channelfouractual1[0].value;//定标段4实际值1
        const channelfouractual2_value = channelfouractual2[0].value;//定标段4实际值2
        let isAnyChannelSelected = false;
        for (let i = 1; i < channelCheckboxes.length; i++) {
            if (channelCheckboxes[i].checked) {
                isAnyChannelSelected = true;
                break;
            }
        }
        // 如果没有其他通道被选中，提示用户
        if (!isAnyChannelSelected) {
            ndac_mode1_dialog.style.display = 'block';
            ndac_mode1_dialog_label.innerText = '请至少选择一个其他通道\n(通道 2 到通道 16)'
            setTimeout(() => {
                ndac_mode1_dialog.style.display = 'none';
            }, 1000)
            return;
        }
        for (let i = 1; i < channelCheckboxes.length; i++) {
            if (channelCheckboxes[i].checked) {
                channeloneactual1[i].value = channeloneactual1_value;
                channeloneactual2[i].value = channeloneactual2_value;
                channeltwoactual1[i].value = channeltwoactual1_value;
                channeltwoactual2[i].value = channeltwoactual2_value;
                channelthreeactual1[i].value = channelthreeactual1_value;
                channelthreeactual2[i].value = channelthreeactual2_value;
                channelfouractual1[i].value = channelfouractual1_value;
                channelfouractual2[i].value = channelfouractual2_value;
            }
        }
        ndac_mode1_dialog.style.display = 'block';
        ndac_mode1_dialog_label.innerText = '一键应用执行完成'
        setTimeout(() => {
            ndac_mode1_dialog.style.display = 'none';
        }, 1000)
    }
});

/**
* 模块名:
* 代码描述:
* 作者:Crow
* 创建时间:2025/03/23 20:04:04
*/
// const sure_demarc_dialog = document.getElementById('sure_demarc_dialog');
// sure_demarc_dialog.addEventListener('click', function () {
//     const mode1_demarc1_value = document.getElementById('mode1_demarc1_value')
//     const mode1_demarc2_value = document.getElementById('mode1_demarc2_value')
//     const mode1_demarc3_value = document.getElementById('mode1_demarc3_value')
//     const mode1_demarc4_value = document.getElementById('mode1_demarc4_value')
//     const ndac_mode1_dialog = document.getElementById('ndac_mode1_dialog');
//     const ndac_mode1_dialog_label = document.getElementById('ndac_mode1_dialog_label');
//     if ((mode1_demarc1_value.value != "") && (mode1_demarc1_value.value > mode1_demarc2_value.value > mode1_demarc3_value.value > mode1_demarc4_value.value)) {
//         const ndac_mode1_demarc_dialog = document.getElementById('ndac_mode1_demarc_dialog');
//         ndac_mode1_demarc_dialog.style.display = 'none';
//         saveDemarcValue()
//     } else {
//         ndac_mode1_dialog.style.display = 'block';
//         ndac_mode1_dialog_label.innerText = '请检查分界点1不能为空\n且前者比后者大'
//         setTimeout(() => {
//             ndac_mode1_dialog.style.display = 'none';
//         }, 1000)
//     }

// });

// // 确保 saveDemarcValue 函数正确
// function saveDemarcValue() {
//     const DemarcValueToSave = {
//         demo1_demarc1_value: document.getElementById('mode1_demarc1_value').value,
//         demo1_demarc2_value: document.getElementById('mode1_demarc2_value').value,
//         demo1_demarc3_value: document.getElementById('mode1_demarc3_value').value,
//         demo1_demarc4_value: document.getElementById('mode1_demarc4_value').value,
//     };
//     Object.keys(DemarcValueToSave).forEach(key => {
//         const value = DemarcValueToSave[key];
//         sessionStorage.setItem(key, value);
//     });
// }
// // 定义 loadDemarcValue 函数
// function loadDemarcValue() {
//     const mode1_demarc1_value = sessionStorage.getItem('demo1_demarc1_value');
//     const mode1_demarc2_value = sessionStorage.getItem('demo1_demarc2_value');
//     const mode1_demarc3_value = sessionStorage.getItem('demo1_demarc3_value');
//     const mode1_demarc4_value = sessionStorage.getItem('demo1_demarc4_value');
//     document.getElementById('mode1_demarc1_value').value = mode1_demarc1_value;
//     document.getElementById('mode1_demarc2_value').value = mode1_demarc2_value;
//     document.getElementById('mode1_demarc3_value').value = mode1_demarc3_value;
//     document.getElementById('mode1_demarc4_value').value = mode1_demarc4_value;
// }

/**
* 模块名:nadc_mode1_initialize
* 代码描述:初始化K/B值
* 作者:Crow
* 创建时间:2025/03/23 20:54:16
*/
const nadc_mode1_initialize = document.getElementById('nadc_mode1_initialize');
nadc_mode1_initialize.addEventListener('click', function () {
    const ndac_mode1_board_num = document.getElementById('ndac_mode1_board_num');
    const ndac_mode1_dialog = document.getElementById('ndac_mode1_dialog');
    const ndac_mode1_dialog_label = document.getElementById('ndac_mode1_dialog_label');
    const channelCheckboxes = document.querySelectorAll('.checkbox'); // 假设所有通道复选框的类名为 checkbox
    const selectedChannels = [];
    channelCheckboxes.forEach((checkbox, index) => {
        if (checkbox.checked) {
            selectedChannels.push(index + 1); // 通道号从1开始
        }
    });
    if (selectedChannels.length > 0) {
        window.TheIPC.toMain3(100, Number(ndac_mode1_board_num.value), selectedChannels)
        ndac_mode1_dialog.style.display = 'block';
        ndac_mode1_dialog_label.innerText = '进行初始化K/B值'
        setTimeout(() => {
            ndac_mode1_dialog.style.display = 'none';
        }, 1000)
    } else {
        ndac_mode1_dialog.style.display = 'block';
        ndac_mode1_dialog_label.innerText = '请检查通道是否选择'
        setTimeout(() => {
            ndac_mode1_dialog.style.display = 'none';
        }, 1000)
    }
});
/**
* 模块名:
* 代码描述:计算K/b值
* 作者:Crow
* 创建时间:2025/03/23 17:59:11
*/
//通道1-定标1段
const ndac_mode1_channel1 = document.getElementById('ndac_mode1_channel1');
const ndac_mode1_channel1_one_actual1 = document.getElementById('ndac_mode1_channel1_one_actual1');
const ndac_mode1_channel1_one_test1 = document.getElementById('ndac_mode1_channel1_one_test1');
const ndac_mode1_channel1_one_actual2 = document.getElementById('ndac_mode1_channel1_one_actual2');
const ndac_mode1_channel1_one_test2 = document.getElementById('ndac_mode1_channel1_one_test2');
const ndac_mode1_channel1_one_k = document.getElementById('ndac_mode1_channel1_one_k');
const ndac_mode1_channel1_one_b = document.getElementById('ndac_mode1_channel1_one_b');
const ndac_mode1_channel1_error = document.getElementById('ndac_mode1_channel1_error');
const mode1_channel1_one = [ndac_mode1_channel1_one_actual1, ndac_mode1_channel1_one_actual2, ndac_mode1_channel1_one_test1, ndac_mode1_channel1_one_test2]
mode1_channel1_one.forEach(input => {
    input.addEventListener('input', function () {
        const result = calculateKandB(mode1_channel1_one, ndac_mode1_channel1_one_actual1, ndac_mode1_channel1_one_actual2, ndac_mode1_channel1_one_test1, ndac_mode1_channel1_one_test2)
        ndac_mode1_channel1_one_k.value = result.kValue;
        ndac_mode1_channel1_one_b.value = result.bValue;
        ndac_mode1_channel1_error.textContent = result.errorMessage;
    })
})




//就算KB值的方法
function calculateKandB(inputs, actual1, actual2, test1, test2) {
    //错误信息
    var errorMessage = "";
    inputs.forEach(input => {
        input.classList.remove('error', 'valid')
    })
    //获取所有值
    const x1 = parseFloat(actual1.value)
    const x2 = parseFloat(actual2.value)
    const y1 = parseFloat(test1.value)
    const y2 = parseFloat(test2.value)
    let kValue = 0;
    let bValue = 0;
    //验证输入
    let isValid = true;
    //检查是否所有字段都已经填写
    if (isNaN(x1) || isNaN(x2) || isNaN(y1) || isNaN(y2)) {
        errorMessage = "！：所有字段都必须填写数数字值";
        inputs.forEach(input => {
            if (!input.value || /\D/.test(input.value)) { // 检查是否为空或包含非数字字符
                input.classList.add('error');
            }
        });
        isValid = false;
    }
    //检查实际值1和实际值2不能为0
    if (x1 === 0 || x2 === 0) {
        errorMessage = "！：实际值1和实际值2不能为0";
        if (x1 === 0) actual1.classList.add('error')
        if (x2 === 0) actual2.classList.add('error')
        isValid = false;
    }
    //检查测试值1和测试值2不能为0
    if (y1 === 0 || y2 === 0) {
        errorMessage = "！：测试值1和测试值2不能为0";
        if (y1 === 0) test1.classList.add('error')
        if (y2 === 0) test2.classList.add('error')
        isValid = false;
    }
    //检查实际值1和实际值2不能相等
    if (x1 === x2) {
        errorMessage = "！：实际值1和实际值2不能相等";
        actual1.classList.add('error')
        actual2.classList.add('error')
        isValid = false;
    }
    //检查测试值1和测试值2不能相等
    if (y1 === y2) {
        errorMessage = "！：测试值1和测试值2不能相等";
        test1.classList.add('error')
        test2.classList.add('error')
        isValid = false;
    }
    //验证失败返回k=0,b=0
    if (!isValid) {
        kValue = 0;
        bValue = 0;
        return { kValue, bValue, errorMessage }
    }
    //所有输入有效，添加valid类
    inputs.forEach(input => {
        input.classList.add('valid');
    });
    let k = (y2 - y1) / (x2 - x1)
    // console.log(x1, x2, y1, y2)
    let b = y1 - (k * x2);
    kValue = k.toFixed(6);
    bValue = b.toFixed(6);
    return { kValue, bValue, errorMessage }
}

























// const nadc_mode1_count = document.getElementById('nadc_mode1_count');
// nadc_mode1_count.addEventListener('click', function () {
//     const channelCheckboxes = document.querySelectorAll('.checkbox'); // 假设所有通道复选框的类名为 checkbox
//     const ndac_mode1_board_num = document.getElementById('ndac_mode1_board_num');
//     //判断那个选中
//     const selectedChannels = [];
//     channelCheckboxes.forEach((checkbox, index) => {
//         if (checkbox.checked) {
//             selectedChannels.push(index + 1); // 通道号从1开始
//         }
//     })
//     const ndac_mode1_dialog = document.getElementById('ndac_mode1_dialog');
//     const ndac_mode1_dialog_label = document.getElementById('ndac_mode1_dialog_label');
//     const mode1_demarc1_value = document.getElementById('mode1_demarc1_value');//分界点1值
//     const mode1_demarc2_value = document.getElementById('mode1_demarc2_value');//分界点2值
//     const mode1_demarc3_value = document.getElementById('mode1_demarc3_value');//分界点3值
//     const mode1_demarc4_value = document.getElementById('mode1_demarc4_value');//分界点4值
//     //通道1 定标1段
//     const ndac_mode1_channel1 = document.getElementById('ndac_mode1_channel1');
//     const ndac_mode1_channel1_one_actual1 = document.getElementById('ndac_mode1_channel1_one_actual1');
//     const ndac_mode1_channel1_one_test1 = document.getElementById('ndac_mode1_channel1_one_test1');
//     const ndac_mode1_channel1_one_actual2 = document.getElementById('ndac_mode1_channel1_one_actual2');
//     const ndac_mode1_channel1_one_test2 = document.getElementById('ndac_mode1_channel1_one_test2');
//     const ndac_mode1_channel1_one_k = document.getElementById('ndac_mode1_channel1_one_k');
//     const ndac_mode1_channel1_one_b = document.getElementById('ndac_mode1_channel1_one_b');
//     //通道2 定标1段
//     const ndac_mode1_channel2 = document.getElementById('ndac_mode1_channel2');
//     const ndac_mode1_channel2_one_actual1 = document.getElementById('ndac_mode1_channel2_one_actual1');
//     const ndac_mode1_channel2_one_test1 = document.getElementById('ndac_mode1_channel2_one_test1');
//     const ndac_mode1_channel2_one_actual2 = document.getElementById('ndac_mode1_channel2_one_actual2');
//     const ndac_mode1_channel2_one_test2 = document.getElementById('ndac_mode1_channel2_one_test2');
//     const ndac_mode1_channel2_one_k = document.getElementById('ndac_mode1_channel2_one_k');
//     const ndac_mode1_channel2_one_b = document.getElementById('ndac_mode1_channel2_one_b');
//     //通道3 定标1段
//     const ndac_mode1_channel3 = document.getElementById('ndac_mode1_channel3');
//     const ndac_mode1_channel3_one_actual1 = document.getElementById('ndac_mode1_channel3_one_actual1');
//     const ndac_mode1_channel3_one_test1 = document.getElementById('ndac_mode1_channel3_one_test1');
//     const ndac_mode1_channel3_one_actual2 = document.getElementById('ndac_mode1_channel3_one_actual2');
//     const ndac_mode1_channel3_one_test2 = document.getElementById('ndac_mode1_channel3_one_test2');
//     const ndac_mode1_channel3_one_k = document.getElementById('ndac_mode1_channel3_one_k');
//     const ndac_mode1_channel3_one_b = document.getElementById('ndac_mode1_channel3_one_b');
//     //通道4 定标段1  
//     const ndac_mode1_channel4 = document.getElementById('ndac_mode1_channel4');
//     const ndac_mode1_channel4_one_actual1 = document.getElementById('ndac_mode1_channel4_one_actual1');
//     const ndac_mode1_channel4_one_test1 = document.getElementById('ndac_mode1_channel4_one_test1');
//     const ndac_mode1_channel4_one_actual2 = document.getElementById('ndac_mode1_channel4_one_actual2');
//     const ndac_mode1_channel4_one_test2 = document.getElementById('ndac_mode1_channel4_one_test2');
//     const ndac_mode1_channel4_one_k = document.getElementById('ndac_mode1_channel4_one_k');
//     const ndac_mode1_channel4_one_b = document.getElementById('ndac_mode1_channel4_one_b');
//     //通道5 定标段1  
//     const ndac_mode1_channel5 = document.getElementById('ndac_mode1_channel5');
//     const ndac_mode1_channel5_one_actual1 = document.getElementById('ndac_mode1_channel5_one_actual1');
//     const ndac_mode1_channel5_one_test1 = document.getElementById('ndac_mode1_channel5_one_test1');
//     const ndac_mode1_channel5_one_actual2 = document.getElementById('ndac_mode1_channel5_one_actual2');
//     const ndac_mode1_channel5_one_test2 = document.getElementById('ndac_mode1_channel5_one_test2');
//     const ndac_mode1_channel5_one_k = document.getElementById('ndac_mode1_channel5_one_k');
//     const ndac_mode1_channel5_one_b = document.getElementById('ndac_mode1_channel5_one_b');
//     //通道6 定标段1  
//     const ndac_mode1_channel6 = document.getElementById('ndac_mode1_channel6');
//     const ndac_mode1_channel6_one_actual1 = document.getElementById('ndac_mode1_channel6_one_actual1');
//     const ndac_mode1_channel6_one_test1 = document.getElementById('ndac_mode1_channel6_one_test1');
//     const ndac_mode1_channel6_one_actual2 = document.getElementById('ndac_mode1_channel6_one_actual2');
//     const ndac_mode1_channel6_one_test2 = document.getElementById('ndac_mode1_channel6_one_test2');
//     const ndac_mode1_channel6_one_k = document.getElementById('ndac_mode1_channel6_one_k');
//     const ndac_mode1_channel6_one_b = document.getElementById('ndac_mode1_channel6_one_b');
//     //通道7 定标段1  
//     const ndac_mode1_channel7 = document.getElementById('ndac_mode1_channel7');
//     const ndac_mode1_channel7_one_actual1 = document.getElementById('ndac_mode1_channel7_one_actual1');
//     const ndac_mode1_channel7_one_test1 = document.getElementById('ndac_mode1_channel7_one_test1');
//     const ndac_mode1_channel7_one_actual2 = document.getElementById('ndac_mode1_channel7_one_actual2');
//     const ndac_mode1_channel7_one_test2 = document.getElementById('ndac_mode1_channel7_one_test2');
//     const ndac_mode1_channel7_one_k = document.getElementById('ndac_mode1_channel7_one_k');
//     const ndac_mode1_channel7_one_b = document.getElementById('ndac_mode1_channel7_one_b');
//     //通道8 定标段1  
//     const ndac_mode1_channel8 = document.getElementById('ndac_mode1_channel8');
//     const ndac_mode1_channel8_one_actual1 = document.getElementById('ndac_mode1_channel8_one_actual1');
//     const ndac_mode1_channel8_one_test1 = document.getElementById('ndac_mode1_channel8_one_test1');
//     const ndac_mode1_channel8_one_actual2 = document.getElementById('ndac_mode1_channel8_one_actual2');
//     const ndac_mode1_channel8_one_test2 = document.getElementById('ndac_mode1_channel8_one_test2');
//     const ndac_mode1_channel8_one_k = document.getElementById('ndac_mode1_channel8_one_k');
//     const ndac_mode1_channel8_one_b = document.getElementById('ndac_mode1_channel8_one_b');
//     //通道9 定标段1  
//     const ndac_mode1_channel9 = document.getElementById('ndac_mode1_channel9');
//     const ndac_mode1_channel9_one_actual1 = document.getElementById('ndac_mode1_channel9_one_actual1');
//     const ndac_mode1_channel9_one_test1 = document.getElementById('ndac_mode1_channel9_one_test1');
//     const ndac_mode1_channel9_one_actual2 = document.getElementById('ndac_mode1_channel9_one_actual2');
//     const ndac_mode1_channel9_one_test2 = document.getElementById('ndac_mode1_channel9_one_test2');
//     const ndac_mode1_channel9_one_k = document.getElementById('ndac_mode1_channel9_one_k');
//     const ndac_mode1_channel9_one_b = document.getElementById('ndac_mode1_channel9_one_b');
//     //通道10 定标段1  
//     const ndac_mode1_channel10 = document.getElementById('ndac_mode1_channel10');
//     const ndac_mode1_channel10_one_actual1 = document.getElementById('ndac_mode1_channel0_one_actual1');
//     const ndac_mode1_channel10_one_test1 = document.getElementById('ndac_mode1_channel10_one_test1');
//     const ndac_mode1_channel10_one_actual2 = document.getElementById('ndac_mode1_channel10_one_actual2');
//     const ndac_mode1_channel10_one_test2 = document.getElementById('ndac_mode1_channel10_one_test2');
//     const ndac_mode1_channel10_one_k = document.getElementById('ndac_mode1_channel10_one_k');
//     const ndac_mode1_channel10_one_b = document.getElementById('ndac_mode1_channel10_one_b');
//     //通道11 定标段1  
//     const ndac_mode1_channel11 = document.getElementById('ndac_mode1_channel11');
//     const ndac_mode1_channel11_one_actual1 = document.getElementById('ndac_mode1_channel11_one_actual1');
//     const ndac_mode1_channel11_one_test1 = document.getElementById('ndac_mode1_channel11_one_test1');
//     const ndac_mode1_channel11_one_actual2 = document.getElementById('ndac_mode1_channel11_one_actual2');
//     const ndac_mode1_channel11_one_test2 = document.getElementById('ndac_mode1_channel11_one_test2');
//     const ndac_mode1_channel11_one_k = document.getElementById('ndac_mode1_channel11_one_k');
//     const ndac_mode1_channel11_one_b = document.getElementById('ndac_mode1_channel11_one_b');
//     //通道11 定标段1  
//     const ndac_mode1_channel12 = document.getElementById('ndac_mode1_channel12');
//     const ndac_mode1_channel12_one_actual1 = document.getElementById('ndac_mode1_channel12_one_actual1');
//     const ndac_mode1_channel12_one_test1 = document.getElementById('ndac_mode1_channel12_one_test1');
//     const ndac_mode1_channel12_one_actual2 = document.getElementById('ndac_mode1_channel12_one_actual2');
//     const ndac_mode1_channel12_one_test2 = document.getElementById('ndac_mode1_channel12_one_test2');
//     const ndac_mode1_channel12_one_k = document.getElementById('ndac_mode1_channel12_one_k');
//     const ndac_mode1_channel12_one_b = document.getElementById('ndac_mode1_channel12_one_b');
//     //通道11 定标段1  
//     const ndac_mode1_channel13 = document.getElementById('ndac_mode1_channel13');
//     const ndac_mode1_channel13_one_actual1 = document.getElementById('ndac_mode1_channel13_one_actual1');
//     const ndac_mode1_channel13_one_test1 = document.getElementById('ndac_mode1_channel13_one_test1');
//     const ndac_mode1_channel13_one_actual2 = document.getElementById('ndac_mode1_channel13_one_actual2');
//     const ndac_mode1_channel13_one_test2 = document.getElementById('ndac_mode1_channel13_one_test2');
//     const ndac_mode1_channel13_one_k = document.getElementById('ndac_mode1_channel13_one_k');
//     const ndac_mode1_channel13_one_b = document.getElementById('ndac_mode1_channel13_one_b');
//     //通道11 定标段1  
//     const ndac_mode1_channel14 = document.getElementById('ndac_mode1_channel14');
//     const ndac_mode1_channel14_one_actual1 = document.getElementById('ndac_mode1_channel14_one_actual1');
//     const ndac_mode1_channel14_one_test1 = document.getElementById('ndac_mode1_channel14_one_test1');
//     const ndac_mode1_channel14_one_actual2 = document.getElementById('ndac_mode1_channel14_one_actual2');
//     const ndac_mode1_channel14_one_test2 = document.getElementById('ndac_mode1_channel14_one_test2');
//     const ndac_mode1_channel14_one_k = document.getElementById('ndac_mode1_channel14_one_k');
//     const ndac_mode1_channel14_one_b = document.getElementById('ndac_mode1_channel14_one_b');
//     //通道11 定标段1  
//     const ndac_mode1_channel15 = document.getElementById('ndac_mode1_channel15');
//     const ndac_mode1_channel15_one_actual1 = document.getElementById('ndac_mode1_channel15_one_actual1');
//     const ndac_mode1_channel15_one_test1 = document.getElementById('ndac_mode1_channel15_one_test1');
//     const ndac_mode1_channel15_one_actual2 = document.getElementById('ndac_mode1_channel15_one_actual2');
//     const ndac_mode1_channel15_one_test2 = document.getElementById('ndac_mode1_channel15_one_test2');
//     const ndac_mode1_channel15_one_k = document.getElementById('ndac_mode1_channel15_one_k');
//     const ndac_mode1_channel15_one_b = document.getElementById('ndac_mode1_channel15_one_b');
//     //通道11 定标段1  
//     const ndac_mode1_channel16 = document.getElementById('ndac_mode1_channel16');
//     const ndac_mode1_channel16_one_actual1 = document.getElementById('ndac_mode1_channel16_one_actual1');
//     const ndac_mode1_channel16_one_test1 = document.getElementById('ndac_mode1_channel16_one_test1');
//     const ndac_mode1_channel16_one_actual2 = document.getElementById('ndac_mode1_channel16_one_actual2');
//     const ndac_mode1_channel16_one_test2 = document.getElementById('ndac_mode1_channel16_one_test2');
//     const ndac_mode1_channel16_one_k = document.getElementById('ndac_mode1_channel16_one_k');
//     const ndac_mode1_channel16_one_b = document.getElementById('ndac_mode1_channel16_one_b');
//     // 定义一个数组用于存储空值对应的通道编号
//     const emptyChannelArray = [];
//     const channelKBarray = [];

//     if (selectedChannels.length > 0) {
//         if (mode1_demarc1_value.value != '' && mode1_demarc2_value.value == '' && mode1_demarc3_value.value == '' && mode1_demarc4_value.value == '') {
//             //定标一段
//             if (ndac_mode1_channel1.checked) {
//                 const channel1_one_actual1_value = ndac_mode1_channel1_one_actual1.value;
//                 const channel1_one_test1_value = ndac_mode1_channel1_one_test1.value;
//                 const channel1_one_actual2_value = ndac_mode1_channel1_one_actual2.value;
//                 const channel1_one_test2_value = ndac_mode1_channel1_one_test2.value;
//                 if (channel1_one_actual1_value == "" || channel1_one_test1_value == "" || channel1_one_actual2_value == "" || channel1_one_test2_value == "") {
//                     emptyChannelArray.push(1); // 通道号从1开始
//                 } else {
//                     const one_channel1_kb1 = count_KB_value(channel1_one_actual1_value, channel1_one_test1_value, channel1_one_actual2_value, channel1_one_test2_value)
//                     ndac_mode1_channel1_one_k.value = one_channel1_kb1[0];
//                     ndac_mode1_channel1_one_b.value = one_channel1_kb1[1];
//                     if (one_channel1_kb1 > mode1_demarc1_value.value) {
//                         channelKBarray.push({ channel: 1, k1: one_channel1_kb1[0], b1: one_channel1_kb1[1] })
//                     } else {

//                     }
//                 }
//             }
//             if (ndac_mode1_channel2.checked) {
//                 const channel2_one_actual1_value = ndac_mode1_channel2_one_actual1.value;
//                 const channel2_one_test1_value = ndac_mode1_channel2_one_test1.value;
//                 const channel2_one_actual2_value = ndac_mode1_channel2_one_actual2.value;
//                 const channel2_one_test2_value = ndac_mode1_channel2_one_test2.value;
//                 if (channel2_one_actual2_value == "" || channel2_one_test1_value == "" || channel2_one_actual2_value == "" || channel2_one_test2_value == "") {
//                     emptyChannelArray.push(2); // 通道号从1开始
//                 } else {
//                     const one_channel2_kb1 = count_KB_value(channel2_one_actual1_value, channel2_one_test1_value, channel2_one_actual2_value, channel2_one_test2_value)
//                     ndac_mode1_channel2_one_k.value = one_channel2_kb1[0];
//                     ndac_mode1_channel2_one_b.value = one_channel2_kb1[1];
//                     if (one_channel2_kb1 > mode1_demarc1_value.value) {
//                         channelKBarray.push({ channel: 2, k1: one_channel2_kb1[0], b1: one_channel2_kb1[1] })
//                     }
//                 }
//             }
//             if (ndac_mode1_channel3.checked) {
//                 const channel3_one_actual1_value = ndac_mode1_channel3_one_actual1.value;
//                 const channel3_one_test1_value = ndac_mode1_channel3_one_test1.value;
//                 const channel3_one_actual2_value = ndac_mode1_channel3_one_actual2.value;
//                 const channel3_one_test2_value = ndac_mode1_channel3_one_test2.value;
//                 if (channel3_one_actual1_value == "" || channel3_one_test1_value == "" || channel3_one_actual2_value == "" || channel3_one_test2_value == "") {
//                     emptyChannelArray.push(3); // 通道号从1开始
//                 } else {
//                     const one_channel3_kb1 = count_KB_value(channel3_one_actual1_value, channel3_one_test1_value, channel3_one_actual2_value, channel3_one_test2_value)
//                     ndac_mode1_channel3_one_k.value = one_channel3_kb1[0];
//                     ndac_mode1_channel3_one_b.value = one_channel3_kb1[1];
//                     if (one_channel3_kb1 > mode1_demarc1_value.value) {
//                         channelKBarray.push({ channel: 3, k1: one_channel3_kb1[0], b1: one_channel3_kb1[1] })
//                     }
//                 }
//             }
//             if (ndac_mode1_channel4.checked) {
//                 const channel4_one_actual1_value = ndac_mode1_channel4_one_actual1.value;
//                 const channel4_one_test1_value = ndac_mode1_channel4_one_test1.value;
//                 const channel4_one_actual2_value = ndac_mode1_channel4_one_actual2.value;
//                 const channel4_one_test2_value = ndac_mode1_channel4_one_test2.value;
//                 if (channel4_one_actual1_value == "" || channel4_one_test1_value == "" || channel4_one_actual2_value == "" || channel4_one_test2_value == "") {
//                     emptyChannelArray.push(4); // 通道号从1开始
//                 } else {
//                     const one_channel4_kb1 = count_KB_value(channel4_one_actual1_value, channel4_one_test1_value, channel4_one_actual2_value, channel4_one_test2_value)
//                     ndac_mode1_channel4_one_k.value = one_channel4_kb1[0];
//                     ndac_mode1_channel4_one_b.value = one_channel4_kb1[1];
//                     if (one_channel4_kb1 > mode1_demarc1_value.value) {
//                         channelKBarray.push({ channel: 4, k1: one_channel4_kb1[0], b1: one_channel4_kb1[1] })
//                     }
//                 }
//             }
//             if (ndac_mode1_channel5.checked) {
//                 const channel5_one_actual1_value = ndac_mode1_channel5_one_actual1.value;
//                 const channel5_one_test1_value = ndac_mode1_channel5_one_test1.value;
//                 const channel5_one_actual2_value = ndac_mode1_channel5_one_actual2.value;
//                 const channel5_one_test2_value = ndac_mode1_channel5_one_test2.value;
//                 if (channel5_one_actual1_value == "" || channel5_one_test1_value == "" || channel5_one_actual2_value == "" || channel5_one_test2_value == "") {
//                     emptyChannelArray.push(5); // 通道号从1开始
//                 } else {
//                     const one_channel5_kb1 = count_KB_value(channel5_one_actual1_value, channel5_one_test1_value, channel5_one_actual2_value, channel5_one_test2_value)
//                     ndac_mode1_channel5_one_k.value = one_channel5_kb1[0];
//                     ndac_mode1_channel5_one_b.value = one_channel5_kb1[1];
//                     if (one_channel5_kb1 > mode1_demarc1_value.value) {
//                         channelKBarray.push({ channel: 5, k1: one_channel5_kb1[0], b1: one_channel5_kb1[1] })
//                     }
//                 }
//             }
//             if (ndac_mode1_channel6.checked) {
//                 const channel6_one_actual1_value = ndac_mode1_channel6_one_actual1.value;
//                 const channel6_one_test1_value = ndac_mode1_channel6_one_test1.value;
//                 const channel6_one_actual2_value = ndac_mode1_channel6_one_actual2.value;
//                 const channel6_one_test2_value = ndac_mode1_channel6_one_test2.value;
//                 if (channel6_one_actual1_value == "" || channel6_one_test1_value == "" || channel6_one_actual2_value == "" || channel6_one_test2_value == "") {
//                     emptyChannelArray.push(6); // 通道号从1开始
//                 } else {
//                     const one_channel6_kb1 = count_KB_value(channel6_one_actual1_value, channel6_one_test1_value, channel6_one_actual2_value, channel6_one_test2_value)
//                     ndac_mode1_channel6_one_k.value = one_channel6_kb1[0];
//                     ndac_mode1_channel6_one_b.value = one_channel6_kb1[1];
//                     if (one_channel6_kb1 > mode1_demarc1_value.value) {
//                         channelKBarray.push({ channel: 6, k1: one_channel6_kb1[0], b1: one_channel6_kb1[1] })
//                     }
//                 }
//             }
//             if (ndac_mode1_channel7.checked) {
//                 const channel7_one_actual1_value = ndac_mode1_channel7_one_actual1.value;
//                 const channel7_one_test1_value = ndac_mode1_channel7_one_test1.value;
//                 const channel7_one_actual2_value = ndac_mode1_channel7_one_actual2.value;
//                 const channel7_one_test2_value = ndac_mode1_channel7_one_test2.value;
//                 if (channel7_one_actual1_value == "" || channel7_one_test1_value == "" || channel7_one_actual2_value == "" || channel7_one_test2_value == "") {
//                     emptyChannelArray.push(7); // 通道号从1开始
//                 } else {
//                     const one_channel7_kb1 = count_KB_value(channel7_one_actual1_value, channel7_one_test1_value, channel7_one_actual2_value, channel7_one_test2_value)
//                     ndac_mode1_channel7_one_k.value = one_channel7_kb1[0];
//                     ndac_mode1_channel7_one_b.value = one_channel7_kb1[1];
//                     if (one_channel7_kb1 > mode1_demarc1_value.value) {
//                         channelKBarray.push({ channel: 7, k1: one_channel7_kb1[0], b1: one_channel7_kb1[1] })
//                     }
//                 }
//             }
//             if (ndac_mode1_channel8.checked) {
//                 const channel8_one_actual1_value = ndac_mode1_channel8_one_actual1.value;
//                 const channel8_one_test1_value = ndac_mode1_channel8_one_test1.value;
//                 const channel8_one_actual2_value = ndac_mode1_channel8_one_actual2.value;
//                 const channel8_one_test2_value = ndac_mode1_channel8_one_test2.value;
//                 if (channel8_one_actual1_value == "" || channel8_one_test1_value == "" || channel8_one_actual2_value == "" || channel8_one_test2_value == "") {
//                     emptyChannelArray.push(8); // 通道号从1开始
//                 } else {
//                     const one_channel8_kb1 = count_KB_value(channel8_one_actual1_value, channel8_one_test1_value, channel8_one_actual2_value, channel8_one_test2_value)
//                     ndac_mode1_channel8_one_k.value = one_channel8_kb1[0];
//                     ndac_mode1_channel8_one_b.value = one_channel8_kb1[1];
//                     if (one_channel8_kb1 > mode1_demarc1_value.value) {
//                         channelKBarray.push({ channel: 8, k1: one_channel8_kb1[0], b1: one_channel8_kb1[1] })
//                     }
//                 }
//             }
//             if (ndac_mode1_channel9.checked) {
//                 const channel9_one_actual1_value = ndac_mode1_channel9_one_actual1.value;
//                 const channel9_one_test1_value = ndac_mode1_channel9_one_test1.value;
//                 const channel9_one_actual2_value = ndac_mode1_channel9_one_actual2.value;
//                 const channel9_one_test2_value = ndac_mode1_channel9_one_test2.value;
//                 if (channel9_one_actual1_value == "" || channel9_one_test1_value == "" || channel9_one_actual2_value == "" || channel9_one_test2_value == "") {
//                     emptyChannelArray.push(9); // 通道号从1开始
//                 } else {
//                     const one_channel9_kb1 = count_KB_value(channel9_one_actual1_value, channel9_one_test1_value, channel9_one_actual2_value, channel9_one_test2_value)
//                     ndac_mode1_channel9_one_k.value = one_channel9_kb1[0];
//                     ndac_mode1_channel9_one_b.value = one_channel9_kb1[1];
//                     if (one_channel9_kb1 > mode1_demarc1_value.value) {
//                         channelKBarray.push({ channel: 9, k1: one_channel9_kb1[0], b1: one_channel9_kb1[1] })
//                     }
//                 }
//             }
//             if (ndac_mode1_channel10.checked) {
//                 const channel10_one_actual1_value = ndac_mode1_channel10_one_actual1.value;
//                 const channel10_one_test1_value = ndac_mode1_channel10_one_test1.value;
//                 const channel10_one_actual2_value = ndac_mode1_channel10_one_actual2.value;
//                 const channel10_one_test2_value = ndac_mode1_channel10_one_test2.value;
//                 if (channel10_one_actual1_value == "" || channel10_one_test1_value == "" || channel10_one_actual2_value == "" || channel10_one_test2_value == "") {
//                     emptyChannelArray.push(10); // 通道号从1开始
//                 } else {
//                     const one_channel10_kb1 = count_KB_value(channel10_one_actual1_value, channel10_one_test1_value, channel10_one_actual2_value, channel10_one_test2_value)
//                     ndac_mode1_channel10_one_k.value = one_channel10_kb1[0];
//                     ndac_mode1_channel10_one_b.value = one_channel10_kb1[1];
//                     if (one_channel10_kb1 > mode1_demarc1_value.value) {
//                         channelKBarray.push({ channel: 10, k1: one_channel10_kb1[0], b1: one_channel10_kb1[1] })
//                     }
//                 }
//             }
//             if (ndac_mode1_channel11.checked) {
//                 const channel11_one_actual1_value = ndac_mode1_channel11_one_actual1.value;
//                 const channel11_one_test1_value = ndac_mode1_channel11_one_test1.value;
//                 const channel11_one_actual2_value = ndac_mode1_channel11_one_actual2.value;
//                 const channel11_one_test2_value = ndac_mode1_channel11_one_test2.value;
//                 if (channel11_one_actual1_value == "" || channel11_one_test1_value == "" || channel11_one_actual2_value == "" || channel11_one_test2_value == "") {
//                     emptyChannelArray.push(11); // 通道号从1开始
//                 } else {
//                     const one_channel11_kb1 = count_KB_value(channel11_one_actual1_value, channel11_one_test1_value, channel11_one_actual2_value, channel11_one_test2_value)
//                     ndac_mode1_channel11_one_k.value = one_channel11_kb1[0];
//                     ndac_mode1_channel11_one_b.value = one_channel11_kb1[1];
//                     if (one_channel11_kb1 > mode1_demarc1_value.value) {
//                         channelKBarray.push({ channel: 11, k1: one_channel11_kb1[0], b1: one_channel11_kb1[1] })
//                     }
//                 }
//             }
//             if (ndac_mode1_channel12.checked) {
//                 const channel12_one_actual1_value = ndac_mode1_channel12_one_actual1.value;
//                 const channel12_one_test1_value = ndac_mode1_channel12_one_test1.value;
//                 const channel12_one_actual2_value = ndac_mode1_channel12_one_actual2.value;
//                 const channel12_one_test2_value = ndac_mode1_channel12_one_test2.value;
//                 if (channel12_one_actual1_value == "" || channel12_one_test1_value == "" || channel12_one_actual2_value == "" || channel12_one_test2_value == "") {
//                     emptyChannelArray.push(12); // 通道号从1开始
//                 } else {
//                     const one_channel12_kb1 = count_KB_value(channel12_one_actual1_value, channel12_one_test1_value, channel12_one_actual2_value, channel12_one_test2_value)
//                     ndac_mode1_channel12_one_k.value = one_channel12_kb1[0];
//                     ndac_mode1_channel12_one_b.value = one_channel12_kb1[1];
//                     if (one_channel12_kb1 > mode1_demarc1_value.value) {
//                         channelKBarray.push({ channel: 12, k1: one_channel12_kb1[0], b1: one_channel12_kb1[1] })
//                     }
//                 }
//             }
//             if (ndac_mode1_channel13.checked) {
//                 const channel13_one_actual1_value = ndac_mode1_channel13_one_actual1.value;
//                 const channel13_one_test1_value = ndac_mode1_channel13_one_test1.value;
//                 const channel13_one_actual2_value = ndac_mode1_channel13_one_actual2.value;
//                 const channel13_one_test2_value = ndac_mode1_channel13_one_test2.value;
//                 if (channel13_one_actual1_value == "" || channel13_one_test1_value == "" || channel13_one_actual2_value == "" || channel13_one_test2_value == "") {
//                     emptyChannelArray.push(13); // 通道号从1开始
//                 } else {
//                     const one_channel13_kb1 = count_KB_value(channel13_one_actual1_value, channel13_one_test1_value, channel13_one_actual2_value, channel13_one_test2_value)
//                     ndac_mode1_channel13_one_k.value = one_channel13_kb1[0];
//                     ndac_mode1_channel13_one_b.value = one_channel13_kb1[1];
//                     if (one_channel13_kb1 > mode1_demarc1_value.value) {
//                         channelKBarray.push({ channel: 13, k1: one_channel13_kb1[0], b1: one_channel13_kb1[1] })
//                     }
//                 }
//             }
//             if (ndac_mode1_channel14.checked) {
//                 const channel14_one_actual1_value = ndac_mode1_channel14_one_actual1.value;
//                 const channel14_one_test1_value = ndac_mode1_channel14_one_test1.value;
//                 const channel14_one_actual2_value = ndac_mode1_channel14_one_actual2.value;
//                 const channel14_one_test2_value = ndac_mode1_channel14_one_test2.value;
//                 if (channel14_one_actual1_value == "" || channel14_one_test1_value == "" || channel14_one_actual2_value == "" || channel14_one_test2_value == "") {
//                     emptyChannelArray.push(14); // 通道号从1开始
//                 } else {
//                     const one_channel14_kb1 = count_KB_value(channel14_one_actual1_value, channel14_one_test1_value, channel14_one_actual2_value, channel14_one_test2_value)
//                     ndac_mode1_channel14_one_k.value = one_channel14_kb1[0];
//                     ndac_mode1_channel14_one_b.value = one_channel14_kb1[1];
//                     if (one_channel14_kb1 > mode1_demarc1_value.value) {
//                         channelKBarray.push({ channel: 14, k1: one_channel14_kb1[0], b1: one_channel14_kb1[1] })
//                     }
//                 }
//             }
//             if (ndac_mode1_channel15.checked) {
//                 const channel15_one_actual1_value = ndac_mode1_channel15_one_actual1.value;
//                 const channel15_one_test1_value = ndac_mode1_channel15_one_test1.value;
//                 const channel15_one_actual2_value = ndac_mode1_channel15_one_actual2.value;
//                 const channel15_one_test2_value = ndac_mode1_channel15_one_test2.value;
//                 if (channel15_one_actual1_value == "" || channel15_one_test1_value == "" || channel15_one_actual2_value == "" || channel15_one_test2_value == "") {
//                     emptyChannelArray.push(15); // 通道号从1开始
//                 } else {
//                     const one_channel15_kb1 = count_KB_value(channel15_one_actual1_value, channel15_one_test1_value, channel15_one_actual2_value, channel15_one_test2_value)
//                     ndac_mode1_channel15_one_k.value = one_channel15_kb1[0];
//                     ndac_mode1_channel15_one_b.value = one_channel15_kb1[1];
//                     if (one_channel15_kb1 > mode1_demarc1_value.value) {
//                         channelKBarray.push({ channel: 15, k1: one_channel15_kb1[0], b1: one_channel15_kb1[1] })
//                     }
//                 }
//             }
//             if (ndac_mode1_channel16.checked) {
//                 const channel16_one_actual1_value = ndac_mode1_channel16_one_actual1.value;
//                 const channel16_one_test1_value = ndac_mode1_channel16_one_test1.value;
//                 const channel16_one_actual2_value = ndac_mode1_channel16_one_actual2.value;
//                 const channel16_one_test2_value = ndac_mode1_channel16_one_test2.value;
//                 if (channel16_one_actual1_value == "" || channel16_one_test1_value == "" || channel16_one_actual2_value == "" || channel16_one_test2_value == "") {
//                     emptyChannelArray.push(14); // 通道号从1开始
//                 } else {
//                     const one_channel16_kb1 = count_KB_value(channel16_one_actual1_value, channel16_one_test1_value, channel16_one_actual2_value, channel16_one_test2_value)
//                     ndac_mode1_channel16_one_k.value = one_channel16_kb1[0];
//                     ndac_mode1_channel16_one_b.value = one_channel16_kb1[1];
//                     if (one_channel16_kb1 > mode1_demarc1_value.value) {
//                         channelKBarray.push({ channel: 16, k1: one_channel16_kb1[0], b1: one_channel16_kb1[1] })
//                     }
//                 }
//             }

//             window.TheIPC.toMain3(100, Number(ndac_mode1_board_num.value), selectedChannels)


//         } else {
//             ndac_mode1_dialog.style.display = 'block';
//             ndac_mode1_dialog_label.innerText = '请设置分界点值'
//             setTimeout(() => {
//                 ndac_mode1_dialog.style.display = 'none';
//             }, 1000)
//         }

//     } else {
//         ndac_mode1_dialog.style.display = 'block';
//         ndac_mode1_dialog_label.innerText = '请检查通道是否选择'
//         setTimeout(() => {
//             ndac_mode1_dialog.style.display = 'none';
//         }, 1000)
//     }
// });

// function count_KB_value(actual1, test1, actual2, test2) {
//     // 检查分母是否为零
//     if (test2 - test1 === 0) {
//         const k = 0;
//         const b = 0; // 当K值为0时，B值等于实际值1
//         console.log(`K值:${k},B值:${b}`);
//         return [0, 0, 0];
//     }
//     const k = Number((actual2 - actual1) / (test2 - test1));
//     const b = Number(actual2 - (k * test2));

//     if (b === 0) {
//         console.warn("B值为零，k/b 无法计算");
//         return [k, b, 0]; // 返回 NaN 表示 k/b 无法计算
//     }
//     const kb_ratio = Number(k / b);
//     console.log(`K值:${k},B值:${b},k/b值:${kb_ratio}`);
//     return [k, b, kb_ratio];
// }



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
                      <span style="color: white;">:</span> <span style="color: #39FF14;">${product_type}</span> `
            break;
        case 100:
            mode1_open_restore(data);//开启恢复状态
            break;
        case 101:
            show_channels_data(data);//显示通道信息
            break;
        // case 102:
        //     const mode1_debug_data = data;
        //     console.log("进入调试状态", mode1_debug_data);
        //     const mode1_debug_type = mode1_debug_data.debug_type;
        //     const mode1_debug_status = mode1_debug_data.debug_status;
        //     switch (mode1_debug_type) {
        //         case "voltage":
        //             switch (mode1_debug_status) {
        //                 case true:
        //                     ndac_mode1_channel1_unit.innerText = 'mV';
        //                     ndac_mode1_channel2_unit.innerText = 'mV';
        //                     ndac_mode1_channel3_unit.innerText = 'mV';
        //                     ndac_mode1_channel4_unit.innerText = 'mV';
        //                     ndac_mode1_channel5_unit.innerText = 'mV';
        //                     ndac_mode1_channel6_unit.innerText = 'mV';
        //                     ndac_mode1_channel7_unit.innerText = 'mV';
        //                     ndac_mode1_channel8_unit.innerText = 'mV';
        //                     ndac_mode1_channel9_unit.innerText = 'mV';
        //                     ndac_mode1_channel10_unit.innerText = 'mV';
        //                     ndac_mode1_channel11_unit.innerText = 'mV';
        //                     ndac_mode1_channel12_unit.innerText = 'mV';
        //                     ndac_mode1_channel13_unit.innerText = 'mV';
        //                     ndac_mode1_channel14_unit.innerText = 'mV';
        //                     ndac_mode1_channel15_unit.innerText = 'mV';
        //                     ndac_mode1_channel16_unit.innerText = 'mV';
        //                     break;
        //                 case false:
        //                     ndac_mode1_channel1_unit.innerText = 'mV';
        //                     ndac_mode1_channel2_unit.innerText = 'mV';
        //                     ndac_mode1_channel3_unit.innerText = 'mV';
        //                     ndac_mode1_channel4_unit.innerText = 'mV';
        //                     ndac_mode1_channel5_unit.innerText = 'mV';
        //                     ndac_mode1_channel6_unit.innerText = 'mV';
        //                     ndac_mode1_channel7_unit.innerText = 'mV';
        //                     ndac_mode1_channel8_unit.innerText = 'mV';
        //                     ndac_mode1_channel9_unit.innerText = 'mV';
        //                     ndac_mode1_channel10_unit.innerText = 'mV';
        //                     ndac_mode1_channel11_unit.innerText = 'mV';
        //                     ndac_mode1_channel12_unit.innerText = 'mV';
        //                     ndac_mode1_channel13_unit.innerText = 'mV';
        //                     ndac_mode1_channel14_unit.innerText = 'mV';
        //                     ndac_mode1_channel15_unit.innerText = 'mV';
        //                     ndac_mode1_channel16_unit.innerText = 'mV';
        //                     break;
        //             }
        //             break;
        //         case "Temp":
        //             switch (mode1_debug_status) {
        //                 case true:
        //                     ndac_mode1_channel1_unit.innerText = 'mV';
        //                     ndac_mode1_channel2_unit.innerText = 'mV';
        //                     ndac_mode1_channel3_unit.innerText = 'mV';
        //                     ndac_mode1_channel4_unit.innerText = 'mV';
        //                     ndac_mode1_channel5_unit.innerText = 'mV';
        //                     ndac_mode1_channel6_unit.innerText = 'mV';
        //                     ndac_mode1_channel7_unit.innerText = 'mV';
        //                     ndac_mode1_channel8_unit.innerText = 'mV';
        //                     ndac_mode1_channel9_unit.innerText = 'mV';
        //                     ndac_mode1_channel10_unit.innerText = 'mV';
        //                     ndac_mode1_channel11_unit.innerText = 'mV';
        //                     ndac_mode1_channel12_unit.innerText = 'mV';
        //                     ndac_mode1_channel13_unit.innerText = 'mV';
        //                     ndac_mode1_channel14_unit.innerText = 'mV';
        //                     ndac_mode1_channel15_unit.innerText = 'mV';
        //                     ndac_mode1_channel16_unit.innerText = 'mV';
        //                     break;
        //                 case false:
        //                     ndac_mode1_channel1_unit.innerText = 'mΩ';
        //                     ndac_mode1_channel2_unit.innerText = 'mΩ';
        //                     ndac_mode1_channel3_unit.innerText = 'mΩ';
        //                     ndac_mode1_channel4_unit.innerText = 'mΩ';
        //                     ndac_mode1_channel5_unit.innerText = 'mΩ';
        //                     ndac_mode1_channel6_unit.innerText = 'mΩ';
        //                     ndac_mode1_channel7_unit.innerText = 'mΩ';
        //                     ndac_mode1_channel8_unit.innerText = 'mΩ';
        //                     ndac_mode1_channel9_unit.innerText = 'mΩ';
        //                     ndac_mode1_channel10_unit.innerText = 'mΩ';
        //                     ndac_mode1_channel11_unit.innerText = 'mΩ';
        //                     ndac_mode1_channel12_unit.innerText = 'mΩ';
        //                     ndac_mode1_channel13_unit.innerText = 'mΩ';
        //                     ndac_mode1_channel14_unit.innerText = 'mΩ';
        //                     ndac_mode1_channel15_unit.innerText = 'mΩ';
        //                     ndac_mode1_channel16_unit.innerText = 'mΩ';
        //                     break;
        //             }
        //             break;
        // }
        // break;
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
    const ndac_mode1_Parameter2 = document.getElementById('ndac_mode1_Parameter2');
    ndac_mode1_Parameter2.innerHTML = `
                      <span style="color: white;">产品类型:</span> <span style="color: #39FF14;">未知类型</span> `
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
    const nadc_mode1_demarc1_value = document.getElementById('nadc_mode1_demarc1_value');//分界点1
    const nadc_mode1_demarc2_value = document.getElementById('nadc_mode1_demarc2_value');//分界点2
    const nadc_mode1_demarc3_value = document.getElementById('nadc_mode1_demarc3_value');//分界点3
    const nadc_mode1_application = document.getElementById('nadc_mode1_application');//一键应用恢复
    const nadc_mode1_count = document.getElementById('nadc_mode1_count');//计算kb值恢复
    const nadc_mode1_initialize = document.getElementById('nadc_mode1_initialize');//初始化K/B值恢复
    const nadc_mode1_batch_send = document.getElementById('nadc_mode1_batch_send');//批量发送KB值恢复
    // const fieldset_mode1 = document.getElementById('fieldset_mode1');//fieldset恢复
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
        nadc_mode1_application.disabled = false;//一键应用恢复
        nadc_mode1_demarc1_value.disabled = false;//分界点1恢复
        nadc_mode1_demarc2_value.disabled = false;//分界点2恢复
        nadc_mode1_demarc3_value.disabled = false;//分界点3恢复
        nadc_mode1_count.disabled = false;//计算kb值恢复
        nadc_mode1_initialize.disabled = false;//初始化K/B值恢复
        nadc_mode1_batch_send.disabled = false;//批量发送K/B值恢复
        // fieldset_mode1.disabled = false;//fieldset恢复
        ndac_mode1_dialog.style.display = 'block';
        ndac_mode1_dialog_label.innerText = 'DPS参数状态初始化\n完成'
        clearTimeout(MODE1TIMER);
        setTimeout(() => {
            ndac_mode1_dialog.style.display = 'none';
            // window.TheIPC.toMain3(1, Number(ndac_mode1_board_num.value), ndac_mode1_passbacktime);
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
        nadc_mode1_demarc1_value.disabled = true;//分界点1不可选
        nadc_mode1_demarc2_value.disabled = true;//分界点2不可选
        nadc_mode1_demarc3_value.disabled = true;//分界点3不可选
        nadc_mode1_application.disabled = true;//一键应用不可选
        nadc_mode1_count.disabled = true;//计算kb值恢复不可选
        nadc_mode1_initialize.disabled = true;//初始化KB值不可选
        nadc_mode1_batch_send.disabled = true;//批量发送K/B值不可选
        // fieldset_mode1.disabled = true;//fieldset恢复
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
    // switch (mode1_channels_type) {
    //     case 0x01:
    //     case 0x02:
    //     case 0x03:
    //     case 0x04:
    //     case 0x05:
    //     case 0x06:
    //     case 0x07:
    //     case 0x08:
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
    //     case 0x31:
    //     case 0x32:
    //     case 0x33:
    //     case 0x34:
    //     case 0x35:
    //     case 0x36:
    //     case 0x37:
    //     case 0x38:
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
    //     case 0x51:
    //     case 0x52:
    //     case 0x53:
    //     case 0x54:
    //     case 0x55:
    //     case 0x56:
    //     case 0x57:
    //     case 0x58:
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
    // }
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