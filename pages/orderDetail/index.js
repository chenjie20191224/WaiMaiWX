// pages/orderDetail/index.js
import { request } from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList:[],
    businessName:"",
    business:{},
    orderDetail:[],
    index:0
  },
// 联系商家
call(){
  console.log(this.data.business.telephone)
  wx.makePhoneCall({
    phoneNumber: this.data.business.telephone,
  
  });
    

},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.index)
    const businessName=wx.getStorageSync("businessName");
    const {business} = wx.getStorageSync("business");
    const orderList= wx.getStorageSync("orderList");
    request({url:"/orderDetail",data:{
      orderId:orderList[options.index].orderId
    }})
    .then(result=>{
      console.log(result)
      this.setData({
        orderDetail:result
      })
    })
      this.setData({
        orderList, businessName, index: options.index, business
      })


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