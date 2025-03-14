module.exports = {
    mode1_parameter, query_tran_baudrate,
};

const { get_ndac_mode1_parameter } = require('../../js/manage/ndac_jump_interface');
const { query_tran_baudrate_command } = require('../mode1/mode1_command');
const UDPClient = require('../../class/ndac_client_class');
var ndac_mode1_parameter = null;
var mode1_parm_device_num = null;//设备号
var mode1_parm_dspip_num = null;//DPS IP
var mode1_parm_canfd_num = null;//CANFD
var mode1_parm_SP = null;//CANFD对应端口
var mode1_parm_LP = null;//监听端口
var mode1_parm_mode = null;//模式
var mode1_parm_passback_time = null;//回传时间
var mode1_parm_TX = null;//发送端口
var mode1_parm_RX = null;//监听端口
var mode1_udpClient1 = null;
var mode1_udpClient2 = null;
/**
* 模块名:
* 代码描述:获取模式1参数信息
* 作者:Crow
* 创建时间:2025/03/13 13:52:48
*/
function mode1_parameter() {
    ndac_mode1_parameter = get_ndac_mode1_parameter();
    mode1_parm_device_num = ndac_mode1_parameter.ndac_mode1_device_num;
    mode1_parm_dspip_num = ndac_mode1_parameter.ndac_mode1_dspip_num;
    mode1_parm_canfd_num = ndac_mode1_parameter.ndac_mode1_canfd_num;
    mode1_parm_SP = ndac_mode1_parameter.ndac_mode1_port;
    mode1_parm_LP = 62000;
    mode1_parm_mode = ndac_mode1_parameter.ndac_mode1_mode;
    mode1_parm_passback_time = ndac_mode1_parameter.ndac_mode1_passback_time;
    mode1_parm_TX = 60000;
    mode1_parm_RX = 60001;
    mode1_udpClient_create();//创建客户段
    console.log(mode1_parm_device_num, mode1_parm_dspip_num, mode1_parm_canfd_num, mode1_parm_SP, mode1_parm_LP, mode1_parm_mode, mode1_parm_passback_time, mode1_parm_TX, mode1_parm_RX);
}

/**
* 模块名:
* 代码描述:创建mode1_udpClient1,mode1_udpClient2
* 作者:Crow
* 创建时间:2025/03/13 14:16:21
*/
function mode1_udpClient_create() {
    mode1_udpClient1 = new UDPClient(mode1_parm_dspip_num, mode1_parm_SP, mode1_parm_LP);
    console.log(mode1_udpClient1);

    mode1_udpClient2 = new UDPClient(mode1_parm_dspip_num, mode1_parm_TX, mode1_parm_RX);
    console.log(mode1_udpClient2);

}

/**
* 模块名:
* 代码描述:查询透传及波特率
* 作者:Crow
* 创建时间:2025/03/13 14:55:40
*/
function query_tran_baudrate() {
    //查询透传及波特率
    return query_tran_baudrate_command(mode1_udpClient2);
}

