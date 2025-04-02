module.exports = {
    query_mode1_Tran_command, query_mode1_baudRate_command, start_mode1_Tran_command,
    update_mode1_baudRate_command, restore_mode1_tran_command, restore_mode1_baudRate_command,
    query_board_version_command, get_channels_values_command, enter_mode1_debug_command, exit_mode1_debug_command,
    initialize_KB_command, batch_KB_command
}
const CommandFactory = require('../../class/ndac_command_class');
const { showStatus } = require('../../ipc_main')
const { getTimestamp } = require('../../js/time/ndac_time_Info')
/**
* 模块名:query_mode1_tran_command
* 代码描述:查询透传模式
* 作者:Crow
* 创建时间:2025/03/13 14:58:08
*/
function query_mode1_Tran_command(mode1_udpClient2, parm_canfd_num) {
    showStatus(`>>> ${getTimestamp()} DPS参数状态初始化开始`)
    const tran_function = 0x01;
    const tran_cmd = 0x07;
    const command_parm = [tran_function, parm_canfd_num, tran_cmd];
    const query_mode1_Tran = new CommandFactory('NDAC001', command_parm);
    mode1_udpClient2.sendCommand(query_mode1_Tran.generate());
    showStatus(`>>> ${getTimestamp()} DPS查询透传及模式进行中 ...`)
}
/**
* 模块名:查询波特率模式
* 代码描述:query_mode1_baudRate_command
* 作者:Crow
* 创建时间:2025/03/17 09:06:22
*/
function query_mode1_baudRate_command(mode1_udpClient1, parm_canfd_num) {
    const command_parm = [parm_canfd_num]
    const query_mode1_baudRate = new CommandFactory('NDAC002', command_parm);
    mode1_udpClient1.sendCommand(query_mode1_baudRate.generate());
    showStatus(`>>> ${getTimestamp()} DPS查询波特率进行中 ...`)
}
/**
* 模块名:开启透传
* 代码描述:start_mode1_baudRate_command
* 作者:Crow
* 创建时间:2025/03/18 09:58:34
*/
function start_mode1_Tran_command(mode1_udpClient2, parm_canfd_num) {
    const tran_function = 0x02;
    const tran_cmd = 0x07;
    const command_parm = [tran_function, parm_canfd_num, tran_cmd];
    const start_mode1_Tran = new CommandFactory('NDAC001', command_parm);
    mode1_udpClient2.sendCommand(start_mode1_Tran.generate());
    showStatus(`>>> ${getTimestamp()} DPS开启透传及模式进行中 ...`)
}

/**
* 模块名:update_mode1_baudRate_command
* 代码描述:修改波特率
* 作者:Crow
* 创建时间:2025/03/18 10:17:54
*/
function update_mode1_baudRate_command(mode1_udpClient1, parm_canfd_num, mode1_parm_SP) {
    const control_domain_baudRate = 1000000;
    const data_domain_baudRate = 2000000;
    const command_parm = [parm_canfd_num, mode1_parm_SP, control_domain_baudRate, data_domain_baudRate];
    const update_mode1_baudRate = new CommandFactory('NDAC003', command_parm);
    mode1_udpClient1.sendCommand(update_mode1_baudRate.generate());
    showStatus(`>>> ${getTimestamp()} DPS修改控制域波特率1Mbps，数据域波特率2Mbps进行中 ...`)
}

/**
* 模块名:restore_mode1_tran_command
* 代码描述:恢复透传
* 作者:Crow
* 创建时间:2025/03/18 11:29:42
*/
function restore_mode1_tran_command(mode1_udpClient2, parm_canfd_num, command1_byte1) {
    const tran_function = 0x02;
    const tran_cmd = command1_byte1;
    const command_parm = [tran_function, parm_canfd_num, tran_cmd];
    const restore_mode1_Tran = new CommandFactory('NDAC001', command_parm);
    mode1_udpClient2.sendCommand(restore_mode1_Tran.generate());
    showStatus(`>>> ${getTimestamp()} DPS恢复透传及模式进行中 ...`)
}
/**
* 模块名:restore_mode1_baudRate_command()
* 代码描述:恢复波特率
* 作者:Crow
* 创建时间:2025/03/17 13:25:19
*/
function restore_mode1_baudRate_command(mode1_udpClient1, parm_canfd_num, mode1_parm_SP, command1_byte1, command1_byte2) {
    showStatus(`>>> ${getTimestamp()} DPS参数状态恢复开始`)
    const control_domain_baudRate = command1_byte1;
    const data_domain_baudRate = command1_byte2;
    const command_parm = [parm_canfd_num, mode1_parm_SP, control_domain_baudRate, data_domain_baudRate];
    const restore_mode1_baudRate = new CommandFactory('NDAC003', command_parm);
    mode1_udpClient1.sendCommand(restore_mode1_baudRate.generate());
    showStatus(`>>> ${getTimestamp()} DPS恢复波特率进行中 ...`)
}

