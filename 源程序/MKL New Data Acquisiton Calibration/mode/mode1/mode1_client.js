module.exports = {
    mode1_parameter, query_mode1_tran, restore_mode1_tran
};

const { get_ndac_mode1_parameter } = require('../../js/manage/ndac_jump_interface');
const { query_mode1_Tran_command, query_mode1_baudRate_command, start_mode1_Tran_command, update_mode1_baudRate_command } = require('../mode1/mode1_command');
const UDPClient = require('../../class/ndac_client_class');
const { array_to_hex } = require('../../js/numeric/ndac_numeric');
const { showStatus, showValue } = require('../../ipc_main');
const { getTimestamp } = require('../../js/time/ndac_time_Info')
//信息参数
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
//客户端参数
var mode1_udpClient1 = null;
var mode1_udpClient2 = null;

//回传参数
var mode1_tran = null;
var mode1_baudRate = null;
var MODE1RESTORE = false;//恢复状态未开启


/**
* 模块名:mode1_restore_open
* 代码描述:恢复状态开启
* 作者:Crow
* 创建时间:2025/03/17 10:38:00
*/
function mode1_restore_open() {
    if (savedCommands.size === 2) {
        MODE1RESTORE = true;
        get_restore_query();//获取保存的命令
        showValue(100, MODE1RESTORE);
    } else {
        MODE1RESTORE = false;
        showValue(100, MODE1RESTORE);
    }
}
/**
* 模块名:get_restore_query
* 代码描述:获取到查询结果
* 作者:Crow
* 创建时间:2025/03/17 16:21:05
*/
var byteArray1;//第一条命令
var command1;
var byteArray2;//第二条命令
var command2;
var commandsArray;// 将 Set 转换为数组
function get_restore_query() {
    commandsArray = Array.from(savedCommands);
    command1 = commandsArray[0];
    // 将命令字符串拆分为字节数组
    byteArray1 = command1.split(' ').map(hex => parseInt(hex, 16));//第一条命令
    // const command1_byte1=byteArray1[7];
    command2 = commandsArray[1];
    byteArray2 = command2.split(' ').map(hex => parseInt(hex, 16));//第二条命令
    // const byteArray1 = command1.split(' ').map(hex => parseInt(hex, 16)); 
    console.log(byteArray1, byteArray2);
}

/**
* 模块名:mode1_restore_close
* 代码描述:恢复状态
* 作者:Crow
* 创建时间:2025/03/17 16:47:56
*/
function mode1_restore_close() {
    if (commandsArray.length > 0) {
        // 删除数组的第一个元素
        commandsArray.shift();
        console.log("删除后的：", commandsArray);
    }
    // if (savedCommands.size === 2) {
    //     MODE1RESTORE = false;
    //     // showValue(100, MODE1RESTORE);
    // } else {
    //     MODE1RESTORE = false;
    //     // showValue(100, MODE1RESTORE);
    // }
}

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
// 用于保存服务器回传的命令
var savedCommands = new Set(); // 使用 Set 来存储不同的命令;
function mode1_udpClient_create() {
    mode1_udpClient1 = new UDPClient(mode1_parm_dspip_num, mode1_parm_SP, mode1_parm_LP);
    console.log(mode1_udpClient1);
    mode1_udpClient1.onMessage((msg, rinfo) => {
        console.log(`udpClient1 RX message from ${rinfo.address}:${rinfo.port}:${array_to_hex(msg)}`);
        const msg1_cmd = msg[3];
        switch (msg1_cmd) {
            case 0x84:
                if (msg[0] == 0x7b && msg[2] == 0x09 && msg[3] == 0x84 && msg[5] == 0x02 && msg[6] == 0x00 && msg[8] == 0x7d) {
                    showStatus(`>>> ${getTimestamp()} 修改波特率完成`);
                } else if (msg[0] == 0x7b && msg[2] == 0x09 && msg[3] == 0x84 && msg[5] == 0x02 && msg[6] == 0xff && msg[8] == 0x7d) {
                    showStatus(`>>> ${getTimestamp()} 修改波特率失败`);
                }
                break;
        }

    });


    mode1_udpClient2 = new UDPClient(mode1_parm_dspip_num, mode1_parm_TX, mode1_parm_RX);
    console.log(mode1_udpClient2);
    // 监听服务器响应
    mode1_udpClient2.onMessage((msg, rinfo) => {
        console.log(`udpClient2 RX message from ${rinfo.address}:${rinfo.port}:${array_to_hex(msg)}`);
        const msg2_cmd = msg[3];
        switch (msg2_cmd) {
            case 0x11:
                if (msg[0] == 0x7b && msg[2] == 0x0a && msg[5] == 0x01 && msg[9] == 0x7d) {
                    saveMode1Command(msg);//保存命令
                    let byte7 = msg[7];
                    let canfd_type = null;
                    switch (byte7) {
                        case 0x00:
                            canfd_type = 'TYPE_NULL';
                            break;
                        case 0x01:
                            canfd_type = 'TYPE_H';
                            break;
                        case 0x02:
                            canfd_type = 'TYPE_E_CELL';
                            break;
                        case 0x03:
                            canfd_type = 'TYPE_OLD';
                            break;
                        case 0x04:
                            canfd_type = 'TYPE_MODBUS_H';
                            break;
                        case 0x05:
                            canfd_type = 'TYPE_BMS';
                            break;
                        case 0x06:
                            canfd_type = 'TYPE_GATHER';
                            break;
                        case 0x07:
                            canfd_type = 'TYPE_TRANS';
                            break;
                        case 0x08:
                            canfd_type = 'TYPE_CAPTURE';
                            break;
                        default:
                            canfd_type = '未定义';
                            break;
                    }

                    showStatus(`>>> ${getTimestamp()} 已查询透传及模式状态 当前模式状态：${canfd_type}`);
                    setTimeout(function () {//成功后进入下一个命令......
                        mode1_restore_open();
                        console.log(savedCommands);
                        return query_mode1_baudRate();
                    }, 1000); // 添加1秒延迟，怕程序跑飞，可以多加点延时！
                } else if (msg[0] == 0x7b && msg[2] == 0x0a && msg[5] == 0x02 && msg[9] == 0x7d) {
                    showStatus(`>>> ${getTimestamp()} 开启透传及模式完成`);
                    setTimeout(function () {//成功后进入下一个命令......
                        return update_mode1_baudRate();//修改波特率
                    }, 1000); // 添加1秒延迟，怕程序跑飞，可以多加点延时！
                }
                break;
            case 0x7c:
                if (msg[0] == 0x7b && msg[2] == 0x48 && msg[5] == 0x01 && msg[71] == 0x7d) {
                    saveMode1Command(msg);//保存命令
                    // 提取 msg[14]、msg[15]、msg[16]、msg[17]
                    const byte14 = msg[14];
                    const byte15 = msg[15];
                    const byte16 = msg[16];
                    const byte17 = msg[17];
                    // 组合成一个 32 位整数（小端序）
                    const control_domain_baudRate = (byte17 << 24) | (byte16 << 16) | (byte15 << 8) | byte14;
                    // 提取 msg[118]、msg[19]、msg[20]、msg[21]
                    const byte18 = msg[18];
                    const byte19 = msg[19];
                    const byte20 = msg[20];
                    const byte21 = msg[21];
                    const data_domain_baudRate = (byte21 << 24) | (byte20 << 16) | (byte19 << 8) | byte18;
                    showStatus(`>>> ${getTimestamp()} 已查询波特率状态  当前控制域波特率：${control_domain_baudRate}bps, 数据域波特率：${data_domain_baudRate}bps`);
                    console.log(savedCommands);//打印保存命令
                    mode1_restore_open();
                    setTimeout(function () {//成功后进入下一个命令......
                        console.log(savedCommands);
                        return start_mode1_tran();
                    }, 1000); // 1秒钟进入透传命令
                }
                break;
        }
    });
}


