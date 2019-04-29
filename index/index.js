// index/index.js
import upload from '../utils/qiniuUploader.js'
Page({

  // 点击上传
  clickUpload() {
    let qiniu_token = '123123123' //获取的七牛token，从后台获取
    let domain = 'www.baidu.com' //图片存储的域名，最好也从后台获取
    wx.chooseImage({
      count: this.data.count,
      success: res => {
        this.upload(res.tempFilePaths[0], domain, qiniu_token)
      }
    })
  },
  // 执行上传
  upload(file, domain, qiniu_token) {
    qiniuUploader.upload(file, (res) => {
      this.setData({
        img_src: res.imageURL
      })
      wx.hideLoading()
    }, (error) => {
      // console.log('error: ' + error);
    }, {
      region: 'ECN',
      domain: domain, // bucket 域名，下载资源时用到。如果设置，会在 success callback 的 res 参数加上可以直接使用的 ImageURL 字段。否则需要自己拼接
      // key: 'xc' + i +'.jpg', // [非必须]自定义文件 key。如果不设置，默认为使用微信小程序 API 的临时文件名
      // 以下方法三选一即可，优先级为：uptoken > uptokenURL > uptokenFunc
      uptoken: qiniu_token, // 由其他程序生成七牛 uptoken
      uptokenURL: 'UpTokenURL.com/uptoken', // 从指定 url 通过 HTTP GET 获取 uptoken，返回的格式必须是 json 且包含 uptoken 字段，例如： {"uptoken": "[yourTokenString]"}
      uptokenFunc: function() {
        return qiniu_token
      }
    }, (res) => {
      // wx.showLoading({
      //   title: "上传进度 " + res.progress + "%",
      // })
      // if (res.progress == 100) {
      //   wx.hideLoading()
      // }
      // console.log('上传进度', res.progress)
      // console.log('已经上传的数据长度', res.totalBytesSent)
      // console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
    });
  },

  /**
   * 页面的初始数据
   */
  data: {
    img_src: '',
    count: 1, //最多上传数量
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})