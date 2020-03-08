//Page Object
Page({
  data: {
    foods:[]
    
  },
  //options(Object)
  onLoad: function(options){
    const foods=wx.getStorageSync("foods");
    this.setData({
      foods
    })
     
    
      
    
  },
  onReady: function(){
    
  },
  onShow: function(){
    
  },
  onHide: function(){

  },
  onUnload: function(){

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