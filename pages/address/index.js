// pages/address/index.js


import { request } from "../../request/index.js";
//引用腾讯地图API
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var qqmapsdk;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    status:"",
    name:"",
    active:0,
    address:"",
    userAddress:{
      openid:"",
      userName:"",
      sex:"先生",
      telephone:"",
      address:"",
      houseNumber:""
    },
    src:""

  },
  // 输入姓名
  inputName(e){
    
    this.data.userAddress.userName=e.detail.value;
  },
  // 输入手机号
  inputTelephone(e){
    
    this.data.userAddress.telephone=e.detail.value;
  },
  // 输入门牌号
  inputHuoseNumber(e){

    this.data.userAddress.houseNumber=e.detail.value;
  },
  // 保存地址
  perserveAddress(){
    let {userAddress}=this.data;
    userAddress.address=this.data.address;
    const openid=wx.getStorageSync("openid");
      userAddress.openid=openid;
    console.log(userAddress)
    if(userAddress.userName==="")
    {
      wx.showToast({
        title:'请填写姓名',
        icon:"none",
        duration:2000
      })
    }
    else if(userAddress.telephone==="")
    {
      wx.showToast({
        title:'请填写手机号',
        icon:"none",
        duration:2000
      })
    }
    else if(userAddress.address==="")
    {
      wx.showToast({
        title:'请填写地址',
        icon:"none",
        duration:2000
      })
    }
    else if(userAddress.houseNumber==="")
    {
      wx.showToast({
        title:'请填写门牌号',
        icon:"none",
        duration:2000
      })
    }else{
      // JSON.stringify(userAddress)
      // 从增加按钮跳转过来的
      if(this.data.status==="add"){
        wx.setStorageSync("address_order", userAddress);
          
        request({ url: '/setAddress',
        data:{
         openid:userAddress.openid,
         userName:userAddress.userName,
         sex:userAddress.sex,
         telephone:userAddress.telephone,
         address:userAddress.address,
         houseNumber:userAddress.houseNumber
          }
       })
      .then(result => {
        console.log(result);
      })
      }
      // 从编辑按钮跳转过来的
      else if(this.data.status==="edit"){
        // console.log(userAddress.id)
        request({url:"/updateAddress",data:{
          id:userAddress.id,
          openid:userAddress.openid,
          userName:userAddress.userName,
          sex:userAddress.sex,
          telephone:userAddress.telephone,
          address:userAddress.address,
          houseNumber:userAddress.houseNumber
        }})  .then(result => {
          console.log(result);
        })
     
      }
     
        this.data.userAddress={};
      // console.log(this.data.addressList)
      // 返回地址列表
      wx.navigateBack({
        delta: 1
      });
        
       
        
     
    }


    
  },
// 获取用户信息
getUserInfo(e){
console.log(e);
wx.login({
  success: (result) => {
    console.log(result.code);
    request({ url: '/getOpenId?code='+result.code})
      .then(result => {
        console.log(result);
      })
    // let request = wx.request({
    //   url: 'https://api.weixin.qq.com/sns/jscode2session',
    //   data: {
    //     appid:"wx4738a29d658b52de",
    //     secret:"731e8678c44a32e73fd2da08cec97000",
    //     js_code:result.code,
    //     grant_type:"authorization.code"
    //   },
    //   method: 'GET',
    //   success: (result)=>{
    //     console.log(result);
    //   }
    // });
  }
});
  

},

// 选择性别
seletedSex(e){
const sex=e.detail.value;
console.log(sex);
this.data.userAddress.sex=sex;
let {active}=this.data;
sex==="先生"?active=0:active=1;
this.setData({
  active
})

},
// 调用腾讯地图
getAdress(){

  wx.navigateTo({
          url: "/pages/position/position"
        });
  // wx.redirectTo({
  //   url: '/pages/position/position',
  // });
    
//   let that=this;
// wx.getLocation({
//   type: 'gcj02',
//   success: (result) => {
//     console.log(result)
//     const latitude=result.latitude;
//     const longitude=result.longitude;
//     // const name=that.dataList.Name;
//     // const address=that.dataList.Address;
//     wx.openLocation({
//       latitude,
//       longitude,
//       scale:18,
//       // name,
//       // address,
//       success: (result) => {
//       },
//       fail: () => {},
//       complete: () => {}
//     });
      
//   },
//   fail: () => {},
//   complete: () => {}
// });
  
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("address页面加载");
    // 改标题
    if(options.msg==='add'){
      this.setData({
        status:"add"
      });
      wx.setNavigationBarTitle({
        title: '新增收货地址'
      });
    }else{

     const address= wx.getStorageSync("editAddress");

        this.setData({
          userAddress:address,
          active:address.sex==="先生"?0:1,
          status:"edit",
          address:address.address
        })
      wx.setNavigationBarTitle({
        title: '编辑收货地址'
      });
    }

  // else {
  //   // 实例化API核心类
  //   qqmapsdk = new QQMapWX({
  //     //此key需要用户自己申请
  //     key: 'QKKBZ-6RV6F-C75JC-NCF7H-L6VGJ-6DFGT'
  //   });
  //   var that = this;
  //   // 调用接口
  //   qqmapsdk.reverseGeocoder({
  //     success: function (res) {
       
  //       console.log(res.result.address)
  //       that.setData({
  //         address: res.result.address
  //       });
  //     },
  //     fail: function (res) {
  //       console.log(res);
  //     },
  //     complete: function (res) {
  //       //console.log(res);
  //     }
  //   });

  //   }

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
    /*判断是第一次加载还是从position页面返回
  如果从position页面返回，会传递用户选择的地点*/  
  const address= wx.getStorageSync("address");
  console.log(address);
 if (address != null && address != '') {
     //设置变量 address 的值
     console.log("从position页面返回")
     // this.setData({
     //   address: options.address
     // });
       // 实例化API核心类
     qqmapsdk = new QQMapWX({
       //此key需要用户自己申请
       key: 'QKKBZ-6RV6F-C75JC-NCF7H-L6VGJ-6DFGT'
     });
     var that = this;
     // 调用接口
   
     qqmapsdk.reverseGeocoder({
       success: function (res) {
        let userAddress=that.data.userAddress;
        userAddress.address=address;
         console.log("设置"+address)
         that.setData({
           address: address,
           userAddress
         });
         wx.removeStorageSync("address");
       },
       fail: function (res) {
         console.log(res);
       },
       complete: function (res) {
         //console.log(res);
       }
     });
   } 

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