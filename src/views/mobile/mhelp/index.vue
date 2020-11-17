<template>
  <div class="mhelp">
    <div class="type">
      <div class="type_item" :class="{active:active == 1}" @click="Onclick(1)">账号安全</div>
      <div class="type_item" :class="{active:active == 2}" @click="Onclick(2)">交易相关</div>
      <div class="type_item" :class="{active:active == 3}" @click="Onclick(3)">充提相关</div>
    </div>
    <ul v-if="active == 1">
      <li>
        <div class="icon">01</div>
        <div class="list_title">
          <p>如何完成实名认证？</p>
          <div>进入"我的"界面，点击进入"身份验证",根据界面中的操作提示完成身份验证，平台支持身份证、驾照、护照三种身份验证方式进行验证，可根据需求选择。</div>
        </div>
      </li>
      <li>
        <div class="icon">02</div>
        <div class="list_title">
          <p>登陆密码设置或修改该如何解决</p>
          <div>进入"我的"界面，点击设置"登陆密码",输入验证码，输入登陆密码，点击"确定",登陆密码设置成功；若您忘记自己的登陆密码，您可以在密码登陆页面点击"忘记密码"，可重新设置登陆密码。</div>
        </div>
      </li>
      <li>
        <div class="icon">03</div>
        <div class="list_title">
          <p>如何绑定收款方式？</p>
          <div>进入"我的"界面，点击进入"收款方式",根据界面提示进行收款方式的绑定，现支持支付宝、微信、银行卡三种收款方式的绑定。注:绑定收款方式需先完成用户实名认证才可进行绑定。</div>
        </div>
      </li>
      <li>
        <div class="icon">04</div>
        <div class="list_title">
          <p>如何绑定谷歌验证器？</p>
          <div>进入“我的"界面，点击进入"谷歌验证器",根据界面提示完成谷歌验证器验证，验证成功后的谷歌验证密钥将在登陆APP时，和提币操作时进行使用。</div>
        </div>
      </li>
      <li>
        <div class="icon">05</div>
        <div class="list_title">
          <p>如何设置支付密码？</p>
          <div>进入“我的"界面，点击进入"支付密码"设置,验证码验证成功后，即可设置支付密码，设置成功后再次进入该页面可根据界面的提示修改或重置支付密码。</div>
        </div>
      </li>
    </ul>
    <ul v-else-if="active == 2">
      <li>
        <div class="icon">01</div>
        <div class="list_title">
          <p>如何申请成为承兑商？</p>
          <div>用户需提前完成手机号绑定，身份认证成功，收款方式绑定才可有资格申请成为承兑商，点击交易-申请成为承兑商，根据界面提示完成申请内容的填写，填写完成后等待平台审核。</div>
        </div>
      </li>
      <li>
        <div class="icon">02</div>
        <div class="list_title">
          <p>交易中用户已付款但是订单超时怎么办？</p>
          <div>交易订单有15分钟的付款时间，完成付款后需点击“我已付款成功”，将订单标记为已付款，订单超时后承兑商未进行申诉，用户可通过电话或聊天的功能与商家直接进行沟通；或将该订单进行申诉，选择申诉理由，上传付款截图，由申诉员联系商家处理该订单。</div>
        </div>
      </li>
      <li>
        <div class="icon">03</div>
        <div class="list_title">
          <p>如何发布自己的挂单？</p>
          <div>申请成为承兑商的用户，有权在该平台中直接发布自己的挂单；若想下架或删除自己的挂单，可在承兑商-订单中心-挂单管理中进行操作。</div>
        </div>
      </li>
      <li>
        <div class="icon">04</div>
        <div class="list_title">
          <p>承兑商靠谱么？</p>
          <div>承兑商是由平台官方认证的交易商家，成为承兑商需要通过平台的审核，交易中若出现问题，平台会介入到商家与用户的沟通中解决问题。</div>
        </div>
      </li>
      <li>
        <div class="icon">05</div>
        <div class="list_title">
          <p>卖单或者买单的承兑商一直未确认怎么办？</p>
          <div>订单详情中有承兑商的联系方式，用户可以自行与承兑商进行联系，也可以通过申诉将订单交由平台官方申诉员进行沟通解决。</div>
        </div>
      </li>
      <li>
        <div class="icon">06</div>
        <div class="list_title">
          <p>买家订单创建成功后，多次取消订单会有什么后果？</p>
          <div>买家订单创建成功后，多次取消订单，当日达到3次，系统将限制买家的买入功能；连续2日触发，系统将限制买家5日内的交易权限。</div>
        </div>
      </li>
      <li>
        <div class="icon">07</div>
        <div class="list_title">
          <p>订单未付款的情况下，买家点击“我已付款”</p>
          <div>买方恶意点击“我已付款”按钮，卖方有权申诉并要求取消此笔订单，买方当日被投诉达到2次，系统将限制买方账户部分交易功能；此类投诉单笔金额超过5万人民币的，系统将直接限制买方账户48小时。</div>
        </div>
      </li>
      <li>
        <div class="icon">08</div>
        <div class="list_title">
          <p>买方未按照订单详情页面显示的收款账户进行付款</p>
          <div>发生此情况时，卖方有权要求取消订单，数字资产归还给卖方，买方自行承担转错款的风险。</div>
        </div>
      </li>
      <li>
        <div class="icon">09</div>
        <div class="list_title">
          <p>买方未按照卖方在订单详情页面和聊天窗口中提供的与绑定账户实名一致的账户付款。</p>
          <div>发生此情况时，卖方有权要求取消订单，数字资产归还给卖方，买方自行承担转错款的风险。</div>
        </div>
      </li>
      <li>
        <div class="icon">10</div>
        <div class="list_title">
          <p>未付款的情况下，是否可以优先点击“我已付款”，再进行支付。</p>
          <div>卖方有权选择是否继续进行交易或者退款后取消该订单。<br />
            1）如卖方选择继续交易：卖方需要确认是否收到全部的付款后，且在订单创建的24小时内完成放行，超过24小时，订单将被系统自动修改为已取消的状态；
            <br />
            2）如卖方选择取消订单，卖方应在订单申诉后30分钟内完成退款，数字资产归还给卖方。
          </div>
        </div>
      </li>
      <li>
        <div class="icon">11</div>
        <div class="list_title">
          <p>买方未使用与平台账户实名一致的支付账户付款</p>
          <div>发生此情况时，卖方有权直接拒绝成交，卖方可在收到付款后的30分钟内完成退款处理，数字资产归还给卖方。使用企业账户付款（不论法人与认证本人实名是否一致），依然属于非实名支付。买方因此类情况被申诉达到2次，系统将永久限制买方账户买入功能。</div>
        </div>
      </li>
      <li>
        <div class="icon">12</div>
        <div class="list_title">
          <p>买方在付款订单时完成付款，但订单被取消该怎么办？</p>
          <div>1）买方完成所有付款，但订单被买方主动取消或被系统超时自动取消；
            <br />
            如卖方选择成交：卖方是普通用户，平台需要确认卖方是否已收到全部付款后直接对该订单进行放行，资产将自动到账买方账户中。
            <br />
            2）买方完成部分付款，但订单被买方主动取消或被系统超时取消。
            <br />
            订单被买方主动取消以及订单被系统超时取消的，卖方有权选择继续进行交易或者退款不成交。如卖方选择不再继续进行交易，则卖方需在收到平台或者买方用户反馈后30分钟内完成退款，数字资产归还给卖方；
          </div>
        </div>
      </li>
      <li>
        <div class="icon">13</div>
        <div class="list_title">
          <p>如买方分开付款，在未完成所有转款的情况下，优先点击“我已付款”，再继续完成付款。</p>
          <div>1）提前与卖方沟通，卖方允许其行为的，卖方应继续完成订单支付；
            <br />
            2）未征得卖方同意或并未与卖方沟通，卖方有权选择继续成交或者退款后取消订单。
            <br />
            —如卖方选择继续成交，卖方需要确认是否收到全部的付款后，且在订单创建的24小时内完成放行，超过24小时，订单将被系统自动修改为已取消的状态；
            <br />
            —如卖方选择申诉取消订单，则卖方需在收到付款后30分钟内完成退款，数字资产归还给卖方。

          </div>
        </div>
      </li>
      <li>
        <div class="icon">14</div>
        <div class="list_title">
          <p>付款金额与订单金额不符该怎么处理？</p>
          <div>1）付款金额大于订单金额的，订单成交，卖家应于收到款项后30分钟内退还多余部分款项。
            <br />
            2）付款金额小于订单金额的，卖方有权选择继续成交或者退款后要求取消订单。
            <br />
            —如卖方选择继续成交，有权按实际订单金额进行成交，并完成此订单。
            <br />
            —如卖方选择取消订单，则卖方需在收到付款后30分钟内完成退款，数字资产归还给卖方。
          </div>
        </div>
      </li>
      <li>
        <div class="icon">15</div>
        <div class="list_title">
          <p>买方点击“我已付款”后，卖方1小时内未收到付款。</p>
          <div>1）除买方付款方式已事先获得卖方同意的，卖方有权选择继续成交或退款后取消订单。
            <br />
            —如卖方选择成交，卖方需要在收到付款的10分钟内完成放行。
            <br />
            —如卖方选择取消订单，则卖方需在收到付款后30分钟内完成退款，数字资产归还给卖方。
            <br />
            2）卖方是广告发布方，申诉后10分钟内无法联系上买方，经核实卖方未收到款，在广告方保证资产范围内申诉专员会优先取消订单。
          </div>
        </div>
      </li>
      <li>
        <div class="icon">16</div>
        <div class="list_title">
          <p>付款到账后，卖方收款账户无法核实到账实名信息。</p>
          <div>1）经核实买方付款账户与平台实名账户一致，且在订单规定时间内完成了付款，此订单正常成交。
            <br />
            2）经核实买方付款账户与平台实名账户不一致，按上述第11条措施处理。
          </div>
        </div>
      </li>
      <li>
        <div class="icon">17</div>
        <div class="list_title">
          <p>使用未经卖方同意的非实时到账方式支付订单的</p>
          <div>卖方有权选择继续成交或退款后要求取消订单：
            <br />
            —如卖方选择成交，卖方需要在收到付款的10分钟内完成放行。
            <br />
            —如卖方选择取消订单，则卖方需在收到付款后30分钟内完成退款，数字资产归还给卖方；
          </div>
        </div>
      </li>
      <li>
        <div class="icon">18</div>
        <div class="list_title">
          <p>节假日或工作日当日17:00-次日9:00，银行卡汇款超过5万以上未分批支付导致卖方无法在1小时内收到转款。</p>
          <div>卖方有权选择继续成交或取消订单后退款。
            <br />
            —如卖方选择成交，卖方需要在收到付款的10分钟内完成放行。
            <br />
            —如卖方选择取消订单，则卖方需在收到付款后30分钟内完成退款，数字资产归还给卖方。
          </div>
        </div>
      </li>
      <li>
        <div class="icon">19</div>
        <div class="list_title">
          <p>因买方付款导致卖方收款账户异常</p>
          <div>1）买方无法提供账户正常证明，卖方应在收款账户转至正常后，24小时内完成退款，平台取消订单。
            <br />
            2）买方能提供账户正常证明，在核实买方账户无异常后，订单成交，数字资产应交付买方。
          </div>
        </div>
      </li>
      <li>
        <div class="icon">20</div>
        <div class="list_title">
          <p>付款时备注：类似”数字货币.USDT.比特币.XXXX“等字样的。</p>
          <div>卖方有权选择继续成交或退款不成交。
            <br />
            1）如卖方选择成交，卖方应在收到付款的10分钟内完成放行。
            <br />
            2）如卖方选择退款不成交，此订单取消，数字资产归还给卖方，卖方在收到付款后30分钟内完成退款；如卖方收款账户因此被冻结，按上述第19条措施处理。
          </div>
        </div>
      </li>
    </ul>
    <ul v-else>
      <li>
        <div class="icon">01</div>
        <div class="list_title">
          <p>如何充币？</p>
          <div>点击钱包-充币，进入到充币页面，切换您将要充币的币种，如USDT，页面中就可以查看到您的该USDT的充币地址及地址二维码，可以将您的充币地址输入到其他平台或账户的提币地址中，即可充值到您的{{ $appConfig.upperName }} pro账户中。
          </div>
        </div>
      </li>
      <li>
        <div class="icon">02</div>
        <div class="list_title">
          <p>如何提币？</p>
          <div>点击钱包-提币，进入到提币页面，切换您将要提币的币种，如USDT，在提币地址处通过粘贴或扫描方式。
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Mhelp",
  data() {
    return {
      active: 1
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    Onclick(value) {
      this.active = value;
    }
  }
};
</script>

<style lang="less"  scoped>
.mhelp {
  padding: 0.32rem;
  .type {
    display: flex;
    .type_item {
      padding: 0.12rem 0.32rem;
      font-size: 0.28rem;
      line-height: 0.4rem;
      color: #a0a0b3;
    }
    .active {
      background: #f5f5fa;
      border-radius: 0.32rem;
      color: @cl-m;
    }
  }
  ul {
    li {
      padding-top: 0.54rem;
      display: flex;

      .icon {
        width: 0.48rem;
        height: 0.48rem;
        background: rgba(12, 179, 151, 0.2);
        border-radius: 50%;
        font-family: Roboto;
        text-align: center;
        line-height: 0.48rem;
        font-size: 0.24rem;
        color: @cl-m;
        flex-shrink: 0;
      }
      .list_title {
        padding-left: 0.24rem;
        p {
          font-family: PingFangSC;
          font-size: 0.3rem;
          line-height: 0.36rem;
          color: #40405e;
        }
        div {
          padding-top: 0.16rem;
          font-family: PingFangSC;
          font-size: 0.26rem;
          line-height: 0.4rem;
          color: #a0a0b3;
        }
      }
    }
  }
}
</style>
