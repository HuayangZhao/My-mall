$(function(){
    $('.register').on('click',function(){
        // 验证是否输入为空
        if(!(/^[a-z0-9_-]{3,16}$/.test($('.userName').val()))){
            mui.alert('用户名格式不正确');
            return false;
        }
        if(!(/^1(3|4|5|7|8)\d{9}$/.test($('.tel').val()))){
            mui.alert("手机号码有误，请重填");
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
            url:'/user/register',
            type:'post',
            data:{
                username:$('.userName').val(),
                password:$('.password').val(),
                mobile:$('.tel').val(),
                vCode:$('.code').val()
            },
            success:function(res){
                console.log(res);
                if(res.success){
                    mui.alert("注册成功，欢迎你");
                    setTimeout(function(){
                        location.href = 'login.html';
                    },2000)
                }else if(res.error){
                    mui.alert(res.message);
                }
            }

        });
    })

    $('.getCode').on('click',function(){
        $.ajax({
            url:'/user/vCode',
            type:'get',
            success:function(res){
                mui.alert("您的验证码为：" + res.vCode);
            }
        })
    })

})