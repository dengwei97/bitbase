<template>
    <div class="order-trade">
        <div class="content">
            <div class="content_l shadow">
                <header>
                    <span :class="{active:type===1}" @click="changeType(1)">发布卖出挂单</span>
                    <span :class="{active:type===2}" @click="changeType(2)">发布买入挂单</span>
                </header>
                <main>
                    <div class="input-box">
                        <div class="input">
                            <span>{{type == 1 ? '我要卖' :  '我要买'}}</span>
                            <input type="text" placeholder="" disabled>
                            <em>USDT/CNY</em>
                        </div>
                    </div>
                    <p class="legend">
                        <span class="left">委托价格</span>
                        <span class="right" v-show="priceType==2"><i>基准价：</i>48,376.73 CNY</span>
                    </p>
                    <div class="input-box">
                        <div class="input">
                            <span class="downSelect"
                                @click="isShowModal = !isShowModal">{{priceType==1 ? '固定价格' : '动态价格'}}<img
                                    class="icon-arrow" src="@/assets/transactions/ico_arrow_right.png" /></span>
                            <input type="text" :placeholder="priceType==1 ? '请输入出售的单价' : '请输入溢价百分比'">
                            <em>{{priceType==1 ? 'CNY' : '%'}}</em>
                            <div class="down-options" v-show="isShowModal">
                                <div :class="{active:priceType == 1}" @click="priceSelect(1)">固定价格</div>
                                <div :class="{active:priceType == 2}" @click="priceSelect(2)">动态价格</div>
                            </div>
                        </div>
                        <p class="actualPrice" v-show="priceType == 2"><i>实际委托价</i>：0.00CNY </p>
                    </div>
                    <p class="legend">{{type == 1 ? '挂单卖出总数量' : '挂单买入总数量'}}</p>
                    <div class="input-box">
                        <div class="input">                
                            <input type="number" :placeholder="type==1 ?'可输入的最大数量1000' : '请输入挂单总数量'">
                            <em>USDT</em>
                        </div>
                        <span class="transformPrice"><i>≈</i> 0.00 CNY</span>
                    </div>
                    <p class="legend">最小交易量</p>
                    <div class="input-box">
                        <div class="input">
                            <input type="number" placeholder="可输入最小交易量100">
                            <em>USDT</em>
                        </div>
                        <span class="transformPrice"><i>≈</i> 0.00 CNY</span>
                    </div>
                    <p class="legend">最大交易量</p>
                    <div class="input-box">
                        <div class="input">
                            <input type="number" :placeholder="type == 1 ?'可输入最大交易量10000' : '请输入最大交易量'">
                            <em>USDT</em>
                        </div>
                        <span class="transformPrice"><i>≈</i> 0.00 CNY</span>
                    </div>


                    <div class="pay">{{type == 1 ? '收款方式' : '支付方式'}}</div>
                    <div class="payimg">
                        <div class="payimg_1" :class="{'pay_img_border':orderDateils.payment == 1}"
                            @click="changePayment(1)">
                            <img class="pay_img" src="@/assets/transactions/ico_cardpay.png" />
                            <div class="payimg_1_text">银行卡</div>
                        </div>
                        <div class="payimg_1 mar" :class="{'pay_img_border':orderDateils.payment == 3}"
                            @click="changePayment(3)">
                            <img class="pay_img" src="@/assets/transactions/ico_alipay.png" />
                            <div class="payimg_1_text">支付宝</div>
                        </div>
                        <div class="payimg_1 mar" :class="{'pay_img_border':orderDateils.payment == 2}"
                            @click="changePayment(2)">
                            <img class="pay_img" src="@/assets/transactions/ico_weixinpay.png" />
                            <div class="payimg_1_text">微信支付</div>
                        </div>
                    </div>

                    <div class="pay-list" v-show="type==1">
                         <p class="alipy">选择支付宝</p>
                    </div>

                    <button class="btn-publish" v-if="type == 1">发布卖出挂单</button>
                    <button class="btn-publish" v-else>发布买入挂单</button>

                    <div class="trade-desc">
                        <span class="title">
                            <img src="~@/assets/transactions/ic_addlak_buy.png" alt="" />
                            交易说明
                        </span>
                        <div class="desc-text">
                            <p>成为承兑商的用户可免费发布买卖广告，当前可挂卖单总数量的额度为100.0000 USDT； </p>
                            <p>购买广告发布后，将展示在出售交易市场；出售广告发布后，将展示在购买交易市场；</p>
                            <p>动态价格计算公式：委托价=基准价x(1+溢价)；溢价可填写正数、负数，溢价可填写在-20%～20%区间内，最多可保留2位小数。</p>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                type: 1, //1 卖出  2 买入
                orderDateils: {
                    isAddress: false, // 是否可以输入地址
                    isName: false, // 是否可以输入名字
                    // 订单信息
                    totalMoney: "", // 总金额
                    tradeAmount: "", // 交易数量，与totalMoney最少传一个；如果两个值都传参，已totalMoney为准
                    coinName: "USDT",
                    tradeType: 1, // 1-买 2-卖
                    payment: 1,
                    payerName: "", // 支付用户户
                    address: "", // USDT接受地址
                    isMoney: 1 // 1、数量购买， 2、金额购买
                },
                priceType: 1, // 1 固定 2动态
                isShowModal: false, // 是否展示下拉框
            }
        },
        methods: {
            //切换买卖方式1
            changeType(type) {
                this.type = type;

            },
            // 选择支付方式
            changePayment(payment) {
                this.orderDateils.payment = payment;
            },
            //价格下拉选择
            priceSelect(type) {
                this.priceType = type;
                this.isShowModal = false
            }
        }
    }
