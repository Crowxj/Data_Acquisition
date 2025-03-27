/**
* 模块名:DOMContentLoaded
* 代码描述:初始化
* 作者:Crow
* 创建时间:2025/03/21 15:09:37
*/
document.addEventListener('DOMContentLoaded', () => {
 // 公司坐标（经纬度）
 const companyLocation = [120.46117099999992, 36.17786]; 
 const companyName = "青岛美凯麟科技股份有限公司";
 const companyContact = "电 话：0532-68076055";
 // 初始化地图
 const map = new AMap.Map('mapContainer', {
     zoom: 16, // 缩放级别1-18级
     center: companyLocation, // 地图中心点
 });
 // 添加标记
 const marker = new AMap.Marker({
     position: companyLocation, // 标记位置
     title: companyName, // 鼠标悬停显示标题
 });
 map.add(marker);

function createInfoWindowContent(companyName, companyContact) {   
    const escapeHTML = (str) => str ? String(str).replace(/[&<>"'`=\/]/g, (char) => {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;',
            '/': '&#x2F;',
            '`': '&#x60;',
            '=': '&#x3D;'
        };
        return map[char];
    }) : '';
    // 校验并设置默认值
    const safeCompanyName = escapeHTML(companyName || "未知公司");
    const safeCompanyContact = escapeHTML(companyContact || "无联系方式");
    // 返回安全的 HTML 内容
    return `
        <div class="info-window">
            <h3>${safeCompanyName}</h3>
            <p>${safeCompanyContact}</p>
        </div>
    `;
}
// 创建信息窗口
const infoWindow = new AMap.InfoWindow({
    content: createInfoWindowContent(companyName, companyContact), // 使用安全的模板生成函数
    offset: new AMap.Pixel(0, -30) // 信息窗口偏移
});
 // 点击标记显示信息窗口
 marker.on('click', () => {
     infoWindow.open(map, marker.getPosition());
 });
 // 默认打开信息窗口
 infoWindow.open(map, marker.getPosition());

});

/**
* 模块名:nadc_contactus_Page_min
* 代码描述:窗口最小化
* 作者:Crow
* 创建时间:2025/03/21 15:14:07
*/
const nadc_contactus_Page_min=document.getElementById('nadc_contactus_Page_min');
nadc_contactus_Page_min.addEventListener('click',()=>{
    window.TheIPC.ButtonPressed(2)
});
/**
* 模块名:nadc_contactus_Page_close
* 代码描述:关闭窗口
* 作者:Crow
* 创建时间:2025/03/21 15:14:59
*/
const nadc_contactus_Page_close=document.getElementById('nadc_contactus_Page_close');
nadc_contactus_Page_close.addEventListener('click',()=>{
    window.TheIPC.ButtonPressed(1)
});
/**
* 模块名:
* 代码描述:返回上一页
* 作者:Crow
* 创建时间:2025/03/21 15:15:47
*/
const nadc_contactus_Page_return=document.getElementById('nadc_contactus_Page_return');
nadc_contactus_Page_return.addEventListener('click',()=>{
    window.TheIPC.ButtonPressed(5)
});