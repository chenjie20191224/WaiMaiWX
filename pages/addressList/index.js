// pages/addressList/index.js

import { request } from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList:[],
    select:false
     
  },
  // 选择地址，并把当前选择项排到第一
  selectAddress(e){
    if(this.data.select){
      const {index}=e.currentTarget.dataset;
      const {id}=this.data.addressList[index];
     request({url:"/changeAddress",data:{id:id}})
     .then(request=>{
       if(request){
        wx.navigateBack({
          delta: 1
        });
       }
     });
     
    }
    this.data.select=false;
    
      

  },
  // 新e增地址
  addAddress(){
    wx.navigateTo({
      url: '../address/index?msg=add'
    })
    //  wx.redirectTo({
    //    url: '../address/index',
    //    success: (result) => {
         
    //    },
    //    fail: () => {},
    //    complete: () => {}
    //  });
       
  },
  // 编辑地址
  editAddress(e){
    const {index}=e.currentTarget.dataset;
    wx.setStorageSync("editAddress", this.data.addressList[index]);
      
    wx.navigateTo({
      url: '../address/index?msg=edit'
    })
  },
  // 删除地址
  deleteAddress(e){
    const {index}=e.currentTarget.dataset;
    const {addressList}=this.data;
    const that=this;
    wx.showModal({
    title: '确定删除此地址吗',
   
    success(res) {
      if (res.confirm) {
        　　　　　　　　　　　　request({url:"/deleteAddress",data:{id:addressList[index].id}})
        .then(request=>{
          console.log("删除"+request)
        })
        addressList.splice(index,1)
        that.setData({
         addressList
        })

      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    }
    })
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.msg==="select"){
      this.setData({
        select:true
      })
    }
  
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
    const openid= wx.getStorageSync("openid");
    request({
      url:"/getAddress",
      data:{
         openid
      }
  })
  .then(request=>{
    this.setData({
      addressList:request
   })
     
    // console.log(this.data.addressList)
  })
   
    // console.log(this.data.addressList)
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