const app = process.env.VUE_APP_NAME;
const appConfig = require("../../appConfig/" + app + "/index");

let configRouter = [];
// 功能模块routerTransactions start
if (appConfig.moduleControl.routerTransactions === 1) {
    configRouter = configRouter.concat([
        { path: '/transactions', component: () => import('@/views/web/home'), meta: { title: '快捷交易' } },
        { path: '/mtransactions', component: () => import('@/views/mobile/home'), meta: { title: '我要交易' } },

        { path: '/login', component: () => import('@/views/web/webLogin'), meta: { title: '登录' } },
        { path: '/mlogin', component: () => import('@/views/mobile/mLogin'), meta: { title: '登录' } },

        { path: '/register', component: () => import('@/views/web/webRegister'), meta: { title: '注册' } },
        { path: '/mregister', component: () => import('@/views/mobile/register'), meta: { titel: '注册' } },

        { path: '/cardInfo', component: () => import('@/views/web/cardInfo'), meta: { titel: '绑定银行卡' } },
        { path: '/mcardInfo', component: () => import('@/views/mobile/cardInfo'), meta: { titel: '绑定银行卡' } },

        { path: '/orderList', component: () => import('@/views/web/orderList'), meta: { titel: '全部订单' } },
        { path: '/mOrderList', component: () => import('@/views/mobile/orderList'), meta: { titel: '移动端订单列表' } },
        { path: '/mallOrderList', component: () => import('@/views/mobile/allOrderList'), meta: { titel: '全部订单' } },

        { path: '/buyDateils', component: () => import('@/views/web/buyDateils'), meta: { titel: '买入订单' } },
        { path: '/morderDetails/:id', component: () => import('@/views/mobile/orderDetails'), meta: { titel: '移动端订单详情' } },

        { path: '/sellDateils', component: () => import('@/views/web/sellDateils'), meta: { titel: '卖出订单' } },
        { path: '/msellUsdt/:id', component: () => import('@/views/mobile/sellUsdt'), meta: { titel: '出售订单详情' } },


        { path: '/registerSuccess', component: () => import('@/views/web/webRegisterSuccess'), meta: { titel: '注册成功' } },
        { path: '/mregistrationSuccess', component: () => import('@/views/mobile/registrationSuccess'), meta: { titel: '注册成功' } },

        { path: '/recharge', component: () => import('@/views/web/recharge'), meta: { titel: '充币' } },
        { path: '/mCharges', component: () => import('@/views/mobile/Charges'), meta: { titel: '充币地址' } },

        { path: '/forget', component: () => import('@/views/web/webForget'), meta: { titel: '忘记密码' } },
        { path: '/mForget', component: () => import('@/views/mobile/mForget'), meta: { titel: '忘记密码' } },


        { path: '/help', component: () => import('@/views/web/webHelp'), meta: { titel: '帮助中心' } },
        { path: '/mhelp', component: () => import('@/views/mobile/mhelp'), meta: { titel: '帮助中心' } },


        { path: '/through', component: () => import('@/views/web/webThrough'), meta: { titel: '身份验证' } },
        { path: '/mThrough', component: () => import('@/views/mobile/mThrough'), meta: { titel: '身份验证' } },

        { path: '/primary', component: () => import('@/views/web/webPrimary'), meta: { titel: '初级验证' } },
        { path: '/mPrimary', component: () => import('@/views/mobile/mPrimary'), meta: { titel: '初级认证' } },


        { path: '/intermediate', component: () => import('@/views/web/webIntermediate'), meta: { titel: '中级验证' } },
        { path: '/mIntermediate', component: () => import('@/views/mobile/mIntermediate'), meta: { titel: '中级认证' } },


        { path: '/uploadVideo', component: () => import('@/views/web/webUploadVideo'), meta: { titel: '高级认证' } },
        { path: '/mUploadVideo', component: () => import('@/views/mobile/mUploadVideo'), meta: { titel: '等待上传视频' } },


        { path: '/waitCheck', component: () => import('@/views/web/webWatiCheck'), meta: { titel: '验证中' } },
        { path: '/mWaitCheck', component: () => import('@/views/mobile/mWaitCheck'), meta: { titel: '等待审核' } },

        { path: "/personalCentre", component: () => import("@/views/web/personalCentre"), meta: { title: "个人中心" } },
        { path: '/mpersonalCentre', component: () => import('@/views/mobile/mpersonalCentre'), meta: { title: '个人中心' } },

        { path: '/mbankType', component: () => import('@/views/mobile/cardInfo/components/bankType.vue'), meta: { titel: '所属银行' } },

        { path: '/mChoiceAreaNo', component: () => import('@/views/mobile/register/ChoiceAreaNo'), meta: { titel: '区号' } },

        { path: '/mKycType', component: () => import('@/views/mobile/mKycType'), meta: { titel: '选择KYC认证类型' } },

        { path: '/mCountry', component: () => import('@/views/mobile/mCountry'), meta: { titel: '选择国家' } },

        { path: '/mChangePwd', component: () => import('@/views/mobile/mChangePwd'), meta: { title: '修改密码' } },
        { path: '/changePwd', component: () => import('@/views/web/changePassword'), meta: { title: '修改密码' } },

        { path: '/mElectronicCertificate/:id', component: () => import('@/views/mobile/electronicCertificate'), meta: { title: '电子凭证' } },

        { path: '/googleVerification', component: () => import('@/views/web/googleVerification'), meta: { title: '谷歌验证' } },

        { path: '/bulkTrading', component: () => import('@/views/web/bulkTrading'), meta: { title: '大宗交易' } },
        { path: '/mbulkTrading', component: () => import('@/views/mobile/mbulkTrading'), meta: { title: '大宗交易' } },

        { path: '/bindpayment/:id', component: () => import('@/views/web/bindZfbWx'), meta: { title: '绑定收款方式' } },
        { path: '/mBindZfb/:type', component: () => import('@/views/mobile/bindAlipay'), meta: { title: '绑定收款方式' } },

        { path: '/mPayList/:type', component: () => import('@/views/mobile/payList'), meta: { title: '收款方式' } },
        { path: '/mBindList/:type', component: () => import('@/views/mobile/mBindList'), meta: { title: '收款方式' } },

        { path: '/payList/:type', component: () => import('@/views/web/payList'), meta: { title: '收款方式' } },



        { path: '/methodOfCollection', component: () => import('@/views/web/methodOfCollection'), meta: { title: '收款方式' } },
        { path: '/mmethodOfCollection', component: () => import('@/views/mobile/mmethodOfCollection'), meta: { title: '收款方式' } },

        { path: '/wallet', component: () => import('@/views/web/wallet'), meta: { title: '资产' } },
        { path: '/mwallet', component: () => import('@/views/mobile/mwallet'), meta: { title: '资产' } },

        { path: '/walletRecord/:type', component: () => import('@/views/web/walletRecord'), meta: { title: '记录列表' } },
        { path: '/mwalletRecord', component: () => import('@/views/mobile/mwalletRecord'), meta: { title: '充提记录' } },

        { path: '/mChangeTransaPwd', component: () => import('@/views/mobile/mChangeTransaPwd'), meta: { title: '修改交易密码' } },

        { path: '/mwalletRecordDetail', component: () => import('@/views/mobile/mwalletRecordDetail'), meta: { title: '充提记录详情' } },

        { path: '/mwithdrawal', component: () => import('@/views/mobile/mwithdrawal'), meta: { title: '充提' } },

       
      

        


       

       
				
		
		




    ])
}
// 功能模块routerTransactions end
export default configRouter;
