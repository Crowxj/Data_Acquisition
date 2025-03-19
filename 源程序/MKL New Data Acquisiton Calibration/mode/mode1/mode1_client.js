module.exports = {
    mode1_parameter, query_mode1_tran, restore_mode1_tran, query_board_version
};

const { get_ndac_mode1_parameter } = require('../../js/manage/ndac_jump_interface');
const { query_mode1_Tran_command, query_mode1_baudRate_command, start_mode1_Tran_command, update_mode1_baudRate_command, restore_mode1_tran_command,
    restore_mode1_baudRate_command, query_board_version_command
} = require('../mode1/mode1_command');
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
var MODE1TRAN = "MODE1TRAN_query";//MODE1TRAN_start代表开启 代表恢复
var MODE1BAUDRATE = "MODE1BAUDRATE_query";
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
        MODE1RESTORE = true;
        // 删除数组的第一个元素
        commandsArray.shift();
        console.log(commandsArray, commandsArray.length);
    }
    if (commandsArray.length === 0) {
        MODE1RESTORE = false;
        MODE1TRAN = "MODE1TRAN_query";//MODE1TRAN_start代表开启 代表恢复
        MODE1BAUDRATE = "MODE1BAUDRATE_query";
        showStatus(`>>> ${getTimestamp()} DPS 参数状态恢复完成`)
        showValue(100, MODE1RESTORE);
    }
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
        const msg1_cmd1 = msg[3];
        const msg1_id1 = msg[3];
        const msg1_id2 = msg[4];
        switch (msg1_cmd1) {
            case 0x84:
                if (msg[0] == 0x7b && msg[2] == 0x09 && msg[3] == 0x84 && msg[5] == 0x02 && msg[6] == 0x00 && msg[8] == 0x7d) {
                    switch (MODE1BAUDRATE) {
                        case "MODE1BAUDRATE_update":
                            mode1_restore_open();
                            showStatus(`>>> ${getTimestamp()} 修改波特率完成`);
                            showStatus(`>>> ${getTimestamp()} DPS 参数状态初始化完成`)
                            break;
                        case "MODE1BAUDRATE_restore":
                            showStatus(`>>> ${getTimestamp()} 恢复波特率完成`);
                            mode1_restore_close();
                            break;
                    }
                } else if (msg[0] == 0x7b && msg[2] == 0x09 && msg[3] == 0x84 && msg[5] == 0x02 && msg[6] == 0xff && msg[8] == 0x7d) {
                    switch (MODE1BAUDRATE) {
                        case "MODE1BAUDRATE_update":
                            showStatus(`>>> ${getTimestamp()} 修改波特率失败`);
                            showStatus(`>>> ${getTimestamp()} DPS 参数状态初始化失败`)
                            break;
                        case "MODE1BAUDRATE_restore":
                            showStatus(`>>> ${getTimestamp()} 恢复波特率失败`);
                            break;
                    }
                }
                break;
        }
        switch (msg1_id1) {
            case 0x00:

                switch (msg1_id2) {
                    case 0x01:
                    case 0x02:
                    case 0x03:
                    case 0x04:
                    case 0x05:
                    case 0x06:
                    case 0x07:
                    case 0x08:
                        if (msg[0] === 0x3e) {

                        }
                        if (msg[0] === 0x38) {
                            //查询板卡信息
                            if (msg[5] === 0x01 && msg[10] === 0x01) {
                                show_board_version(msg);
                            } else if (msg[5] === 0x01 && msg[10] === 0x10) {
                                show_board_version(msg);
                            } else if (msg[5] === 0x02 && msg[10] === 0x01) {
                                show_board_version(msg);
                            } else if (msg[5] === 0x02 && msg[10] === 0x10) {
                                show_board_version(msg);
                            } else if (msg[5] === 0x03 && msg[10] === 0x01) {
                                show_board_version(msg);
                            } else if (msg[5] === 0x03 && msg[10] === 0x10) {
                                show_board_version(msg);
                            } else if (msg[5] === 0x04 && msg[10] === 0x01) {
                                show_board_version(msg);
                            } else if (msg[5] === 0x04 && msg[10] === 0x10) {
                                show_board_version(msg);
                            }


                        }
                        break;
                    case 0x31:
                    case 0x32:
                    case 0x33:
                    case 0x34:
                    case 0x35:
                    case 0x36:
                    case 0x37:
                    case 0x38:
                        break;
                    case 0x51:
                    case 0x52:
                    case 0x53:
                    case 0x54:
                    case 0x55:
                    case 0x56:
                    case 0x57:
                    case 0x58:
                        break;
                }

                break;
        }
    });


    mode1_udpClient2 = new UDPClient(mode1_parm_dspip_num, mode1_parm_TX, mode1_parm_RX);
    console.log(mode1_udpClient2);
    // 监听服务器响应
    mode1_udpClient2.onMessage((msg, rinfo) => {
        console.log(`udpClient2 RX message from ${rinfo.address}:${rinfo.port}:${array_to_hex(msg)}`);
        const msg2_cmd1 = msg[3];
        switch (msg2_cmd1) {
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
                        // mode1_restore_open();
                        console.log(savedCommands);
                        return query_mode1_baudRate();
                    }, 1000); // 添加1秒延迟，怕程序跑飞，可以多加点延时！
                } else if (msg[0] == 0x7b && msg[2] == 0x0a && msg[5] == 0x02 && msg[9] == 0x7d) {
                    switch (MODE1TRAN) {
                        case "MODE1TRAN_start":
                            showStatus(`>>> ${getTimestamp()} 开启透传及模式完成`);
                            setTimeout(function () {//成功后进入下一个命令......
                                return update_mode1_baudRate();//修改波特率
                            }, 1000); // 添加1秒延迟，怕程序跑飞，可以多加点延时！
                            break;
                        case "MODE1TRAN_restore":
                            showStatus(`>>> ${getTimestamp()} 恢复透传及模式完成`);
                            setTimeout(function () {//成功后进入下一个命令......
                                mode1_restore_close()
                                return restore_mode1_baudRate();//恢复波特率
                            }, 1000); // 添加1秒延迟，怕程序跑飞，可以多加点延时！
                            break;
                        default:
                            MODE1TRAN = "MODE1TRAN_query"
                            break;
                    }
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
                    // mode1_restore_open();
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
    MODE1TRAN = "MODE1TRAN_query";
    return query_mode1_Tran_command(mode1_udpClient2, mode1_parm_canfd_num);
}
/**
* 模块名:query_mode1_baudRate
* 代码描述:查询波特率
* 作者:Crow
* 创建时间:2025/03/17 08:50:33
*/
function query_mode1_baudRate() {
    MODE1BAUDRATE = "MODE1BAUDRATE_query";
    return query_mode1_baudRate_command(mode1_udpClient2, mode1_parm_canfd_num)
}
/**
* 模块名:start_mode1_tran
* 代码描述:开启透传命令
* 作者:Crow
* 创建时间:2025/03/18 09:54:43
*/
function start_mode1_tran() {
    MODE1TRAN = "MODE1TRAN_start";
    return start_mode1_Tran_command(mode1_udpClient2, mode1_parm_canfd_num)
}
/**
* 模块名:update_mode1_baudRate
* 代码描述:修改波特率
* 作者:Crow
* 创建时间:2025/03/18 13:22:57
*/
function update_mode1_baudRate() {
    MODE1BAUDRATE = "MODE1BAUDRATE_update";
    return update_mode1_baudRate_command(mode1_udpClient1, mode1_parm_canfd_num, mode1_parm_SP)
}
/**
* 模块名:restore_mode1_tran
* 代码描述:恢复透传
* 作者:Crow
* 创建时间:2025/03/17 12:21:59
*/
function restore_mode1_tran() {
    MODE1TRAN = "MODE1TRAN_restore";
    const command1_byte1 = byteArray1[7];
    return restore_mode1_tran_command(mode1_udpClient2, mode1_parm_canfd_num, command1_byte1);
}
/**
* 模块名:restore_mode1_baudRate
* 代码描述:恢复波特率
* 作者:Crow
* 创建时间:2025/03/17 13:42:38
*/
function restore_mode1_baudRate() {
    MODE1BAUDRATE = "MODE1BAUDRATE_restore";
    const byte14 = byteArray2[14];
    const byte15 = byteArray2[15];
    const byte16 = byteArray2[16];
    const byte17 = byteArray2[17];
    // 组合成一个 32 位整数（小端序）
    const command1_byte1 = (byte17 << 24) | (byte16 << 16) | (byte15 << 8) | byte14;
    // 提取 msg[118]、msg[19]、msg[20]、msg[21]
    const byte18 = byteArray2[18];
    const byte19 = byteArray2[19];
    const byte20 = byteArray2[20];
    const byte21 = byteArray2[21];
    const command1_byte2 = (byte21 << 24) | (byte20 << 16) | (byte19 << 8) | byte18;
    return restore_mode1_baudRate_command(mode1_udpClient1, mode1_parm_canfd_num, mode1_parm_SP, command1_byte1, command1_byte2);
}


