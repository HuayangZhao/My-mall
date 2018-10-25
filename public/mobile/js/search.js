// 把搜索关键字存入数组
    var keyWord = [];
$('.searchText button').on('click',function(){
    // 点击按钮获取文本框内容
    var text = $('.searchText input').val();
    // 判断文本框内容是否为空
    if(text){
        location.href = 'searchCenter.html?key=' + text ;
        // 把搜索关键字添加到数组中
        keyWord.push(text);
        // 把数组存储到本地 需要将数组转化成字符串
        localStorage.setItem('history',JSON.stringify(keyWord));
    }else {
        mui.alert('请输入商品名称',);
    }
    $('.searchText input').val('');
})
// 页面一加载 先判断本地存储中是否有历史记录
if (localStorage.getItem('history')){
    // 把本地存储的历史纪录转换成数组重新赋值给数组变量
    keyWord = JSON.parse(localStorage.getItem('history'));
    var html = template('historyKey',{result:keyWord});
    $('.historyKeys').html(html);
}
// 点击清空历史
$('.clearHistory').on('click',function(){
    localStorage.removeItem('history');
    $('.historyKeys').html('');
})