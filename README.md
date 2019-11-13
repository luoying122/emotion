## emotion
这是一个轻量级的心情簿或者备忘录都可以

##### 技术点
主要基于mpvue开发,vue开发多的话，走小程序的时候,mpvue会是很不错的上手选择。可以用vue的语法去写小程序。

##### vuex
全局变量可以用vuex代替小程序的gloabalData,当前项目小的话可以不用。

###### 云函数
* 使用小程序云函数需要注意的点 
> 1.main.js 中需要添加如下代码
```js
wx.cloud.init({
    env: 'your cloudId'
})
```
> 2.project.config.json文件需要加上如下代码
```js
"cloudfunctionRoot": "static/functions/",
//需要注意一点: 如果npm run dev项目以后，在小程序中的对应文件没有如上代码，可以直接在dist/wx/project.config.json中自行添加
```
> 3.云函数所有文件都写于项目目录static/function/[目录名]/index.js [需要装依赖包  wx-server-sdk]
```js
const cloud = require('wx-server-sdk')
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {

    const wxContext = cloud.getWXContext()

    return {
        event,
        openid: wxContext.OPENID,
        appid: wxContext.APPID,
        unionid: wxContext.UNIONID,
    }
}
//还有一种最简单的方法就是：直接微信开发者工具创建一个云函数的项目，然后拉取其中的function目录过来，里面的模板就都写好了
```

##### iconfont
> iconfont直接搜索，然后添加到项目中，下载其中的代码即可，iconfont官方有指引
> 使用方法很简单：
```html
<i :class="['iconfont', 'icon名字']"></i>
<!-- 需要注意： iconfont类必须有 -->
```
##### 项目说明
> tab两个页面 folder[emotion home]
> home下 四个 小tabp[trend/favor/recycle/draft]
> 项目大部分都是组件引入的。

##### 项目启动
> npm install

> npm run dev

> dist/wx 目录 在开发者工具中打开即可
