
    // 恢复跳转
    $('body').on('tap','a',function(){
        mui.openWindow({
            url:$(this).attr("href")
        });
    })
    // 获取搜索页面传过来的参数 url
    function getKey(url,name){
        var arr = url.substr(location.href.indexOf('?')+1).split('&');
        for (var i = 0 ; i < arr.length ; i ++){
            var count = arr[i].split('=')
            if (count[0] == name){
                return count[1];
            }
        }
        return;
    }
