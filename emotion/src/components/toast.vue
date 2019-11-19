<template>
    <div class="loading">
        <img
            v-if="!loading"
            class="load"
            src="/static/images/some.gif"
            alt=""
        >
        <img
            v-if="loading"
            class="success"
            src="/static/images/loading.gif"
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
            loading: false
        };
    },
    watch: {
        type(value) {
            this.setValue(value);
        }
    },
    mounted() {
        let value = this.type;
        this.setValue(value);
    },

    methods: {
        setValue(value) {
            if (value == "removeSuccess") {
                this.tip = "您的宝贝回来了,快去心情簿查看吧";
                this.loading = false;
            } else if (value == "saveSuccess") {
                this.tip = "保存成功啦,快去心情簿查看吧";
                this.loading = false;
            } else if (value == "loadingData") {
                this.tip = "正在加载,请稍后...";
                this.loading = true;
            } else if (value == "loadingSave") {
                this.tip = "正在保存,请稍后...";
                this.loading = true;
            } else if (value == "uploadSuccess") {
                this.tip = "正在上传图片...";
                this.loading = true;
            }
        }
    }
};
</script>

<style lang="less" scoped>
.loading {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.4);
    z-index: 9999;
    color: white;
}

.load {
    width: 175px;
    height: 174px;
    margin-bottom: 20px;
}

.success {
    width: 168px;
    height: 174px;
    margin-bottom: 20px;
}
</style>