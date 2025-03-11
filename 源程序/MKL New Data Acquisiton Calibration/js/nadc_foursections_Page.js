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
    const ndac_mode1_Parameter1 = document.getElementById('ndac_mode1_Parameter1');//显示参数信息1
    ndac_mode1_Parameter1.innerHTML = `
    <span style="color: white;">设备号:</span> <span style="color: #39FF14;">${ndac_mode1_device_num}</span> 
    <span style="color: white;">DSP IP:</span> <span style="color: #39FF14;">${ndac_mode1_dspip_num}</span> 
    <span style="color: white;">CANFD:</span> <span style="color: #39FF14;">${ndac_mode1_canfd_num}</span> 
    <span style="color: white;">端口:</span> <span style="color: #39FF14;">${ndac_mode1_port}</span> 
    <span style="color: white;">模式:</span> <span style="color: #39FF14;">${NDACMODE1D}</span>
`;
    NDACDISPLAYD = {//显示值
        ndac_mode1_device_num: ndac_mode1_device_num,//设备号
        ndac_mode1_dspip_num: ndac_mode1_dspip_num,//DSP IP
        ndac_mode1_canfd_num: ndac_mode1_canfd_num,//CANFD号
        ndac_mode1_port: ndac_mode1_port,//端口号
        ndac_mode1_mode: NDACMODE1D//模式
    }
    window.TheIPC.toMain2(100, JSON.stringify(NDACDISPLAYD));//传到界面显示
    console.log("设备号:", ndac_mode1_device_num, " DSP IP:", ndac_mode1_dspip_num, " CANFD:", ndac_mode1_canfd_num, " 端口:", ndac_mode1_port, " 模式:", NDACMODE1D)
    //1.获取所有的 collapse-panel 元素
    const collapsePanels = document.querySelectorAll('.collapse-panel');
    // 遍历每个 collapse-panel 元素
    collapsePanels.forEach(panel => {
        // 2.获取 collapse-header 和 collapse-content 元素
        const header = panel.querySelector('.collapse-header');
        const content = panel.querySelector('.collapse-content');
        //3.默认展开 collapse-content
        content.style.display = 'none';
        //4.添加点击事件监听器，用于切换展开和折叠状态
        header.addEventListener('click', () => {
            if (content.style.display === 'block') {
                content.style.display = 'none';
            } else {
                content.style.display = 'block';
            }
        });
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
* 模块名:
* 代码描述:底部显示信息
* 作者:Crow
* 创建时间:2025/03/11 09:48:24
*/
const ndac_mode1_displaydata = document.getElementById('ndac_mode1_displaydata');// 获取页面上id为'status_bar'的元素，用于显示状态文本
const ndac_mode1_display = document.getElementById('ndac_mode1_display');// 获取页面上id为'displayData'的元素，用于展示数据和滚动
const ndacMode1_TD = '<tr><td style="width: 100%; color: #39FF14; font-style: italic;font-size: 15px;">'; // color: #39FF14; 定义一个表格行模板，用于包装状态文本，使其在显示时格式化
window.TheIPC.onStatus((text) => {
    // 将接收到的文本信息转换为字符串，然后添加到状态栏中
    ndac_mode1_displaydata.innerHTML += ndacMode1_TD + text.toString() + '</td></tr>';
    // 滚动条到最底端，确保用户总是能看到最新添加的信息
    ndac_mode1_display.scrollTop = ndac_mode1_display.scrollHeight;
});
