<template>
    <div class="trend-page">
        <no-use :type="'noDataOfFavor'" />
    </div>
</template>

<script>
import noUse from "@/components/nouse.vue";
export default {
    data() {
        return {};
    },

    components: {
        "no-use": noUse
    },

    onLoad() {},

    methods: {}
};
</script>

<style scoped lang="less">
.trend-page {
    padding: 24px;
}
</style>
