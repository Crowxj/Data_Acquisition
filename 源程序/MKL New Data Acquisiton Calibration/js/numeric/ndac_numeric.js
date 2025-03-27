module.exports = {
    array_to_hex
}
/**
 * 将给定的数组转换为16进制字符串表示形式
 * 主要用于可视化或进一步处理数组数据
 * @param {Array} array - 需要转换的数组
 * @returns {string} - 转换后的16进制字符串
 */
function array_to_hex(array) {
    // 使用Buffer从给定数组创建一个新的Buffer实例
    const array_data = Buffer.from(array);
    // 将Buffer转换为16进制字符串，并格式化为大写、每字节之间有空格的形式
    const hexString = array_data.toString('hex').toUpperCase().match(/.{1,2}/g).join(' ');
    // 返回格式化后的16进制字符串
    return hexString;
}

/**
* 模块名:转换波特率
* 代码描述:formatBandwidth(bps)
* 作者:Crow
* 创建时间:2025/03/26 16:09:22
*/
// function formatBandwidth(bps){
//     if(bps>=1000000){

//     }
// }