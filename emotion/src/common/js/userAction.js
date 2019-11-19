/**
 * 选中的移到回收站 is_recycle = true
 * @param arr  emotion_list
 * @param page vue实例
 * */
export const removeList = function (list, page) {
    /**
     * step1: 选中的itme组成的数组 循环用promise方式请求，更新每项item['is_recycle'] = true
     * step2: 从现有的数据中移除is_recycle = true 的item
     * */
    request(list, page)
}

async function request(arr, page) {
    const task = [];
    for (let i = 0; i < arr.length; i++) {
        const db = wx.cloud.database();
        const emotion = db.collection("emotion");
        const promise = new Promise((resolve, reject) => {
            emotion
                .doc(arr[i]._id)
                .update({
                    data: {
                        is_recycle: true
                    }
                }).then(res => {
                    if (res.stats.updated == 1) {
                        page.emotionList.forEach(ele => {
                            ele.emotion.forEach((emotions, index) => {
                                if (emotions._id == arr[i]._id) {
                                    ele.emotion.splice(index, 1)
                                }
                            })
                        })
                        let arrs = JSON.parse(JSON.stringify(page.get_emotion_list));
                        arrs.forEach(ele => {
                            if (ele._id == arr[i]._id) {
                                ele.is_recycle = true;
                            }
                        })
                        page.set_emotion_list(arrs);
                    }
                    resolve({ status: 'success' })
                })
        })
        task.push(promise)
    }

    await Promise.all(task).then(res => {
        let results = page.emotionList.every(ele => {
            return ele.emotion.length == 0
        })
        if (results) {
            page.emotionList = []
        }
        page.confirmFlag = false;
        page.manage = false;
    })
}

/**
 * remove emotion data to emotionList [is_recycle ?  '移入回收站' : '移除回收站']
 * @param page vue实例
 * */
export const removeRecycle = function (page) {
    page.loading = true;
    const db = wx.cloud.database();
    const emotion = db.collection("emotion");
    emotion
        .doc(page.get_current_emotion._id)
        .update({
            data: {
                is_recycle: false
            }
        }).then(res => {
            let arr = JSON.parse(JSON.stringify(page.get_emotion_list));
            arr.forEach(ele => {
                if (ele._id == page.get_current_emotion._id) {
                    ele.is_recycle = false;
                }
            })
            page.set_emotion_list(arr)
            page.loading = false;
            page.removeFlag = true;
            setTimeout(() => {
                page.removeFlag = false;
                wx.navigateBack({
                    delta: 1  // 返回上一级页面。
                })
            }, 2000)

        })
}

/**
 * delete emotion data
 * @param page vue实例
 * */
export const delItem = function (page) {
    page.confirmFlag = true;
    const db = wx.cloud.database();
    const emotion = db.collection("emotion");
    emotion.doc(page.current_emotion._id).remove({}).then(res => {
        wx.showToast({
            title: '删除成功',
            icon: 'none'
        })
        let arr = JSON.parse(JSON.stringify(page.get_emotion_list))
        arr.forEach((ele, i) => {
            if (ele._id == page.current_emotion._id) {
                arr.splice(i, 1)
            }
        })
        page.set_emotion_list(arr);
        page.confirmFlag = false
        setTimeout(() => {
            wx.navigateBack({
                delta: 1  // 返回上一级页面。
            })
        }, 2000);
    })
}

/**
 * add emotion item
 * @param editor 编辑器信息(delta,html,text),default: Object
 * @param type [type = 'draft' || 'save']
 * @param page vue实例
 * @param emotion 数据库实例对象
 * */
export const updateItem = function (editor, type, emotion, page) {
    emotion
        .doc(page.current_emotion._id)
        .update({
            data: {
                html: editor.html,
                text: editor.text,
                delta: editor.delta,
                create_time: new Date().getTime(),
                is_draft: type == 'draft' ? true : false
            }
        })
        .then(res => {
            page.loading = false;
            page.saveSuccess = true;
            setTimeout(() => {
                page.saveSuccess = false;
                wx.switchTab({
                    url: "../emotion/main"
                });
            }, 200);
        })
}

/**
 * add emotion item
 * @param editor 编辑器信息(delta,html,text),default: Object
 * @param page vue实例
 * @param emotion 数据库实例对象
 * @param type 当前是编辑 还是 新增页面 [type =  'draft'  || 'save'] 
 * */
export const addItem = function (editor, type, emotion, page) {
    wx.cloud
        .callFunction({
            name: "login",
            data: {}
        })
        .then(res => {
            let obj = {
                user_id: res.result.openid,
                user_name: page.get_user_info.nickName,
                user_avatar: page.get_user_info.avatarUrl,
                text: editor.text,
                delta: editor.delta,
                html: editor.html,
                is_favor: false,
                is_recycle: false,
                is_draft: type == "draft" ? true : false,
                create_time: new Date().getTime()
            };
            emotion
                .add({
                    data: obj
                })
                .then(result => {
                    if (result._id) {
                        page.loading = false;
                        page.saveSuccess = true;
                        // page.set_emotion_list(page.get_emotion_list.concat([Object.assign({ "_id": Math.random() * 100 })]))
                        setTimeout(() => {
                            page.saveSuccess = false;
                            wx.switchTab({
                                url: "../emotion/main"
                            });
                        }, 200);
                    }
                    // {_id: "00a6cea35dc8c4b904ded11560ca80aa", errMsg: "collection.add:ok"}
                });
        });

}

