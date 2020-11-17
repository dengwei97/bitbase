<template>
    <div class="order-trade">
        <div class="content">
            <div class="content_l shadow">
                <header>
                    <span :class="{active:type===2}" @click="changeType(2)">发布卖出挂单</span>
                    <span :class="{active:type===1}" @click="changeType(1)">发布买入挂单</span>
                </header>
                <main>
                    <div class="input-box">
                        <div class="input">
                            <span>{{type == 2 ? '我要卖' :  '我要买'}}</span>
                            <input type="text" placeholder="" disabled>
                            <em>USDT/CNY</em>
                        </div>
                    </div>
                    <p class="legend">
                        <span class="left">委托价格</span>
                        <span class="right" v-show="priceType==2"><i>基准价：</i>{{websocketCny}} CNY</span>
                    </p>
                    <div class="input-box">
                        <div class="input">
                            <span class="downSelect"
                                  @click="isShowModal = !isShowModal">{{priceType==1 ? '固定价格' : '动态价格'}}
                                <img class="icon-arrow" src="@/assets/transactions/ico_arrow_right.png" /></span>
                            <input v-if="priceType==1" type="text" :placeholder="type==1 ? '请输入出售的单价' : '请输入购买的单价'"
                                   v-model="orderDateils.coninPrice" @input="getArrival('coninPrice')">
                            <!-- 溢价比分比 -->
                            <input v-else type="text" placeholder="请输入溢价百分比" v-model="orderDateils.premiumRatio"
                                   @input="getArrival('premiumRatio')">

                            <em>{{priceType==1 ? 'CNY' : '%'}}</em>
                            <div class="down-options" v-show="isShowModal">
                                <div :class="{active:priceType == 1}" @click="priceSelect(1)">固定价格</div>
                                <div :class="{active:priceType == 2}" @click="priceSelect(2)">动态价格</div>
                            </div>
                        </div>
                        <p class="actualPrice" v-show="priceType == 2"><i>实际委托价</i>：{{actualPrice}} CNY </p>
                    </div>
                    <!--挂单类型-->
                    <div class="input-box guadan-type" v-if="userInfoList.advertiserDoBigSale && userInfoList.advertiserDoBigSale==1">
                        <div class="input">
                            <span>挂单类型</span>
                            <input type="text" placeholder="" disabled>
                            <em @click="isShowModal2 = !isShowModal2">{{orderDateils.bigSale == 2? 'C2C挂单' : '大宗挂单'}}<img class="icon-arrow" src="@/assets/transactions/ico_arrow_right.png" /></em>
                            <div class="down-options" v-show="isShowModal2">
                                <div :class="{active:orderDateils.bigSale == 2}" @click="orderTypeSelect(2)">C2C挂单</div>
                                <div :class="{active:orderDateils.bigSale == 1}" @click="orderTypeSelect(1)">大宗挂单</div>
                            </div>
                        </div>
                    </div>

                    <p class="legend">{{type == 2 ? '挂单卖出总数量' : '挂单买入总数量'}}</p>
                    <div class="input-box">
                        <div class="input">
                            <input type="text" :placeholder="type==2 ?`可输入的最大数量${overage}` : '请输入挂单总数量'"
                                   v-model="orderDateils.coinNum" @input="getArrival('coinNum')">
                            <em>USDT</em>
                        </div>
                        <span class="transformPrice"><i>≈</i>{{computeTotalNum}} CNY</span>
                    </div>
                    <p class="legend">最小交易量</p>
                    <div class="input-box">
                        <div class="input">
                            <input type="text" :placeholder="`可输入的最小交易量${fastTradeLowLimit}`"
                                   v-model="orderDateils.lowerLimitCoin" @input="getArrival('lowerLimitCoin')">
                            <em>USDT</em>
                        </div>
                        <span class="transformPrice"><i>≈</i>{{computeLowTrade}} CNY</span>
                    </div>
                    <p class="legend">最大交易量</p>
                    <div class="input-box">
                        <div class="input">
                            <input type="text" :placeholder="type == 2 ?`可输入最大交易量${overage}` : '请输入最大交易量'"
                                   v-model="orderDateils.upperLimitCoin" @input="getArrival('upperLimitCoin')">
                            <em>USDT</em>
                        </div>
                        <span class="transformPrice"><i>≈</i> {{computeMaxTrade}} CNY</span>
                    </div>

                    <!--选择支付/收款方式-->
                    <div class="pay">{{type == 2 ? '收款方式' : '支付方式'}}</div>
                    <div class="payimg">
                        <div class="payimg_1" :class="{'pay_img_border':selectPayment == 1}" @click="changePayment(1)">
                            <img class="pay_img" src="@/assets/transactions/ico_cardpay.png" />
                            <div class="payimg_1_text">银行卡</div>
                        </div>
                        <div class="payimg_1 mar" :class="{'pay_img_border':selectPayment == 3}"
                             @click="changePayment(3)">
                            <img class="pay_img" src="@/assets/transactions/ico_alipay.png" />
                            <div class="payimg_1_text">支付宝</div>
                        </div>
                        <div class="payimg_1 mar" :class="{'pay_img_border':selectPayment == 2}"
                             @click="changePayment(2)">
                            <img class="pay_img" src="@/assets/transactions/ico_weixinpay.png" />
                            <div class="payimg_1_text">微信</div>
                        </div>
                    </div>
                    <div class="pay-list" v-show="type==2 && userInfoList.advertiserLevel != 3">
                        <p class="alipy">
                            {{selectPayment == 2 ? '选择微信' :(selectPayment== 3 ? '选择支付宝' : '选择银行卡') }}
                        </p>
                        <CollectionTemplate :data="item" class="payItem" v-for="(item, index) in paymentItems"
                                            :key="index" :paymentId="paymentId" @choice="choice" @click.native="bindPay(item)" />
                        <div class="more">
                            <img src="@/assets/transactions/ico_add_gray.png" />
                            <span
                                    @click="bindPay">新增{{ selectPayment  == 1 ? "银行卡" : selectPayment  == 2 ? "微信" : "支付宝" }}收款方式</span>
                        </div>
                    </div>

                    <!--底部按钮-->
                    <button class="btn-publish" v-if="type == 2" @click="handleSubmit">发布卖出挂单</button>
                    <button class="btn-publish" v-else @click="handleSubmit">发布买入挂单</button>

                    <!--交易描述-->
                    <div class="trade-desc">
                        <span class="title">
                            <img src="~@/assets/transactions/ic_addlak_buy.png" alt="" />
                            交易说明
                        </span>
                        <div class="desc-text">
                            <p>成为承兑商的用户可免费发布买卖广告，当前可挂卖单总数量的额度为{{overage}} USDT； </p>
                            <p>购买广告发布后，将展示在出售交易市场；出售广告发布后，将展示在购买交易市场；</p>
                            <p>动态价格计算公式：委托价=基准价x(1+溢价)；溢价可填写正数、负数，溢价可填写在-5%～5%区间内，最多可保留2位小数。</p>
                        </div>
                    </div>

                    <VerTransaPwd ref="VerTransaPwd" @varTransaSu="varTransaSu" />
                </main>
            </div>
        </div>
    </div>
