<template>
    <div class="MainBox">
        <div class="courseImgBox">
            <img class="jiazi" src="../../assets/images/courseDeails/top.png" alt="">
            <div :class="play ? 'courseImg xuanzhuan' : 'courseImg'" v-if="courseMain.courseMain">
                <img :src="courseMain.courseMain.courseUrlFirst" alt="">
            </div>
            <div v-if="courseMain.courseSubList" class="courseName">{{courseMain.courseSubList[index].fileName}}</div>
        </div>
        <div class="jindutiao">
            <div class="time-text">{{cTime}}</div>
            <div class="bar">
                <div class="progressbar" @click="playMusic" ref="runfatbar">
                    <div class="greenbar" ref="runbar">
                        <span class="yuan" draggable="true" ref="yuan"></span>
                    </div>
                </div>
            </div>
            <div class="right-time time-text">{{dTime}}</div>
        </div>

        <div class="audio-btn">
            <i class="iconfont icon-shangyiqu color-1" @click="switchAudio('top')"></i>
            <i :class="play ? 'iconfont icon-bofang1 bofang' : 'iconfont icon-bofang bofang'" @click="audioState"></i>
            <i class="iconfont icon-xiayiqu color-1" @click="switchAudio('bottom')"></i>
        </div>
        <div class="listFunction">
            <div class="list" @click="clickList">
                <i class="iconfont icon-bofangliebiao"></i>
                <p>播放列表</p>
            </div>
            <div class="list" @click="clickZixun">
                <i class="iconfont icon-zixunzhuanyefuwu"></i>
                <p>咨询</p>
            </div>
        </div>
        <div>
            <audio ref="player" :src="audioHttp" @ended="ended"></audio>
        </div>
        <!-- 这里是圆形进度条 -->
        <div class="popup">
            <popup v-model="showAction">
                <div class="popup1">
                    <div class="popTitle">播放列表</div>
                    <div class="courseSubList" v-if="courseMain.courseSubList">
                        <ul>
                            <li :class='key==selected?"selected":""' v-for="(item, key) in courseMain.courseSubList" @click="changeVideo(item,key)"><i v-if="key==selected" class="iconfont icon-ziyuanldpi"></i> 第{{key+1}}节 {{item.fileName}}</li>
                        </ul>
                    </div>
                    <div class="popCancer" @click="popCancel">关闭</div>
                </div>
            </popup>
        </div>
        <div class="zixunPopup">
            <popup v-model="showZixun">
                <div class="zixunBox">
                    <div class="zixunBtn bordB" @click="zixunLecturer">咨询讲师</div>
                    <div class="zixunBtn" @click="questions">我要提问</div>
                </div>
                <div class="zixunCancer" @click="zixunCancel">取消</div>
            </popup>
        </div>
    </div>

</template>

