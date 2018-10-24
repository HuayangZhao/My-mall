mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});
// 一级分类动态渲染
$.ajax({
    url:'/category/queryTopCategory',
    type:'get',
    success:function(result){
        // console.log(result);
        var html = template('category-first',result);
       $('.first').html(html);
       // 如果有数据，让第一个样式为点中状态,并渲染二级分类数据
       if (result){
           var id = result.rows[0].id;
           $('.first').find('a').eq(0).trigger('click');
           // second(id);
       }
    }
})
// 二级分类动态渲染
$('.first').on('click','a',function(){
    var id = $(this).data('id');
    $(this).addClass('active').siblings().removeClass('active');
    // console.log(id);
    second(id);
})
// 封装二级渲染
function second(id){
    $.ajax({
        url: '/category/querySecondCategory',
        type:'get',
        data: {
            id:id
        },
        success:function (result){
            // console.log(result);
            var html = template('category-second',result);
            $('.second').html(html);
        }
    })
}

