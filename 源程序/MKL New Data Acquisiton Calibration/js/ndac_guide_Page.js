



/**
* 模块名:ndac_guide_Page
* 代码描述:初始化
* 作者:Crow
* 创建时间:2025/03/07 09:24:37
*/
document.addEventListener('DOMContentLoaded', () => {
    ndac_guide_operation_guide();
})
/**
* 模块名:ndac_guide_Page
* 代码描述:显示操作指南
* 作者:Crow
* 创建时间:2025/03/07 09:26:03
*/
function ndac_guide_operation_guide(){
    PDFObject.embed("../file/MKL Equipment Remote Upgrade使用说明书.pdf", "#pdfViewerContainer");
}
/**
* 模块名:ndac_guide_Page
* 代码描述:返回上一页
* 作者:Crow
* 创建时间:2025/03/07 09:29:03
*/
const nadc_guide_Page_return=document.getElementById('nadc_guide_Page_return');
nadc_guide_Page_return.addEventListener('click',()=>{
    window.TheIPC.ButtonPressed(5)
})
/**
* 模块名:ndac_guide_Page
* 代码描述:窗口最小化
* 作者:Crow
* 创建时间:2025/03/07 09:30:40
*/
const nadc_guide_Page_min=document.getElementById('nadc_guide_Page_min');
nadc_guide_Page_min.addEventListener('click',()=>{
    window.TheIPC.ButtonPressed(2)
})
/**
* 模块名:ndac_guide_Page
* 代码描述:关闭窗口
* 作者:Crow
* 创建时间:2025/03/07 09:31:18
*/
const nadc_guide_Page_close=document.getElementById('nadc_guide_Page_close');
nadc_guide_Page_close.addEventListener('click',()=>{
    window.TheIPC.ButtonPressed(1)
})

/**
* 模块名:ndac_guide_Page
* 代码描述:下载操作指南
* 作者:Crow
* 创建时间:2025/03/07 09:31:50
*/ 
const nadc_guide_Page_dl=document.getElementById('nadc_guide_Page_dl');
nadc_guide_Page_dl.addEventListener('click',()=>{
    const Guide = document.getElementById("Guide");
    Guide.click();
})