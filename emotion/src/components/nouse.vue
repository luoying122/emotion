<template>
    <div class="no-use">
        <img
            :class="type == 'loadingData' ? 'loadingData' : ''"
            :src="src"
            alt=""
        >
        <p>{{tip}}</p>
    </div>
</template>

<script>
export default {
    props: ["type"],
    data() {
        return {
            tip: "",
            src: ""
        };
    },
    watch: {
        type(v) {
            this.setV(v);
        }
    },
    mounted() {
        this.setV(this.type);
    },
    methods: {
        setV(v) {
            if (v == "noDataOfTrend") {
                this.tip = "这里空空如也,快去写点什么吧~";
                this.src = "/static/images/delete.gif";
            } else if (v == "noDataOfDraft") {
                this.tip = "这里空空如也,快去写点什么吧~";
                this.src = "/static/images/recycle.gif";
            } else if (v == "noDataOfRecycle") {
                this.tip = "太好了,要珍惜它们哦~";
                this.src = "/static/images/some.gif";
            } else if (v == "noDataOfFavor") {
                this.tip = "暂不开放功能哦,再等等嘛~";
                this.src = "/static/images/wait.jpg";
            } else if (v == "noDataOfEmotion") {
                this.tip = "这里空空如也,快去写点什么吧~";
                this.src = "/static/images/delete.gif";
            } else if (v == "loadingData") {
                this.tip = "正在加载,请稍后";
                this.src = "/static/images/loading.gif";
            }
        }
    }
};
</script>

<style lang="less" scope>
.no-use {
    padding: 20px;
    font-size: 15px;
    text-align: center;
    line-height: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 400px;

    img {
        width: 60%;
        object-fit: container;
        height: 192px;
    }

    .loadingData {
        height: 174px;
    }

    p {
        margin-top: 20px;
    }
}

</style>