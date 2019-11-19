<template>
    <div>
        <div class="trend-page">
            <!-- loading panel -->
            <no-use
                v-if="loading"
                :type="'loadingData'"
            />
            <!-- no loading panel -->
            <div v-if="!loading">
                <!-- no data panel -->
                <no-use
                    v-if="!emotionList.length"
                    :type="'noDataOfEmotion'"
                />
                <!-- has data -->
                <emotions
                    v-if="emotionList.length"
                    :manage="manage"
                    :emotionList="emotionList"
                    @manageList="manageList"
                    @queryEmotion="queryEmotion"
                    @checkOne="checkOne"
                    :types="'emotion'"
                />
            </div>
            <!-- remove recycle panel -->
            <div
                v-if="manage"
                class="cancel"
                @click="cancelList"
            >取消</div>
            <div
                class="manage"
                v-if="manage"
            >
                <span @click="checkAll">全选</span>
                <span @click="removeRecycle">删除</span>
            </div>
        </div>

        <!-- go to addEmotion page -->
        <div
            v-if="!manage"
            class="edit"
            @click="editEmotion"
        >
            <i class="iconfont icon-bianji"></i>
        </div>

        <!-- confirm remove panel -->
        <confirm
            v-if="confirmFlag"
            @confirm="confirm"
            @undo="undo"
            :type="'removeRecycle'"
        />
    </div>
</template>

<script>
//vuex  [mapGetters  mapMutations]
import { mapGetters, mapMutations } from "vuex";

//import other js
import { removeList } from "@/common/js/userAction.js";
import { formatData, getEmotionList } from "@/common/js/formatData.js";
import { getEmotion } from "@/common/js/getData.js";

//components
import emotions from "@/components/emotions.vue";
import noUse from "@/components/nouse.vue";
import confirm from "@/components/modal.vue";
export default {
    data() {
        return {
            manage: false, // 管理界面，展示选择框 flag
            emotionList: [], // 渲染数据源
            loading: true, // 初始化loading flag
            confirmFlag: false // 确认删除框flag
        };
    },

    components: {
        emotions,
        "no-use": noUse,
        confirm
    },

    watch: {
        emotionList(v) {
            this.emotionList = v;
        }
    },

    computed: {
        ...mapGetters(["get_emotion_list"])
    },

    onShow() {
        let _this = this;
        this.loading = true;
        getEmotion(this);
    },

    methods: {
        /**
         * go to page what can add emotion item
         * */

        editEmotion() {
            this.set_current_emotion({});
            wx.navigateTo({
                url: "../addEmotion/main"
            });
        },

        manageList() {
            this.manage = true;
        },
        cancelList() {
            this.emotionList.forEach(ele => {
                ele.emotion.forEach(trend => {
                    this.$set(trend, "is_recycle", false);
                });
            });
            this.manage = false;
        },

        /**
         * go to add Emotion page
         * */

        queryEmotion(item) {
            this.set_current_emotion(item);
            wx.navigateTo({
                url: "../addEmotion/main"
            });
        },

        /**
         * select all item['is_recycle'] = true
         * */

        checkAll() {
            this.emotionList.forEach(ele => {
                ele.emotion.forEach(trend => {
                    this.$set(trend, "is_recycle", !trend.is_recycle);
                });
            });
        },

        /**
         * remove all item which selected to recycle
         * next step:  confirm remove or  undo remove
         * */

        removeRecycle() {
            this.confirmFlag = true;
        },

        /**
         * selected one item
         * */

        checkOne(item) {
            this.$set(item, "is_recycle", !item.is_recycle);
        },

        /**
         * confirm remove all item which selected
         * */

        confirm() {
            let filterArr = [];
            this.emotionList.forEach(ele => {
                let res = ele.emotion.filter(emotion => {
                    return emotion.is_recycle;
                });
                filterArr = filterArr.concat(res);
            });
            // console.log("conform remove all");
            removeList(filterArr, this);
        },

        /**
         * undo remove all item which selected
         * */

        undo() {
            this.confirmFlag = false;
            this.cancelList();
        },

        /**
         * vuex:  mapMutations
         * */

        ...mapMutations({
            set_emotion_list: "SET_EMOTION_LIST",
            set_current_emotion: "SET_CURRENT_EMOTION"
        })
    }
};
</script>

<style scoped lang="less">
.edit {
    width: 80rpx;
    height: 80rpx;
    background: red;
    position: fixed;
    bottom: 80rpx;
    right: 40rpx;
    border-radius: 50%;
    background: #2b9ef2;
    text-align: center;
    line-height: 40rpx;

    i {
        width: 100%;
        height: 100%;
        font-size: 44rpx;
        text-align: center;
        line-height: 80rpx;
        color: white;
    }
}

.trend-page {
    padding: 24px;
}

.cancel {
    position: fixed;
    top: 24px;
    right: 24px;
    color: white;
    font-size: 14px;
    width: 75px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    border-radius: 8px;
    background: #2b9ef2;
}

.manage {
    position: fixed;
    bottom: 48rpx;
    left: 0;
    display: flex;
    width: 100%;
    padding: 0 100rpx;
    box-sizing: border-box;

    span {
        display: flex;
        flex-grow: 1;
        align-items: center;
        justify-content: center;
        height: 33px;
        background: #e5e5e5;
        color: white;
        box-shadow: 0px 0px 10px rgba(166, 191, 245, 0.4);
    }

    span:first-child {
        background: #2b9ef2;
        margin-right: 24px;
    }
}
</style>
