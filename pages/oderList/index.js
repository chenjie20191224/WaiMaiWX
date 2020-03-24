// pages/oderList/index.js
import { request } from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList:[],
    businessName:"",
    totalPage : 1,
    queryPage : 1
  },
  // 跳转的订单详情
  orderDetail(e){
    const {index}=e.currentTarget.dataset;
    wx.navigateTo({
      url: '/pages/orderDetail/index?index='+index
    });
      

  },

  //请求订单列表
  orderList(){
    const openid=wx.getStorageSync("openid");
    request({url:"/orderListPage",data:{openid,pageNum:this.data.queryPage,pageSize:10}})
   .then(result=>{
     wx.setStorageSync("orderList", result.orderFoods);
     this.setData({
      orderList:[...this.data.orderList,...result.orderFoods],
      totalPage:Math.ceil(result.totalPage/10)
     })
   })
      
  } ,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   const businessName= wx.getStorageSync("businessName");
      this.setData({
        businessName
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
    this.data.orderList=[];
    this.data.queryPage=1;
    this.orderList();
  
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
    if(this.data.queryPage<=this.data.totalPage){
      this.orderList();
      this.data.queryPage++;
    }else{
      wx.showToast({
        title: '没有下一页数据了',
        icon: 'none',
        image: '',
        duration: 1500,
        mask: false
      });
        
    }
   

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})