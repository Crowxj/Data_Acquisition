/**
* 模块名:DOMContentLoaded
* 代码描述:初始化
* 作者:Crow
* 创建时间:2025/03/05 14:01:03
*/
var SETUPSIGN = true;
var canfd_port = {};
var ndac_canfd_num = null;
document.addEventListener('DOMContentLoaded', () => {
    SETUPSIGN = true;//退出标识

    // 恢复设置
    restoreUserSelection();


    const ndac_dspip_set = document.getElementById('ndac_dspip_set');//初始设置dps ip等于默认选择ip
    const ndac_dspip_num = document.getElementById('ndac_dspip_num');
    ndac_dspip_set.value = ndac_dspip_num.value;
    // 获取两个 CANFD 选择框元素
    const ndac_canfd_num_set = document.getElementById('ndac_canfd_num_set');
    const ndac_canfd_num = document.getElementById('ndac_canfd_num');
    const ndac_canfd_port_set = document.getElementById('ndac_canfd_port_set');

    // 为两个选择框添加事件监听器
    ndac_canfd_num_set.addEventListener('change', syncCANFDValues);
    canfd_port[ndac_canfd_num_set.value] = ndac_canfd_port_set.value;//系统保存CANFD和端口的值
    saveCANFDPortToSessionStorage();
    // 定义一个函数来同步两个选择框的值
    function syncCANFDValues(event) {
        const selectedValue = event.target.value;
        if (event.target === ndac_canfd_num_set) {
            ndac_canfd_num.value = selectedValue;
            canfd_port[selectedValue] = ndac_canfd_port_set.value; // 更新canfd_port对象
            saveCANFDPortToSessionStorage(); // 保存到sessionStorage
        }
    }
})