/**
* 模块名:query_board_version
* 代码描述:查询板卡版本号
* 作者:Crow
* 创建时间:2025/03/19 09:33:54
*/
function query_board_version(id, boardId) {
    return query_board_version_command(mode1_udpClient1, boardId);
}

/**
* 模块名:
* 代码描述:显示板卡版本状态
* 作者:Crow
* 创建时间:2025/03/19 10:23:15
*/
function show_board_version(msg) {
    const message = msg;
    console.log(message[0]);
    let boardType;//产品类型
    switch (message[5]) {
        case 0x01:
            boardType = '电压采集板';
            break;
        case 0x02:
            boardType = 'K型热电偶采集板';
            break;
        case 0x03:
            boardType = 'T型热电偶采集板';
            break;
        default:
            boardType = 'NTC型采集板';
            break;
    }
    console.log(`产品类型:${boardType}`);
    showValue(1,boardType);
    let accuracyType;//精度类型
    switch (message[6]) {
        case 0x00:
            accuracyType = '普通精度(电压板千分之一精度，温度板±1℃)';
            break;
        case 0x01:
            accuracyType = '高精度(电压板万五精度，温度板±0.5℃)';
            break;
    }
    console.log(`精度类型:${accuracyType}`);
    let programName_H;//程序名高
    switch (message[7]) {
        case 0x01:
            programName_H = 'DTL-H';
            break;
    }
    let programName_M;
    switch (message[8]) {
        case 0x01:
            programName_M = 'CollectionVT'
            break;
        case 0x02:
            programName_M = 'CollectionNTC'
            break;
        case 0x03:
            programName_M = 'CollectionVISO'
            break;
        case 0x04:
            programName_M = 'CollectionUT'
            break;
    }
    let programName_L;
    switch (message[9]) {
        case 0x10:
            programName_L = '16U'
            break;
    }
    console.log(`程序名:${programName_H} ${programName_M} ${programName_L}`);
    let programType;
    switch (message[10]) {
        case 0x01:
            programType = '测试程序'
            break;
        case 0x10:
            programType = '正式程序'
            break;
    }
    console.log(`程序类型:${programType}`);
    let boardVrsion;
    boardVrsion = `V${message[11]}.${message[12]}版本`
    console.log(`版本号:${boardVrsion}`);
    showStatus(`>>> ${getTimestamp()} 产品类型:${boardType}`)
    showStatus(`>>> ${getTimestamp()} 精度类型:${accuracyType}`)
    showStatus(`>>> ${getTimestamp()} 程序名:${programName_H} ${programName_M} ${programName_L}`)
    showStatus(`>>> ${getTimestamp()} 程序类型:${programType}`)
    showStatus(`>>> ${getTimestamp()} 版本号:${boardVrsion}`)
    showStatus(`>>> ${getTimestamp()} ###############################################`)
    showStatus(`>>> ${getTimestamp()} 查询板卡程序版本信息完成`)
}