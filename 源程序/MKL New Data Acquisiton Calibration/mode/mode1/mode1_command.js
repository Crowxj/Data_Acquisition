module.exports = {
    query_mode1_Tran_command, query_mode1_baudRate_command, start_mode1_Tran_command, 
    update_mode1_baudRate_command, restore_mode1_tran_command, restore_mode1_baudRate_command,
    query_board_version_command
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
    showStatus(`>>> ${getTimestamp()} DPS 参数状态初始化进行中...`)
    const tran_function = 0x01;
    const tran_cmd = 0x07;
    const command_parm = [tran_function, parm_canfd_num, tran_cmd];
    const query_mode1_Tran = new CommandFactory('NDAC001', command_parm);
    mode1_udpClient2.sendCommand(query_mode1_Tran.generate());
    showStatus(`>>> ${getTimestamp()} 查询透传及模式进行中...`)
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
    showStatus(`>>> ${getTimestamp()} 查询波特率进行中...`)
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
    showStatus(`>>> ${getTimestamp()} 开启透传及模式进行中...`)
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
    showStatus(`>>> ${getTimestamp()} 修改控制域波特率${control_domain_baudRate}bps,数据域波特率${data_domain_baudRate}bps进行中...`)
}

/**
* 模块名:restore_mode1_tran_command
* 代码描述:恢复透传
* 作者:Crow
* 创建时间:2025/03/18 11:29:42
*/
function restore_mode1_tran_command(mode1_udpClient2, parm_canfd_num, command1_byte1) {
    showStatus(`>>> ${getTimestamp()} DPS 参数状态恢复进行中...`)
    const tran_function = 0x02;
    const tran_cmd = command1_byte1;
    const command_parm = [tran_function, parm_canfd_num, tran_cmd];
    const restore_mode1_Tran = new CommandFactory('NDAC001', command_parm);
    mode1_udpClient2.sendCommand(restore_mode1_Tran.generate());
    showStatus(`>>> ${getTimestamp()} 恢复透传及模式进行中...`)
}
/**
* 模块名:restore_mode1_baudRate_command()
* 代码描述:恢复波特率
* 作者:Crow
* 创建时间:2025/03/17 13:25:19
*/
function restore_mode1_baudRate_command(mode1_udpClient1, parm_canfd_num, mode1_parm_SP, command1_byte1, command1_byte2) {
    const control_domain_baudRate = command1_byte1;
    const data_domain_baudRate = command1_byte2;
    const command_parm = [parm_canfd_num, mode1_parm_SP, control_domain_baudRate, data_domain_baudRate];
    const restore_mode1_baudRate = new CommandFactory('NDAC003', command_parm);
    mode1_udpClient1.sendCommand(restore_mode1_baudRate.generate());
    showStatus(`>>> ${getTimestamp()} 恢复波特率进行中...`)
}


/**
* 模块名:
* 代码描述:查看板卡版本号
* 作者:Crow
* 创建时间:2025/03/19 09:39:18
*/
function query_board_version_command(mode1_udpClient1, boardId) {
    const boardID = boardId;
    const command_parm = [boardID];
    const query_board_version = new CommandFactory('NDAC004', command_parm);
    mode1_udpClient1.sendCommand(query_board_version.generate());
    showStatus(`>>> ${getTimestamp()} 板卡程序版本信息查询：板卡${boardID}`);
    showStatus(`>>> ${getTimestamp()} 查询板卡程序版本信息进行中...`)
    showStatus(`>>> ${getTimestamp()} ###############################################`)
}