/**
* 模块名:ndac_home_Page_close
* 代码描述:窗口关闭
* 作者:Crow
* 创建时间:2025/03/05 14:01:44
*/
const ndac_home_Page_close = document.getElementById('ndac_home_Page_close')
ndac_home_Page_close.addEventListener('click', () => {
    window.TheIPC.ButtonPressed(1)
})
/**
* 模块名:ndac_home_Page_min
* 代码描述:窗口最小化
* 作者:Crow
* 创建时间:2025/03/05 14:02:53
*/
const ndac_home_Page_min = document.getElementById('ndac_home_Page_min')
ndac_home_Page_min.addEventListener('click', () => {
    window.TheIPC.ButtonPressed(2)
})
/**
* 模块名:ndac_home_Page_setup
* 代码描述:系统设置
* 作者:Crow
* 创建时间:2025/03/05 14:04:26
*/
const ndac_home_Page_setup = document.getElementById('ndac_home_Page_setup')
ndac_home_Page_setup.addEventListener('click', () => {
    const ndac_setup_home_Page = document.getElementById('ndac_setup_home_Page')
    // 立即移除设置面板的过渡效果，避免初始过渡
    ndac_setup_home_Page.style.transition = 'none';
    // 将设置面板移动到屏幕外，准备展示
    ndac_setup_home_Page.style.right = '-410px';
    // 强制浏览器重绘设置面板，以触发过渡效果
    void ndac_setup_home_Page.offsetWidth;
    // 重新添加过渡效果，使设置面板平滑滑入
    ndac_setup_home_Page.style.transition = 'right 0.3s ease-in-out';
    // 将设置面板滑入屏幕
    ndac_setup_home_Page.style.right = '0';
    // 设置标志表示设置面板未退出
    SETUPSIGN = false;//未退出
    if (SETUPSIGN == false) {
        const ndac_device_num = document.getElementById('ndac_device_num');//设备号不能选
        ndac_device_num.disabled = true;
        const ndac_dspip_num = document.getElementById('ndac_dspip_num');//dps ip不能选
        ndac_dspip_num.disabled = true;
        const ndac_canfd_num = document.getElementById('ndac_canfd_num');//CANFD不能选
        ndac_canfd_num.disabled = true;
        const ndac_mode = document.getElementById('ndac_mode');//模式不能选
        ndac_mode.disabled = true;
    }
})
/**
* 模块名:ndac_setup_home_Page_exit
* 代码描述:系统设置退出
* 作者:Crow
* 创建时间:2025/03/05 16:16:50
*/
const ndac_setup_home_Page_exit = document.getElementById('ndac_setup_home_Page_exit')
ndac_setup_home_Page_exit.addEventListener('click', () => {//点击系统退出
    const ndac_setup_home_Page = document.getElementById('ndac_setup_home_Page')
    ndac_setup_home_Page.style.transition = 'right 0.3s ease-in-out';
    ndac_setup_home_Page.style.right = '-410px';
    const ndac_dialog = document.getElementById('ndac_dialog')
    const ndac_dialog_label = document.getElementById('ndac_dialog_label')
    const ndac_dspip_set = document.getElementById('ndac_dspip_set');//初始设置dps ip等于默认选择ip
    const ndac_dspip_num = document.getElementById('ndac_dspip_num');
    localStorage.setItem('ndac_dspip_num', ndac_dspip_num.value);//保存 DSP IPS设置
    ndac_dspip_set.value = localStorage.getItem('ndac_dspip_num');
    SETUPSIGN = true;//已退出
    if (SETUPSIGN == true) {
        ndac_dspip_switch.checked = false;
        ndac_canfdport_switch.checked = false;
        ndac_passback_switch.checked = false;
        const ndac_dspip_set = document.getElementById('ndac_dspip_set');//设置DSP IP不能改
        ndac_dspip_set.disabled = true;
        const ndac_canfd_num_set = document.getElementById('ndac_canfd_num_set');//设置CANFD和端口不能改
        ndac_canfd_num_set.disabled = true;
        const ndac_canfd_port_set = document.getElementById('ndac_canfd_port_set');//设置端口不能改
        ndac_canfd_port_set.disabled = true;
        const ndac_passback_time = document.getElementById('ndac_passback_time');//设置时间不能改
        ndac_passback_time.disabled = true;
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

    saveUserSelection();
})
/**
* 模块名:ndac_dspip_switch
* 代码描述:设置DSP IP 可编辑
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
* 模块名:validateIPAddress
* 代码描述:IP校验
* 作者:Crow
* 创建时间:2025/03/07 13:58:02
*/
function validateIPAddress(ip) {
    // IPv4正则表达式
    const ipv4Pattern = /^(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])$/;
    // IPv6正则表达式
    const ipv6Pattern = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
    // 检查是否符合IPv4或IPv6格式
    return ipv4Pattern.test(ip) || ipv6Pattern.test(ip);
}
/**
* 模块名:ndac_canfdport_switch
* 代码描述:设置CANFD和端口可编辑
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
* 模块名:ndac_passback_switch
* 代码描述:设置回传时间可编辑
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
* 模块名:ndac_home_Page_reset
* 代码描述:重置功能
* 作者:Crow
* 创建时间:2025/03/07 11:28:45
*/
const ndac_home_Page_reset = document.getElementById('ndac_home_Page_reset')
ndac_home_Page_reset.addEventListener('click', () => {
    const ndac_dialog = document.getElementById('ndac_dialog')
    const ndac_dialog_label = document.getElementById('ndac_dialog_label')
    if (ndac_dialog) {
        ndac_dialog.style.display = 'block';
        ndac_dialog_label.innerText = '初始配置重置完成'
        setTimeout(() => {
            window.TheIPC.ButtonPressed(4)
            device_dialog.style.display = 'none';
        }, 1000); // 调整为1秒
    }
})
/**
* 模块名:ndac_dspip_num
* 代码描述:选择DSP IP
* 作者:Crow
* 创建时间:2025/03/07 16:11:28
*/
const ndac_dspip_num = document.getElementById('ndac_dspip_num');
ndac_dspip_num.addEventListener('change', () => {
    const ndac_dspip_set = document.getElementById('ndac_dspip_set');
    ndac_dspip_set.value = ndac_dspip_num.value;
    saveUserSelection();
})

