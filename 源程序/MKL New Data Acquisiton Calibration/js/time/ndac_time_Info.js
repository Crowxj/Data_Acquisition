module.exports = {
    getTimestamp
};
/**
 * 获取当前时间的时间戳
 * 
 * 该函数生成一个包含当前时间的小时、分钟、秒和毫秒的时间戳
 * 时间戳格式为HH.MM.SS.mmmmmm，其中HH代表小时，MM代表分钟，
 * SS代表秒，mmmmmm代表毫秒
 * 
 * @returns {string} 返回格式化后的时间戳字符串
 */
function getTimestamp() {
    try {
        // 创建一个表示当前时间的Date对象
        const now = new Date();
        // 获取当前小时数，确保两位格式，不足两位前面补0
        const hours = String(now.getHours()).padStart(2, '0');
        // 获取当前分钟数，确保两位格式，不足两位前面补0
        const minutes = String(now.getMinutes()).padStart(2, '0');
        // 获取当前秒数，确保两位格式，不足两位前面补0
        const seconds = String(now.getSeconds()).padStart(2, '0');
        // 获取当前毫秒数，确保六位格式，不足六位前面补0，以提高时间戳的精度
        const milliseconds = String(now.getMilliseconds()).padStart(6, '0');
        // 返回格式化后的时间戳字符串
        return `【${hours}.${minutes}.${seconds}.${milliseconds}】`;
    } catch (error) {
        //出现异常情况时，返回【00.00.00.00】
        return `【00.00.00.00】`;
    }
}