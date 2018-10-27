$(function(){
    var page = 1;
    $.ajax({
        url:'/cart/queryCartPaging',
        type:'get',
        data:{
            page:page,
            pageSize:10
        },
        success:function(res){
            console.log(res);
            var html = template('cart',res);
            // console.log(html);
            $('.mui-table-view').html(html);
        }
    })

})