/**
* 模块名:ndac_home_Page_save
* 代码描述:系统设置-设置保存
* 作者:Crow
* 创建时间:2025/03/06 16:06:50
*/
const ndac_home_Page_save = document.getElementById('ndac_home_Page_save')
ndac_home_Page_save.addEventListener('click', () => {
    const ndac_dialog = document.getElementById('ndac_dialog')
    const ndac_dialog_label = document.getElementById('ndac_dialog_label');
    //设置DSP IP部分
    const ndac_dspip_set = document.getElementById('ndac_dspip_set');
    const ndac_dspip_num = document.getElementById('ndac_dspip_num');
    const newIP = ndac_dspip_set.value.trim();
    const existingIps = Array.from(ndac_dspip_num.options).map(option => option.value);
    if (ndac_dspip_switch.checked) {
        if (!validateIPAddress(newIP)) {
            ndac_dialog.style.display = 'block';
            ndac_dialog_label.innerText = 'DSP IP地址无效，请检查格式'
            setTimeout(() => {
                ndac_dialog.style.display = 'none';
            }, 1000); // 调整为1秒
            return -1;
        } else if (existingIps.includes(newIP)) {
            ndac_dialog.style.display = 'block';
            ndac_dialog_label.innerText = 'DSP IP地址已存在，请关闭开关'
            setTimeout(() => {
                ndac_dialog.style.display = 'none';
            }, 1000); // 调整为1秒
            // 找到已存在的选项并选中它
            const existingOption = Array.from(ndac_dspip_num.options).find(option => option.value === newIP);
            if (existingOption) {
                ndac_dspip_num.value = existingOption.value;
                ndac_dspip_num.focus();
            }
            return -1;
        } else if (ndac_dspip_num.options.length >= 3) {
            ndac_dspip_num.remove(2);
        }
        const newOption = new Option(newIP, newIP);
        ndac_dspip_num.add(newOption);
        ndac_dspip_num.selectedIndex = ndac_dspip_num.options.length - 1;
    } else {
        //继续执行下面内容
    }
    //CANFD与端口
    const ndac_canfd_num_set = document.getElementById('ndac_canfd_num_set');
    const ndac_canfd_port_set = document.getElementById('ndac_canfd_port_set');
    if (ndac_canfd_port_set.value <= 0) {
        ndac_dialog.style.display = 'block';
        ndac_dialog_label.innerText = '请检查端口范围1~65535'
        setTimeout(() => {
            ndac_dialog.style.display = 'none';
        }, 1000); // 调整为1秒
        return -1;
    } else if (ndac_canfd_port_set.value > 65535) {
        ndac_dialog.style.display = 'block';
        ndac_dialog_label.innerText = '请检查端口范围1~65535'
        setTimeout(() => {
            ndac_dialog.style.display = 'none';
        }, 1000); // 调整为1秒
        return -1;
    } else {//符合条件写入到canfd

    };
    //回传时间
    const ndac_passback_time = document.getElementById('ndac_passback_time');//选择可以编辑时间
    if (ndac_passback_time.value < 100) {
        ndac_dialog.style.display = 'block';
        ndac_dialog_label.innerText = '请检查回传时间范围100ms~10000ms'
        setTimeout(() => {
            ndac_dialog.style.display = 'none';
        }, 1000); // 调整为1秒
        return -1;
    } else if (ndac_passback_time.value > 10000) {
        ndac_dialog.style.display = 'block';
        ndac_dialog_label.innerText = '请检查回传时间范围100ms~10000ms'
        setTimeout(() => {
            ndac_dialog.style.display = 'none';
        }, 1000); // 调整为1秒
        return -1;
    }
    //关闭DSP IP的开关
    ndac_dspip_switch.checked = false;
    if (ndac_dspip_switch.checked) {
        ndac_dspip_set.disabled = false;
    } else {
        ndac_dspip_set.disabled = true;
    }
    //关闭CANFD和端口的开关
    ndac_canfdport_switch.checked = false;
    if (ndac_canfdport_switch.checked) {
        ndac_canfd_num_set.disabled = false;
        ndac_canfd_port_set.disabled = false;
    } else {
        ndac_canfd_num_set.disabled = true;
        ndac_canfd_port_set.disabled = true;
    }
    //关闭时间开关
    ndac_passback_switch.checked = false;
    if (ndac_passback_switch.checked) {
        ndac_passback_time.disabled = false;
    } else {
        ndac_passback_time.disabled = true;
    }
    // 弹出设置成功对话框
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
        const ndac_setup_home_Page = document.getElementById('ndac_setup_home_Page');//系统设置退出
        ndac_setup_home_Page.style.transition = 'right 0.3s ease-in-out';
        ndac_setup_home_Page.style.right = '-410px';
    }, 1000); // 调整为1秒

    // 保存用户设置
    saveUserSelection();
})

