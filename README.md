# 前言
最近通过朋友看到有位大佬写的饿了吗，刚好自己也主流电商业务逻辑的移动端项目练习，就有样学样的也记录一下。

### 项目介绍
电商全端，包含移动端和PC端的网上商城项目。

移动端 ：包含主流电商业务逻辑，商品展示、商品分类、商品搜索、用户注册、用户登录、收获地址管理 ...

PC端：商城后台管理页面，实现对商品、用户的管理 （增 删 改 查）

### 项目架构
数据层：MYSQL
服务层：NodeJs
前端展示：mobile web application,pc management system

### 项目搭建启动
安装安装nodejs wamp
在项目的根目录下 开启命令行窗口 输入 npm start
localhost:3000/项目文件夹

### 用到的一些第三方
###### 移动端
Mui 针对移动端开发的ui框架，只能适配移动端（流式布局）
Font Awesome  适用于所有框架的字体图标库
Zepto 是一个轻量级的针对现代高级浏览器的JavaScript库， 它与jquery有着类似的api
ArtTemplate 新一代 javascript 模板引擎
###### pc端
Bootstrap 强悍的前端开发框架
ECharts 一个使用 JavaScript 实现的开源可视化库，提供直观，交互丰富，可高度个性化定制的数据可视化图表
Jquery 是一个 JavaScript 库,极大地简化了 JavaScript 编程
Jquery-fileupload 是一款实用的上传文件插件
Nprogress 前端轻量级web进度条

### 首页 --充当移动端入口 静态的
- [x] 顶部通栏 -- 完成
- [x] 底部页签 -- 完成
- [x] 轮播图 -- 完成
- [x] 产品块 -- 完成

##### 初始化轮播图，已引入zepto

$(function(){
    var gallery = mui('.mui-slider');
    gallery.slider({
        interval:1000//自动轮播周期，若为0则不自动播放，默认为0；
    });
})

### 分类页 
- [ ] 一级分类-左侧分类导航栏
- [ ] 二级分类-右侧品牌信息栏
- [ ] 动态渲染

