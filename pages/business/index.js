// pages/business/index.js
import { request } from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiper:[],
    business:{}
  },
  // 获取商家信息
  getBusiness(){
    request({url: '/businessInterface'})
    .then(result=>{
    console.log(result);
   const {business}=result;
   const swiper=["http://localhost:8080/"+business.chart1,"http://localhost:8080/"+business.chart2,"http://localhost:8080/"+business.chart3];
    this.setData({
      swiper,
      business
    });
    })
      },
      // 点击放大轮播图
      handlePrevewImage(e){
const urls=this.data.swiper;
const {url}=e.currentTarget.dataset;
wx.previewImage({
  current: url,
  urls: urls,
});
  
      },
       // 点击放大营业资质图
       PrevewImage(){
         console.log("http://localhost:8080/"+this.data.business.businessLicense)
        wx.previewImage({
          current: "http://localhost:8080/"+this.data.business.businessLicense,
          urls: ["http://localhost:8080/"+this.data.business.businessLicense],
        });
       },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

   this.getBusiness();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    const businessName=wx.getStorageSync("businessName");
    console.log(businessName)
    wx.setNavigationBarTitle({
      title: businessName
    })
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