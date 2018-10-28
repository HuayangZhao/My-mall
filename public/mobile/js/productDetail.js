$(function(){
    var id = getKey(location.href,'id');
    // 用户选择的尺码
    var size = null;
    // console.log(id);
    // 渲染商品详情
    var stock =null;
    $.ajax({
        url : '/product/queryProductDetail',
        type:'get',
        data :{
            id:id
        },
        success : function (res) {
            // console.log(res);
            stock = res.num;
            // console.log(stock);
            var html = template('detailTpl',res);
            $('#detailBox').html(html);
            // console.log(html);
            // console.log(res.size.split('-'));
            //因为图片结构是模板渲染 页面一加载mui就会绑定轮播，所以图片会出错 需要渲染完毕再次初始化
            var gallery = mui('.mui-slider');
            gallery.slider({
            });
        }
    })
    // 商品Size背景色
    $('#detailBox').on('click','.size',function(){
        $(this).addClass('active').siblings().removeClass('active');
        // 用户选择的尺码
        size = $(this).html();
    })
    //选择商品数量
    var num =1 ;
    $('#detailBox').on('click','.reduce',function(){
        num --;
        if(num < 1) {
            num = 1;
            mui.alert("不可少于一件商品数量");
        }
        $('.num').val(num);
    })
    $('#detailBox').on('click','.plus',function(){
        num++;
        if(num > stock) {
            num = stock;
            mui.alert("商品数量已达上限");
        }
        $('.num').val(num);
    })
    // 添加到购物车
    $('#addCart').on('click',function(){
        if(!size){
            mui.alert("请选择尺码");
            return;
        }
        $.ajax({
            url: '/cart/addCart',
            type:'post',
            data:{
                productId:id,
                num:num,
                size:size
            },
            success:function(res){
                mui.toast("加入成功");
            }
        })
    })
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
})