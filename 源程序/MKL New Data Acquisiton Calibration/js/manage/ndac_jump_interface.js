
module.exports = { ndac_mode1_display_TD,get_ndac_mode1_parameter }
const { showStatus } = require("../../ipc_main");
const { getTimestamp } = require('../time/ndac_time_Info.js');



var ndac_mode1_device_num = null;
var ndac_mode1_dspip_num = null;
var ndac_mode1_canfd_num = null;
var ndac_mode1_port = null;
var ndac_mode1_mode = null;
var ndac_mode1_passback_time = null;
function ndac_mode1_display_TD(id, d1) {
    //1.解析传入的数据字符串d1，将其转换为JSON对象以便于后续处理
    const ndac_mode1_value = JSON.parse(d1);
    //2.获取值d1值并打印
    ndac_mode1_device_num = ndac_mode1_value.ndac_mode1_device_num;
    console.log(`mode1_设备号：${ndac_mode1_device_num}`);
    ndac_mode1_dspip_num = ndac_mode1_value.ndac_mode1_dspip_num;
    console.log(`mode1_DSP IP：${ndac_mode1_dspip_num}`);
    ndac_mode1_canfd_num = ndac_mode1_value.ndac_mode1_canfd_num;
    console.log(`mode1_CANFD：${ndac_mode1_canfd_num}`);
    ndac_mode1_port = ndac_mode1_value.ndac_mode1_port;
    console.log(`mode1_端口：${ndac_mode1_port}`);
    ndac_mode1_mode = ndac_mode1_value.ndac_mode1_mode;
    console.log(`mode1_模式：${ndac_mode1_mode}`);
    ndac_mode1_passback_time = ndac_mode1_value.ndac_mode1_passbacktime;
    console.log(`mode1_回传时间：${ndac_mode1_passback_time}`);
    //3.传到界命令界面
    get_ndac_mode1_parameter()
    //4.在ndac_foursections_Page.html界面显示第一条TD值
    showStatus(`>>> ${getTimestamp()} 设备号：${ndac_mode1_device_num}  DSP IP：${ndac_mode1_dspip_num}  CANFD：${ndac_mode1_canfd_num}  端口：${ndac_mode1_port}  模式：${ndac_mode1_mode}  回传时间：${ndac_mode1_passback_time}ms`);
}

function get_ndac_mode1_parameter() {
    const mode1_parameter = {
        ndac_mode1_device_num,
        ndac_mode1_dspip_num,
        ndac_mode1_canfd_num,
        ndac_mode1_port,
        ndac_mode1_mode,
        ndac_mode1_passback_time,

    }
    // console.log("mode1参数信息:", mode1_parameter);
    return mode1_parameter;
}