// 定义命令类

const { showStatus } = require("../ipc_main");

const { getTimestamp } = require("../js/time/ndac_time_Info");

class CommandFactory {
    constructor(code, args = {}) {
        this.code = code; // 命令码
        this.args = args; // 命令参数（可以是 Buffer 或其他类型）
        console.log(`Create Command Code: ${this.code}`);
        if (!Array.isArray(this.args)) {
            throw new Error('Set command parameters to not be arrays.');
        }
        return this;
    }


    // 动态生成命令
    generate() {
        switch (this.code) {
            case 'NDAC001':
                return this.generateTran();
            case 'NDAC002':
                return this.generateQueryBaudRate();
            case 'NDAC003':
                return this.generateUpdateBaudRate();
            case 'NDAC004'://查询板卡版本
                return this.generateQueryBoardVersion();
            case 'NDAC005'://获取通道信息命令
                return this.generateGetChannelsValues();
            case 'NDAC006'://调试状态命令
                return this.generateDebugState();
            default:
                throw new Error(`Unknown command: ${this.code}`);
        }
    }

    // 生成查询/发送透传及状态命令
    generateTran() {
        const [param1, param2, param3] = this.args;
        const sendBuf = new Uint8Array(10);
        sendBuf[0] = 0x7b; // 起始标志
        sendBuf[2] = 0x09; // 命令类型
        sendBuf[3] = 0x11; // 子命令类型
        sendBuf[4] = 0x01; // 端口号
        sendBuf[5] = param1; // 固定值 01查询 02修改 
        sendBuf[6] = param2; // CAN FD 编号  16
        sendBuf[7] = param3; // 开启透传 07透传
        sendBuf[9] = 0x7d; // 结束标志
        return sendBuf;
    }

    // 生成查询波特率命令
    generateQueryBaudRate() {
        // const [param1, param2] = this.args;
        const param1 = this.args;
        const sendBuf = new Uint8Array(72);
        sendBuf[0] = 0x7b; // 起始标志
        sendBuf[2] = 0x48;
        sendBuf[3] = 0x7c;
        sendBuf[4] = 0x01;
        sendBuf[5] = 0x01;
        sendBuf[6] = 0x3c;
        sendBuf[7] = 0x3e;
        sendBuf[8] = param1;
        sendBuf[71] = 0x7d;
        return sendBuf;
    }


    //生成修改波特率命令
    generateUpdateBaudRate() {
        const [param1, param2, param3, param4] = this.args;
        const sendBuf = new Uint8Array(24);
        sendBuf[0] = 0x7b; // 起始标志
        sendBuf[2] = 0x18; // 命令类型
        sendBuf[3] = 0x84; // 子命令类型
        sendBuf[4] = 0x01; // 端口号
        sendBuf[5] = 0x02; // 固定值
        sendBuf[6] = param1; // CAN FD 编号
        sendBuf[8] = param2 & 0xFF;
        sendBuf[9] = (param2 >> 8) & 0xFF;
        //存放CANFD控制域波特率
        sendBuf[10] = param3 & 0xFF;// 最低字节
        sendBuf[11] = (param3 >> 8) & 0xFF; // 次低字节
        sendBuf[12] = (param3 >> 16) & 0xFF;// 次高字节
        sendBuf[13] = (param3 >> 24) & 0xFF;// 最高字节
        //存放CANFD数据域波特率
        sendBuf[14] = param4 & 0xFF;// 最低字节
        sendBuf[15] = (param4 >> 8) & 0xFF; // 次低字节
        sendBuf[16] = (param4 >> 16) & 0xFF;// 次高字节
        sendBuf[17] = (param4 >> 24) & 0xFF;// 最高字节
        sendBuf[18] = 0x00;
        sendBuf[23] = 0x7d;
        return sendBuf;
    }

    //生成恢复透传命令
    generateQueryBoardVersion() {
        const param1 = this.args;
        const sendBuf = new Uint8Array(69);
        sendBuf[0] = 0x38; // 起始标志
        sendBuf[1] = 0x00; // 命令类型
        sendBuf[3] = (param1 >> 8) & 0xFF; // 子命令类型
        sendBuf[4] = param1 & 0xFF;
        sendBuf[5] = 0x7c; // 固定值
        sendBuf[6] = 0x00; // 固定值
        return sendBuf;
    }
    //生成获取通道信息命令
    generateGetChannelsValues() {
        const param1 = this.args;
        const sendBuf = new Uint8Array(69);
        sendBuf[0] = 0x30; // 起始标志
        sendBuf[1] = 0x00; // 命令类型
        sendBuf[3] = (param1 >> 8) & 0xFF; // 子命令类型
        sendBuf[4] = param1 & 0xFF;
        return sendBuf;
    }

    //生成调试状态
    generateDebugState() {
        const [param1, param2, param3] = this.args;
        const sendBuf = new Uint8Array(69);
        sendBuf[0] = 0x38;
        sendBuf[1] = 0x00; // 命令类型
        sendBuf[3] = (param1 >> 8) & 0xFF; // 子命令类型
        sendBuf[4] = param1 & 0xFF;
        sendBuf[5] = param2;
        sendBuf[6] = param3;
        sendBuf[7] = 0x00;
        return sendBuf;
    }


}
module.exports = CommandFactory;