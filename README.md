# 前言
主流电商业务逻辑的移动端项目练习，通过js和Ajax实现了大部分的业务逻辑。


## 问题

1.首页制作时掌握小技巧，通过给盒子绝对定位，不设宽高，设置top，bottom值限定高度，left，right值限定高度。<br><br>

2.搜索页面，点击清空历史记录，清除本地存储，跳转到搜索结果页，返回搜索页面，历史被重新渲染。原因是搜索历史是把历史加入数组，把数组存储本地，用数组来渲染，清空历史只是清空本地存储，和页面结构，忽略清空代码中的数组，导致重新渲染历史记录。<br><br>
3.mui默认阻止a标签的跳转，官方文档并未解决方法，查找相关资料最终以下列代码解决：<br>
```javascript
 $('body').on('tap','a',function(){
        mui.openWindow({
            url:$(this).attr("href")
        });
    })
```
<br>
4.编辑收货地址和添加收货地址共用同一页面，一开始进入死胡同，一心想通过判断是否携带id来区分，但是通过这种方法是无法实现判断的，因为是同一个按钮，每次点击都是要携带id的，最终苦思得果，编辑地址和添加地址是点击不同按钮进入的，通过a标签传参的不同完美区分。<br><br>
5.mui滑动编辑，删除的归为问题，文档并未说明，各种查询也无结果，最终还是请教大大大佬，通过下面代码解决，至于为啥，大佬说他也不知道，以前的大佬也这么给他说的。上网查寻，也不知出自何处。。<br>
```javascript
mui.swipeoutClose(Element);
```
<br>
6.购物车页面编辑购物车模板渲染碰到需要循环渲染商品尺寸然而却不能用循环渲染的问题,res需要根据点击商品的索引来获取索引对象，但商品索引怎么传到模板中，怎么在模板中获取成难题。<br>
```javascript
传参对象是[{...}{...}{...}]
需渲染的是：
<div class="detail-size">
        尺码：
        <% var size = res[?].productSize.split('-')%>
        <% for(var i=size[0];i <= size[1];i++){ %>
        <span class="size"><%=i %></span>
        <% } %>
    </div>
```
<br>
最后，在JS中循环遍历数组，通过编辑按钮中的ID来匹配对应的索引对象，然后把改索引对象传入模板就不用循环了，散发性思维能力差，项目中一直在用模板，思想就固化了<br>
```javascript
        // 获取自定义ID
        var id = $(this).attr('data-editid');
        var obj = null;
       for(var i=0; i<res.length;i++){
           var key = result[i];
           if(key.id == id){
             obj =key;
           }
       }
       var html = template('editP',obj);
       $('.editProduct').html(html);

       渲染：
       <div class="detail-size">
          尺码：
          <% var size = productSize.split('-')%>
          <% for(var i=size[0];i <= size[1];i++){ %>
          <span class="size"><%=i %></span>
          <% } %>
      </div>
```
<br><br>
其实在代码编写的过程中出现很多问题，大部分是因为疏忽大意，还有就是很多知识平时工作中没怎么用到，用到时很迷茫，比如弹性盒子的用法不够熟练，需要照着文档来，p标签的自动换行，溢出时用省略号表示完全不记得，码路漫漫，且行且学习。

### 项目介绍
电商全端，包含移动端和PC端的网上商城项目。

移动端 ：包含主流电商业务逻辑，商品展示、商品分类、商品搜索、用户注册、用户登录、收获地址管理 ...

PC端：商城后台管理页面，实现对商品、用户的管理 （增 删 改 查）

### 项目架构
数据层：MYSQL<br>
服务层：NodeJs<br>
前端展示：mobile web application,pc management system<br>

### 项目搭建启动
安装安装nodejs wamp<br>
在项目的根目录下 开启命令行窗口 输入 npm start<br>
localhost:3000/项目文件夹<br>

### 用到的一些第三方
###### 移动端
Mui 针对移动端开发的ui框架，只能适配移动端（流式布局）<br>
Font Awesome  适用于所有框架的字体图标库<br>
Zepto 是一个轻量级的针对现代高级浏览器的JavaScript库， 它与jquery有着类似的api<br>
ArtTemplate 新一代 javascript 模板引擎<br>
###### pc端
Bootstrap 强悍的前端开发框架<br>
ECharts 一个使用 JavaScript 实现的开源可视化库，提供直观，交互丰富，可高度个性化定制的数据可视化图表<br>
Jquery 是一个 JavaScript 库,极大地简化了 JavaScript 编程<br>
Jquery-fileupload 是一款实用的上传文件插件<br>
Nprogress 前端轻量级web进度条<br>

### 首页 --充当移动端入口 静态的
- [x] 顶部通栏 -- 完成
- [x] 底部页签 -- 完成
- [x] 轮播图 -- 完成
- [x] 产品块 -- 完成

##### 初始化轮播图，已引入zepto
```javascript
$(function(){
    var gallery = mui('.mui-slider');
    gallery.slider({
        interval:1000//自动轮播周期，若为0则不自动播放，默认为0；
    });
})
```
### 分类页 
- [x] 一级分类-左侧分类导航栏 --完成
- [x] 二级分类-右侧品牌信息栏 --完成
- [x] 动态渲染 -- 完成

##### 初始化scroll控件
```javascript
   mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
})
```

### 搜索页
- [x] 页面布局 --完成
- [x] 通过关键字搜索渲染 --完成
- [x] 通过价格，销量筛选搜索渲染 --完成
- [x] 实现上拉分页加载 --完成
- [x] 解决mui默认阻止a标签的跳转行为，实现页面间跳转 --完成

##### 上拉加载初始化
```javascript
   mui.init({
  pullRefresh : {
    container:refreshContainer,//待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
    up : {
      height:50,//可选.默认50.触发上拉加载拖动距离
      auto:true,//可选,默认false.自动上拉加载一次
      contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
      contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
      callback :pullfresh-function //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
    }
  }
});
```
##### 重置上拉加载
	调用.refresh(true)方法，可重置上拉加载控件
```javascript
  mui('#pullup-container').pullRefresh().refresh(true);
```
### 个人中心
- [x] 页面布局 --完成
- [x] 通过ID渲染 --完成
- [x] 修改密码 --完成
- [x] 收货地址管理 --完成
- [x] 添加收货地址 --完成
- [x] 删除收货地址 --完成
- [x] 编辑收货地址 --完成

### 商品详情
- [x] 页面布局 --完成
- [x] 页面渲染 --完成
- [x] 选择数量，库存数量 --完成
- [x] 加入购物车功能 --完成

### 购物车
- [x] 页面布局及查询数据渲染 --完成
- [x] 编辑购物车 --完成
- [x] 删除购物车 --完成
- [x] 计算合计金额 --完成


