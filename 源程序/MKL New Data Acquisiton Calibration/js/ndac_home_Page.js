/**
* 模块名:ndac_home_Page
* 代码描述:初始化
* 作者:Crow
* 创建时间:2025/03/05 14:01:03
*/
document.addEventListener('DOMContentLoaded', () => {
    var SETUPSIGN = false;//退出标识

})
/**
* 模块名:ndac_home_Page
* 代码描述:窗口关闭
* 作者:Crow
* 创建时间:2025/03/05 14:01:44
*/
const ndac_home_Page_close = document.getElementById('ndac_home_Page_close')
ndac_home_Page_close.addEventListener('click', () => {
    window.TheIPC.ButtonPressed(1)
})
/**
* 模块名:ndac_home_Page
* 代码描述:窗口最小化
* 作者:Crow
* 创建时间:2025/03/05 14:02:53
*/
const ndac_home_Page_min = document.getElementById('ndac_home_Page_min')
ndac_home_Page_min.addEventListener('click', () => {
    window.TheIPC.ButtonPressed(2)
})
/**
* 模块名:ndac_home_Page
* 代码描述:系统设置
* 作者:Crow
* 创建时间:2025/03/05 14:04:26
*/
const ndac_home_Page_setup = document.getElementById('ndac_home_Page_setup')
ndac_home_Page_setup.addEventListener('click', () => {
    const ndac_setup_home_Page = document.getElementById('ndac_setup_home_Page')
    ndac_setup_home_Page.style.transition = 'none';
    ndac_setup_home_Page.style.right = '-410px';
    void ndac_setup_home_Page.offsetWidth;
    ndac_setup_home_Page.style.transition = 'right 0.3s ease-in-out';
    ndac_setup_home_Page.style.right = '0';
})
/**
* 模块名:
* 代码描述:系统设置退出
* 作者:Crow
* 创建时间:2025/03/05 16:16:50
*/
const ndac_setup_home_Page_exit = document.getElementById('ndac_setup_home_Page_exit')
ndac_setup_home_Page_exit.addEventListener('click', () => {
    const ndac_setup_home_Page = document.getElementById('ndac_setup_home_Page')
    ndac_setup_home_Page.style.transition = 'right 0.3s ease-in-out';
    ndac_setup_home_Page.style.right = '-410px';
})
