<template>
    <div class="acceptor">
        <Trheader :Onactive="Onactive"></Trheader>
        <div class="content">
            <PopCheck v-if="isShwPop" :popMesType="popMesType"/>
            <div class="content_l shadow" v-if="!isShwPop && (this.paymentDetail && this.userInfoList.advertiserStatus != 2)">
                <!-- 申请成为承对商 -->
                <div class="apply-acceptor">
                    <header>
                        <h3 class="title">申请成为承兑商</h3>
                        <p class="tip">申请成功后方可发布挂单广告</p>
                    </header>
                    <ul class="user-list">
                        <li class="user-infos">
                            <span>昵称</span>
                            <input type="text" placeholder="请输入您的承兑商昵称" v-model="nickname" @input="nickNameInput"
                                   maxlength="10">
                            <i class="icon-tip" @click="isShowTip = !isShowTip"><img
                                    src="~@/assets/transactions/ic_addlak_buy.png" alt=""/></i>
                            <div class="s-tips" v-show="isShowTip">
                                <p>*提示：昵称仅可设置一次，
                                    承兑商身份申请成功后不可以
                                    再次修改自己的承兑商昵称</p>
                            </div>
                        </li>
                        <li class="user-infos">
                            <span>手机号码</span>
                            <input type="text" placeholder="请输入您的手机号码" :value="userInfoList.mobile" readonly>

                        </li>
                        <li class="user-infos">
                            <span>验证码</span>
                            <input type="text" placeholder="请输入您的验证码" v-model="code">
                            <div v-show="countdown.show" class="send content_text" @click="send">发送</div>
                            <div v-show="!countdown.show" class="send content_text">{{ countdown.count }}s</div>
                        </li>
                        <li class="user-infos">
                            <span>微信号</span>
                            <input type="text" placeholder="请输入您的微信号" v-model="wechat">
                        </li>
                    </ul>
                    <button type="submit" class="fast-apply" @click="handleActApply">立即申请</button>
                </div>
            </div>
            <AdvertiserOrder v-if="!isShwPop && (this.paymentDetail && this.userInfoList.advertiserStatus == 2)" :userInfoList="userInfoList"/>
        </div>
    </div>
</template>

<script>
    import Trheader from "@/components/transactionHeader";
    import AdvertiserOrder from '@/components/advertiserOrder'
    import PopCheck from '@/components/popCheck';
    import userInfoApi from "@/api/userInfo";
    import buyApi from "@/api/buy";

    export default {
        components: {
            Trheader,
            PopCheck,
            AdvertiserOrder
        },
        mounted() {
            this.getUserInfoDetails()
        },
        data() {
            return {
                Onactive: 4, //交易头部当前交易类型
                //是否展示输入框右侧小提示
                nickname: '', //呢你
                wechat: '', //微信号
                value: '86',
                code: '',//短信验证码
                isShowTip: false,
                //是否展示验证弹窗
                isShwPop: false,
                //弹窗信息类型
                popMesType: 1, // 1设置交易密码 2绑定登录方式 3完成身份验证 4审核中
                userInfoList: [], //用户详细信息
                paymentDetail: undefined, //收款信息
                // 倒计时相关
                countdown: {
                    show: true,
                    count: "",
                    timer: null
                },
            }
        },
        methods: {
            // 获取验证码
            send() {
                if (!this.userInfoList.mobile) {
                    this.$toast('请输入手机号')
                    return
                }
                this.CountdownNumber()
                buyApi
                    .mobileCode({
                        account: this.userInfoList.mobile,
                        areaNo: this.value
                    })
                    .then(res => {
                        if (res.data.code == 0) {
                            this.CountdownNumber();
                        }
                    })
                    .catch(err => {
                        this.$toast(err.data.message);
                    });
            },
            // 倒计时
            CountdownNumber() {
                const timecount = 60;
                if (!this.countdown.timer) {
                    this.countdown.count = timecount;
                    this.countdown.show = false;
                    this.countdown.timer = setInterval(() => {
                        if (this.countdown.count > 0 && this.countdown.count <= timecount) {
                            this.countdown.count--;
                        } else {
                            this.countdown.show = true;
                            clearInterval(this.countdown.timer);
                            this.countdown.timer = null;
                        }
                    }, 1000);
                }
            },
            //用户详细信息
            getUserInfoDetails() {
                userInfoApi
                    .getUserInfoDetails({})
                    .then(res => {
                        this.userInfoList = res.data.data;
                        this.value = res.data.data.areaNo
                        this.getBindPayment()
                    }).catch(err => {
                    this.$toast(err.data.message)
                })
            },
            //获取收款信息
            getBindPayment() {
                userInfoApi
                    .getBindPayment({})
                    .then(res => {
                        this.paymentDetail = res.data.data;
                        this.handleIsPop()
                    }).catch(err => {
                    this.$toast(err.data.message)
                })
            },
            //判定是否弹出验证
            handleIsPop() {
                if (this.userInfoList) {
                    const {
                        tradePwdSet,
                        kycStatus,
                        advertiserStatus
                    } = this.userInfoList
                    if (kycStatus != 2) {
                        // 1-待审核 2-审核通过 3-审核不通过 4-未提交 身份验证
                        this.popMesType = 3
                        this.isShwPop = true
                    } else if (tradePwdSet == 0) {
                        //是否设置交易密码
                        this.popMesType = 1
                        this.isShwPop = true
                    } else if (this.judgeAllEmptyValue(this.paymentDetail)) {
                        //如果没有绑定任一一个支付方式
                        this.popMesType = 2
                        this.isShwPop = true
                    } else if (advertiserStatus == '1') {
                        // advertiserStatus”：1-待审核 2-审核通过 3-审核未通过或未提交
                        this.popMesType = 4
                        this.isShwPop = true
                    }
                }
            },
            //判断对象所有值均为空
            judgeAllEmptyValue(obj) {
                let bool = true;
                for (var key in obj) {
                    if (obj[key] != '0') bool = false;
                }
                return bool
            },
            //重置单元格内容
            resetVal() {
                this.wechat = ''
                this.nickname = ''
                this.code = ''
            },
            //承兑商申请
            advertiserApply(data) {
                userInfoApi
                    .advertiserApply(data)
                    .then(res => {
                        this.$toast('承兑商申请成功')
                        this.resetVal()
                        this.getUserInfoDetails() //重新请求
                    }).catch(err => {
                    this.resetVal()
                    this.$toast(err.data.message)
                })
            },
            //点击立即申请
            handleActApply() {
                const {nickname, wechat, code} = this
                this.advertiserApply({
                    nickname, wechat, code
                })
            },
            nickNameInput() {
                this.nickname = this.nickname.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g, "")
            }
        }
    };
