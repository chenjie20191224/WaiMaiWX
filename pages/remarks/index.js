// pages/remarks/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "value" : "",   // 文本的内容
    "placeholder" : "添加备注",
    "maxlength": 50,  // 最大输入长度，设置为 -1 的时候不限制最大长度
    "focus" : true,
    "auto-height" : false,  // 是否自动增高，设置auto-height时，style.height不生效
    "adjust-position": false, // 键盘弹起时，是否自动上推页面
    num:0

  },
  // 完成
  ok(){
   wx.setStorageSync("Text", this.data.value);
   wx.navigateBack({
     delta: 1
   });
     
  },
  // 标签点击
  addString(e){
    console.log(e)
    this.setData({
      "value":this.data.value+" "+e.currentTarget.dataset.text,
      num:this.data.num+4>=50?this.data.num:this.data.num+4
    })
  },
  // 字数
  fontNum(e){
   console.log(e.detail.value.length)
   this.setData({
     num:e.detail.value.length,
     value:e.detail.value
   })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   const value= wx.getStorageSync("Text");
   this.setData({
     value
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