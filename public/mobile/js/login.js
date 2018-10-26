$(function(){
   $('.register').on('click',function(){
       $.ajax({
           url:'/user/login',
           type:'post',
           data:{
               username:$('.userName').val(),
               password:$('.password').val()
           },
           success:function(res){
               console.log(res);
               if(res.success){
                   mui.alert("恭喜你，登陆成功");
                   setTimeout(function(){
                       location.href = 'user.html';
                   },2000)
               }else if (res.error){
                   mui.alert(res.message);
               }

           }
       })
   })

})