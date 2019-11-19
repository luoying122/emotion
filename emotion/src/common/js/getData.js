
import { getEmotionList } from './formatData'

export const getEmotion = function (page) {
    let _this = page;
    wx.cloud
        .callFunction({
            name: "login",
            data: {
                a: 1,
                b: 2
            }
        })
        .then(res => {
            wx.cloud
                .callFunction({
                    name: "emotionList",
                    data: {
                        openid: res.result.openid
                    }
                })
                .then(results => {
                    /**
                     * 引用类型
                     * 不加此操作：
                     * warning： Do not mutate vuex store state outside mutation handlers.
                     */
                    _this.set_emotion_list(
                        JSON.parse(JSON.stringify(results.result.data))
                    );
                    getEmotionList(results.result.data, _this)
                    // _this.formatData(res.result.data);
                    _this.loading = false;
                });
        });
}
