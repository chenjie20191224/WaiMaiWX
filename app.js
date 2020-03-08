//app.js
import { request } from "/request/index.js";
App({
  
  // 获取用户信息
  onLaunch: function () {
   
 
  
  //    //初始化加载，先判断用户登录状态
  //    if (wx.getStorageSync('user')) {
  //     wx.switchTab({
  //         url: 'pages/home/home'
  //     })
  // } else {
  //     wx.reLaunch({
  //         url: 'pages/login/login'
  //     })
  // }
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
      success: res => {
        console.log(res);
        request({ url: '/getOpenId?code='+res.code})
        .then(result => {
          console.log(result);
          wx.setStorageSync("openid", result.openid);
        
        })
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              console.log(res.userInfo)
              wx.setStorageSync("userInfo", res.userInfo);
                

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    request({url:"/businessInterface"})
    .then(request=>{
      wx.setStorageSync("business", request);
        
    })
    
  },
  globalData: {
    userInfo: null,
    nickname:''
  },
})