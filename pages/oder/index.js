//Page Object
import { request } from "../../request/index.js";

Page({
  data: {
    address:{},
    business:{},
    selectedFoods:[],
    sum:0,
    foodNum:[],//所有菜品对应的数量
    foods:[],
    cartNum:0,
    array: ['未选择','无需餐具', '1份', '2份', '3份', '4份', '5份', '6份'],
    index: 0,
    remarks:"",
    packFee:0,
    openid:"",
    myDate:{},
    Num:[]//已选菜品对应的数量

  },
  // 获取当前时间+t分钟
  time(t){
   let y=this.data.myDate.getFullYear();
   let m=this.data.myDate.getMonth();
   let d=this.data.myDate.getDate();
   let h=this.data.myDate.getHours();
   let min=this.data.myDate.getMinutes();
   min+=t
   if(min>59){
     h+=1;
     min=min-60;
   }
   if(h>23){
     d+=1;
     h=0;
   }
   if(d>new Date(y, m, 0).getDate()){
     m+=1;
     d=1;
   }
   if(m>12){
     y+=1;
     m=1;
   }
   
   return y+"年"+this.time2(m+1)+"月"+this.time2(d)+"日 "+this.time2(h)+":"+this.time2(min);

  },
   // 日期格式
   time2(t){
    if(t<10){
       t="0"+t;
    }
    return t;

  },
  time3(t){
    if(t<10){
       t="00"+t;
    }else if(t<100){
      t="0"+t;
    }
    return t;

  },

  // 支付
  pay(){
    var myDate=new Date();
    this.setData({
      myDate
    });
    const user=wx.getStorageSync("userInfo");
    // myDate.getFullYear()+"年"+this.time2(myDate.getMonth()+1)+"月"+this.time2(myDate.getDate())+"日 "+this.time(myDate.getHours(),myDate.getMinutes());
    const orderTime=this.time(0);
    const deliveryTime=this.time(this.data.business.serviceTime);
     if(!this.data.address.userName){
       wx.showToast({
         title: '请填写地址！',
         icon: 'none',
         duration: 1500,
         mask: false
       });
     }else if(this.data.index===0){
      wx.showToast({
        title: '请选择餐具数量！',
        icon: 'none',
        duration: 1500,
        mask: false
      });
     }else{
       wx.showModal({
         title: '支付',
         content: '￥'+(this.data.sum+this.data.packFee+this.data.business.deliveryFee),
         showCancel: true,
         cancelText: '取消',
         cancelColor: '#000000',
         confirmText: '确定',
         confirmColor: '#3CC51F',
         success: (result) => {
        
          const orderId=myDate.getYear()+this.time2(myDate.getMonth()+1)+this.time2(myDate.getDate())+this.time2(myDate.getHours())+this.time2(myDate.getMinutes())+this.time2(myDate.getSeconds())+this.time2(myDate.getSeconds())+this.time3(myDate.getMilliseconds());
           if (result.confirm) {
             wx.showToast({
               title: '支付成功',
               icon: 'none',
               image: '',
               duration: 1500,
               mask: false
             });

             request({url:"/createOrder",
            data:{
                openid:this.data.openid,
                orderId,
                foodNum:this.data.cartNum,
                userName:this.data.address.userName,
                sex:this.data.address.sex,
                telephone:this.data.address.telephone,
                address:this.data.address.address,
                totalPrice:this.data.sum,
                remarks:this.data.remarks,
                tablewareQuantity:this.data.array[this.data.index],
                orderTime,
                deliveryTime,
                packFee:this.data.packFee,
                deliveryFee:this.data.business.deliveryFee,
                actualPay:this.data.sum+this.data.packFee+this.data.business.deliveryFee
              
            }
            })
            .then(result=>{
              console.log(result);
              this.data.foods.forEach((v,i)=>{
               if(this.data.foodNum[i]!=0)
                request({url:"/createOrderDetail",
                data:{
                  orderId,
                  foodName:v.foodName,
                  price:v.price*this.data.foodNum[i],
                  num:this.data.foodNum[i],
                  foodIcon:v.icon
                }
              }).then(result=>{
              

              })
              })
              //  清除菜品对应的数量foodNum
              let num = [];
              this.data.foodNum.forEach((v, i) => {
                num.push(0);
              })
              wx.setStorageSync("foodNum", num);

              wx.switchTab({
                url: '/pages/oderList/index'
              })
              request({
                    url:"/Printer",
                    data:{
                      orderId
                    }
                  })
            
            })    
           }
         },
         fail: () => {},
         complete: () => {
         
         
         }
       });
         
     }
  },
  // 跳转到备注
  remark(){
    wx.navigateTo({
      url: '/pages/remarks/index'
    });
      
  },
  // 餐具数量选择
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);//index为数组点击确定后选择的item索引
    this.setData({
        index: e.detail.value
    })
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
    if(Num[index]!=0){
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
let packFee=0;
  this.data.foods.forEach((v,i)=>{
    if(this.data.foodNum[i]!=0){
     packFee+=v.packFee*this.data.foodNum[i]
    }
  })

  wx.setStorageSync("foodNum", this.data.foodNum);
  this.setData({
    Num,sum,cartNum,packFee
  });

},
  // 增加地址
  addAddress(){
   
    wx.navigateTo({
      url: '/pages/address/index?msg=add'
    });
      

  },
  // 选择地址
  selectAddress(){
    wx.navigateTo({
      url: '/pages/addressList/index?msg=select'
    });
  },
  //options(Object)
  onLoad: function(options){
    let foods=wx.getStorageSync("foods");
    const foodNum=wx.getStorageSync("foodNum");
    const {business}=wx.getStorageSync("business");
    let sum=this.data.sum;
    let {selectedFoods}=this.data;
    let Num=[];
    let {packFee}=this.data;
    let cartNum=this.data.cartNum;
    foodNum.forEach((v,i) => {
      if(foodNum[i]!=0){
        sum+=foods[i].price*foodNum[i];
        selectedFoods.push(foods[i])
        Num.push(v);
        packFee+=foods[i].packFee*v;
        cartNum+=v;
      }
    });
      
    this.setData({
      sum,selectedFoods,Num,packFee,cartNum,foodNum,foods
    })
    console.log(sum+selectedFoods)
     this.setData({
      business
     })
  },
  onReady: function(){
    
  },
  onShow: function(){
    // const address=wx.getStorageSync("address_order");
      
    let text=wx.getStorageSync("Text");
    const openid= wx.getStorageSync("openid");
    this.setData({
      remarks:text,
      // address,
      openid
    })


    request({
      url:"/getAddress",
      data:{
         openid
      }
  })
  .then(request=>{
    if(request.length!=0){
      this.setData({
        address:request[0]
     })
    }else{
      this.setData({
        address:{}
     })
    }
  })
    
  },
  onHide: function(){

  },
  onUnload: function(){
    console.log("gg")
    wx.removeStorageSync("Text");

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