<script>
import api from "fetch/api";
import { Popup } from "vux";
export default {
    name: "courseAudio",

    components: {
        Popup
        // TransferDom
    },

    props: {
        type: ""
    },

    data() {
        return {
            courseMain: {},
            cTime: "00:00", // 已播放时间
            dTime: "00:00", // 总播放时间
            play: false, // 播放暂停按钮
            audioHttp: "", // 音频链接
            index: 0,
            showAction: false,
            showZixun: false,
            selected: 0
        };
    },
    created() {
        this.getCoursseDetails();
    },
    mounted() {
        const music = this.$refs.player; // 音频所在对象
        const musicBar = this.$refs.runbar; // 颜色进度条所在对象
        const musicWidth = this.$refs.runfatbar.offsetWidth; // 底部进度条总宽

        // 获得音频加载完成可播放时的处理
        music.addEventListener("loadedmetadata", () => {
            const musicTime = music.duration; // 获得音频时长
            const branch = Math.floor(musicTime / 60); // 计算音频分钟
            const second = Math.ceil(musicTime % 60); // 计算音频秒
            if (branch < 10 && second < 10) {
                // 四种情况判断音频总时间
                this.dTime = `0${branch}:0${second}`;
            } else if (branch < 10) {
                this.dTime = `0${branch}:${second}`;
            } else if (second < 10) {
                this.dTime = `${branch}:0${second}`;
            } else {
                this.dTime = `${branch}:${second}`;
            }
            // alert(musicTime)
            // console.log(musicTime);
        });

        // 获得音频正在播放时的处理
        music.addEventListener("timeupdate", () => {
            const musicTime = music.duration; // 获得音频时长
            const circleTime = musicTime / 360; // 计算总时长占据360度每一度的比例
            const stopTime = music.currentTime; // 获得已播放的音频时长
            const rightDeg = -135 + stopTime / circleTime; // 计算出当前旋转度数
            if (rightDeg < 45) {
            } else if (rightDeg === 45 || rightDeg > 45) {
                const leftDeg = -135 + (stopTime - musicTime / 2) / circleTime; // 计算出当前左边旋转度数
            }
            musicBar.style.width = `${(stopTime / musicTime) * 100}%`; // 计算进度条所在比例宽度
            const branch = Math.floor(stopTime / 60); // 计算已播放的音频分钟
            const second = Math.floor(stopTime % 60); // 计算已播放的音频秒
            if (branch < 10 && second < 10) {
                // 四种情况判断显示音频以播放时间
                this.cTime = `0${branch}:0${second}`;
            } else if (branch < 10) {
                this.cTime = `0${branch}:${second}`;
            } else if (second < 10) {
                this.cTime = `${branch}:0${second}`;
            } else {
                this.cTime = `${branch}:${second}`;
            }
        });
        // 监听颜色进度条是否触摸拖动
        musicBar.addEventListener("touchmove", event => {
            const events = event.targetTouches[0].pageX; // 获得触摸拖动的距离
            musicBar.style.width = `${(events / musicWidth) * 100}%`; // 计算进度条所在比例宽度
            music.pause(); // 触摸拖动时停止播放
        });

        // 监听颜色进度条是否触摸拖动结束
        musicBar.addEventListener("touchend", () => {
            const touwidth = musicBar.offsetWidth / musicWidth; // 计算进度条所在比例
            music.currentTime = music.duration * touwidth; // 通过所在比例赋值给音频应在的播放时间
            music.play(); // 根据播放时间开始播放
            this.play = true; // 更改播放暂停按钮为播放
        });
    },

    computed: {},

    methods: {
        questions() {
            //我要提问
            this.$router.push({
                path: "/consult",
                query: { courseId: this.$route.query.id }
            });
        },
        zixunLecturer() {
            //讲师咨询
            this.$router.push({
                path: "/questionTitle",
                query: {
                    courseId: this.$route.query.id,
                    lecturerId: this.courseMain.lecturer.id
                }
            });
        },
        zixunCancel() {
            //关闭弹窗
            this.showZixun = false;
        },
        clickZixun() {
            //打开咨询
            this.showZixun = true;
        },
        clickList() {
            //打开列表
            this.showAction = true;
        },
        changeVideo(item, key) {
            this.index = key;
            this.selected = key;
            this.audioHttp = this.courseMain.courseSubList[key].subUrl;
            this.play = false; // 播放按钮为暂停
            this.$refs.runbar.style.width = 0; // 清空颜色进度条
            this.cTime = "00:00";
            this.showAction = false;
        },
        popCancel() {
            this.showAction = false;
        },
        getCoursseDetails(e) {
            let params = { courseId: this.$route.query.id };
            this.index = this.$route.query.index;
            this.selected = this.$route.query.index;
            api.getDetail(params).then(res => {
                // console.log("课程详情", res);
                if (res.success == true) {
                    this.courseMain = res.data;
                    this.audioHttp =
                        res.data.courseSubList[this.$route.query.index].subUrl;
                }
            });
        },
        // 点击进度条事件
        playMusic(e) {
            const music = this.$refs.player; // 音频所在对象
            const barWidth = e.pageX / this.$refs.runfatbar.offsetWidth; // 计算点击位置相对父元素总宽的比例
            this.$refs.runbar.style.width = `${barWidth * 100}%`; // 进度条应所在的比例总宽
            music.currentTime = music.duration * barWidth; // 计算点击时应播放所在的时间
            music.play(); // 播放音频
            this.play = true; // 更改播放暂停按钮为播放
        },

        // 点击播放暂停按钮时间
        audioState() {
            this.play = !this.play; // 更改播放暂停按钮状态
            const music = this.$refs.player; // 音频所在对象
            if (this.play) {
                music.play(); // 播放音乐
            } else {
                music.pause(); // 暂停音乐
            }
        },

        // 切换歌曲按钮
        switchAudio(value) {
            // console.log(this.index)
            if (value === "top") {
                // console.log("上一曲");
                if (Number(this.index) - 1 < 0) {
                    // this.courseMain.
                } else {
                    this.index = Number(this.index) - 1;
                    this.selected = this.index
                    this.audioHttp = this.courseMain.courseSubList[
                        this.index
                    ].subUrl;
                    this.play = false; // 播放按钮为暂停
                    this.$refs.runbar.style.width = 0; // 清空颜色进度条
                    this.cTime = "00:00";
                }
            } else if (value === "bottom") {
                // console.log("下一曲");
                if (
                    Number(this.index) >
                    this.courseMain.courseSubList.length - 2
                ) {
                    // this.courseMain.
                } else {
                    this.index = Number(this.index) + 1;
                    this.selected = this.index
                    this.audioHttp = this.courseMain.courseSubList[
                        this.index
                    ].subUrl;
                    this.play = false; // 播放按钮为暂停
                    this.$refs.runbar.style.width = 0; // 清空颜色进度条
                    this.cTime = "00:00";
                }
            }
            // console.log(this.index)
        },
        // 监听音乐是否播放结束
        ended() {
            // console.log("播放结束");
            this.play = false;
            this.$refs.runbar.style.width = 0;
            this.cTime = "00:00";
        }
    }
};
</script>

