$(function(){
    $('.getCode').on('click',function(){
        $.ajax({
            url:'/user/vCodeForUpdatePassword',
            type:'get',
            success:function(res){
                mui.alert("您的验证码为：" + res.vCode);
            }
        })
    })
    $('.register').on('click',function(){

        if(!(/^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)\S{8,}$/.test($('.oldPwd').val()))){
            mui.alert("由数字,大写字母,小写字母,至少其中两种组成","密码错误");
            return false;
        }
        if(!(/^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)\S{8,}$/.test($('.password').val()))){
            mui.alert("由数字,大写字母,小写字母,至少其中两种组成","密码错误");
            return false;
        }
        if($('.password').val()!=$('.repwd').val()){
            mui.alert("两次输入的密码不一致");
            return false;
        }
        // if($('.code').val().length < 6){
        //     mui.alert("请输入验证码");
        //     return false;
        // }
        $.ajax({
            url:'/user/updatePassword',
            type:'post',
            data:{
                oldPassword:$('.oldPwd').val(),
                newPassword:$('.password').val(),
                vCode:$('.code').val()
            },
            success:function(res){
                console.log(res);
                if(res.success){
                    mui.alert("修改成功,请重新登陆");
                    setTimeout(function(){
                        location.href = 'login.html';
                    },2000)
                }else if(res.error){
                    mui.alert(res.message);
                }
            }

        });
    })
})