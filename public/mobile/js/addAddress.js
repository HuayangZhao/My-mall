$(function(){
    // 添加地址
    $('.confirm span').on('click',function(){
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
        $.ajax({
            url:'/address/addAddress',
            type:'post',
            data:{
                address: $('.city').val(),
                addressDetail: $('.address').val(),
                recipients: $('.userName').val(),
                postcode:$('.zipCode').val()
            },
            success:function(res){
                if(res.success){
                    mui.alert('添加成功');
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