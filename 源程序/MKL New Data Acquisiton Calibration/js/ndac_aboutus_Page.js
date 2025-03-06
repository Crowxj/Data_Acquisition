/**
* 模块名:ndac_aboutus_Page
* 代码描述:初始化
* 作者:Crow
* 创建时间:2025/03/06 09:57:55
*/
document.addEventListener('DOMContentLoaded', () => {

})
/**
* 模块名:ndac_aboutus_Page
* 代码描述:窗口返回
* 作者:Crow
* 创建时间:2025/03/06 10:04:27
*/
const nadc_aboutus_Page_return=document.getElementById('nadc_aboutus_Page_return')
nadc_aboutus_Page_return.addEventListener('click',()=>{
    window.TheIPC.ButtonPressed(5)
})
/**
* 模块名:ndac_aboutus_Page
* 代码描述:窗口最小化
* 作者:Crow
* 创建时间:2025/03/06 10:09:09
*/
const nadc_aboutus_Page_min=document.getElementById('nadc_aboutus_Page_min')
nadc_aboutus_Page_min.addEventListener('click',()=>{
    window.TheIPC.ButtonPressed(2)
})

/**
* 模块名:ndac_aboutus_Page
* 代码描述:关闭窗口
* 作者:Crow
* 创建时间:2025/03/06 10:10:03
*/
const nadc_aboutus_Page_close=document.getElementById('nadc_aboutus_Page_close')
nadc_aboutus_Page_close.addEventListener('click',()=>{
    window.TheIPC.ButtonPressed(1)
})
