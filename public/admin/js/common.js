$(function(){
// 登陆拦截
	$.ajax({
		url:'/employee/checkRootLogin',
		type:'get',
		success:function(result){
			if(result.error && result.error == 400){
				location.href = "login.html";
			}
		}
	})
	// 退出登陆
	$('#loginOut').on('click',function(){
		$.ajax({
			type:'get',
			url:'/employee/employeeLogout',
			success:function(result){
				console.log(result)
				if(result.success){
					location.href = "login.html";
				}else{
					alert('登出失败');
				}
			}
		})
	});
	// 左侧导航
	var navLi = $('.navs li')
	navLi.on('click',function(){
		$(this).find('ul').slideToggle();
	});

});