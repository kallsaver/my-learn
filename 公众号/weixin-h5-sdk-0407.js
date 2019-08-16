(function () {
    window._um_weixin_sdk = {

        getCookie: function (name) {
            var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
            if (arr = document.cookie.match(reg))
                return unescape(arr[2]);
            else
                return null;
        },

        getChannel: function () {
            var str = location.href.split("/");
            return str[str.length - 1].split(".")[0];
        },

        getRequestId: function () {
            var _this = this;
            return _this.getCookie('a_r_uuid');
        },

        getClientId: function () {
            return '';
        },

        getWxMpAppid: function () {
            return $('#wx_mp_appid').val();
        },

        getWxShareTitle: function () {
            return $('#wx_mp_share_title').val();
        },

        getWxShareDesc: function () {
            return $('#wx_mp_share_desc').val();
        },

        getWxShareIcon: function () {
            return $('#wx_mp_share_icon').val();
        },

        getPayOpenId: function () {
            return $('#wx_mp_pay_openid').val();
        },

        getPayAppid: function () {
            return $('#wx_mp_pay_appid').val();
        },

        getCardAppid: function () {
            return $('#wx_mp_card_appid').val();
        },

        getCardId: function () {
            return $('#wx_mp_card_id').val();
        },

        getCardOpenid: function () {
            return $('#wx_mp_card_openid').val();
        },
        
        getTitle: function () {
            return $('#wx_mp_title').val();
        },
        
        getActivityIds: function () {
            return $('#activity_ids').val();
        },
        getPlatform: function () {
            return $('#platform').val();
        },
        /**
         * 微信JS SDK初始化
         */

        wxInit: function (appid) {
            // var url = window.location.href.split('#')[0];
            var url = window.location.href;
            var mm = {};
            mm.url = url;
            mm.appid = appid;

            // JSSKD;
            $.ajax({
                type: "get",
                dataType: "json",
                data: mm,
                cache: false,
                url: "/cloud/wxthird/wxcard/getJsSDKSign",
                success: function (data) {
                    if (data.code === 1) {
                        var wxConfig = data.data;

                        wx.config({
                            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                            appId: wxConfig.appid, // 必填，公众号的唯一标识
                            timestamp: wxConfig.timestamp, // 必填，生成签名的时间戳
                            nonceStr: wxConfig.nonceStr, // 必填，生成签名的随机串
                            signature: wxConfig.signature, // 必填，签名，见附录1
                            jsApiList: ['addCard', 'chooseCard', 'onMenuShareTimeline', 'onMenuShareAppMessage'] // 必填，需要使用的JS接口列表
                        });
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert("请求异常");
                }
            });
        },

        /**
         * 调起卡券接口
         * @param transactionId
         */
        getCard: function (transactionId) {

            var _this = this;

            $.ajax({
                type: "get",
                dataType: "json",
                data: {
                    appid: _this.getCardAppid(),
                    cardId: _this.getCardId(),
                    openid: _this.getCardOpenid(),
                    transactionId: transactionId
                },
                cache: false,
                url: "/cloud/wxthird/wxcard/getCardSign",
                success: function (data) {

                    if (data.code === 1) {
                        var wxConfig = data.data;

                        var mm = {};
                        mm.timestamp = wxConfig.timestamp;
                        mm.nonce_str = wxConfig.nonceStr;
                        mm.signature = wxConfig.cardSign;
                        mm.outer_str = transactionId;
                        var ext = JSON.stringify(mm);

                        // 拉起微信卡券领取页面
                        wx.addCard({
                            cardList: [{
                                cardId: _this.getCardId(),
                                cardExt: ext
                            }], // 需要添加的卡券列表
                            success: function (res) {
                                // 页面发起领取卡券通知后端
                               // var cardList = res.cardList; // 添加的卡券列表信息
                                alert("领取卡券成功");
//                                $.ajax({
//                                    type: "get",
//                                    dataType: "json",
//                                    data: {
//                                        cardAppid: _um_weixin_sdk.getCardAppid(),
//                                        cardId: _um_weixin_sdk.getCardId(),
//                                        code: cardList[0].code,
//                                        cardOpenId: _um_weixin_sdk.getCardOpenid(),
//                                        unionId: '',
//                                        transactionId: transactionId,
//                                        request_id: _um_weixin_sdk.getRequestId(),
//                                        channel: _um_weixin_sdk.getChannel()
//                                    },
//                                    cache: false,
//                                    url: "/cloud/wxthird/wxcard/saveCard",
//                                    success: function (data) {
//                                        if (data.code === 1) {
//                                            alert("领取卡券成功");
//                                        }
//                                    },
//                                    error: function (XMLHttpRequest, textStatus, errorThrown) {
//                                    }
//                                });
                            }
                        });
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert('error');
                }
            });
        },


        payAttr: {},

        payAttrTradeNo: null,

        /**
         *
         * @param totalFee 价格 (单位:分)
         * @param body 卡券的Title
         * @param request_id 页面请求唯一ID
         * @param channel 渠道ID
         * @param mobile 手机
         */
        // TODO
        pay: function (totalFee,
                       body,
                       channel,
                       mobile) {
            var _this = this;

            $.ajax({
                // 查询是否有已支付未领券的订单
                url: '/cloud/wxthird/wxcard/queryPayInfoByMobile?_=' + Math.random(),
                data: {
                    mobile: mobile,
                    cardId: _this.getCardId(),
                    cardOpenId: _this.getCardOpenid()
                },
                type: "get",
                dataType: "json",
                success: function (res) {
                    if (typeof res === "string") {
                        res = JSON.parse(res);
                    }

                    // alert(JSON.stringify(res));
                    if (res.code === 1) {
                        var data = res.data;

                        if (data.status === 1) {
                            // 有历史支付,且未领取卡券 拉起卡券领取页面
                            _this.getCard(data.transactionId);
                        } else {
                            // 发起预支付
                            $.ajax({
                                type: "get",
                                dataType: "json",
                                data: {
                                    payAppid: _this.getPayAppid(),
                                    payOpenId: _this.getPayOpenId(),
                                    cardAppid: _this.getCardAppid(),
                                    cardOpenId: _this.getCardOpenid(),
                                    totalFee: totalFee,
                                    productId: _this.getCardId(),
                                    body: body,
                                    request_id: _this.getRequestId(),
                                    channel: channel,
                                    mobile: mobile
                                },
                                cache: false,
                                url: "/cloud/wxthird/wxpay/prePayOrder",
                                success: function (data) {
                                    if (data.code === 1) {
                                        const signinfo = data.data;
                                        _this.payAttr.appId = signinfo.appId;
                                        _this.payAttr.timeStamp = signinfo.timeStamp;
                                        _this.payAttr.nonceStr = signinfo.nonceStr;
                                        _this.payAttr.pg = signinfo.packages;
                                        _this.payAttr.signType = signinfo.signType;
                                        _this.payAttr.paySign = signinfo.sign;
                                        _this.payAttrTradeNo = signinfo.tradeNo;

                                        if (typeof WeixinJSBridge === "undefined") {
                                            if (document.addEventListener) {
                                                document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                                            } else if (document.attachEvent) {
                                                document.attachEvent('WeixinJSBridgeReady', _this.onBridgeReady);
                                                document.attachEvent('onWeixinJSBridgeReady', _this.onBridgeReady);
                                            }
                                        } else {
                                            _this.onBridgeReady();
                                        }
                                    } else {
                                        // 错误异常提醒
                                        alert(data.msgZ);
                                    }
                                },
                                error: function (XMLHttpRequest, textStatus, errorThrown) {
                                    alert("异常！");
                                }
                            });
                        }


                    } else {
                        alert("查询历史订单失败")
                    }
                }

            });
        },

        /**
         * 加载微信收银台的JsBridge
         */
        onBridgeReady: function () {
            var _this = this;
            WeixinJSBridge.invoke(
                'getBrandWCPayRequest', {
                    "appId": _this.payAttr.appId,     //公众号名称，由商户传入
                    "timeStamp": _this.payAttr.timeStamp,         //时间戳，自1970年以来的秒数
                    "nonceStr": _this.payAttr.nonceStr, //随机串
                    "package": _this.payAttr.pg,
                    "signType": _this.payAttr.signType,         //微信签名方式:
                    "paySign": _this.payAttr.paySign    //微信签名
                },
                function (res) {
                    if (res.err_msg === "get_brand_wcpay_request:ok") {
                        // TODO 后台轮询后台
                        _this.loopAjax({
                            url: "/cloud/wxthird/wxpay/queryPayResult",
                            type: 'GET',
                            dataType: 'JSON',
                            data: {
                                payOpenId: _this.getPayOpenId(),
                                tradeNo: _this.payAttrTradeNo
                            },
                            realSuccess: function (res) {
                                // 调起卡券领取列表
                                _this.getCard(res.data);
                            },
                            time: 1000,
                        });
                    }     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
                }
            );
        },

        loopAjax: function (obj) {
            var _this = this;
            $.ajax({
                url: obj.url,
                type: obj.type,
                dataType: obj.dataType,
                data: obj.data,
                success: function (res) {
                    if (typeof res == "string") {
                        res = JSON.parse(res);
                    }

                    if (res.code == 1) {
                        obj.realSuccess(res);
                    } else {
                        setTimeout(function () {
                            _this.loopAjax(obj)
                        }, obj.time);
                    }
                },
                error: function (err) {
                    alert(err)
                }
            });
        },

        /**
         * 当前用户是否为企业员工
         * @returns {boolean}
         */
        isEmployee: function () {
            var cookie = this.getCookie('wxwork_client_token');
            if (cookie === '' || cookie === undefined || cookie === 'notemployee') {
                return false;
            } else {
                return true;
            }
        },
        /**
         * 報送分享朋友數據至BI
         */
        pushShareAppMessage: function (obj) {
        	 $.ajax({
                 type: "get",
                 dataType: "json",
                 data: {
                	 openId:_um_weixin_sdk.getPayOpenId(),
                	 title: _um_weixin_sdk.getTitle(),
                	 requestId:_um_weixin_sdk.getRequestId(),
                	 wechatNumber:'',
                	 touxiang:'',
                	 wechatname:''
                 },
                 cache: false,
                 url: "/cloud/marketing/bigdata/pushShareAppMessage",
                 success: function (res) {
                	 console.log(res.msgZ);
                 },
                 error: function (XMLHttpRequest, textStatus, errorThrown) {
                	 console.log("請求失敗....");
                 }
             });
        },
        /**
         * 報送分享朋友圈數據至BI
         */
        pushShareTimeline: function () {
        	 $.ajax({
                 type: "get",
                 dataType: "json",
                 data: {
                	 openId:_um_weixin_sdk.getPayOpenId(),
                	 title: _um_weixin_sdk.getTitle()
                 },
                 cache: false,
                 url: "/cloud/marketing/bigdata/pushShareTimeline",
                 success: function (res) {
                	 console.log(res.msgZ);
                 },
                 error: function (XMLHttpRequest, textStatus, errorThrown) {
                	 console.log("請求失敗....");
                 }
             });
        }
    };

    var _appid = _um_weixin_sdk.getCardAppid();
    if (_appid === undefined || _appid === null || _appid === '') {
        // 无配置卡券公众号时, 查询默认公众号
        _appid = _um_weixin_sdk.getWxMpAppid();
    }

    if (_appid === undefined || _appid === null || _appid === '') {
        console.log("无需初始化");
    } else {
        _um_weixin_sdk.wxInit(_appid);
    }


    wx.ready(function () {
        // 分享配置定义

        // 朋友圈分享配置
        wx.onMenuShareTimeline({
            title: _um_weixin_sdk.getWxShareTitle(), // 分享标题
            link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: _um_weixin_sdk.getWxShareIcon(), // 分享图标
            success: function () {
            	console.log("用户确认朋友圈分享后执行的回调函数[回调成功]");
                // 用户确认分享后执行的回调函数
            	_um_weixin_sdk.pushShareTimeline();
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            	console.log("用户取消朋友圈分享");
            }
        });

        // 朋友分享配置
        wx.onMenuShareAppMessage({
            title: _um_weixin_sdk.getWxShareTitle(), // 分享标题
            desc: _um_weixin_sdk.getWxShareDesc(), // 分享描述
            link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: _um_weixin_sdk.getWxShareIcon(), // 分享图标
            type: 'link', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function (res) {
            	console.log("用户确认朋友分享后执行的回调函数[回调成功]");
            	// 用户确认分享后执行的回调函数
            	_um_weixin_sdk.pushShareAppMessage(res);
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            	console.log("用户取消朋友分享");
            }
        });
    });

    /**
     * 企业员工的操作
     */

    $('.J_openSet').on('click', function () {
        if (!$(this).hasClass('posted')) {
            $('body').css("overflow-y", "hidden");
            $('.maskBox,.popBox').show();
        }
    })
    $('.J_closePop').on('click', function () {
        $('.maskBox,.popBox').hide();
    })
    var newUserInfo = '',
        address = '';
    $('.J_userInfo').on('blur', function () {
        newUserInfo = $(this).val()
    });
    $('.J_address').on('blur', function () {
        address = $(this).val()
    });



    // var node = document.createElement("div");
    // node.innerHTML = document.cookie;
    // document.body.appendChild(node);

    /*
    if (_um_weixin_sdk.isEmployee()) {
        $('.bottomBox,.m-heights').css('display', 'block');
        // _um_wxwork_sdk.createPosterButton();
    }*/

})();