</script>

<style lang='less' scoped>
    .acceptor {
        .content {
            display: flex;
            justify-content: center;
            padding: 40px 0px 80px 0px;


            .content_l {
                width: 790px;
                display: flex;
                flex-wrap: wrap;
                box-sizing: border-box;
                padding: 0 145px;
                padding-top: 40px;
                color: #40405E;

                &.shadow {
                    border-radius: 4px;
                    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
                }

                .apply-acceptor {
                    header {
                        .title {
                            font-size: 18px;
                            line-height: 24px;
                            margin-bottom: 6px;
                        }

                        .tip {
                            font-size: 14px;
                            color: #9EA8B7;
                        }
                    }

                    .user-list {
                        margin-top: 26px;

                        .user-infos {
                            box-sizing: border-box;
                            width: 500px;
                            height: 52px;
                            border: 1px solid #dcdfe4;
                            border-radius: 4px;
                            font-size: 16px;
                            line-height: 24px;
                            display: flex;
                            align-items: center;
                            padding: 0 12px;
                            margin-bottom: 26px;
                            position: relative;

                            span {
                                min-width: 65px;
                                margin-right: 15px;
                            }

                            .s-tips {
                                width: 221px;
                                height: 107px;
                                color: #F46666;
                                font-size: 13px;
                                -webkit-box-sizing: border-box;
                                box-sizing: border-box;
                                padding: 24px 18px 18px 34px;
                                line-height: 20px;
                                position: absolute;
                                right: -204px;
                                top: -5px;
                                text-align: justify;
                                background: url('~@/assets/transactions/ic_card_tip.png') no-repeat center/cover;
                            }

                            .icon-tip {
                                display: block;
                                width: 17px;
                                height: 17px;
                                cursor: pointer;

                                img {
                                    width: 100%;
                                    height: 100%;
                                }
                            }

                            .send {
                                color: @cl-m;
                                font-size: 14px;
                                line-height: 20px;
                                cursor: pointer;
                            }

                            input {
                                flex: 1;
                                height: 100%;

                                &::-webkit-input-placeholder {
                                    color: #dddde6;
                                    font-size: 15px;
                                }
                            }

                            &:last-child {
                                margin-bottom: 0;
                            }
                        }
                    }

                    .fast-apply {
                        background: @cl-m;
                        border-radius: 41px;
                        height: 48px;
                        display: flex;
                        width: 100%;
                        align-items: center;
                        justify-content: center;
                        color: #fff;
                        margin-top: 40px;
                        font-size: 16px;
                        margin-bottom: 70px;
                    }
                }
            }

        }
    }
</style>