/**
* 模块名:ndac_home_Page_next
* 代码描述:下一步按钮
* 作者:Crow
* 创建时间:2025/03/06 12:42:40
*/
const ndac_home_Page_next = document.getElementById('ndac_home_Page_next')
ndac_home_Page_next.addEventListener('click', () => {
    //对话框
    const ndac_dialog = document.getElementById('ndac_dialog')
    const ndac_dialog_label = document.getElementById('ndac_dialog_label')
    ndac_dialog.style.display = 'none';//关闭对话框
    const ndac_canfd_port_set = document.getElementById('ndac_canfd_port_set');//CANFD号
    const ndac_passback_time = document.getElementById('ndac_passback_time');//返回时间
    const ndac_dspip_num = document.getElementById('ndac_dspip_num');//DSP IP
    const ipAddress = ndac_dspip_num.value.trim(); // 获取输入值并去除空格
    const ndac_mode = document.getElementById('ndac_mode');//模式
    if (SETUPSIGN == false) {
        ndac_dialog.style.display = 'block';
        ndac_dialog_label.innerText = '请退出或保存系统设置'
        setTimeout(() => {
            ndac_dialog.style.display = 'none';
        }, 1000); // 调整为1秒
        return -1;
    } else if (!validateIPAddress(ipAddress)) {
        ndac_dialog.style.display = 'block';
        ndac_dialog_label.innerText = 'DSP IP地址无效，请检查格式'
        setTimeout(() => {
            ndac_dialog.style.display = 'none';
        }, 1000); // 调整为1秒
        return -1;
    } else if (ndac_canfd_port_set.value <= 0) {
        ndac_dialog.style.display = 'block';
        ndac_dialog_label.innerText = '请检查端口范围1~65535'
        setTimeout(() => {
            ndac_dialog.style.display = 'none';
        }, 1000); // 调整为1秒
        return -1;
    } else if (ndac_canfd_port_set.value > 65535) {
        ndac_dialog.style.display = 'block';
        ndac_dialog_label.innerText = '请检查端口范围1~65535'
        setTimeout(() => {
            ndac_dialog.style.display = 'none';
        }, 1000); // 调整为1秒
        return -1;
    } else if (ndac_passback_time.value < 100) {
        ndac_dialog.style.display = 'block';
        ndac_dialog_label.innerText = '请检查回传时间范围100ms~10000ms'
        setTimeout(() => {
            ndac_dialog.style.display = 'none';
        }, 1000); // 调整为1秒
        return -1;
    } else if (ndac_passback_time.value > 10000) {
        ndac_dialog.style.display = 'block';
        ndac_dialog_label.innerText = '请检查回传时间范围100ms~10000ms'
        setTimeout(() => {
            ndac_dialog.style.display = 'none';
        }, 1000); // 调整为1秒
        return -1;
    } else {
        switch (ndac_mode.value) {
            case 'ndacMode1':
                ndac_dialog.style.display = 'block';
                ndac_dialog_label.innerText = '设置完成，进入四段定标'
                let ndacMode1html = "ndac_foursections_Page.html"
                setTimeout(() => {
                    ndac_dialog.style.display = 'none';
                    window.TheIPC.toMain2(1, ndacMode1html);//跳转界面
           
                }, 1000);
                break;
            case 'ndacMode2':
                ndac_dialog.style.display = 'block';
                ndac_dialog_label.innerText = '此模式功能暂不支持'
                let ndacMode2html = ""
                setTimeout(() => {
                    // window.TheIPC.toMain2(1, ndacMode2html);//跳转界面
                    ndac_dialog.style.display = 'none';
                }, 1000);
        }
    }
})


// /**
// * 模块名:saveUserSelection
// * 代码描述:保存用户配置信息
// * 作者:Crow
// * 创建时间:2025/03/10 08:35:47
// */





