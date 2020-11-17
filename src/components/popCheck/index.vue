<template>
    <!-- 前置验证需判断-->
    <div class="checkDemand" v-if="popMesType !== 4">
        <img src="@/assets/transactions/ico_alert_red.png" alt />
        <p>{{popMesType==1 ? '设置交易密码': (popMesType==2 ? '绑定收款方式' : '完成身份认证')}}</p>
        <div>
            {{popMesType==1 ? '当前账号未设置交易密码，请去设置交易密码': (popMesType==2 ? '您还没有绑定收款方式，绑定成功后才可以继续操作' : '差一步就可以成为承兑商了，请前往完成身份验证')}}
        </div>
        <button class="pointer" @click="jumpUrl(popMesType)">{{popMesType==1 ?  '去设置' : (popMesType == 2 ? '去认证' :'去认证')}}</button>
    </div>
    <!-- 审核中状态 -->
    <div class="checkDemand applying" v-else>
        <img src="@/assets/transactions/ico_wart.png" alt />
        <p class="title">审核中</p>
        <p class="desc">
            您成为承兑商的申请已提交成功，正在通过审核，请耐心等待。
            审核时间为工作日内北京时间9:00-18:00，审核最快30分钟完成。
            如有疑问，请联系Bitbase官方客服。
        </p>
    </div>
</template>

<script>
    export default {
        props: ['popMesType'],
        data() {
            return {}
        },
        methods: {
            jumpUrl(popMesType) {
                if(popMesType == 1 || popMesType == 2) {
                    //绑定交易密码
                    this.$router.push('/personalCentre')
                }else if(popMesType == 3) {
                     this.$router.push('/through')
                }
            }
        }
    }
</script>

<style lang="less">
    .checkDemand {
        margin: 0 auto;
        width: 790px;
        height: 560px;
        background: #ffffff;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        border-radius: 4px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        line-height: 20px;
        color: #40405e;
        text-align: center;

        img {
            width: 72px;
            height: 72px;
        }

        p {

            font-size: 18px;
            line-height: 25px;
            color: #40405e;
            padding: 24px 0 6px;
        }


        button {
            width: 343px;
            height: 48px;
            font-size: 16px;
            line-height: 48px;
            text-align: center;
            color: #ffffff;
            background: @cl-m;
            border-radius: 41px;
            margin-top: 24px;
            cursor: pointer;
        }
    }
    .applying {
        .title {
            font-weight: 700;
            font-size: 18px;
        }
        .desc {
            font-size: 14px;
            width: 412px;
            text-align: center;
            line-height: 20px;
            padding-top: 15px;
        }
    }
</style>