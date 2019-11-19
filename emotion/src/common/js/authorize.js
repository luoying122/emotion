
/*
* params@e ==>  authorize userinfo
* params@page  ==>  vue实例
* */

export const authorize = function (e, page) {
    if (e.mp.detail.userInfo) {
        // console.log(e)
        page.set_user_info(e.mp.detail.userInfo)
        wx.switchTab({
            url: '../emotion/main'
        })
    } else {
        wx.showModal({
            content: '您拒绝了授权后续将无法使用其余功能',
            confirmText: "确认",
            success: function (res) {
                console.log(res);
                //点击“确认”时打开设置页面
                if (res.confirm) {
                    console.log('用户点击确认')
                }
            }
        });
    }
}
