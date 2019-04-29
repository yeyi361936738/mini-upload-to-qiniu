### 小程序七牛云上传

1. 引入文件 `import upload from 'utils/qiniuUploader.js'`
2. 从后台获取到 token 和 domain
3. 将图片存储为本地临时路径
4. 用以下代码执行上传
``` javascript
upload.upload(file, (res) => {
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
```