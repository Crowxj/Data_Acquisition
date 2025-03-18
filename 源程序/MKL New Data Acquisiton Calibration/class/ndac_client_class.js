/**
 * 定义客户端UDPClient 类
 */
const dgram = require('dgram');
const Command = require('./ndac_command_class');//引用命令的类
const Module = require('module');
const {array_to_hex}=require('../js/numeric/ndac_numeric')

/**
* 模块名:Client
* 代码描述:定义Client 类
* 作者:Crow
* 创建时间:2025/03/12 16:36:15
*/
class Client {
    constructor() {
        if (new.target === Client) {
            throw new Error('UDPClient类不能被实例化');
        }
    }
    // 发送数据（由子类实现）
    sendCommand(data) {
        throw new Error('Method "send" must be implemented by subclass.');
    }
    //监听数据（由子类实现）
    onResponse(callback) {
        throw new Error('Method "onResponse" must be implemented by subclass.');
    }
    // 关闭客户端（由子类实现）
    close() {
        throw new Error('Method "close" must be implemented by subclass.');
    }
}

/**
* 模块名:
* 代码描述:定义UDPClient类继承Client类
* 作者:Crow
* 创建时间:2025/03/12 16:38:18
*/

class UDPClient extends Client {

    constructor(host, sendPort, listenPort) {
        super();// 调用父类构造方法以初始化父类部分
        this.host = host; // 目标主机
        this.sendPort = sendPort; // 发送命令的端口
        this.listenPort = listenPort; // 监听回复的端口
        this.udpclient = dgram.createSocket('udp4');


        //绑定监听到的端口
        this.udpclient.bind(this.listenPort, () => {
            console.log(`>>> Running udpClient ${this.host}:${this.sendPort}-${this.listenPort}`);
        });

    }
    //发送命令
    sendCommand(command) {
        const buffer = Buffer.from(command);
        this.udpclient.send(buffer, 0, buffer.length, this.sendPort, this.host, (err) => {
            if (err) {
                console.error('Error sending command:', err);
                this.close();
            } else {
                console.log(`TX Command to ${this.host}:${this.sendPort}:${array_to_hex(command)}`);// 
            }
        });
    }
    // 监听服务器响应
    onMessage(callback) {
        this.udpclient.on('message', (msg, rinfo) => {
            callback(msg, rinfo);
        });
    }

    // 关闭客户端
    close() {
        this.udpclient.close();
    }

}

module.exports = UDPClient




