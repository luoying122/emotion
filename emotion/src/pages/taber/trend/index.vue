<template>
    <div class="trend-page">
        <no-use
            v-if="!trendList.length"
            :type="'noDataOfTrend'"
        />
        <emotions
            v-if="trendList.length"
            @queryEmotion="queryEmotion"
            :emotionList="trendList"
        />
    </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { formatData } from "@/common/js/formatData.js";
import emotions from "@/components/emotions.vue";
import noUse from "@/components/nouse.vue";
export default {
    data() {
        return {
            trendList: []
        };
    },
    components: {
        emotions,
        "no-use": noUse
    },
    computed: {
        ...mapGetters(["get_emotion_list"])
    },
    onLoad() {
        if (this.get_emotion_list.length) {
            let arr = this.get_emotion_list.filter(ele => {
                return !ele.is_recycle && !ele.is_draft;
            });
            this.trendList = formatData(JSON.parse(JSON.stringify(arr)));
        } else {
            this.trendList = [];
        }
    },
    methods: {
        queryEmotion(item) {
            this.set_current_emotion(item);
            wx.navigateTo({
                url: "../../addEmotion/main"
            });
        },

        ...mapMutations({
            set_current_emotion: "SET_CURRENT_EMOTION"
        })
    },

    created() {
        // let app = getApp()
    }
};
</script>

<style scoped lang="less">
.trend-page {
    padding: 24px;
}
</style>