/**
* 模块名:query_board_version_command
* 代码描述:查看板卡版本号
* 作者:Crow
* 创建时间:2025/03/19 09:39:18
*/
function query_board_version_command(mode1_udpClient1, boardId) {
    const boardID = boardId;
    const Fid = boardID + 0x100;
    const command_parm = [Fid];
    const query_board_version = new CommandFactory('NDAC004', command_parm);
    mode1_udpClient1.sendCommand(query_board_version.generate());
    showStatus(`>>> ${getTimestamp()} 板卡程序版本信息查询：板卡${boardID}`);
    showStatus(`>>> ${getTimestamp()} 查询板卡程序版本信息进行中 ...`)
}
/**
* 模块名:take_test_values_command
* 代码描述:发送要数命令
* 作者:Crow
* 创建时间:2025/03/19 15:08:16
*/
// 定义全局变量
let currentBoardId = null;
let intervalId = null;
function get_channels_values_command(mode1_udpClient1, board, time) {

    // 清除之前的定时器
    if (intervalId !== null) {
        clearInterval(intervalId);
        console.log("清除之前的定时器");
    }

    // 更新当前选中的板卡 ID
    currentBoardId = board;

    // 创建新的定时器
    if (currentBoardId !== null) {
        intervalId = setInterval(() => {
            sendTakeTestValuesCommand(mode1_udpClient1, currentBoardId);
        }, time); // 使用传入的时间间隔
    }
}

function sendTakeTestValuesCommand(mode1_udpClient1, boardId) {
    const boardID = boardId;
    const Fid = boardID + 0x100;
    const command_parm = [Fid];
    const take_test_values = new CommandFactory('NDAC005', command_parm);
    mode1_udpClient1.sendCommand(take_test_values.generate());
}

/**
* 模块名:enter_mode1_debug_command
* 代码描述:进入调试状态命令
* 作者:Crow
* 创建时间:2025/03/21 10:19:27
*/
function enter_mode1_debug_command(mode1_udpClient1, boardId) {
    const boardID = boardId;
    const Fid = boardID + 0x100;
    const command1 = 0xda;
    const command2 = 0xaa;
    const command_parm = [Fid, command1, command2];
    const enter_mode1_debug = new CommandFactory('NDAC006', command_parm);
    mode1_udpClient1.sendCommand(enter_mode1_debug.generate());
    showStatus(`>>> ${getTimestamp()} 板卡${boardID},进入调试状态进行中 ...`);
}

/**
* 模块名:exit_mode1_debug_command
* 代码描述:退出调试状态命令
* 作者:Crow
* 创建时间:2025/03/21 10:33:47
*/
function exit_mode1_debug_command(mode1_udpClient1, boardId) {
    const boardID = boardId;
    const Fid = boardID + 0x100;
    const command1 = 0xda;
    const command2 = 0xbb;
    const command_parm = [Fid, command1, command2];
    const exit_mode1_debug = new CommandFactory('NDAC006', command_parm);
    mode1_udpClient1.sendCommand(exit_mode1_debug.generate());
    showStatus(`>>> ${getTimestamp()} 板卡${boardID},设备退出调试状态进行中 ...`);
}
/**
* 模块名:initialize_KB_command
* 代码描述:初始化K/B值
* 作者:Crow
* 创建时间:2025/03/23 21:15:45
*/
function initialize_KB_command(mode1_udpClient1, boardId, channel) {
    const boardID = boardId;
    const Fid = boardID + 0x100;
    const fK = 10000;
    const fb = 0;
    let currentIndex = 0; // 当前要打印的元素的索引
    const intervalId = setInterval(() => {
        if (currentIndex < channel.length) {
            const command_parm = [Fid, channel[currentIndex], fK, fb];
            showStatus(`>>> ${getTimestamp()} 板卡${boardID}，通道${channel[currentIndex]}初始化K值:${fK},B值:${fb}进行中...`);
            const initialize_KB = new CommandFactory('NDAC007', command_parm);
            mode1_udpClient1.sendCommand(initialize_KB.generate());
            currentIndex++;
        } else {
            clearInterval(intervalId); // 打印完所有元素后清除定时器
        }
    }, 500); // 每隔 1000 毫秒（1 秒）打印一个元素
}


