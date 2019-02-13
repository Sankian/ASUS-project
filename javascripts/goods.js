$(".More-options-show").on("click",function(){
    $(".display").toggle()
    $(".More-options-hide").show()
    $(".More-options-show").hide()
})
$(".More-options-hide").on("click",function(){
    $(".display").toggle()
    $(".More-options-hide").hide()
    $(".More-options-show").show()
})
$(".More-options-hide").trigger("click");

var showNum = 24;
$.ajax({
    url:"../json/goods.json",
    type:"get",
    dataType:"json",
}).then(render)


function render(res){
    
    var lis = res.lis;
    $(".pagination").pagination({
        // list.lenght 表示当前数据总量;
        totalData : lis.length,
        // showData 表示当前每页显示多少个;
        showData : showNum ,
        // callback 就是用来改变 页码的;
        callback : page,
        mode	: "fixed",
        count	: 9,
        keepShowPN : false
    });
    function page(api){
        // 根据页码选择要渲染的数组中的项;
        // 选中开头和结尾;
        var min = (api.getCurrent() - 1) * showNum;
        var max = api.getCurrent() * showNum

        // 让模板引擎进行数据渲染;
        var html = template("item",{ lis : lis.slice( min,max ) })
        // 把渲染结果放在 item-wrapper之中;
        $(".list-wrap ul").html(html);
        for(var i=4;i<(res.lis.length);i++){
            if(i%4===0){
                $(".list-wrap ul li").eq(i-1).css("margin-right","0")
            }
        }  
    }
    page({
        getCurrent : function(){
                return 1;
        }
    })
    for(var i=4;i<(res.lis.length);i++){
        if(i%4===0){
            $(".list-wrap ul li").eq(i-1).css("margin-right","0")
        }
    }  
    $(".content-wrap span")[0].innerHTML = lis.length;
}
