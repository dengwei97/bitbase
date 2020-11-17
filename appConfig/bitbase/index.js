let upperName = 'Bitbase'
module.exports = {
    upperName,
    lowerName: upperName.toLowerCase(),
    chineseName: '比特贝斯',
    // 请求地址
    baseUrl: {
        test: '/api/v2',  // 测试环境请求地址
        prod: '/app'   // 正式环境请求地址
    },
    // 相对路径
    publicPath: {
        test: '/official/',  // 测试环境
        prod: '/'   // 正式环境
    },
    source: {
        logo: {
            src: 'source/logo.png',
            width: '38'
        },
        ic_logn_blank_1: {
            src: 'source/ic_logn_blank_1.png',
            width: '135',
            width2: '135',//移动端图片宽度
            height2: '28',//移动端图片高度 兼容ios
        },
        ic_logn_whirt_1: {
            src: 'source/ic_logn_whirt_1.png',
            width: '135'
        },
        ic_iphonex: {
            src: 'source/ic_iphonex.png',
            width: '421',
            width2:'282'
        },
        ic_sdfasf: {
            src: 'source/ic_sdfasf.png',
            width: '298'
        },
        img_seal_bitbase: {
            src: 'source/img_seal_bitbase.png', //电子凭证印章
        },
        img_sy:{
            src:"source/img_sy.png" //mobile水印
        },
        img_web_sy: {
            src:'source/img_web_sy.png' //web水印
        },
    },
    // 控制功能模块的开关 0-关闭 1-打开
    moduleControl: {
        routerTransactions:0, //整合收银台的买卖功能 添加首页客服 
        Serviceurl: 0, //新客服
    }
}