function batch_KB_command(mode1_udpClient1, boardId, channelsKB) {
    const boardID = boardId;
    const Fid = boardID + 0x100;
    let currentIndex = 0; // 当前要打印的元素的索引
    const channelData = channelsKB;
    const intervalId = setInterval(() => {
        if (currentIndex < channelData.length) {
            const channel = channelData[currentIndex].channel;//通道号
            const actualOne1=channelData[currentIndex].actualOne1;//定标1段实际值1
            const testOne1=channelData[currentIndex].testOne1;//定标1段测试值1
            const actualOne2=channelData[currentIndex].actualOne2;//定标1段测试值2
            const testOne2=channelData[currentIndex].testOne2;//定标1段实际值2
            const kvalueOne1=channelData[currentIndex].kvalueOne1;//定标1段B值
            const bvalueOne1=channelData[currentIndex].bvalueOne1;//定标1段K值
            const demarcValue1=channelData[currentIndex].demarcValue1;//定标1段分界点1
            const actualTwo1=channelData[currentIndex].actualTwo1;//定标2段实际值1
            const testTwo1=channelData[currentIndex].testTwo1;//定标2段测试值1
            const actualTwo2=channelData[currentIndex].actualTwo2;//定标2段实际值2
            const testTwo2=channelData[currentIndex].testTwo2;//定标2段测试值2
            const kvalueTwo1=channelData[currentIndex].kvalueTwo1;//定标2段B值
            const bvalueTwo1=channelData[currentIndex].bvalueTwo1;//定标2段K值
            const demarcValue2=channelData[currentIndex].demarcValue2;//定标2段分界点2
            const actualThree1=channelData[currentIndex].actualThree1;//定标3段实际值1
            const testThree1=channelData[currentIndex].testThree1;//定标3段测试值1
            const actualThree2=channelData[currentIndex].actualThree2;//定标3段实际值2
            const testThree2=channelData[currentIndex].testThree2;//定标3段测试值2
            const kvalueThree1=channelData[currentIndex].kvalueThree1;//定标3段B值
            const bvalueThree1=channelData[currentIndex].bvalueThree1;//定标3段K值
            const demarcValue3=channelData[currentIndex].demarcValue3;//定标3段分界点3
            const actualfour1=channelData[currentIndex].actualfour1;//定标4段实际值1
            const testfour1=channelData[currentIndex].testfour1;//定标4段测试值1
            const actualfour2=channelData[currentIndex].actualfour2;//定标4段实际值2
            const testfour2=channelData[currentIndex].testfour2;//定标4段测试值2
            const kvaluefour1=channelData[currentIndex].kvaluefour1;//定标4段B值
            const bvaluefour1=channelData[currentIndex].bvaluefour1;//定标4段K值 
            const channeltypeText=channelData[currentIndex].channeltypeText;//通道类型
            const settionText=channelData[currentIndex].settionText;//定标类型
            const command_parm = [Fid,channel, kvalueOne1, bvalueOne1,demarcValue1,kvalueTwo1,bvalueTwo1,demarcValue2,kvalueThree1,bvalueThree1,demarcValue3,kvaluefour1,bvaluefour1];
            showStatus(`>>> ${getTimestamp()} 板卡${boardID}，通道${channel}，${settionText}进行中...`);
            // console.log("wxj",command_parm);
            const batch_KB = new CommandFactory('NDAC008', command_parm);
            mode1_udpClient1.sendCommand(batch_KB.generate());
            currentIndex++;
        } else {
            clearInterval(intervalId); // 打印完所有元素后清除定时器
        }
    }, 500);
}
