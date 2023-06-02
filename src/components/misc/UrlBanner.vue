<template>
<span></span>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class UrlBanner extends Vue {
    mounted() {
        if (this.$route.name === 'legal') {
            this.dismiss()
        }
    }
    dismiss() {
        //@ts-ignore
        this.$refs.banner.toggle()
    }
}
</script>
<style scoped lang="scss">
.url_banner {
    background-color: #1d82bb;
    color: #fff;
    z-index: 3 !important;

    .dismiss_but {
        margin-right: 8px;
        float: right;
    }
}
</style>