function saveUserSelection() {
    // 保存所有IP选项
    const ipOptions = Array.from(ndac_dspip_num.options).map(opt => opt.value);
    sessionStorage.setItem('ipOptions', JSON.stringify(ipOptions));

    // 保存其他配置项
    const elementsToSave = {
        ndac_dspip_set: document.getElementById('ndac_dspip_set').value,//保存ip设置的值
        ndac_dspip_switch: document.getElementById('ndac_dspip_switch').checked,//ip设置的开关
        ndac_canfd_num_set: document.getElementById('ndac_canfd_num_set').value,//canfd设置的值
        ndac_canfd_port_set: document.getElementById('ndac_canfd_port_set').value,//端口的值
        ndac_canfdport_switch: document.getElementById('ndac_canfdport_switch').checked,//canfd的开关
        ndac_passback_time: document.getElementById('ndac_passback_time').value,//时间的的值
        ndac_passback_switch: document.getElementById('ndac_passback_switch').checked,//时间的开关
        ndac_device_num: document.getElementById('ndac_device_num').value,//设备号的值
        ndac_dspip_num: document.getElementById('ndac_dspip_num').value,//dspip值
        ndac_canfd_num: document.getElementById('ndac_canfd_num').value,//canfd号
        ndac_mode: document.getElementById('ndac_mode').value,//模式
    };

    Object.keys(elementsToSave).forEach(key => {
        sessionStorage.setItem(key, elementsToSave[key]);
    });

}

// 定义一个函数来保存canfd_port到sessionStorage
function saveCANFDPortToSessionStorage() {
    sessionStorage.setItem('canfd_port', JSON.stringify(canfd_port));
}



/**
* 模块名:restoreUserSelection
* 代码描述:恢复设置选择状态
* 作者:Crow
* 创建时间:2025/03/10 09:14:27
*/
function restoreUserSelection() {
    const elementsToRestore = [
        'ndac_dspip_set', //dsp ip 设置
        'ndac_dspip_switch', //dsp ip 开关
        'ndac_canfd_num_set',//canfd 设置
        'ndac_canfd_port_set', //端口设置
        'ndac_canfdport_switch', //端口开关
        'ndac_passback_time',//回传时间
        'ndac_passback_switch', //回传时间开关
        'ndac_device_num',//设备号
        'ndac_dspip_num',//ip设置
        'ndac_canfd_num',//canfd号
        'ndac_mode'//模式
    ];

    // 恢复基础值
    elementsToRestore.forEach(id => {
        // 根据ID获取页面中的元素
        const element = document.getElementById(id);
        // 从sessionStorage中获取与元素ID对应的存储值
        const storedValue = sessionStorage.getItem(id);
        // 如果找到了对应的元素且sessionStorage中有存储值
        if (element && storedValue !== null) {
            // 检查元素类型是否为复选框
            if (element.type === 'checkbox') {
                // 对于复选框，根据存储值设置其选中状态
                element.checked = storedValue === 'true';
            } else {
                // 对于其他类型的元素，直接设置其值为存储值
                element.value = storedValue;
            }
        }
    });

    // 恢复IP选项
    const ndac_dspip_num = document.getElementById('ndac_dspip_num');
    const storedIPOptions = JSON.parse(sessionStorage.getItem('ipOptions') || '[]');
    if (storedIPOptions.length > 0) {
        ndac_dspip_num.innerHTML = ''; // 清空现有选项
        storedIPOptions.forEach(ip => {
            ndac_dspip_num.add(new Option(ip, ip));
        });
        ndac_dspip_num.value = sessionStorage.getItem('ndac_dspip_num');
    }

    // 同步IP输入框
    const ndac_dspip_set = document.getElementById('ndac_dspip_set');
    ndac_dspip_set.value = ndac_dspip_num.value;

    // 更新UI状态
    updateUIState();
}
/**
* 辅助函数:更新UI状态（根据开关状态禁用/启用元素）
*/
function updateUIState() {
    const dspipSwitch = document.getElementById('ndac_dspip_switch');
    const canfdSwitch = document.getElementById('ndac_canfdport_switch');
    const passbackSwitch = document.getElementById('ndac_passback_switch');
    // 更新输入框禁用状态
    document.getElementById('ndac_dspip_set').disabled = !dspipSwitch.checked;
    document.getElementById('ndac_canfd_num_set').disabled = !canfdSwitch.checked;
    document.getElementById('ndac_canfd_port_set').disabled = !canfdSwitch.checked;
    document.getElementById('ndac_passback_time').disabled = !passbackSwitch.checked;
}