
const app = process.env.VUE_APP_NAME
const appConfig = require('../../../appConfig/' + app + '/index')
const message = {
  /** ----------------基础模块-----------------*/
  "请输入您的姓名": "Please enter your name",

  "请输入您的邮箱": "Please enter your email",

  "请输入您的合作方向": "Please enter your cooperation direction",

  "提交成功": "Submitted successfully",
  "更新": "update",
  "测试": "test",

  "创始团队成员": "The founder team members are core members of Huobi and OKEX exchanges, we have rich experiences, resources and advanced technology. Adopting advanced technologies such as distributed server clusters, distributed storage, cold wallets, and hot wallets with offline private keys, we are committed to creating global circulation of digital assets, and provide our customers with multiple terminals such as Web, mobile, PC, etc. Safe, stable, and credible digital asset transaction service.",

  "导航": "Navigation",

  "首页": "Main Page",

  "公告": "Announcement",

  "产品介绍": "Product Description",

  "商户合作": "Merchant cooperation",

  "客户合作": "Customer Corporation",

  "帮助": "Help",

  "APP下载": "Download App",

  "联系我们": "Contact Us",

  "语言": "Language",

  "下载APP": "Download App",

  // "Bitbase-世界领先的数字货币交易平台": "Bitbase-The world's leading digital currency trading platform",

  "热门币种行情": "Popular Cryptocurrency market",

  "币种": "Cryptocurrency",

  "价格": "Price",

  "涨跌幅": "Price Quote",

  "24H交易量": "24 Hours trading volume",

  "安全": "Safe",

  "稳定": "Stable",

  "可信": "Trustable",

  "开放": "accessible",

  "易用": "Credible",

  "基金全方位保障": "Comprehensive fund protection",

  "基于以太技术，多层防护，至今已为用户保管千亿级资产，从未发生过一起技术安全事故。": "Based on Ethernet technology and multi-layer protection, so far has kept hundreds of billions of assets for users, we ensure there has never been a technical issue.",

  "一如既往 经久稳定": "As always, safety is our priority",

  "采用GSLB、分布式服务器集群、分布式存储、多机互备的高速内存交易引擎、冷钱包、私钥离线化的热钱包等先进的技术保证交易稳定。": "Advanced technologies such as GSLB, distributed server clusters, distributed storage, multi-machine high-speed memory transaction engines, cold wallets, and hot wallets with offline private keys are used to ensure stable transactions.",

  "您可信赖的平台": "Your trustable platform",

  "不受任何国家，政府，组织，个人的控制，没有中央服务器，基于互联网点对点的支付手段，采用区块链技术作为支撑。": "It is not controlled by any country, government, organization, or individual. There is no central server. The peer-to-peer payment method based on the Internet uses blockchain technology as a support.",

  "应用场景开放": "Accessible application",

  "理想现实的美妙结合，对接多方服务，丰富应用场景。 区块链世界，离你一步之遥。": "A wonderful combination of ideal and reality, docking with multi-party services, and enriching application scenarios. The world of blockchain is just one step away from you.",

  "简单易用": "Simple and easy to use.",

  "逻辑简单易懂，极致丝滑体验，处处尽显慧心巧思。": "The logic is simple and easy to understand, and the ultimate silky experience is full of wisdom and ingenuity.",

  "一站式数字货币平台": "One-stop digital currency platform",

  "钱包": "Wallet",

  "安全存储您的电子美元，稳定币如USDT、USDC和BTC、ETH等数字资产，快速转账收款，带来轻松便捷的交易体验。银行级安全防护技术，全方位保障您的隐私和钱包安全。": "Safely store your digital assets, Coin such as USDT, USDC and BTC, ETH and other digital assets, fast transfer and receive, bringing an easy and convenient trading experience. Bank-level security protection technology fully protects your privacy and wallet security.",

  "法币": "Fiat",

  "我们为需要购买数字资产的机构和个人提供OTC服务，也为有大宗订单需求的客户提供更私有、个性化的服务。无论您交易的是美元、人民币还是比特币，bitbase将为您提供谨慎、安全和极具竞争力的执行和结算服务。": "We provide OTC services for institutions and individuals who need to purchase digital assets, as well as more private and personalized services for customers who have large orders. Whether you are trading in USD, RMB or Bitcoin, " + appConfig.upperName + " will provide you with prudent, safe, and highly competitive execution and settlement services.",

  "币币": "Crypto",

  "我们为用户提供多币对之间的交易，你可以直接用一种区块链资产换取另一种区块链资产，中间不涉及法定货币的中转或者结算。现在全球比特币的交易量，将近一半来自币币交易，法定货币与比特币交易的比例逐渐缩小。": "We provide users with transactions between multiple cryptocurrency pairs. You can directly exchange one kind of blockchain assets for another kind of blockchain assets without involving the transfer or settlement of fiat currencies. At present, nearly half of the global bitcoin transaction volume comes from bitcoin transactions, and the proportion of fiat currencies to bitcoin transactions is gradually shrinking.",

  "合约": "Contract",

  "买卖用户双方约定未来某个时间，按指定价格将某种资产的协议进行交易。在数字资产的合约交易中，投资者可以通过判断价格的波动方向，选择“做多”或者“做空”进行买入或者卖出合约，赚取差价，获得盈利。": "The buyer and seller agree that at a certain time in the future, they will trade a certain asset agreement at a specified price. In the contract transaction of digital assets, investors can choose to 'long' or 'short' to buy or sell contracts by judging the direction of price fluctuations, earning the difference and earning profits.",

  "公司总部设立于爱沙尼亚哈雷县塔林市Mustamäe区，已获得欧盟颁布的MTR 牌照，属于数字货币＋钱包双牌照。对于Blockchain项目来说，此牌照服务涵盖面广，权威性高": "The company's headquarters is located at the Mustamäe district of Tallinn, Halle County, Estonia. It has obtained the MTR license issued by the European Union. It is digital currency and wallet dual license. For the Blockchain project, this license service covers a wide range and has high authority.",

  "请留下您的信息，我们将在5个工作日之内联系你": "Please leave your information, we will contact you within 5 working days",

  "您的姓名*": "Your Name*",

  "您的邮箱*": "your Email*",

  "您的合作方向": "Your cooperation direction",

  "提交": "Submit",

  "帮助中心": "Help Center",

  "这是其他一些常见的。如果我们没有回答您的问题，请随时通support@bitbase.com与我们联系。我们在这里为您服务。": "If you have any question, please feel free to contact us at support@" + appConfig.lowerName + ".com. We are here for you.",

  "帮助中心Q&A问答": "Help Center Q&A",

  "1、如何完成实名认证？": "1.How to complete the personal identity authentication?",

  "进入“我的”界面，点击进入“身份验证”,根据界面中的操作提示完成身份验证，平台支持身份证、驾照、护照三种身份验证方式进行验证，可根据需求选择。": "Go to 'MY' interface, click to enter 'Identity Verification', and complete the identity verification according to the operation prompts in the interface. The platform supports three identity verification methods: National ID card, driver's license, or passport, which can be selected according to needs.",

  "2、登陆密码设置或修改该如何解决": "2.How to setup or reset my password",

  "进入“我的”界面，点击设置“登陆密码”,输入验证码，输入登陆密码，点击“确定”,登陆密码设置成功；若您忘记自己的登陆密码，您可以在密码登陆页面点击“忘记密码”，可重新设置登陆密码。": "Go to 'MY' interface, click to set 'Login Password', enter the verification code sent to your phone, enter the login password, click 'OK', the login password is set successfully; if you forget your login password, you can click 'Forgot Password' on the password login page , you can reset the login password.",

  "3、如何绑定收款方式？": "3. How to bind the payment method?",

  "进入“我的”界面，点击进入“收款方式”,根据界面提示进行收款方式的绑定，现支持支付宝、微信、银行卡三种收款方式的绑定。注:绑定收款方式需先完成用户实名认证才可进行绑定。": "Go to 'MY' interface, click to enter the 'payment method', according to the interface prompts to bind the payment method. Now we support Alipay, WeChat or bank card these three kinds of payment method binding. Note: The binding payment method needs to complete the user's real name authentication before binding.",

  "4、如何绑定谷歌验证器？": "4.How to bind with Google 2Fa-Authenticator?",

  "进入“我的”界面，点击进入“谷歌验证器”,根据界面提示完成谷歌验证器验证，验证成功后的谷歌验证密钥将在登陆APP时，和提币操作时进行使用。": "Go to 'MY' interface, click to enter 'Google Authenticator', and complete the Google Authenticator verification according to the interface prompts. The Google verification key after successful verification will be used when logging in the APP or withdrawing process.",

  "5、如何设置支付密码？": "5. How to set payment password?",

  "进入“我的”界面，点击进入“支付密码”设置,验证码验证成功后，即可设置支付密码，设置成功后再次进入该页面可根据界面的提示修改或重置支付密码。": "Go to 'MY' interface and click to enter the 'Payment Password' setting. After the verification code is successfully verified, the payment password can be set. After the setting is successful, enter the page again to modify or reset the payment password according to the prompts on the interface.",

  "6、如何充币？": "6. How to deposit?",

  "点击钱包-充币，进入到充币页面，切换您将要充币的币种，如USDT，页面中就可以查看到您的该USDT的充币地址及地址二维码，可以将您的充币地址输入到其他平台或账户的提币地址中，即可充值到您的Bitbase账户中。": "Click on Wallet-deposit, go to the deposit page, choose the currency you want to deposit, such as USDT, you can view your USDT deposit address and address QR code on the page, you can deposit your money by enter the wallet address into the withdrawal wallet address of other platforms or accounts, thus you can deposit it into your " + appConfig.upperName + " account.",

  "7、如何提币？": "7. How to withdraw?",

  "点击钱包-提币，进入到提币页面，切换您将要提币的币种，如USDT，在提币地址处通过粘贴或扫描方式": "Click on Wallet-Withdraw, go to withdrawal page, choose the currency you want to withdraw, such as USDT, paste or scan at the withdrawal wallet address",

  "8、如何申请成为承兑商？": "8. How to apply to become trader? ",

  "用户需提前完成手机号绑定，身份认证成功，收款方式绑定才可有资格申请成为承兑商，点击交易-申请成为承兑商，根据界面提示完成申请内容的填写，填写完成后等待平台审核。": "Trader needs to complete the phone number binding in advance, the identity authentication and the payment method then eligible to apply to become trader. Click transaction-apply to become an trader, complete the application content according to the interface prompts, and wait for the platform to review after completing the completion .",

  "9、交易中用户已付款但是订单超时怎么办？": "9. What should I do if the user has paid for the transaction but the order times out?",

  "交易订单有15分钟的付款时间，完成付款后需点击“我已付款成功”，将订单标记为已付款，订单超时后承兑商未进行申诉，用户可通过电话或聊天的功能与商家直接进行沟通；或将该订单进行申诉，选择申诉理由，上传付款截图，由申诉员联系商家处理该订单。": "The transaction order has a payment time of 15 minutes. After completing the payment, you need to click 'I have paid successfully' to mark the order as paid. After the order expires,if the seller does not appeal. The user can communicate directly with the customer service through the phone or chat function; explain the situation, upload a screenshot of the payment, and customer service will contact the trader to process the order.",

  "10、如何发布自己的挂单？": "10. How to publish your own pending order?",

  "申请成为承兑商的用户，有权在该平台中直接发布自己的挂单；若想下架或删除自己的挂单，可在承兑商-订单中心-挂单管理中进行操作。": "Users who applied as trader have the right to publish their pending orders directly on the platform; if they want to remove or delete their own pending orders, they can operate in the acceptor-order center-pending order management.",

  "11、承兑商靠谱么？": "11. Are trader reliable?",

  "承兑商是由平台官方认证的交易商家，成为承兑商需要通过平台的审核，交易中若出现问题，平台会介入到商家与用户的沟通中解决问题。": "The trader is a trading merchant officially certified by the platform. To become a trader, the trader needs to pass the audit by our platform. If there is a problem in the transaction, the platform will intervene in the communication between the trader and the user to solve the problem.",

  "12、卖单或者买单的承兑商一直未确认怎么办？": "12. What if the trader who sells or buys the order has not confirmed it?",

  "订单详情中有承兑商的联系方式，用户可以自行与承兑商进行联系，也可以通过申诉将订单交由平台官方申诉员进行沟通解决。": "The contact details of the trader are included in the order details. Users can contact the trader themselves, or they can refer the order to the customer service of the platform for communication and resolution.",

  "13、买家订单创建成功后，多次取消订单会有什么后果？": "13. After a buyer's order is successfully created, what will happen if the order is cancelled multiple times?",

  "买家订单创建成功后，多次取消订单，当日达到3次，系统将限制买家的买入功能；连续2日触发，系统将限制买家5日内的交易权限。": "After the buyer's order is successfully created, if the buy order cancelled more than 3 times a day, system will limit the buyer's buying functions; when triggered for 2 consecutive days, the system will limit the buyer's trading authority for 5 days.",

  "14、订单未付款的情况下，买家点击“我已付款”": "14. When the order is not paid, the buyer clicks 'I have paid'",

  "买方恶意点击“我已付款”按钮，卖方有权申诉并要求取消此笔订单，买方当日被投诉达到2次，系统将限制买方账户部分交易功能；此类投诉单笔金额超过5万人民币的，系统将直接限制买方账户48小时。": "If the buyer maliciously clicks the 'I have paid' button, the seller has the right to appeal and request to cancel this order. If the buyer has been complained up to 2 times on the same day, and the system will limit some transaction functions of the buyer's account; if the single amount of such complaints exceeds amount of 50,000 RMB, The system will directly limit the buyer's account for 48 hours.",

  "15、买方未按照订单详情页面显示的收款账户进行付款": "15. The buyer did not pay according to the payment account shown on the order details page.",

  "发生此情况时，卖方有权要求取消订单，数字资产归还给卖方，买方自行承担转错款的风险。": "When this happens, the seller has the right to request the cancellation of the order, the digital asset is returned to the seller, and the buyer bears the risk of transferring the wrong money.",

  "16、买方未按照卖方在订单详情页面和聊天窗口中提供的与绑定账户实名一致的账户付款。": "16. The buyer did not pay in accordance with the account detail provided by the seller on the order details page and chat window.",

  "发生此情况时，卖方有权要求取消订单，数字资产归还给卖方，买方自行承担转错款的风险。": "When this happens, the seller has the right to request the cancellation of the order, the digital asset is returned to the seller, and the buyer bears the risk of transferring the wrong money.",

  "17、未付款的情况下，是否可以优先点击“我已付款”，再进行支付。": "17. In the case of no payment, can I give priority to click 'I have paid', and then pay.",

  "卖方有权选择是否继续进行交易或者退款后取消该订单。": "The seller has the right to choose whether to continue the transaction or cancel the order.",

  "1）如卖方选择继续交易：卖方需要确认是否收到全部的付款后，且在订单创建的24小时内完成放行，超过24小时，订单将被系统自动修改为已取消的状态；": "1)If the seller chooses to continue the transaction: after the seller needs to confirm whether all payments have been received, and the release of digital asset should complete within 24 hours of the order creation, the order will be automatically modified to the canceled state by the system after more than 24 hours;",

  "2）如卖方选择取消订单，卖方应在订单申诉后30分钟内完成退款，数字资产归还给卖方。": "2)If the seller chooses to cancel the order, the seller should complete the refund within 30 minutes after the order is appealed and return the digital assets to the seller.",

  "18、买方未使用与平台账户实名一致的支付账户付款": "18. The buyer did not pay with a payment account that matches the real name of the platform account",

  "发生此情况时，卖方有权直接拒绝成交，卖方可在收到付款后的30分钟内完成退款处理，数字资产归还给卖方。使用企业账户付款（不论法人与认证本人实名是否一致），依然属于非实名支付。买方因此类情况被申诉达到2次，系统将永久限制买方账户买入功能。": "When this happens, the seller has the right to directly refuse the transaction. The seller can complete the refund processing within 30 minutes after receiving the payment, and the digital assets are returned to the seller. Payment using a corporate account (regardless of whether the real name of the legal person and the certified person are the same), is still a non-real name payment. If the buyer has been appealed up to 2 times for this kind of situation, and the system will permanently restrict the buyer account buying function.",

  "19、买方在付款订单时完成付款，但订单被取消该怎么办？": "19. What if the buyer completes the payment but the order is cancelled?",

  "1）买方完成所有付款，但订单被买方主动取消或被系统超时自动取消；": "1)The buyer completes all payments, but the order is automatically cancelled by the buyer or automatically canceled by the system due to overtime.",

  "如卖方选择成交：卖方是普通用户，平台需要确认卖方是否已收到全部付款后直接对该订单进行放行，资产将自动到账买方账户中。": "If the seller chooses to close the deal: the seller is an ordinary user, the platform needs to confirm whether the seller has received all the payments and release the order directly, and the assets will be automatically credited to the buyer's account.",

  "2）买方完成部分付款，但订单被买方主动取消或被系统超时取消。": "2)The buyer completed part of the payment, but the order was canceled by the buyer or the system overtime.",

  "订单被买方主动取消以及订单被系统超时取消的，卖方有权选择继续进行交易或者退款不成交。如卖方选择不再继续进行交易，则卖方需在收到平台或者买方用户反馈后30分钟内完成退款，数字资产归还给卖方；": "If the order is actively cancelled by the buyer and the order is cancelled by the system overtime, the seller has the right to choose to continue the transaction or refund without closing the transaction. If the seller chooses not to continue the transaction, the seller needs to complete the refund within 30 minutes after receiving the platform or buyer user feedback, and the digital asset will be returned to the seller;",

  "20、如买方分开付款，在未完成所有转款的情况下，优先点击“我已付款”，再继续完成付款。": "20. If the buyer pays separately, without completing all the transfers, but priority to click 'I have paid', and then continue to complete the payment.",

  "1）提前与卖方沟通，卖方允许其行为的，卖方应继续完成订单支付；": "1)Communicate with the seller in advance. If the seller allows its behavior, the seller should continue to complete the order payment.",

  "2）未征得卖方同意或并未与卖方沟通，卖方有权选择继续成交或者退款后取消订单。": "2)Without the consent of the seller or communication with the seller, the seller has the right to continue the transaction or cancel the order after refund.",

  "—如卖方选择继续成交，卖方需要确认是否收到全部的付款后，且在订单创建的24小时内完成放行，超过24小时，订单将被系统自动修改为已取消的状态；": "-If the seller chooses to continue the transaction, the seller needs to confirm whether the payment has been received and the release will be completed within 24 hours of the order creation. After 24 hours, the order will be automatically modified to the canceled state by the system.",

  "—如卖方选择申诉取消订单，则卖方需在收到付款后30分钟内完成退款，数字资产归还给卖方。": "-If the seller chooses to cancel the order, the seller needs to complete the refund within 30 minutes after receiving the payment and return of digital assets.",

  "21、付款金额与订单金额不符该怎么处理？": "21. What should I do if the payment amount does not match the order amount?",

  "1）付款金额大于订单金额的，订单成交，卖家应于收到款项后30分钟内退还多余部分款项。": "1)If the payment amount is greater than the order amount, the order is completed, and the seller should refund the excess amount within 30 minutes after receiving the payment.",

  "2）付款金额小于订单金额的，卖方有权选择继续成交或者退款后要求取消订单。": "2)If the payment amount is less than the order amount, the seller has the right to continue the transaction or request the cancellation of the order after the refund.",

  "—如卖方选择继续成交，有权按实际订单金额进行成交，并完成此订单。": "-If the seller chooses to continue the transaction, he has the right to complete the transaction according to the actual order amount and complete the order.",

  "—如卖方选择取消订单，则卖方需在收到付款后30分钟内完成退款，数字资产归还给卖方。": "-If the seller chooses to cancel the order, the seller needs to complete the refund within 30 minutes after receiving the payment and return the digital asset to the seller.",

  "22、买方点击“我已付款”后，卖方1小时内未收到付款。": "22. After the buyer clicks 'I have paid', the seller has not received the payment within 1 hour.",

  "1）除买方付款方式已事先获得卖方同意的，卖方有权选择继续成交或退款后取消订单。": "1)Unless the buyer's payment method has obtained the seller's consent in advance, the seller has the right to choose to continue the transaction or cancel the order after the refund.",

  "—如卖方选择成交，卖方需要在收到付款的10分钟内完成放行。": " -If the seller chooses to complete the transaction, the seller needs to complete the release within 10 minutes of receiving the payment.",

  "—如卖方选择取消订单，则卖方需在收到付款后30分钟内完成退款，数字资产归还给卖方。": "-If the seller chooses to cancel the order, the seller needs to complete the refund within 30 minutes after receiving the payment and return the digital asset to the seller.",

  "2）卖方是广告发布方，申诉后10分钟内无法联系上买方，经核实卖方未收到款，在广告方保证资产范围内申诉专员会优先取消订单。": "2)The seller is the publisher of the trade, and the buyer cannot be contacted within 10 minutes after the appeal. After verifying that the seller has not received the payment, the appeal specialist will cancel the order within the scope of the trade’s guaranteed assets.",

  "23、付款到账后，卖方收款账户无法核实到账实名信息。": "23. After the payment is received, the seller's receive account cannot verify the real name information.",

  "1）经核实买方付款账户与平台实名账户一致，且在订单规定时间内完成了付款，此订单正常成交。": " 1) After verifying that the buyer's payment account is the same as the real-name account of the platform, and the payment is completed within the time specified in the order, the order is normally closed.",

  "2）经核实买方付款账户与平台实名账户不一致，按上述第7条措施处理。": "2) After verifying that the buyer’s payment account is inconsistent with the platform’s real-name account, it shall be dealt with in accordance with the measures in clause 7th above.",

  "24、使用未经卖方同意的非实时到账方式支付订单的": "24. Using non-real-time payment methods without the seller’s consent to pay for the order",

  "卖方有权选择继续成交或退款后要求取消订单：": "The seller has the right to choose to continue the transaction or request a cancellation after refund:",

  "—如卖方选择成交，卖方需要在收到付款的10分钟内完成放行。": "-If the seller chooses to complete the transaction, the seller needs to complete the release within 10 minutes of receiving the payment.",

  "—如卖方选择取消订单，则卖方需在收到付款后30分钟内完成退款，数字资产归还给卖方；": "-If the seller chooses to cancel the order, the seller needs to complete the refund within 30 minutes after receiving the payment, and the digital asset is returned to the seller;",

  "25、节假日或工作日当日17:00-次日9:00，银行卡汇款超过5万以上未分批支付导致卖方无法在1小时内收到转款。": "25. On holidays or working days from 17:00 to 9:00 the next day, bank card remittances of more than 50,000 RMB are not paid in batches, which prevents the seller from receiving the transfer within 1 hour.",

  "卖方有权选择继续成交或取消订单后退款。": "The seller has the right to choose to continue the transaction or cancel the order and refund.",

  "—如卖方选择成交，卖方需要在收到付款的10分钟内完成放行。": "-If the seller chooses to complete the transaction, the seller needs to complete the release within 10 minutes of receiving the payment.",

  "—如卖方选择取消订单，则卖方需在收到付款后30分钟内完成退款，数字资产归还给卖方。": "-If the seller chooses to cancel the order, the seller needs to complete the refund within 30 minutes after receiving the payment and return the digital asset to the seller.",

  "26、因买方付款导致卖方收款账户异常": "26. The seller's receive account is abnormal due to the buyer's payment",

  "1）买方无法提供账户正常证明，卖方应在收款账户转至正常后，24小时内完成退款，平台取消订单。": "1)If buyer cannot provide proof of account normality, and the seller should complete the refund within 24 hours after the received account is transferred to normal, then platform cancels the order.",

  "2）买方能提供账户正常证明，在核实买方账户无异常后，订单成交，数字资产应交付买方。": "2)The buyer can provide proof that the account is normal. After verifying that the buyer’s account is not abnormal, the order is closed, and the digital asset should be delivered to the buyer.",

  "27、付款时备注：类似”数字货币.USDT.比特币.XXXX“等字样的。": "27. Remarks during payment: similar to 'Digital Currency.USDT.Bitcoin.XXXX' and so on.",

  "卖方有权选择继续成交或退款不成交。": "The seller has the right to choose to continue the transaction or refund the transaction.",

  "1）如卖方选择成交，卖方应在收到付款的10分钟内完成放行。": "1)If the seller chooses to complete the transaction, the seller should complete the release within 10 minutes of receiving the payment.",
  "2）如卖方选择退款不成交，此订单取消，数字资产归还给卖方，卖方在收到付款后30分钟内完成退款；如卖方收款账户因此被冻结，按上述第26条措施处理。": "2)If the seller chooses not to refund the transaction, the order is cancelled, and the digital asset is returned to the seller. The seller should complete the refund within 30 minutes after receiving the payment to buyer; if the seller's collection account is frozen, the measures described in Clause 26th above will be followed.",

  "公告中心": "Bulletin center",

  "最新公告": "Latest announcement",

  "查看更多": "Check more"
}
message[appConfig.upperName + "-世界领先的数字货币交易平台"] = appConfig.upperName + "-The world's leading digital currency trading platform"

export default message
