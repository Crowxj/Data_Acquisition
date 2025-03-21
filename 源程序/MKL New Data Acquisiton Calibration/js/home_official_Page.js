/**
* 模块名:
* 代码描述:初始化
* 作者:Crow
* 创建时间:2025/02/23 12:34:00
*/
document.addEventListener('DOMContentLoaded', () => {
    const iframe = document.getElementById('official_info');
     iframe.src = 'http://www.mklchina.com/';
 })
/**
* 模块名:nadc_official_Page_return
* 代码描述:返回
* 作者:Crow
* 创建时间:2025/03/21 15:27:19
*/
 const nadc_official_Page_return=document.getElementById('nadc_official_Page_return');
 nadc_official_Page_return.addEventListener('click',()=>{
     window.TheIPC.ButtonPressed(5);
 })
/**
* 模块名:nadc_official_Page_min
* 代码描述:窗口最小
* 作者:Crow
* 创建时间:2025/03/21 15:27:54
*/
 const nadc_official_Page_min=document.getElementById('nadc_official_Page_min');
 nadc_official_Page_min.addEventListener('click',()=>{
     window.TheIPC.ButtonPressed(2);
 })
 /**
 * 模块名:nadc_official_Page_close
 * 代码描述:窗口关闭
 * 作者:Crow
 * 创建时间:2025/03/21 15:28:24
 */
 const nadc_official_Page_close=document.getElementById('nadc_official_Page_close');
 nadc_official_Page_close.addEventListener('click',()=>{
     window.TheIPC.ButtonPressed(1);
 })
 