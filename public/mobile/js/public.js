$(function(){
    // 恢复跳转
    $('body').on('click','a',function(){
        mui.openWindow({
            url:$(this).attr("href")
        });
    })
})