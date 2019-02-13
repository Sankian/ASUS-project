

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

$("body").on(
    "click",function(){
        $(".lists li").hide()
    }
)


// 导航栏二级菜单事件;
var timer = null;
for(var i=1;i<5;i++){
    $(".nav ul li").eq(i).on({
        mouseenter:function(){
            $(".Two-level-menu").show()
            $(".Two-level-menu-wrap").css("box-shadow","0px 2px 1px 1px #ccc")
            $(".Two-level-menu ul").eq($(this).index()-1).show().siblings().hide();
        },
        mouseleave:function(){
            $(".Two-level-menu").hide()
            $(".Two-level-menu-wrap").css("box-shadow","0px 0px 0px 0px #fff")
            $(".Two-level-menu ul").eq($(this).index()-1).hide()
        }
    })
    $(".Two-level-menu ul").on({
        mouseenter:function(){
            $(".Two-level-menu").show()
            $(".Two-level-menu-wrap").css("box-shadow","0px 2px 1px 1px #ccc")
            $(this).show().siblings().hide();
        },
        mouseleave:function(){
            $(".Two-level-menu").hide()
            $(".Two-level-menu-wrap").css("box-shadow","0px 0px 0px 0px #fff")
            $(".Two-level-menu ul").eq($(this).index()-1).hide()
        }
    })
}
$(".Two-level-menu ul").eq(1).on({
    mouseover:function(){
        $(this).children().css("opacity","1")
    }
})
// 导航栏二级菜单事件end;

// 固定定位客服事件;
$(".fixed-left-show").on({
    mouseenter:function(){
        $(".fixed-left-hide").show()
    }
})
$(".fixed-left-hide").on({
    mouseleave:function(){
        $(".fixed-left-hide").hide()
        $(".fixed-left-show").show()
    }
})