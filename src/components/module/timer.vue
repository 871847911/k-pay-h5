<template>
    <div class='timer'>
        {{timerText}}
    </div>
</template>

<script>
export default {
    name: "timer",
    props: ["time","hour","type"],
    data() {
        return {
            // timer: Date.parse(new Date(this.time)),
            timer:this.type==0?this.time:Date.parse(new Date(this.time.toString().replace(/-/g, "/"))),
            innerHour: Number(this.hour),
            timerText : "",
        };
    },
	computed : {

	},
    created() {
        this.customMethod();
    },
    destroyed(){
        this.timer = 0;
    },
    methods: {
        timeFormat(param) {
            //小于10的格式化函数
            return param < 10 ? "0" + param : param;
        },
        customMethod() {
                // console.log("结束时间",this.timer)
                var newTime = new Date().getTime();
                // 对结束时间进行处理渲染到页面
                var endTime = this.timer + this.innerHour * 60 * 60 * 1000;
                var obj = null;
                // 如果活动未结束，对时间进行处理
                if (endTime - newTime > 0) {
                    var time = (endTime - newTime) / 1000;
                    // 获取天、时、分、秒
                    var day = parseInt(time / (60 * 60 * 24));
                    var hou = parseInt((time % (60 * 60 * 24)) / 3600);
                    var min = parseInt(((time % (60 * 60 * 24)) % 3600) / 60);
                    var sec = parseInt(((time % (60 * 60 * 24)) % 3600) % 60);
                    var srd = parseInt(
                        (((time * 1000) % (60 * 60 * 24 * 1000)) % 3600) % 60
                    );
                    (day = day),
                        (hou = this.timeFormat(hou)),
                        (min = this.timeFormat(min)),
                        (sec = this.timeFormat(sec)),
                        (srd = this.timeFormat(srd));
                } else {
                    //活动已结束，全部设置为'00'
                    (day = "0"),
                        (hou = "00"),
                        (min = "00"),
                        (sec = "00"),
                        (srd = "00");
                }
                var timeDown = day + "天" + hou + ":" + min + ":" + sec + ":" + srd;
                this.timerText = timeDown;
                if (endTime - newTime > 0) {
                    setTimeout(() => {
                        this.customMethod();
                    }, 100);
                }
                // setTimeout(this.customMethod, 10);
        }
        //倒计时函数
        // 获取当前时间，同时得到活动结束时间数组
    }
}
</script>

<style scoped>
</style>
