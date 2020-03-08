
let i=0;
export const request=(params)=>{
i++;
  // 显示加载效果
  wx.showLoading({
    title: "加载中",
    mask: true,
  });
    
  const baseUrl="http://localhost:8080"
  return new Promise((resolve,reject)=>{
    wx.request({
    ...params,
    url:baseUrl+params.url,
    success:(result)=>{
      resolve(result.data);
    },
    fail:(err)=>{
      reject(err);
    },
    complete: () => {
      i--;
      // 关闭加载效果
      if(i===0)
      wx.hideLoading();
        
    }
    });
  })
}

  