mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});
// 获取搜索页面传过来的参数 url
function getKey(url,name){
    var arr = url.substr(location.href.indexOf('?')+1).split('&');
    for (var i = 0 ; i < arr.length ; i ++){
        var count = arr[i].split('=')
        if (count[0] == name){
            return count[1];
        }
    }
    return;
}
// 获取key参数
var keyWord = getKey(location.href, 'key');
var index = 1;
var html = '';
var priceSort = 1 ;
var This = null;
// 封装函数
function getData(){
    // 使this值一直使控件中的this指向
    if(!This){
        This = this;
    }
    $.ajax({
        url: '/product/queryProduct',
        type: 'get',
        data:{
            page:index ++,
            pageSize:3,
            proName: keyWord,
            price:priceSort
        },
        success:function(result){
            // console.log(result);
            html += template('showProduct',{res:result.data});
            $('.area ul').html(html);
            //1、加载完新数据后，必须执行如下代码，true表示没有更多数据了：
            //2、若为ajax请求，则需将如下代码放置在处理完ajax响应数据之后
            This.endPullupToRefresh(result.data.length <= 0);
        }
    })
}
// 上拉加载
mui.init({
    pullRefresh : {
        container: '#refreshContainer',//待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
        up : {
            height:50,//可选.默认50.触发上拉加载拖动距离
            auto:true,//可选,默认false.自动上拉加载一次
            contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
            contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
            callback : getData
            //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
        }
    }
});
//条件筛选查询
$('.price').on('click',function(){
    // 首先要清空页面，然后重新渲染
    html = '';
    // 好要重置index为1 第一页
    index = 1;
    // 更改价格排序
    priceSort = priceSort == 1 ? 2 : 1 ;
    mui('#refreshContainer').pullRefresh().refresh(true);
    getData();
})
