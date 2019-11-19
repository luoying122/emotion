<template>
    <div class="confirm">
        <div class="confirm-wrap">
            <img
                :src="src"
                alt=""
            >
            <p class="tip">{{tip}}</p>
            <p class="btns">
                <span @click="confirm">确认</span>
                <span @click="undo">取消</span>
            </p>
        </div>
    </div>
</template>

<script>
export default {
    props: ["type"],
    data() {
        return {
            src: "",
            tip: ""
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
            if (v == "deleteItem") {
                this.tip = "确认要删除吗,那就有缘再见了";
                this.src = "/static/images/delete.gif";
            } else {
                this.tip = "确认要删除吗,回收站还能看到哦";
                this.src = "/static/images/wait.jpg";
            }
        },
        confirm() {
            this.$emit("confirm");
        },
        undo() {
            this.$emit("undo");
        }
    }
};
</script>

<style lang="less" scoped>
.confirm {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.6);

    .confirm-wrap {
        display: flex;
        flex-direction: column;
        align-items: center;

        img {
            width: 250px;
            transform: scale(0.7);
        }

        .tip {
            color: white;
        }

        .btns {
            margin-top: 20px;
            display: flex;

            span {
                width: 100px;
                height: 30px;
                display: inline-block;
                line-height: 30px;
                text-align: center;
                color: #2b9ef2;
                background: white;
                border-radius: 8px;
            }

            span:first-child {
                margin-right: 8px;
                background: #2b9ef2;
                color: white;
            }
        }
    }
}
</style>