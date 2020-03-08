// pages/position/position.js
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var qqmapsdk;
Page({
data: {
  latitude: 0,//地图初次加载时的纬度坐标
  longitude: 0, //地图初次加载时的经度坐标
  name:"" //选择的位置名称
},

//移动选点
  moveToLocation: function () {
  var that = this;
  wx.chooseLocation({
    success: function (res) {   
      console.log(res);   
      //选择地点之后返回到原来页面
      // wx.navigateTo({
      //   url: '../address/index'
      // });
      wx.setStorageSync("address", res.address);
      // wx.redirectTo({
      //   url: '/pages/address/index?address='+res.address,
      // });
    },
    fail: function (err) {
      console.log(err)
    },complete: () => {
      wx.navigateBack({
        delta: 1
      });
    // wx.redirectTo({
    //     url: '/pages/address/index'
    //   });
    }
  });

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: 'QKKBZ-6RV6F-C75JC-NCF7H-L6VGJ-6DFGT'
    });
    
    this.moveToLocation();  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})