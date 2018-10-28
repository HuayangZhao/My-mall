$(function(){
    var page = 1;
    // 总金额
    var money = 0;
    var totalAll = 0;
    // 数量
    var num = 0 ;
    // 单价
    var nitPrice = 0;
    var result = null;
    $.ajax({
        url:'/cart/queryCart',
        type:'get',
        success:function(res){
            console.log(res);
            result = res;
            var html = template('cart',{res:res});
            $('.mui-table-view').html(html);
        }
    })
    // 全选功能
    $('.mui-table-view').on('tap','.chooseAll',function (){
        var total = Number($('.chooseAll').attr('data-totalAll'));
        // console.log(total);
        if(this.checked){
            $(".choose").prop("checked", false);
            $('.total').html(0);
            totalAll = 0;
        }else{
            $(".choose").prop("checked", true);
            $('.total').html(total.toFixed(2));
            totalAll = total;
        }
    })
    // 选中个数
    var chk = 0;
    $('.mui-table-view').on('tap','.choose',function (){
        //选项总个数
        var chknum = $(".mui-table-view .choose").size();
        nitPrice = Number($(this).attr('data-nitPrice'));
        // console.log(nitPrice);
        num = Number($(this).data('num'));
        // console.log(num);
        money = nitPrice*num;
        // console.log(money);
        if(this.checked){
            totalAll -= money;
            chk -- ;
            if(chk<0){
                chk = 0;
            }
            // console.log(chk);
            $('.total').html(totalAll.toFixed(2));
        }else {
            chk ++;
            if(chk>chknum){
                chk = chknum-1;
            }
            // console.log(chk);
            totalAll += money;
            $('.total').html(totalAll.toFixed(2));
        }// console.log(chknum);
        if(chknum==chk){//全选
            $(".chooseAll").prop("checked",true);
        }else{//不全选
            $(".chooseAll").prop("checked",false);
        }
    })
    var li;
    // 删除购物车
    $('.mui-table-view').on('tap','.delete',function (){
        var id = [Number($(this).attr('data-id'))];
        li = this.parentNode.parentNode;
        console.log(id);
        $.ajax({
            url:'/cart/deleteCart',
            type:'get',
            data:{
                id:id,
            },
            success:function(res){
                console.log(res);
                // $(li).remove();
                location.reload();
            }
        })
    })
    // 编辑购物车
    $('.mui-table-view').on('tap','.edit',function(){
        $('.editProduct').show();
        li = this.parentNode.parentNode;
        // 获取自定义ID
        var id = $(this).attr('data-editid');
        var obj = null;
        console.log(id);
       for(var i=0; i<result.length;i++){
           var key = result[i];
           if(key.id == id){
             obj =key;
           }
       }
       var html = template('editP',obj);
       $('.editProduct').html(html);
    })
    // 点击取消
    $('.editProduct').on('tap','.left',function (){
        $('.editProduct').hide();
        // 关闭列表滑出
        mui.swipeoutClose(li);
    })
    // 尺码
    var sizeR ;
    $('.editProduct').on('click','.detail-size span',function(){
        $(this).addClass('active').siblings().removeClass('active');
        // 用户选择的尺码
        sizeR = $(this).html();
        // console.log(sizeR);
    })
    //选择商品数量
    var num =1 ;
    $('.editProduct').on('click','.reduce',function(){
        num --;
        if(num < 1) {
            num = 1;
            mui.alert("不可少于一件商品数量");
        }
        $('.num').val(num);
    })
    $('.editProduct').on('click','.plus',function(){
        var stock = Number($(this).attr('data-num'));
        num++;
        if(num > stock) {
            num = stock;
            mui.alert("商品数量已达上限");
        }
        $('.num').val(num);
    })
    // 点击确认
    $('.editProduct').on('tap','.right',function (){
        $('.editProduct').hide();
        var idR = $(this).attr('data-id');
        $.ajax({
            url:'/cart/updateCart',
            type:'post',
            data: {
                id : idR,
                size:sizeR,
                num:num
            },
            success:function(res){
                // console.log(res);
                location.reload();
            }
        })

    })
})