</script>

<style lang="less" scoped>
    .order-trade {

        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
            -webkit-appearance: none;
        }

        input::-webkit-input-placeholder {
            color: #dddde6;
            font-size: 14px;
        }

        input[type="number"] {
            -moz-appearance: textfield;
        }

        .content {
            color: #4F5669;
            display: flex;
            justify-content: center;
            padding: 40px 0px 80px 0px;
            font-size: 16px;

            .content_l {
                width: 790px;
                display: flex;
                flex-wrap: wrap;
                box-sizing: border-box;
                padding: 0 145px;
                padding-top: 40px;
                padding-bottom: 42px;
                color: #40405E;

                &.shadow {
                    border-radius: 4px;
                    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
                }

                header {
                    font-size: 20px;
                    line-height: 30px;
                    display: flex;

                    span {
                        margin-right: 26px;
                        cursor: pointer;

                        &.active {
                            color: @cl-m;
                            font-weight: 700;
                        }
                    }
                }

                main {
                    width: 100%;
                    margin-top: 26px;

                    .legend {
                        margin-bottom: 10px;
                        display: flex;
                        justify-content: space-between;

                        .right {
                            font-size: 14px;

                            i {
                                color: #9EA8B7;
                            }
                        }
                    }

                    .input-box {
                        margin-bottom: 25px;

                        .input {
                            height: 52px;
                            border: 1px solid #dcdfe4;
                            border-radius: 6px;
                            display: flex;
                            align-items: center;
                            box-sizing: border-box;
                            padding: 0 15px;
                            position: relative;


                            .icon-arrow {
                                width: 6px;
                                height: 10px;
                                margin-left: 7px;
                            }

                            span {
                                margin-right: 20px;

                                &.downSelect {
                                    cursor: pointer;
                                }
                            }

                            input {
                                height: 100%;
                                flex: 1;
                                background: #fff;
                            }

                            .down-options {
                                width: 105px;
                                height: 98px;
                                box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
                                position: absolute;
                                z-index: 2;
                                bottom: -103px;
                                left: -3px;
                                display: flex;
                                flex-direction: column;
                                justify-content: space-between;
                                background: #fff;

                                div {
                                    cursor: pointer;
                                    display: flex;
                                    flex: 1;
                                    align-items: center;
                                    justify-content: center;
                                    font-weight: 700;

                                    &.active {
                                        color: @cl-m;
                                    }
                                }
                            }


                        }

                        .actualPrice {
                            font-size: 14px;
                            i {
                                color: #9EA8B7;
                            }
                            margin-top: 10px;
                        }

                        .transformPrice {
                            display: flex;
                            line-height: 20px;
                            margin-left: 15px;
                            margin-top: 10px;

                            i {
                                color: #9EA8B7;
                                margin-right: 4px;
                                font-size: 15px;
                            }
                        }
                    }

                    .pay {
                        font-size: 18px;
                        line-height: 30px;
                        padding: 23px 0px 14px 0px;
                    }

                    .payimg {
                        display: flex;
                        justify-content: start;
                        padding-bottom: 32px;

                        .payimg_1 {
                            width: 110px;
                            height: 90px;
                            box-shadow: 0px 4px 24px rgba(64, 64, 94, 0.08);
                            border-radius: 6px;
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            justify-content: center;
                            cursor: pointer;

                            .payimg_1_text {
                                font-size: 16px;
                                color: #40405e;
                                padding-top: 5px;
                            }

                            .pay_img {
                                width: 28px;
                            }
                        }

                        .mar {
                            margin-left: 34px;
                        }

                        .pay_img_border {
                            border: 1px solid @cl-m;
                        }
                    }

                    .alipy {
                        font-size: 14px;
                        line-height: 20px;
                        padding-bottom: 21px;
                    }

                    .btn-publish {
                        border-radius: 41px;
                        width: 100%;
                        height: 48px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        color: #fff;
                        background: @cl-m;
                    }

                    .trade-desc {
                        margin-top: 30px;

                        .title {
                            display: flex;
                            align-items: center;

                            img {
                                width: 16px;
                                height: 16px;
                                font-size: 14px;
                                color: #40405E;
                                margin-right: 8px;
                            }
                        }

                        .desc-text {
                            margin-top: 6px;

                            p {
                                font-size: 14px;
                                line-height: 22px;
                                color: #A0A0B3;
                                margin-bottom: 5px;
                            }
                        }
                    }
                }
            }
        }


    }

    @media (max-width: 1200px) {
        .order-trade {
            .content {
                padding: 40px * 0.8 0px 80px * 0.8 0px;
                font-size: 16px * 0.8;

                .content_l {
                    width: 790px * 0.8;
                    padding: 0 145px * 0.8;
                    padding-top: 40px * 0.8;
                    padding-bottom: 42px * 0.8;

                    header {
                        font-size: 20px * 0.8;
                        line-height: 30px * 0.8;

                        span {
                            margin-right: 26px * 0.8;
                        }
                    }

                    main {
                        margin-top: 26px * 0.8;

                        .legend {
                            margin-bottom: 10px * 0.8;
                        }

                        .input-box {
                            margin-bottom: 25px * 0.8;

                            .input {
                                height: 52px * 0.8;
                                padding: 0 15px * 0.8;

                                .icon-arrow {
                                    width: 6px * 0.8;
                                    height: 10px * 0.8;
                                    margin-left: 7px * 0.8;
                                }

                                span {
                                    margin-right: 20px * 0.8;
                                }



                                .down-options {
                                    width: 105px * 0.8;
                                    height: 98px * 0.8;
                                    bottom: -103px * 0.8;
                                    left: -3px * 0.8;
                                }
                            }

                            .transformPrice {
                                display: flex;
                                line-height: 20px * 0.8;
                                margin-left: 15px * 0.8;
                                margin-top: 10px * 0.8;

                                i {
                                    margin-right: 4px * 0.8;
                                    font-size: 15px * 0.8;
                                }
                            }
                        }

                        .pay {
                            font-size: 18px * 0.8;
                            line-height: 30px * 0.8;
                            padding: 23px * 0.8 0px 14px * 0.8 0px;
                        }

                        .payimg {
                                padding-bottom: 32px*.8;
                            .payimg_1 {
                                width: 110px * 0.8;
                                height: 90px * 0.8;
                                box-shadow: 0px 4px* 0.8 24px* 0.8 rgba(64, 64, 94, 0.08);
                                border-radius: 6px * 0.8;

                                .payimg_1_text {
                                    font-size: 16px * 0.8;
                                    padding-top: 5px * 0.8;
                                }

                                .pay_img {
                                    width: 28px * 0.8;
                                }
                            }

                            .mar {
                                margin-left: 34px * 0.8;
                            }

                        }

                        .alipy {
                            font-size: 14px * 0.8;
                            line-height: 20px * 0.8;
                            padding-bottom: 21px * 0.8;
                        }

                        .btn-publish {
                            border-radius: 41px * 0.8;
                            height: 48px * 0.8;

                        }

                        .trade-desc {
                            margin-top: 30px * 0.8;

                            .title {

                                img {
                                    width: 16px * 0.8;
                                    height: 16px * 0.8;
                                    font-size: 14px * 0.8;
                                    margin-right: 8px * 0.8;
                                }
                            }

                            .desc-text {
                                margin-top: 6px * 0.8;

                                p {
                                    font-size: 14px * 0.8;
                                    line-height: 22px * 0.8;
                                    margin-bottom: 5px * 0.8;
                                }
                            }
                        }
                    }
                }
            }


        }
    }
</style>