//Page Object
const app = getApp()
Page({
  data: {
    userinfo:{},
    myNickName:''
  },
  // 用户登录
  bindGetuserinfo(e){
    const {userInfo}=e.detail;
    console.log(userInfo)
    this.setData({
      userinfo:userInfo
    })
    wx.setStorageSync("userInfo", userInfo);
      
  },
  // 收货地址
  address(){
    wx.navigateTo({
      url: '/pages/addressList/index'
    });
      
  },
  // 我的订单
  order(){
   wx.switchTab({
     url: '/pages/oderList/index'
   });
     
  },
  //options(Object)
  onLoad: function (option) {
   const userinfo=wx.getStorageSync("userInfo");
     this.setData({
      userinfo
     })
   
    // let that = this;
    // let mynickname = app.globalData.nickname;
    // //如果app.onLaunch中的wx.getUserInfo()返回够快
    // //在app.onLoad之前就已经初始化了app.globalData.nickname则直接更新本界面的this.data.nickname
    // if(mynickname.length){
    //   this.setData({
    //     nickname:mynickname
    //   })
    // //定义回调函数，一旦app.onLaunch的wx.getUserInfo获取到用户信息的时候，立即运行该回调函数
    // }else{
    //   app.userInfoReadyCallback=res=>{
    //     this.setData({
    //       nickname:res
    //     })
    //   }
    // }
  },
  onReady: function(){
    
  },
  onShow: function(){
    const userinfo=wx.getStorageSync("userInfo");
    this.setData({
      userinfo
    })
      
  },
  onHide: function(){

  },
  onUnload: function(){

  },
  onPullDownRefresh: function(){

  },
  onReachBottom: function(){

  },
  onShareAppMessage: function(){

  },
  onPageScroll: function(){

  },
  //item(index,pagePath,text)
  onTabItemTap:function(item){

  }
});