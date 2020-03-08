// pages/user/index.js
import { request } from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sum:0,//总价
    cartNum:0,//购物车菜品的数量
   foodNum:[],//每个菜品的数量
   flag:"f0",  //定位类别的识别符
   categorys:[],
   foods:[],
   currentIndex:0,
   top:0,
   business:{},
   text: '这是一条会滚动的文字滚来滚去的阿斯顿撒大苏打大文字跑马灯，哈哈哈哈哈哈哈哈',
   marqueePace: 1,//滚动速度
   marqueeDistance2: 0,//初始滚动距离
   marquee2copy_status: false,
   marquee2_margin: 200,
   size: 14,
   orientation: 'left',//滚动方向
   interval: 20 // 时间间隔
  },
  // 获取商家信息
  getBusiness(){

request({url: '/businessInterface'})
.then(result=>{
  const {business}=result;
  wx.setStorageSync("businessName", business.businessName);
  wx.setNavigationBarTitle({
    title: business.businessName
  })
console.log(business);
this.setData({
  business
})
})
    
  },
  // 获取菜单信息
  getMenu(){

    request({url: '/MenuInterface'})
    .then(result=>{
    console.log(result);
    const {categoryFoods}=result;
    const {foods}=result;
    wx.setStorageSync("foods", foods);
    let foodNum=[];
    foods.forEach((v,i) => {
      foodNum[i]=0;
    });
   
      
    this.setData({
      categorys:categoryFoods,
      foods:foods,
      foodNum
    })
    })
   
      },
    //右侧类别激活
    handleItemTap(e){
      const {index}=e.currentTarget.dataset;
         this.setData({
          currentIndex:index,
          flag:"f"+index
         })
         console.log(this.data.flag)
    } ,

    run2: function () {
   
      var vm = this;
     
      var interval = setInterval(function () {
     
       if (-vm.data.marqueeDistance2 < vm.data.length) {
     
       // 如果文字滚动到出现marquee2_margin=30px的白边，就接着显示
     
       vm.setData({
     
        marqueeDistance2: vm.data.marqueeDistance2 - vm.data.marqueePace,
     
        marquee2copy_status: vm.data.length + vm.data.marqueeDistance2 <= vm.data.windowWidth + vm.data.marquee2_margin,
     
       });
     
       } else {
     
       if (-vm.data.marqueeDistance2 >= vm.data.marquee2_margin) { // 当第二条文字滚动到最左边时
     
        vm.setData({
     
        marqueeDistance2: vm.data.marquee2_margin // 直接重新滚动
     
        });
     
        clearInterval(interval);
     
        vm.run2();
     
       } else {
     
        clearInterval(interval);
     
        vm.setData({
     
        marqueeDistance2: -vm.data.windowWidth
     
        });
     
        vm.run2();
     
       }
     
       }
     
      }, vm.data.interval);
     
      }
     ,
       // 点击放大轮播图
       handlePrevewImage(e){
        const {url}=e.currentTarget.dataset;
        wx.previewImage({
          current: url,
          urls: [url],
        });
          
              },

    // 购物车点击
    handleCart(){
    
      wx.setStorageSync("foodNum", this.data.foodNum);
      wx.navigateTo({
        url: '/pages/cart/index'
      });
        
    },
    // 结算
    pay(){
    
      if(this.data.sum>this.data.business.startDelivery){
        wx.setStorageSync("foodNum", this.data.foodNum);
        wx.navigateTo({
          url: '/pages/oder/index'
        });
      }
       
    },


    // 菜品数量加减
editNum(e){
  const {edit,index}=e.currentTarget.dataset;
  let {foodNum}=this.data;
  const {foods}=this.data;
  let {cartNum}=this.data;
  let {sum}=this.data;

  if(edit==="1"){
    foodNum[index]++;
    cartNum++;
    sum+=foods[index].price;
  }
  if(edit==="-1"){
    if(foodNum[index]!="0"){
      foodNum[index]--;
      cartNum--;
      sum-=foods[index].price;
    }
  }
  wx.setStorageSync("foodNum", foodNum);
  this.setData({
    foodNum,sum,cartNum
  });

},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getBusiness();
    this.getMenu();

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
    // 当在购物车或订单页面改变菜品数量返回首页时重新计算购物车数量,总价,菜品对应数量
    const foodNum=wx.getStorageSync("foodNum");
    let sum=0;
    let cartNum=0;
    const {foods}=this.data;
    // foods.forEach((v,i)=>{
    //   cartNum+=foodNum[i];
    //   sum+=v.price*foodNum[i];
    // })
    foodNum.forEach((v,i)=>{
      cartNum+=v;
      sum+=foods[i].price*v;
    })
      this.setData({
        foodNum,sum,cartNum
      })


    // 页面显示
   
    var vm = this;
   
    var length = vm.data.text.length * vm.data.size+30;//文字长度
   
    var windowWidth = wx.getSystemInfoSync().windowWidth;// 屏幕宽度
   
    vm.setData({
   
     length: length,
   
     windowWidth: windowWidth,
   
     marquee2_margin: length < windowWidth ? windowWidth - length : vm.data.marquee2_margin//当文字长度小于屏幕长度时，需要增加补白
   
    });
    // vm.run2();// 第一个字消失后立即从右边出现
   
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