/**
* 模块名:
* 代码描述:保存命令
* 作者:Crow
* 创建时间:2025/03/17 08:34:13
*/
function saveMode1Command(command) {
    // 将命令转换为十六进制字符串
    var hexString = command.toString('hex'); // 假设命令是 Buffer 类型
    // 将十六进制字符串的每个字符用空格隔开
    var commandString = hexString.match(/.{1,2}/g).join(' ');
    // 检查是否已经存在相同的命令
    if (!savedCommands.has(commandString)) {
        savedCommands.add(commandString); // 保存不同的命令
        console.log('保存New命令:', commandString);
    } else {
        console.log('保存New命令已存在', commandString);
    }
    return savedCommands;
}

/**
* 模块名:
* 代码描述:查询透传
* 作者:Crow
* 创建时间:2025/03/13 14:55:40
*/
function query_mode1_tran() {
    return query_mode1_Tran_command(mode1_udpClient2, mode1_parm_canfd_num);
}

/**
* 模块名:query_mode1_baudRate
* 代码描述:查询波特率
* 作者:Crow
* 创建时间:2025/03/17 08:50:33
*/
function query_mode1_baudRate() {
    return query_mode1_baudRate_command(mode1_udpClient2, mode1_parm_canfd_num)
}

/**
* 模块名:start_mode1_tran
* 代码描述:开启透传命令
* 作者:Crow
* 创建时间:2025/03/18 09:54:43
*/
function start_mode1_tran() {
    return start_mode1_Tran_command(mode1_udpClient2, mode1_parm_canfd_num)
}

function update_mode1_baudRate() {
    return update_mode1_baudRate_command(mode1_udpClient1, mode1_parm_canfd_num, mode1_parm_SP)
}


/**
* 模块名:restore_mode1_tran
* 代码描述:恢复透传
* 作者:Crow
* 创建时间:2025/03/17 12:21:59
*/
function restore_mode1_tran() {
    const command1_byte1 = byteArray1[7];
    console.log("恢复透传:", command1_byte1);
    return restore_mode1_tran_command(mode1_udpClient2, mode1_parm_canfd_num, command1_byte1);
}
// /**
// * 模块名:restore_mode1_baudRate
// * 代码描述:恢复波特率
// * 作者:Crow
// * 创建时间:2025/03/17 13:42:38
// */
// function restore_mode1_baudRate() {
//     return restore_mode1_baudRate_command(mode1_udpClient1, mode1_parm_canfd_num, mode1_parm_SP, mode1_restore_parm);
// }

// /**
// * 模块名:
// * 代码描述:开启透传模式
// * 作者:Crow
// * 创建时间:2025/03/17 14:22:07
// */
// function  start_mode1_tran(){
//     return start_mode1_tran_command(mode1_udpClient2, mode1_parm_canfd_num);
// }