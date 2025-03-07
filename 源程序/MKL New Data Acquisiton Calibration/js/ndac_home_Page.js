/**
* 模块名:ndac_home_Page
* 代码描述:初始化
* 作者:Crow
* 创建时间:2025/03/05 14:01:03
*/
var SETUPSIGN = true;
var canfd_port = {};
var ndac_canfd_num = null;
document.addEventListener('DOMContentLoaded', () => {
    SETUPSIGN = true;//退出标识
    // 获取两个 CANFD 选择框元素
    const ndac_canfd_num_set = document.getElementById('ndac_canfd_num_set');
    const ndac_canfd_num = document.getElementById('ndac_canfd_num');
    const ndac_canfd_port_set = document.getElementById('ndac_canfd_port_set');
    // 定义一个函数来同步两个选择框的值
    function syncCANFDValues(event) {
        const selectedValue = event.target.value;
        if (event.target === ndac_canfd_num_set) {
            ndac_canfd_num.value = selectedValue;
        } else if (event.target === ndac_canfd_num) {
            ndac_canfd_num_set.value = selectedValue;
        }
    }
    // 为两个选择框添加事件监听器
    ndac_canfd_num_set.addEventListener('change', syncCANFDValues);
    canfd_port[ndac_canfd_num_set.value] = ndac_canfd_port_set.value;//保存对应的CANFD和端口

})

/**
 * 根据CAN-FD值获取对应的端口号
 * 此函数用于根据给定的CAN-FD值查找并返回相应的端口号
 * @param {string} canfdValue - CAN-FD值，作为查找端口的键
 * @returns {string} - 返回对应的端口号如果找不到对应的端口，则返回undefined
 */
function getPortByCANFD(canfdValue) {
    return canfd_port[canfdValue];
}
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
    SETUPSIGN = false;//未退出
    if (SETUPSIGN == false) {
        const ndac_device_num = document.getElementById('ndac_device_num');//设备号不能选
        ndac_device_num.disabled = true;
        const ndac_dspip_num = document.getElementById('ndac_dspip_num');//dps ip不能选
        ndac_dspip_num.disabled = true;
        const ndac_mode = document.getElementById('ndac_mode');//模式不能选
        ndac_mode.disabled = true;
    }
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
    const ndac_dialog = document.getElementById('ndac_dialog')
    const ndac_dialog_label = document.getElementById('ndac_dialog_label')
    SETUPSIGN = true;//退出
    if (SETUPSIGN == true) {
        const ndac_dspip_num = document.getElementById('ndac_dspip_num');//dps ip能选
        ndac_dspip_num.disabled = false;
        const ndac_mode = document.getElementById('ndac_mode');//模式能选
        ndac_mode.disabled = false;
    }
    ndac_dialog.style.display = 'block';
    ndac_dialog_label.innerText = '退出系统设置'
    setTimeout(() => {
        ndac_dialog.style.display = 'none';
    }, 1000); // 调整为1秒
})
/**
* 模块名:
* 代码描述:设置dspip
* 作者:Crow
* 创建时间:2025/03/06 16:24:17
*/
const ndac_dspip_switch = document.getElementById('ndac_dspip_switch');
ndac_dspip_switch.addEventListener('click', () => {
    const ndac_dspip_set = document.getElementById('ndac_dspip_set');
    if (ndac_dspip_switch.checked) {
        ndac_dspip_set.disabled = false;
    } else {
        ndac_dspip_set.disabled = true;
    }
})
/**
* 模块名:
* 代码描述:设置CANFD和对应端口
* 作者:Crow
* 创建时间:2025/03/06 16:17:52
*/
const ndac_canfdport_switch = document.getElementById('ndac_canfdport_switch');
ndac_canfdport_switch.addEventListener('click', () => {
    const ndac_canfd_num_set = document.getElementById('ndac_canfd_num_set');
    const ndac_canfd_port_set = document.getElementById('ndac_canfd_port_set');
    if (ndac_canfdport_switch.checked) {
        ndac_canfd_num_set.disabled = false;
        ndac_canfd_port_set.disabled = false;
    } else {
        ndac_canfd_num_set.disabled = true;
        ndac_canfd_port_set.disabled = true;
    }
})

/**
* 模块名:
* 代码描述:设置回传时间
* 作者:Crow
* 创建时间:2025/03/06 13:41:32
*/
const ndac_passback_switch = document.getElementById('ndac_passback_switch');
ndac_passback_switch.addEventListener('click', () => {
    const ndac_passback_time = document.getElementById('ndac_passback_time');//选择可以编辑时间
    if (ndac_passback_switch.checked) {
        ndac_passback_time.disabled = false;
    } else {
        ndac_passback_time.disabled = true;
    }
})

