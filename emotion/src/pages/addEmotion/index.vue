<template>
    <div>
        <div
            class="container"
            :style="{height: containerHeight + 'px'}"
        >
            <editor
                id="editor"
                class="ql-container"
                :placeholder="placeholder"
                @statuschange="onStatusChange"
            >
            </editor>
        </div>
        <view
            class="toolbar"
            @touchend.stop="format"
            :hidden="keyboardHeight > 0 ? false : true"
            :style="{bottom: isIOS ? keyboardHeight+'px' : 0}"
        >
            <i
                class="iconfont icon-tupian"
                @touchend.stop="insertImage"
            ></i>
            <i
                :class="['iconfont','icon-format-header-3', formats.header === 3 ? 'ql-active' : '']"
                :data-name="'header'"
                style="font-size: 16px"
                :data-value="3"
            ></i>
            <i
                :class="['iconfont','icon-zitijiacu', formats.bold ? 'ql-active' : '']"
                data-name="bold"
                style="font-size: 16px"
            ></i>
            <i
                :class="['iconfont','icon-zitixieti', formats.italic ? 'ql-active' : '']"
                data-name="italic"
                style="font-size: 16px"
            ></i>
            <i
                :class="['iconfont', 'icon-zitixiahuaxian', formats.underline ? 'ql-active' : '']"
                data-name="underline"
                style="font-size: 16px"
            ></i>
            <i
                :class="['iconfont','icon--checklist']"
                data-name="list"
                data-value="check"
            ></i>
            <i
                :class="['iconfont','icon-youxupailie', formats.list === 'ordered' ? 'ql-active' : '']"
                data-name="list"
                data-value="ordered"
            ></i>
            <i
                :class="['iconfont', 'icon-wuxupailie', formats.list === 'bullet' ? 'ql-active' : '']"
                data-name="list"
                data-value="bullet"
            ></i>
        </view>

        <!-- recycle = false -->
        <div v-show="!isRecycle">
            <div
                class="send"
                @click="getContents('save')"
            >
                保存到心情簿
            </div>

            <div
                v-if="!current_emotion._id"
                class="send draft"
                @click="getContents('draft')"
            >
                保存到草稿箱
            </div>
        </div>

        <!-- recycle -->
        <div
            v-show="isRecycle"
            class="send"
            @click="deleteItem"
        >
            删除
        </div>

        <div
            v-show="isRecycle"
            class="send draft"
            @click="removeToEmotion"
        >
            移出回收站
        </div>

        <!-- confirm delete emotion -->
        <confirm
            v-if="confirmFlag"
            :type="'deleteItem'"
            @confirm="confirm"
            @undo="undo"
        />

        <!-- component toast -->
        <toast
            v-if="removeFlag || saveSuccess || loading || upload"
            :type="removeFlag ? 'removeSuccess' : saveSuccess ? 'saveSuccess' : loading ? 'loadingSave' : upload ? 'uploadSuccess' : ''"
        />
    </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import {
    addItem,
    updateItem,
    removeRecycle,
    delItem
} from "@/common/js/userAction.js";
import { getQuery } from "@/common/js/getQuery.js";
import confirm from "@/components/modal.vue";
import toast from "@/components/toast.vue";
export default {
    data() {
        return {
            formats: {},
            readOnly: false,
            placeholder: "开始输入...",
            editorHeight: 300,
            keyboardHeight: 0,
            isIOS: false,
            containerHeight: 0,

            upload: false,
            loading: false, // loading toast
            saveSuccess: false, // save emotion success toast

            current_emotion: {},

            // page is from recycle
            isRecycle: false,
            // remove to emotion sucess
            removeFlag: false,

            //confirm
            confirmFlag: false
        };
    },

    components: {
        toast,
        confirm
    },

    computed: {
        ...mapGetters([
            "get_user_info",
            "get_emotion_list",
            "get_current_emotion"
        ])
    },

    mounted() {},

    methods: {
        updatePosition(keyboardHeight) {
            const toolbarHeight = 50;
            const { windowHeight, platform } = wx.getSystemInfoSync();
            let editorHeight =
                keyboardHeight > 0
                    ? windowHeight - keyboardHeight - toolbarHeight
                    : windowHeight;

            this.editorHeight = editorHeight;
            this.keyboardHeight = keyboardHeight;
        },

        onEditorReady() {
            const that = this;
            wx
                .createSelectorQuery()
                .select("#editor")
                .context(function(res) {
                    that.editorCtx = res.context;
                    if (that.current_emotion.user_id) {
                        that.editorCtx.setContents({
                            html: that.current_emotion.html,
                            delta: that.current_emotion.delta,
                            success: res => {},
                            fail: res => {}
                        });
                    }
                })
                .exec();
        },

        getContents(type) {
            this.editorCtx.getContents({
                success: editor => {
                    this.loading = true;
                    const db = wx.cloud.database();
                    const emotion = db.collection("emotion");
                    if (this.current_emotion._id) {
                        /**
                         * 更新心情簿
                         * */
                        updateItem(editor, type, emotion, this);
                        return;
                    }
                    addItem(editor, type, emotion, this);
                }
            });
        },

        format(e) {
            /**
             * 获取当前选中的toolbar
             *
             */
            let { name, value } = e.target.dataset;
            if (!name) return;
            this.editorCtx.format(name, value);
        },

        onStatusChange(e) {
            const formats = e.mp.detail;
            this.formats = formats;
        },

        insertImage() {
            const that = this;
            wx.chooseImage({
                count: 1,
                success: function(res) {
                    const filePath = res.tempFilePaths[0];
                    // 上传图片
                    // const cloudPath = 'userID'+'folders'+ 'my-image' + Math.random() * 128 + filePath.match(/\.[^.]+?$/)[0];
                    that.upload = true;
                    const cloudPath =
                        "ahbd" +
                        "/profile/" +
                        "my-image" +
                        Math.random() * 128 +
                        filePath.match(/\.[^.]+?$/)[0];

                    wx.cloud.uploadFile({
                        cloudPath,
                        filePath,
                        success: res => {
                            that.upload = false;
                            that.editorCtx.insertImage({
                                src: res.fileID,
                                data: {
                                    id: "abcd",
                                    role: "god"
                                },
                                width: "80%",
                                success: function() {
                                    // console.log("insert image success");
                                }
                            });
                        },
                        fail: e => {
                            console.error("[上传文件] 失败：", e);
                        },
                        complete: () => {
                            wx.hideLoading();
                        }
                    });
                }
            });
        },

        /**
         * remove emotion data to emotionList
         * */

        removeToEmotion() {
            removeRecycle(this);
        },

        /**
         * delete emotion data from dataBase
         * */

        deleteItem() {
            this.confirmFlag = true;
        },

        /**
         * cancel action
         * */

        undo() {
            this.confirmFlag = false;
        },

        confirm() {
            delItem(this);
        },

        ...mapMutations({
            set_emotion_list: "SET_EMOTION_LIST"
        })
    },

    created() {},

    onLoad() {
        const platform = wx.getSystemInfoSync().platform;
        const isIOS = platform === "ios";
        this.isIOS = isIOS;
        this.current_emotion = this.get_current_emotion;
        if (getQuery().isFromRecycle) {
            this.isRecycle = true;
        } else {
            this.isRecycle = false;
        }
        const that = this;
        this.updatePosition(0, 0);
        let keyboardHeight = 0;
        let containerHeight = 0;
        wx.getSystemInfo({
            success: res => {
                // console.log(res);
                this.containerHeight = res.screenHeight - 110;
                this.onEditorReady();
            }
        });

        wx.onKeyboardHeightChange(res => {
            if (res.height === keyboardHeight) return;
            const duration = res.height > 0 ? res.duration * 1000 : 0;
            keyboardHeight = res.height;
            setTimeout(() => {
                wx.pageScrollTo({
                    scrollTop: 0,
                    success() {
                        that.updatePosition(keyboardHeight);
                        that.editorCtx.scrollIntoView();
                    }
                });
            }, duration);
        });
    }
};
</script>

<style scoped lang="less">
@import "../../common/css/weui.css";
@import "../../common/css/iconfont.css";

.container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
}

.ql-container {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    font-size: 16px;
    line-height: 1.5;
    overflow: auto;
    padding: 10px 10px 20px 10px;
    margin-bottom: 30px;
}

.send {
    position: fixed;
    bottom: 64px;
    right: 14px;
    width: 110px;
    height: 33px;
    background: #2b9ef2;
    color: white;
    border-radius: 12px;
    overflow: hidden;
    text-align: center;
    line-height: 33px;
    font-size: 15px;
}

.draft {
    bottom: 110px !important;
}

.ql-active {
    color: #22c704;
}

.iconfont {
    display: inline-block;
    width: 30px;
    height: 30px;
    cursor: pointer;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #9c9b9b;
}

.toolbar {
    box-sizing: border-box;
    padding: 0 10px;
    height: 50px;
    width: 100%;
    position: fixed;
    left: 0;
    right: 100%;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid #ececec;
    border-left: none;
    border-right: none;
    background: white;
    z-index: 9999;
}
</style>
