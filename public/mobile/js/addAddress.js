$(function(){
    // 页面一加载就通过URL判断是添加地址还是编辑地址
    // 将值转换成数值类型 方便转换布尔
    var isEdit = Number(getKey(location.href,'isEdit'));
    if(isEdit){
        // 编辑地址 isEdit=1
        // 判断本地存储
        $('h1').html('编辑收货地址')
        if(localStorage.getItem('userAddress')){
            // 把本地存储转换成字数组
            var arr =  JSON.parse(localStorage.getItem('userAddress'));
            // console.log(arr);
            var html = template('userAddressInfo',arr);
            $('.mui-input-group').html(html);
        }
    }else {
        // 添加地址给模板传入空对象
        var html = template('userAddressInfo',{});
        $('.mui-input-group').html(html);
    }

    // 添加 / 编辑 地址
    $('.mui-input-group').on('click','.add',function(){
        if($('.userName').val().trim() == '') {
            mui.alert('收货人姓名不能为空');
            return false;
        }
        if($('.zipCode').val().trim() == '') {
            mui.alert('邮编不能为空');
            return false;
        }
        if($('.city').val().trim() == '') {
            mui.alert('省市区不能为空');
            return false;
        }
        if($('.address').val().trim() == '') {
            mui.alert('详细地址不能为空');
            return false;
        }
        var  data={
            address: $('.city').val(),
            addressDetail: $('.address').val(),
            recipients: $('.userName').val(),
            postcode:$('.zipCode').val()
        };
        if(isEdit){
            // 编辑
           var url = '/address/updateAddress';
           data.id = arr.id;
           console.log(arr.id);
        }else {
            // 添加
            var url = '/address/addAddress';
        }
        $.ajax({
            url:url,
            type:'post',
            data: data,
            success:function(res){
                if(res.success){
                    if (isEdit) {
                        mui.alert('编辑成功');
                    }else {
                        mui.alert('添加成功');
                    }
                    setTimeout(function(){
                        location.href = 'address.html';
                    },2000)
                }else {
                    mui.alert('添加失败');
                }
            }
        })
    })
    var picker = new mui.PopPicker({layer:3});
    picker.setData(cityData);
    // 获取三级联动地址
    $('.city').on('click',function(){
        picker.show( function(selectItems){
            $('.city').val(selectItems[0].text+selectItems[1].text+selectItems[2].text);
        });
    })
})