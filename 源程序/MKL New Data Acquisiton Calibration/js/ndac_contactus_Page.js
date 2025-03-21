/**
* 模块名:DOMContentLoaded
* 代码描述:初始化
* 作者:Crow
* 创建时间:2025/03/21 15:09:37
*/
document.addEventListener('DOMContentLoaded', () => {

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