/**
* 模块名:设置
* 代码描述:ndac_home_Page_save
* 作者:Crow
* 创建时间:2025/03/06 16:06:50
*/
const ndac_home_Page_save = document.getElementById('ndac_home_Page_save')
ndac_home_Page_save.addEventListener('click', () => {
    const ndac_dialog = document.getElementById('ndac_dialog')
    const ndac_dialog_label = document.getElementById('ndac_dialog_label')
    //关闭回传时间开关
    ndac_passback_switch.checked = false;
    const ndac_passback_time = document.getElementById('ndac_passback_time');//选择可以编辑时间
    if (ndac_passback_switch.checked) {
        ndac_passback_time.disabled = false;
    } else {
        ndac_passback_time.disabled = true;
    }
    //关闭CANFD开关
    ndac_canfdport_switch.checked = false;
    const ndac_canfd_num_set = document.getElementById('ndac_canfd_num_set');
    const ndac_canfd_port_set = document.getElementById('ndac_canfd_port_set');
    if (ndac_canfdport_switch.checked) {
        ndac_canfd_num_set.disabled = false;
        ndac_canfd_port_set.disabled = false;
    } else {
        ndac_canfd_num_set.disabled = true;
        ndac_canfd_port_set.disabled = true;
    }
    //关闭dspip开关
    ndac_dspip_switch.checked = false;
    const ndac_dspip_set = document.getElementById('ndac_dspip_set');
    if (ndac_dspip_switch.checked) {
        ndac_dspip_set.disabled = false;
    } else {
        ndac_dspip_set.disabled = true;
    }
    //弹出设置成功对话框
    ndac_dialog.style.display = 'block';
    ndac_dialog_label.innerText = '设置成功，退出系统设置'
    SETUPSIGN = true;//退出
    setTimeout(() => {
        if (SETUPSIGN == true) {
            const ndac_dspip_num = document.getElementById('ndac_dspip_num');//dps ip能选
            ndac_dspip_num.disabled = false;
            const ndac_mode = document.getElementById('ndac_mode');//模式能选
            ndac_mode.disabled = false;
        }
        ndac_dialog.style.display = 'none';
        SETUPSIGN = true;//退出系统设置
        const ndac_setup_home_Page = document.getElementById('ndac_setup_home_Page')
        ndac_setup_home_Page.style.transition = 'right 0.3s ease-in-out';
        ndac_setup_home_Page.style.right = '-410px';
    }, 1000); // 调整为1秒

    //保存CANFD端口到canfd_port数组中
    canfd_port[ndac_canfd_num_set.value] = ndac_canfd_port_set.value;
    // portValue = getPortByCANFD(ndac_canfd_num.value);
    // console.log(portValue);

})

/**
* 模块名:
* 代码描述:下一步按钮
* 作者:Crow
* 创建时间:2025/03/06 12:42:40
*/
const ndac_home_Page_next = document.getElementById('ndac_home_Page_next')
ndac_home_Page_next.addEventListener('click', () => {
    //对话框
    const ndac_dialog = document.getElementById('ndac_dialog')
    const ndac_dialog_label = document.getElementById('ndac_dialog_label')
    ndac_dialog.style.display = 'none';
    const ndac_canfd_port_set = document.getElementById('ndac_canfd_port_set');//CANFD号
    const ndac_mode = document.getElementById('ndac_mode');//模式
    if (SETUPSIGN == false) {
        ndac_dialog.style.display = 'block';
        ndac_dialog_label.innerText = '请退出或保存系统设置'
        setTimeout(() => {
            ndac_dialog.style.display = 'none';
        }, 1000); // 调整为1秒
    } else if (ndac_canfd_port_set.value < 0) {
        ndac_dialog.style.display = 'block';
        ndac_dialog_label.innerText = 'CANFD对应端口不能为负'
        setTimeout(() => {
            ndac_dialog.style.display = 'none';
        }, 1000); // 调整为1秒
    } else if (ndac_canfd_port_set.value == 0) {
        ndac_dialog.style.display = 'block';
        ndac_dialog_label.innerText = 'CANFD对应端口不能为0'
        setTimeout(() => {
            ndac_dialog.style.display = 'none';
        }, 1000); // 调整为1秒
    } else if (ndac_mode.value == 'mdacMode2') {
        ndac_dialog.style.display = 'block';
        ndac_dialog_label.innerText = '此模式功能暂不支持'
        setTimeout(() => {
            ndac_dialog.style.display = 'none';
        }, 1000); // 调整为1秒
    } else {
        ndac_dialog.style.display = 'block';
        ndac_dialog_label.innerText = '设置完成，执行下一步'
        // 跳到新的界面，关闭显示
        setTimeout(() => {
            ndac_dialog.style.display = 'none';

            // let html = "device_channel_set.html"
            //     window.TheIPC.toMain2(1, html);//跳转界面
            //     //对象转换为 JSON 字符串
            //     localStorage.setItem('set_dev_info', JSON.stringify(dev_info));
        }, 1000); // 调整为1秒
    }
})