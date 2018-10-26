$(function(){
    // 渲染存储过的地址
    var result;
    $.ajax({
        url:'/address/queryAddress ',
        type:'get',
        success:function(res){
            // console.log(res);
            result=res;
            var html = template('address',{res:res});
            $('.mui-table-view').html(html);
        }
    })
    // 删除地址
    $('.mui-table-view').on('click','.delete',function(){
        // console.log($(this).data('id'));
        var id = $(this).data('id');
        var li = this.parentNode.parentNode;
        mui.confirm("请确认删除",function(message){
                // console.log(message);
            if(message.index == 1){
                $.ajax({
                    url:'/address/deleteAddress',
                    type:'post',
                    data:{
                        id:id
                    },
                    success:function(){
                        // location.reload();
                        $(li).remove();
                    }
                })
            }else {
                // 关闭列表滑出
                mui.swipeoutClose(li);
            }

        });

    })
    // 编辑地址
    $('.mui-table-view').on('click','.edit',function(){
        var id = $('.edit').data('editid');
        for (var i = 0 ; i < result.length; i ++){
             if(result[i].id == id){
                 // 把对应的数据存储到本地
                 localStorage.setItem( 'userAddress',JSON.stringify(result[i]));
                 location.href = 'addAddress.html';
             }
        }
    })
})