<template>
    <div class='set_info' v-if="userInfo">
        <div class="info_box">
            <div class="left">
                {{userInfo.nickName}}
            </div>
            <div class="right">
                <img :src="userInfo.headUrl" alt="">
            </div>
        </div>


        <div class="info_box">
            <div class="left">
                用户账号
            </div>
            <div class="right">
                {{userInfo.userName}}
            </div>
        </div>



        <div class="info_box" @click="birthdayPickerShow">
            <div class="left">
                生日
            </div>
            <div class="right">
                {{userInfo.birthday}}
                <i class="iconfont icon-jiantou"></i>
            </div>
        </div>

        <div class="info_box">
            <div class="left">
                性别
            </div>
            <div class="right">
                {{userInfo.sex == 0 ? '未知' : userInfo.sex == 1 ? '男' : '女'}}

            </div>
        </div>


        <div class="info_box" @click="changeUserPhoneShow">
            <div class="left">
                手机号
            </div>
            <div class="right">
                {{userInfo.phone}}

                <i class="iconfont icon-jiantou"></i>
            </div>
        </div>


        <div class="address_info_box">
			<x-address title="所在地区" :list="addressData" :value="addressValue" :raw-value="true" placeholder="请选择地址"  :show.sync="showAddress" @on-hide="addressHide" @on-shadow-change="addresChange"></x-address>
        </div>

		<confirm v-model="userPhoneShow"
				 title="绑定手机"
				 @on-cancel="onCancel"
				 @on-confirm="onConfirm">
				<x-input class="change_phone--inp" placeholder="请输入手机号码" v-model.trim="userPhoneVal" :max="13" @change.native="phoneChangeVaildFunc"></x-input>

				<div class="code_box">
					<div class="left">
						<x-input class="change_phone--inp"  placeholder="请输入验证码" v-model.trim="userCaptchaVal" :max="13" ></x-input>
					</div>
					<div class="right" :style="{'background' : isTimeOut== false ? '#6CDDC7' : '#D4D4D4'}">
						<x-button v-if="isTimeOut == true" mini disabled @click.native="fileUserCode">{{timerNum + 's'}}</x-button>
						<x-button v-if="isTimeOut == false" mini  @click.native="fileUserCode" type="primary">获取验证码</x-button>
					</div>
				</div>
		</confirm>


    </div>
</template>

