<template>
    <div>
        <div
            class="trend-wrap"
            v-for="(item,index) in list"
            v-if="item.emotion.length"
            :key="index"
        >
            <div class="create-time">
                {{item.create_time}}
            </div>
            <div
                class="trend-panel"
                v-for="(trend,trendindex) in item.emotion"
                :key="trendindex"
            >
                <div class="trend-item">
                    <div
                        class="left"
                        @click="queryEmotion(trend,trendindex)"
                    >
                        <p>{{trend.text}}</p>
                    </div>
                    <div
                        v-if="!manage"
                        class="right"
                        @click="manageList"
                    >
                        <i class="iconfont icon-gengduo"></i>
                    </div>
                    <div
                        v-if="manage"
                        class="right"
                    >
                        <checkbox-group @change="checkOne($event,trend)">
                            <checkbox
                                class="cb"
                                :value="trend.is_recycle"
                                :checked="trend.is_recycle"
                            />
                        </checkbox-group>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
export default {
    props: {
        emotionList: {
            type: Array,
            default: []
        },
        types: {
            type: String
        },
        manage: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            list: [],
            types: ""
        };
    },

    watch: {
        emotionList(v) {
            this.list = v;
        }
    },

    mounted() {
        this.list = this.emotionList;
    },

    methods: {
        /**
         * query emotion item
         * */
        queryEmotion(item, index) {
            this.$emit("queryEmotion", item);
        },

        manageList() {
            if (this.types != "emotion") return;
            this.$emit("manageList");
        },

        checkOne(e,trend) {
            // return;
            if (this.types != "emotion") return;
            this.$emit("checkOne", trend);
        }
    }
};
</script>

<style lang="less" scoped>
.trend-panel {
    margin-top: 20px;

    .trend-item {
        width: 100%;
        padding: 13px;
        box-sizing: border-box;
        border-radius: 10px;
        margin-bottom: 20px;
        box-shadow: 0px 0px 4px rgba(166, 191, 245, 0.4);
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
}

.right {
    i {
        font-size: 16px;
        color: rgb(166, 191, 245);
        width: 50rpx;
        height: 50rpx;
        text-align: center;
        line-height: 50rpx;
    }
}

.left {
    flex-grow: 1;
    margin-right: 7px;
    p {
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        line-height: 26px;
        font-size: 15px;
    }
}
</style>