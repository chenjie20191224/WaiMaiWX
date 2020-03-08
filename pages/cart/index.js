// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectedFoods:[],
    sum:0,
    foodNum:[],
    business:{},
    Num:[],
    foods:[]

  },
  // 去支付
  goapy(){
    wx.setStorageSync("foodNum", this.data.foodNum);
      
  
wx.redirectTo({
  url: '/pages/oder/index'
});
  
  },
 // 菜品数量加减
 editNum(e){
  const {edit,index,foodname}=e.currentTarget.dataset;
  let {Num}=this.data;
  const {selectedFoods}=this.data;
  let {cartNum}=this.data;
  let {sum}=this.data;

  if(edit==="1"){
    this.data.foods.forEach((v,i)=>{
      if(v.foodName===foodname){
        this.data.foodNum[i]++;
      }
    })
    Num[index]++;
    cartNum++;
    sum+=selectedFoods[index].price;
  }
  if(edit==="-1"){
    
    if(Num[index]!="0"){
      this.data.foods.forEach((v,i)=>{
        if(v.foodName===foodname){
          this.data.foodNum[i]--;
        }
      })
      Num[index]--;
      cartNum--;
      sum-=selectedFoods[index].price;
    }
  }
  wx.setStorageSync("foodNum", this.data.foodNum);
    
 
  this.setData({
    Num,sum,cartNum
  });

},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let foods=wx.getStorageSync("foods");
    const foodNum=wx.getStorageSync("foodNum");
    const {business}=wx.getStorageSync("business");
    let sum=this.data.sum;
    let {selectedFoods}=this.data;
    let Num=[];
    foodNum.forEach((v,i) => {
      if(foodNum[i]!=0){
        sum+=foods[i].price*foodNum[i];
        selectedFoods.push(foods[i])
        Num.push(v);
       
      }
    });

    this.setData({
      sum,selectedFoods,Num,business,foodNum,foods
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