<script>
	import api from "fetch/api";
	import { XAddress , Group , XButton, ChinaAddressV4Data , Confirm , XInput } from 'vux'
	import {mapGetters} from 'vuex'
	export default {
		name: 'set_info',
		data () {
			return {
				birthdayTime : '',
				showAddress : false,
				addressValue : [],
				addressData : ChinaAddressV4Data,
				userPhoneShow : false,

				userPhoneVal : '',
				phoneChangeVaild : false,
				userCaptchaVal : '',

				isTimeOut : false,
				timerNum : 60
			}
		},
		components : {
			XAddress,
			Group,
			XButton,
			Confirm,
			XInput
		},
		computed : {
			userInfo(){
				console.log(this.$store.state.userInfo)
				if(this.$store.state.userInfo != undefined){
					this.addressValue = [this.$store.state.userInfo.province , this.$store.state.userInfo.city , this.$store.state.userInfo.district]
					this.userPhoneVal = this.$store.state.userInfo.phone;

					return this.$store.state.userInfo;
				}
			}
		},
		methods: {
			birthdayPickerShow(){
				let _this = this;
				this.$vux.datetime.show({
					value: this.userInfo.birthday, // 其他参数同 props
					confirmText : '确认',
					cancelText : '取消',
					format : 'YYYY-MM-DD',
					onConfirm(e){
						let params = {
							birthday : e ,
							province : _this.userInfo.province,
							city : _this.userInfo.city,
							district : _this.userInfo.district
						}
						_this.changeUserInfo(params);
					}
				})
			},
			changeUserPhoneShow(){
				if(this.userInfo.phone == null){
					this.userPhoneShow = true;
				}else{
					this.userPhoneShow = false;
					this.$vux.toast.text("已绑定的手机号不可更改")
				}
			},
			addresChange(ids , name){
				this.addressValue = name;

			},
			addressHide(e){
				if(e){
					let params = {
						birthday : this.userInfo.birthday ,
						province : this.addressValue[0],
						city : this.addressValue[1],
						district : this.addressValue[2]

					}
					this.changeUserInfo(params);
				}
			},
			onCancel(){
				this.$vux.toast.text("取消修改");
			},
			onConfirm(){
				let params = {
					phone: this.userPhoneVal,
					captcha : this.userCaptchaVal
				}
				api.bindUserPhone(params).then(res => {
					console.log(res)
					if(res.success){
						this.$vux.toast.text("绑定成功");
						this.$store.dispatch("getUserInfo");
					}else{
						this.$vux.toast.text(res.message)
					}
				})
			},
			changeUserInfo(params){
				api.setUserInfo(params).then(res => {
					console.log(res)
					if(res.success){
						this.$vux.toast.text("修改成功");
						this.$store.dispatch("getUserInfo")
					}else{
						this.phoneChangeVaild = true;
						this.$vux.toast.text(res.message)
					}
				})
			},
			phoneChangeVaildFunc(val){
				let phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/;
				if(!phoneReg.test(this.userPhoneVal)){
					this.$vux.toast.text("请输入正确的手机号");
					this.phoneChangeVaild = false;
				}else{
					this.phoneChangeVaild = true;
				}
				// this.phoneChangeVaild = this.$refs.phoneChangeVaild.vaild;
			},
			fileUserCode(){
				if(this.phoneChangeVaild){
					this.isTimeOut = true;
					api.fileUserCode({phone : this.userPhoneVal}).then(res => {
						console.log(res)
						if(res.success){
							let timer = setInterval(() => {
								this.timerNum --;
								if(this.timerNum == 0){
									clearTimeout(timer);
									this.isTimeOut = false;
								}
							},1000)
						}else{
							this.isTimeOut = false;
							this.$vux.toast.text(res.message)
						}
					})
				}else{
					this.$vux.toast.text("请输入正确的手机号")
				}

			}
		}
	}
</script>

<style lang="less" scoped>
.set_info{
    padding: 0.3rem;
    box-sizing: border-box;

    .info_box{
        display: flex;
        border-bottom: 1px solid #f1f1f1;
        padding: 0.28rem ;
        box-sizing: border-box;
        font-size: 0.3rem;

        .left{
            flex : 1;
            color: #666;
        }
        .right{
            color: #333;
            justify-content: flex-end;
            img{
                width : 0.6rem;
                height: 0.6rem;
                border-radius: 50%;
            }
        }
    }
	.code_box{
		margin-top: 0.5rem;
		display: flex;
		.left{
			width:2.8rem;
		}
		.right{
			flex: 1;
			padding: 0.18rem 0.22rem;
			border-radius: 8px;
			button{
				font-size: 0.26rem;
				background: transparent;
				color: #fff;
				line-height: 1;

			}
		}
	}
}

</style>
<style lang="less">
	.set_info{
		.address_info_box{
			border-bottom: 1px solid #f1f1f1;
			padding: 0.28rem ;
			box-sizing: border-box;
			font-size: 0.3rem;
			.weui-cell{
				padding: 0;
			}
			.weui-cell__hd{
				float: left;
				.weui-label{
					color: #666;
				}
			}
			.vux-cell-placeholder{

			}
		}
		.change_phone--inp{
			border: 1px solid #D4D4D4;
			border-radius: 8px;
		}
		.weui-btn{
			padding-left: 0;
			padding-right: 0;
		}
		.weui-btn:after{
			border: 0;
		}
	}
</style>
