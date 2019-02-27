<template>
    <div  class='courseListDetails' >
        <div class="listDetails" v-if="courseMain" v-html="courseMain">
            {{courseMain}}
        </div>

    </div>
</template>

<script>
import api from "fetch/api";
export default {
    name: "courseListDetails",
    data() {
        return {
            courseMain: {},
            index:0
        };
    },
    components: {},
    created() {
        this.getCoursseDetails();
    },
    methods: {
        getCoursseDetails(e) {
            let params = { subId: this.$route.query.id };
            // this.index = this.$route.query.index
            api.getSubContext(params).then(res => {
                console.log("课时详情", res);
                if (res.success == true) {
                    this.courseMain = res.data;
                }
            });
        }
    }
};
</script>

<style scoped lang="less">
.listDetails{
    padding: 0.2rem 0.3rem;
}
</style>
