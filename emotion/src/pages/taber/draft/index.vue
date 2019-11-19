<template>
    <div class="trend-page">
        <no-use
            v-if="!trendList.length"
            :type="'noDataOfDraft'"
        />
        <emotions
            v-if="trendList.length"
            :emotionList="trendList"
            @queryEmotion="queryEmotion"
        />
    </div>
</template>

<script>
import { formatData } from "@/common/js/formatData.js";
import { mapGetters, mapMutations } from "vuex";
import noUse from "@/components/nouse.vue";
import emotions from "@/components/emotions.vue";
export default {
    data() {
        return {
            manage: false,
            trendList: []
        };
    },

    components: {
        "no-use": noUse,
        emotions
    },

    computed: {
        ...mapGetters(["get_emotion_list"])
    },

    onLoad() {
        if (this.get_emotion_list.length) {
            let arr = this.get_emotion_list.filter(ele => {
                return ele.is_draft;
            });
            if (arr.length) {
                this.trendList = formatData(JSON.parse(JSON.stringify(arr)));
            }
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
