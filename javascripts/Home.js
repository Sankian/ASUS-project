

// 搜索框数据获取 (百度接口);
function jsonp(url,jsonp_key){
    return new Promise(function(resolve,reject){

          // 函数名随机处理避免占用命名空间，避免冲突;

          var randomName = "_" + Date.now()

          window[randomName] = function(res){
                // console.log(res);
                resolve(res);
          }
          // 2. 创建并插入script标签;
          var script = document.createElement("script");

          // 当前url之中是否存在 ? （存在问好表示已经有数据了），我应该用& 去拼接数据，反之则用 ?;
          url = url + (/\?/.test(url) ? "&" : "?") + jsonp_key + "=" + randomName;

          script.src = url;
          // 3. 标签放入页面之中;
          document.body.appendChild(script);
          // 4. 清理垃圾;
          script.onload = function(){
                this.remove();

                window[randomName] = null;
                delete window[randomName];
          }
    })
}
// 搜索框事件;
var input = document.querySelector("input")
var lists = document.querySelector(".lists")
var timer = null;
$("input").on("input",function(e){
    e.preventDefault();
    if(timer !== null) return false;
    timer = setTimeout(function(res){
        
        var url = `https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=${input.value}&json=1&p=3&sid=26523_1445_21116_28131_28267_27245_22075`;
        jsonp(url,"cb")
        .then(function(res){
            var html = ""
            
            res.s.every((item,index)=>{
                html+=`
                    <li>${item}</li>
                `
                return index < 3;
            })
            
            lists.innerHTML = html
        })
        timer = null;
        
    },100)
})

// 导航栏二级菜单事件;
$(".nav ul li").eq(1).on("mouseenter",function(){
    $(".Two-level-menu").css("display","block")
}).on("mouseleave",function(){
    $(".Two-level-menu").css("display","none")
})

$(".Two-level-menu").on("mouseenter",function(){
    $(this).css("display","block")
}).on("mouseleave",function(){
    $(this).css("display","none")
})

$(".Two-level-menu-wrap ul li a").on("mouseenter",function(){
    $(this).css("color","#0af")
}).on("mouseleave",function(){
    $(this).css("color","#666")
})

$(".nav ul li").eq(2).on("mouseenter",function(){
    $(".Two-level-menu-tow").css("display","block")
}).on("mouseleave",function(){
    $(".Two-level-menu-tow").css("display","none")
})
$(".Two-level-menu-tow").on("mouseenter",function(){
    $(this).css("display","block")
}).on("mouseleave",function(){
    $(this).css("display","none")
})

$(".nav ul li").eq(3).on("mouseenter",function(){
    $(".Two-level-menu-thr").css("display","block")
}).on("mouseleave",function(){
    $(".Two-level-menu-thr").css("display","none")
})
$(".Two-level-menu-thr").on("mouseenter",function(){
    $(this).css("display","block")
}).on("mouseleave",function(){
    $(this).css("display","none")
})

$(".nav ul li").eq(4).on("mouseenter",function(){
    $(".Two-level-menu-fon").css("display","block")
}).on("mouseleave",function(){
    $(".Two-level-menu-fon").css("display","none")
})
$(".Two-level-menu-fon").on("mouseenter",function(){
    $(this).css("display","block")
}).on("mouseleave",function(){
    $(this).css("display","none")
})

// 导航栏二级菜单事件end;