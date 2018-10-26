var info;
// 获取用户信息 判断是否登陆
$.ajax({
    url:'/user/queryUserMessage',
    type:'get',
    // async:false, 使Ajax变为同步
    async:false,
    success:function(res){
        info = res;
        // console.log(res);
        if(res.error && res.error == 400){
            location.href = "login.html";
        }
    }
})
$(function(){
    $('.logout').on('click',function(){
        $.ajax({
            url:'/user/logout',
            type:"get",
            success:function(res){
                if (res.success) {
                    mui.alert("已退出登陆");
                    setTimeout(function(){
                        location.href = 'index.html';
                    },2000)
                }
            }
        })
    })
    var html = template('userinfo',info);
    $('.userinfo').html(html);
})