</template>

<script>
    import CollectionTemplate from "@/components/collectionTemplate" //支付模板
    import VerTransaPwd from "@/components/verTransaPwd"; //验证交易密码
    import userInfoApi from "@/api/userInfo";
    import orderInfoApi from '@/api/orderInfo'
    import {
        inputTwoNumber,
        inputTwoNumber2
    } from '@/utils/index.js'
    export default {
        props: ['userInfoList'],
        components: {
            CollectionTemplate,
            VerTransaPwd
        },
        watch: {

        },

        data() {
            return {
                Onactive: 4, //交易头部当前交易类型
                type: 2, //1 卖出挂单  2 买入挂单
                orderDateils: {
                    tradeType: 2, // 1-买 2-卖
                    coinName: "USDT",
                    coinNum: '', //交易数量
                    coninPrice: '', //挂单价格（CNY），选择固定价格必须填写，动态价格不需要
                    priceFlag:'', //订单价格标识
                    premiumRatio: '', //溢价比，动态价格需要填写
                    tradePwd: '', //交易密码
                    lowerLimitCoin: '', //交易最小限额
                    upperLimitCoin: '', //交易最大限额
                    bindId: '', //支付方式id，英文逗号隔开
                    bigSale:2,  

                },
                priceType: 1, // 1 固定 2动态
                isShowModal: false, // 是否展示下拉框
                isShowModal2: false, // 是否展示下拉框 大宗订单
                selectPayment: 1, //1 银行卡 2微信 3支付宝
                // payList: [], // 支付方式详情 没有区分具体类型
                payList: {
                    bankCard: [],
                    alipy: [],
                    wechat: []
                },
                overage: '', // 钱包余额
                fastTradeLowLimit: '', //最低数量 按币数量
                coinToCny: '0.00', //币种相对于CNY的价格
                websocketCny: '0.00', //长连接的价格
                actualPrice: '0.00', //实际委托价
                paymentId: '0', //某一个支付项的id
                paymentItems: [], //具体某一个支付方式的列表项
                isShowCheckPop: true, //是否展示密码验证弹窗
                computeTotalNum: '0.00',
                computeLowTrade: '0.00',
                computeMaxTrade: '0.00'

            }
        },
        mounted() {
            this.getPayment()
            this.getWallet()
            this.getCoinInfo()
            this.initWebSocket()
        },
        destroyed() {
            this.websock.close() //离开路由之后断开websocket连接
        },
        methods: {
            //连接socket
            initWebSocket() {
                //初始化weosocket
                var wsuri = this.$appConfig.webscoket;
                this.websock = new WebSocket(wsuri);
                this.websock.onmessage = this.websocketonmessage;
                this.websock.onopen = this.websocketonopen;
                this.websock.onerror = this.websocketonerror;
                this.websock.onclose = this.websocketclose;
            },
            websocketonopen() {
                //连接建立之后执行send方法发送数据
                let actions = {
                    'type': '1'
                }
                this.websocketsend(JSON.stringify(actions));
                // console.log("连接成功");
            },
            websocketonerror() {
                //连接建立失败重连
                console.log("连接失败");
                setTimeout(() => {
                    this.initWebSocket();
                }, 2000);
            },
            websocketonmessage(e) {
                const redata = JSON.parse(e.data);
                if (redata.type == '2') {
                    this.websocketCny = redata.data[0].coinToCny
                }
            },
            websocketsend(Data) {
                //数据发送
                this.websock.send(Data);
            },
            websocketclose(e) {
                //关闭
                console.log("断开连接", e);
            },
            initialization() {
                this.orderDateils.coinNum = ''
                this.orderDateils.premiumRatio = ''
                this.orderDateils.coninPrice = ''
                this.orderDateils.lowerLimitCoin = ''
                this.orderDateils.upperLimitCoin = ''
                this.orderDateils.tradePwd = ''
                this.paymentId = '0'
                this.paymentItems = this.payList.bankCard
                this.selectPayment = 1
                this.coinNumCny = '0.00'
                this.computeTotalNum = '0.00'
                this.computeLowTrade = '0.00'
                this.computeMaxTrade = '0.00'
                this.actualPrice = '0.00'
            },
            //切换买卖方式
            changeType(type) {
                this.type = type;
                this.initialization()
                this.priceType = 1 //切换方式充值价格为固定价格
            },
            // 选择支付方式
            changePayment(payment) {
                this.selectPayment = payment
                if (payment == 1) {
                    this.paymentItems = this.payList.bankCard
                } else if (payment == 2) {
                    this.paymentItems = this.payList.wechat
                } else {
                    this.paymentItems = this.payList.alipy
                }
            },
            //价格下拉选择
            priceSelect(type) {
                this.priceType = type;
                this.isShowModal = false
                this.initialization() //重新初始化
            },
            //C2C 大宗订单切换
            orderTypeSelect(type) {
                this.orderDateils.bigSale = type;
                this.isShowModal2 = false
            },
            //新增或修改支付方式
            bindPay(value) {
                if (value) {
                    if (value.bindType == 1) {
                        window.localStorage.setItem("bank", JSON.stringify(value));
                        this.$router.push("/cardInfo");
                    } else if (value.bindType == 2) {
                        window.localStorage.setItem("wx", JSON.stringify(value));
                        this.$router.push("/bindpayment/" + value.bindType);
                    } else {
                        window.localStorage.setItem("zfb", JSON.stringify(value));
                        this.$router.push("/bindpayment/" + value.bindType);
                    }
                } else {
                    const type = this.selectPayment
                    if (this.type == 1) {
                        this.$router.push("/cardInfo");
                        window.localStorage.setItem("bank", "");
                    } else if (this.type == 2) {
                        this.$router.push("/bindpayment/2");
                        window.localStorage.setItem("wx", "");
                    } else {
                        this.$router.push("/bindpayment/3");
                        window.localStorage.setItem("zfb", "");
                    }
                }
            },
            //承对商挂单
            advertiserCreate() {
                const data = this.submitData() //准备数据
                userInfoApi
                    .advertiserCreate(data)
                    .then(res => {
                        this.$toast('挂单成功')
                        this.$refs.VerTransaPwd.hide()
                        this.initialization()
                    }).catch(err => {
                    this.$toast(err.data.message)
                })
            },
            //准备提交数据
            submitData() {
                //固定价格
                var obj;
                if(this.priceType == 1) {
                    obj =  {
                        coinName: "USDT",
                        coinNum: this.orderDateils.coinNum,
                        coinPrice: this.orderDateils.coninPrice,
                        lowerLimitCoin: this.orderDateils.lowerLimitCoin,
                        upperLimitCoin: this.orderDateils.upperLimitCoin,
                        tradePwd: this.orderDateils.tradePwd,
                        tradeType: this.type,
                        priceFlag:this.priceType, //订单价格标识，1-固定价格 2-动态价格
                        bigSale: this.orderDateils.bigSale,
                        payList: this.selectPayment,
                    }
                }else {
                    //动态价格
                    obj = {
                        coinName: "USDT",
                        coinNum: this.orderDateils.coinNum,
                        premiumRatio: (this.orderDateils.premiumRatio / 100).toFixed(2),
                        lowerLimitCoin: this.orderDateils.lowerLimitCoin,
                        upperLimitCoin: this.orderDateils.upperLimitCoin,
                        tradePwd: this.orderDateils.tradePwd,
                        tradeType: this.type,
                        priceFlag:this.priceType, //订单价格标识，1-固定价格 2-动态价格
                        bigSale: this.orderDateils.bigSale,
                        payList: this.selectPayment,
                    }
                }
                //判断是 卖单还是买单
                if(this.type == 2 && this.userInfoList.advertiserLevel != 3)  {
                    return {
                        ...obj,
                        bindId:this.paymentId
                    }
                }else  {
                    return obj
                }


            },
            //买单时判断是否有该支付方式
            judgeHavePay(idx) {
                let bool = true
                if(idx == 1  && !this.payList.bankCard.length) {
                    this.$toast('您没有绑定银行卡,请选择其他支付方式')
                    bool = false
                }else if(idx == 2 && !this.payList.wechat.length) {
                    this.$toast('您没有绑定微信,请选择其他支付方式')
                    bool = false
                }else if(idx == 3 && !this.payList.alipy.length) {
                    this.$toast('您没有绑定支付宝,请选择其他支付方式')
                    bool = false
                }
                return bool
            },
            //接受验证的登陆密码
            varTransaSu(pwd) {
                this.orderDateils.tradePwd = pwd
                this.advertiserCreate()
            },
            //处理买卖挂单按钮提交事件
            handleSubmit() {
                //如果验证通过
                if (this.inputDataCheck()) {
                    let isPass = true
                    if(this.type == 1) {
                        isPass =  this.judgeHavePay(this.selectPayment*1)
                    }else if(this.type == 2 && this.userInfoList.advertiserLevel == 3) {
                        isPass =  this.judgeHavePay(this.selectPayment*1)
                    }
                    isPass ?  this.$refs.VerTransaPwd.show() : ''
                }

            },
            // 获取收款方式详细信息
            getPayment() {
                userInfoApi
                    .getPayment({})
                    .then(res => {
                        let data = res.data.data;
                        if (data.length > 0) {
                            this.classifyPaymentType(data[0])
                        }
                    });
            },
            //区分银行卡的具体类型
            classifyPaymentType(data) {
                data.forEach((item, index) => {
                    if (item.bindType == 1) {
                        //银行卡
                        this.payList.bankCard.push(item)
                        //初始化银行卡列表项
                    } else if (item.bindType == 3) {
                        //支付宝
                        this.payList.alipy.push(item)
                    } else if (item.bindType == 2) {
                        //微信
                        this.payList.wechat.push(item)
                    }
                })
                //初始化银行卡的内容
                this.paymentItems = this.payList.bankCard
            },
            //接收选择的支付id
            choice(id) {
                this.paymentId = id
            },
            //获取钱包余额
            getWallet() {
                orderInfoApi
                    .getWallet({
                        coinName: 'USDT'
                    })
                    .then(res => {
                        this.overage = res.data.data
                    }).catch(err => {
                    this.$toast(err.data.message)
                })
            },
            //获取币种信息
            getCoinInfo() {
                orderInfoApi
                    .getCoinInfo({
                        coinName: 'USDT'
                    })
                    .then(res => {
                        this.fastTradeLowLimit = res.data.data[0].fastTradeLowLimit
                        this.coinToCny = res.data.data[0].coinToCny
                    }).catch(err => {
                    this.$toast(err.data.message)
                })
            },
            //输入框正则验证
            getArrival(name) {
                if (name == 'premiumRatio') {
                    // 单独处理溢价比
                    this.orderDateils[name] = inputTwoNumber2(this.orderDateils[name])
                } else {
                    this.orderDateils[name] = inputTwoNumber(this.orderDateils[name])
                }
                // if(name == 'coninPrice') {
                //     return
                // }else {
                //     if(this.orderDateils[name] - 0 > this.overage - 0){
                //         this.orderDateils[name] = this.overage - 0
                //     }
                // }
                //计算实际委托价格
                if (this.priceType == 2) {
                    this.actualPrice = (Number(this.websocketCny) * (1 + (this.orderDateils.premiumRatio / 100)))
                        .toFixed(2)
                    this.computeTotalNum = (this.orderDateils.coinNum * this.actualPrice).toFixed(2)
                    this.computeLowTrade = (this.orderDateils.lowerLimitCoin * this.actualPrice).toFixed(2)
                    this.computeMaxTrade = (this.orderDateils.upperLimitCoin * this.actualPrice).toFixed(2)
                } else {
                    this.computeTotalNum = (this.orderDateils.coinNum * this.coinToCny).toFixed(2)
                    this.computeLowTrade = (this.orderDateils.lowerLimitCoin * this.coinToCny).toFixed(2)
                    this.computeMaxTrade = (this.orderDateils.upperLimitCoin * this.coinToCny).toFixed(2)
                }
            },
            //点击提交前的输入框数据范围验证
            inputDataCheck() {
                let pass = true
                const {
                    coinNum,
                    lowerLimitCoin,
                    upperLimitCoin,
                    coninPrice,
                    premiumRatio
                } = this.orderDateils
                const {
                    priceType,
                    overage,
                    fastTradeLowLimit,
                    type,
                    coinToCny,
                    paymentId
                } = this
                //如果是卖出挂单则添加额外验证
                let bool = true
                if (priceType == 1) {
                    //如果是固定价格
                    if (!coinNum || !lowerLimitCoin || !upperLimitCoin || !coninPrice) {
                        bool = false
                        this.$toast('请将内容填写完整')
                        pass = false
                    }
                } else if (priceType == 2) {
                    if (!coinNum || !lowerLimitCoin || !upperLimitCoin || !premiumRatio) {
                        bool = false
                        this.$toast('请将内容填写完整')
                        pass = false
                    }
                }
                //当不为空时进行下面的判断
                if (bool && type == 2) {
                    if(priceType == 1) {
                        if(!(coninPrice > (0.95)* coinToCny && coninPrice < (1.05)* coinToCny)) {
                            this.$toast('委托价格在'+((0.95)* coinToCny).toFixed(2)+'-'+((1.05)* coinToCny).toFixed(2)+'之间')
                            pass = false
                        }
                    }else if (lowerLimitCoin * 1 < fastTradeLowLimit * 1) {
                        this.$toast('最小交易量不能小于' + fastTradeLowLimit)
                        pass = false
                    } else if (coinNum * 1 > overage * 1) {
                        this.$toast('挂单卖出总数量不能大于余额')
                        pass = false
                    } else if (lowerLimitCoin * 1 > coinNum * 1) {
                        this.$toast('最小交易量不能大于挂单卖出总数')
                        pass = false
                    } else if (upperLimitCoin * 1 > coinNum * 1) {
                        this.$toast('最大交易量不能大于挂单卖出总数')
                        pass = false
                    } else if (lowerLimitCoin * 1 > upperLimitCoin * 1) {
                        this.$toast('最小交易量不能大于最大交易量')
                        pass = false
                    } else if (priceType == 2 && (Math.abs(this.orderDateils['premiumRatio']) > 5)) {
                        this.$toast('溢价区间仅可在-5% -5 % 之间')
                        pass = false
                    } else if(!Number(paymentId) && this.userInfoList.advertiserLevel != 3) {
                        this.$toast('请选择一个收款方式')
                        pass = false
                    } 
                } else if (bool && type == 1) {
                    if (lowerLimitCoin * 1 < fastTradeLowLimit * 1) {
                        this.$toast('最小交易量不能小于' + fastTradeLowLimit)
                        pass = false
                    } else if (lowerLimitCoin * 1 > upperLimitCoin * 1) {
                        this.$toast('最小交易量不能大于最大交易量')
                        pass = false
                    } else if (upperLimitCoin * 1 > coinNum * 1) {
                        this.$toast('最大交易量不能大于挂单买入总数量')
                        pass = false
                    } else if(priceType == 1) {
                        if(!(coninPrice > (0.95)* coinToCny && coninPrice < (1.05)* coinToCny)) {
                            this.$toast('委托价格在'+((0.95)* coinToCny).toFixed(2)+'-'+((1.05)* coinToCny).toFixed(2)+'之间')
                            pass = false
                        }
                    }
                }
                return pass
            },
            //失去焦点验证
            blurArrival(name) {
                if (this.orderDateils[name] - 0 < this.fastTradeLowLimit - 0) {
                    this.orderDateils[name] = this.fastTradeLowLimit - 0
                }
            }
        },

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
                        position: relative;
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

                        &.guadan-type {
                            em {
                                cursor: pointer;
                            }
                            .down-options {
                                left: auto !important;
                                right: 0;
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

                    .pay-list {
                        margin-bottom: 30px;


                        .alipy {
                            font-size: 14px;
                            line-height: 20px;
                            padding-bottom: 21px;
                        }

                        .payItem {
                            margin-bottom: 20px;
                        }


                        .more {
                            background: #ffffff;
                            box-shadow: 0px 4px 24px rgba(64, 64, 94, 0.08);
                            border-radius: 6px;
                            padding: 14px 20px;
                            display: flex;
                            align-items: center;
                            cursor: pointer;
                            padding-left: 12px;
                            font-size: 16px;
                            color: #40405e;

                            img {
                                width: 28px;
                                height: 28px;
                            }

                            span {
                                padding-left: 12px;
                                font-size: 16px;
                                color: #40405e;
                            }

                        }
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