<style  lang="less" scoped>
.MainBox{
    padding-bottom: 0.7rem;
}
.jindutiao {
    padding: 0.6rem 0.32rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .bar {
        width: 5.18rem;
        height: 0.04rem;
        .progressbar {
            width: 100%;
            height: 0.04rem;
            background-color: #f8f8f8;
            border-radius: 0.2rem;
            position: relative;
            .greenbar {
                width: 0%;
                height: 0.04rem;
                border-radius: 0.2rem;
                position: absolute;
                top: 0;
                left: 0;
                background-color: #6cddc7;
                .yuan {
                    width: 0.2rem;
                    height: 0.2rem;
                    display: inline-block;
                    // padding: 0.2rem;
                    background: rgba(108, 221, 199, 1);
                    box-shadow: 0px 2px 6px 0px rgba(108, 221, 199, 0.2);
                    border-radius: 50%;
                    position: absolute;
                    top: 50%;
                    margin-top: -0.1rem;
                    right: -0.01rem;
                }
            }
        }
    }
}
.time-text {
    display: inline-block;
    padding: 0 0.2rem;
    font-size: 0.28rem;
    // font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
}
.right-time {
    text-align: right;
}
.audio-btn {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 0.32rem;
}
.right {
    right: 0;
}

.left {
    left: 0;
}
.bofang {
    color: #6cddc7;
    font-size: 1.2rem;
}
.color-1 {
    color: #6cddc7;
    font-size: 0.76rem;
    margin: 0 0.4rem;
}
.courseImgBox {
    position: relative;
    text-align: center;
    padding-top: 0.8rem;
    .jiazi {
        width: 1.24rem;
        height: 1.6rem;
        position: absolute;
        top: 0;
        left: 50%;
        margin-left: -0.62rem;
        z-index: 2;
    }
    .courseImg {
        width: 5rem;
        height: 5rem;
        border: 0.16rem solid #000;
        border-radius: 50%;
        margin: 0 auto;
        overflow: hidden;
        img {
            width: 100%;
            height: 100%;
            // transform: rotate(360deg);
        }
    }
    .courseName {
        font-size: 0.36rem;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        padding-top: 0.6rem;
    }
}
.listFunction {
    display: flex;
    padding: 0 0.78rem;
    justify-content: space-between;
    .list {
        text-align: center;
        p {
            font-size: 0.24rem;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
            padding-top: 0.12rem;
        }
        .iconfont{
            font-size: 0.4rem;
        }
    }
}
.xuanzhuan {
    -webkit-transition-property: -webkit-transform;
    -webkit-transition-duration: 1s;
    -moz-transition-property: -moz-transform;
    -moz-transition-duration: 1s;
    -webkit-animation: rotate 3s linear infinite;
    -moz-animation: rotate 3s linear infinite;
    -o-animation: rotate 3s linear infinite;
    animation: rotate 3s linear infinite;
}
@-webkit-keyframes rotate {
    from {
        -webkit-transform: rotate(0deg);
    }
    to {
        -webkit-transform: rotate(360deg);
    }
}
@-moz-keyframes rotate {
    from {
        -moz-transform: rotate(0deg);
    }
    to {
        -moz-transform: rotate(359deg);
    }
}
@-o-keyframes rotate {
    from {
        -o-transform: rotate(0deg);
    }
    to {
        -o-transform: rotate(359deg);
    }
}
@keyframes rotate {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(359deg);
    }
}
.popup {
    // height: 4.8rem;
}
.popup1 {
    // height: 4.8rem;
    background: #fff;
    .popTitle {
        height: 0.98rem;
        font-size: 0.32rem;
        font-weight: 500;
        color: rgba(102, 102, 102, 1);
        line-height: 0.98rem;
        padding-left: 0.28rem;
        border-bottom: 0.02rem solid #f8f8f8;
    }
    .popCancer {
        height: 0.98rem;
        font-size: 0.36rem;
        color: rgba(51, 51, 51, 1);
        line-height: 0.98rem;
        text-align: center;
    }
    .courseSubList {
        ul {
            li {
                height: 0.98rem;
                line-height: 0.98rem;
                font-size: 0.28rem;
                font-weight: 400;
                color: rgba(102, 102, 102, 1);
                border-bottom: 0.02rem solid #f1f1f1;
                padding-left: 0.28rem;
            }
            li.tuwen {
                // color: rgba(108, 221, 199, 1);
            }
            li.selected {
                color: rgba(108, 221, 199, 1);
            }
        }
    }
}
.zixunPopup {
    .vux-popup-dialog {
        background: none;
        .zixunBox {
            margin: 0 0.2rem;
            background: #fff;
            border-radius: 0.3rem;
            .zixunBtn {
                height: 1.12rem;
                font-size: 0.36rem;
                font-weight: 400;
                color: rgba(51, 51, 51, 1);
                line-height: 1.12rem;
                text-align: center;
            }
            .bordB {
                border-bottom: 0.02rem solid #f1f1f1;
            }
        }
        .zixunCancer {
            height: 1.12rem;
            font-size: 0.36rem;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
            line-height: 1.12rem;
            text-align: center;
            background: rgba(255, 255, 255, 1);
            border-radius: 0.24rem;
            margin: 0.18rem 0.2rem;
        }
    }
}
</style>
