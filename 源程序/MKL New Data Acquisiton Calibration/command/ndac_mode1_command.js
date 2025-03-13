/**
 * 执行命令
 */
var Command = require('../class/ndac_command_class');
var UDPClient = require('../class/ndac_client_class');
module.exports = {
    getDeviceInfo, query_transmission_mode
}
var mode1_deviceNum = null;//设备号
var mode1_dspIP = null;//dspIP
var mode1_canFd = null;//canfd
var mode1_SP = null;//dps端口
var mode1_LP = null;//dps监听端口
var mode1_Mode = null;//模式
var mode1_passbacktime = null;//回传时间
var mode1_TX = 60001;
var mode1_RX = 60000;
function getDeviceInfo(devid, dspip, canfd, canfdport, mode, passbacktime) {
    mode1_deviceNum = devid;
    mode1_dspIP = dspip;
    mode1_canFd = canfd;
    mode1_SP = canfdport;
    mode1_Mode = mode;
    mode1_passbacktime = passbacktime;
    console.log("mode1_deviceNum:", mode1_deviceNum, "mode1_dspIP:", mode1_dspIP, "mode1_canFd:", mode1_canFd, "mode1_dspPort:", mode1_SP, "mode1_Mode:", mode1_Mode, "mode1_passbacktime:", mode1_passbacktime, "ms");
}


//查询透传
function query_transmission_mode() {
    const buf_len = 10;
    const send_buf = new Uint8Array(buf_len);
    send_buf[0] = 0x7b;
    send_buf[2] = 0x09;
    send_buf[3] = 0x11;
    send_buf[4] = 0x01;
    send_buf[5] = 0x02;//
    send_buf[6] = 0x01;
    send_buf[7] = 0x07;//透传
    send_buf[9] = 0x7d;
    const command = new Command("查询透传", send_buf)
    console.log(command)
    const mode1_client = new UDPClient(mode1_dspIP, mode1_RX)
    mode1_client.sendCommand(command.args)
    mode1_client.onResponse((data) => {
        console.log(data)
    })
}