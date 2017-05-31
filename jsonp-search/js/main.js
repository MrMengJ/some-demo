var indexNow = -1;
var result_length = 0;
// 搜索框鼠标事件
$(".keywords").keyup(function (event) {
    //     $.ajax({
    //         type:"POST",
    //         url:"https://sug.so.360.cn/suggest",
    //         data:"callback=getInfo&encodein=utf-8&encodeout=utf-8&format=json&fields=word&word="+keyWords,
    //         dataType:"jsonp",
    //         success:getInfo
    //     })
    //按下键盘
    var keyWords = $(".keywords").val();
    var str =  keyWords.replace(/(^\s*)|(\s*$)/g,'');
    var isNull = (str === '' || str === undefined || str === null);
    var script = document.createElement('script');
    if (keyWords.length > 0 && !isNull) {
        $('.message').css('display', 'block')
    } else {
        $('.message').css('display', 'none')
    }
    if (event.keyCode !== 38 && event.keyCode !== 40 && !isNull) {
        script.src = "https://sug.so.360.cn/suggest?callback=getInfo&encodein=utf-8&encodeout=utf-8&format=json&fields=word&word=" + keyWords;
        document.body.appendChild(script);
    }

    // 按键盘下键
    if (event.keyCode == 40 && !isNull) {
        indexNow++;
        for(var i = 0;i<result_length;i++){
            if(i == indexNow){
                $('.message li')[i].className = "active";
            }else{
                $('.message li')[i].className = "";
            }
        }
        if(indexNow > result_length - 1){
            indexNow = 0;
            $('.message li')[indexNow].className = 'active';
        }
        changeKeywords($('.keywords'));
    }
    //按键盘下键
    if (event.keyCode == 38 && isNull) {
        indexNow--;
        for(var i = result_length-1; i>-1; i--){
            if(i == indexNow){
                $('.message li')[i].className = "active";
            }else{
                $('.message li')[i].className = "";
            }
        }
        if(indexNow < 0){
            indexNow = result_length-1;
            $('.message li')[indexNow].className = 'active';
        }
        changeKeywords($('.keywords'));
    }
    //按下鼠标enter键
    if (event.keyCode == 13){
         window.open("https://www.baidu.com/s?wd=" + keyWords);
    }
});

// 搜索框失焦隐藏搜索列表
$(".keywords").blur(function(){
    $('.message').css('display','none');
});
// 加载搜索结果
function getInfo(obj) {
    var result = obj.result;
    result_length = result.length;
    var i;
    document.querySelector('.message ul').innerHTML = "";
    for (i = 0; i < result_length; i++) {
        var li = document.createElement("li");
        document.querySelector('.message ul').appendChild(li);
        li.innerHTML = result[i].word;
    }

}
//鼠标移动移出
//事件绑定
$('.message').on('mouseover', "li", function () {
    $(this).addClass('active');
    indexNow = $('.message li[class="active"]').index();
    changeKeywords($('.keywords'));
})
$('.message').on('mouseout', "li", function () {
    $(this).removeClass('active');
})
// 改变搜索框的值
function changeKeywords(selector){
    selector.val($('.message li')[indexNow].innerText);  
}

//点击搜索列表搜索
//这个地方用on('click',function(){})失效  why??
$('.message ul').click(search_result);

//按下搜索键搜索
$('.search_button').on('click',search_result);

//搜索
function search_result(){
     //将空格以空代替（去除空格）
    var keyWords = $(".keywords").val();
    var str =  keyWords.replace(/(^\s*)|(\s*$)/g,'');
    if(!(str === '' || str === undefined || str === null)){
        window.open("https://www.baidu.com/s?wd=" + keyWords);
    }
}

