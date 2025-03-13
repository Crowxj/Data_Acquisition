// 定义命令类

class Command{
    constructor(name,args) {
        this.name = name; // 命令名称
        if (Buffer.isBuffer(args)) {
            this.args = JSON.parse(args.toString()); // 将 Buffer 解析为对象
        } else {
            this.args = args; // 命令参数
        }
        console.log(this.name,this.args);
    }
    // 将命令序列化为字符串
    serialize() {
        return JSON.stringify(this.args);
    }
    // 从字符串反序列化为命令对象
    static deserialize(data) {
        console.log(JSON.parse(data));
        return JSON.parse(data);
    }
}

module.exports = Command;