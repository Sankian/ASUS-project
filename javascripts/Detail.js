// 放大镜
// 图片缩放比例
var prop = parseInt($(".Magnifier-Display-wrap")[0].offsetWidth) / parseInt($(".Magnifier")[0].offsetWidth);
// 滑过显示隐藏
$(".Magnifier").hide()
$(".Magnifier-Display-wrap").hide()
$(".mo").on({
    mouseenter:function(){
        $(".Magnifier").show()
        $(".Magnifier-Display-wrap").show()
    },
    mouseleave:function(){
        $(".Magnifier").hide()
        $(".Magnifier-Display-wrap").hide()
    }
})

// 放大镜显示位置
$(".mo").on("mousemove",function(evt){
    var e = evt||window.event;
    var _left = e.offsetX;
    var _top = e.offsetY;
    _left = _left - $(".Magnifier")[0].offsetWidth / 2 ;
    _top = _top - $(".Magnifier")[0].offsetHeight / 2 ;

    // 最小边界值检测
    _left = _left <= 0 ? 0 : _left;
    _top = _top <= 0 ? 0 : _top;

    var maxLeft = $(".mo")[0].offsetWidth - $(".Magnifier")[0].offsetWidth;
    var maxTop = $(".mo")[0].offsetHeight - $(".Magnifier")[0].offsetHeight;
    // 最大边界值检测
    _left = _left >= maxLeft ? maxLeft : _left;
    _top = _top >= maxTop ? maxTop : _top;

    // 放大图片位置
    $(".Magnifier").css({
        left:_left + "px",
        top:_top + "px"
    })
    $(".Magnifier-Display").css({
        left: -(_left*prop),
        top: -(_top*prop)
    })
})

// 根据hash数据进行页面渲染
var hash = 0;

var lis = JSON.parse(localStorage.getItem("res"))

if( location.hash !== ""){
	hash = location.hash;
	var reg = /^#/;
    hash = hash.replace(reg,"");
    localStorage.setItem("hashValue",hash);
}else{
    hash = localStorage.getItem("hashValue")
}
var titleHTML = `
    <h2>${lis[hash].title}</h2>
    `
var imgHTML = `
    <img src="${lis[hash].img}" alt="">
    `
var priceHTML = `
    <ins class="price">${lis[hash].Price}</ins>
    <ins class="former" style="color:#6f6f6f;margin-left: 10px;font-size:16px;text-decoration: line-through;">${lis[hash].former}</ins>   
`
$(".Magnifier-Display")[0].innerHTML = imgHTML;
$(".product-img")[0].innerHTML = imgHTML;
$(".goods-title h2")[0].innerHTML = titleHTML;
$(".goods-img-list ul li").eq(0)[0].innerHTML = imgHTML;
$(".detail")[0].innerHTML = priceHTML;

$("title")[0].text =lis[hash].title
console.log($(".former").text()!=="")
if($(".former").text() === ""){
    $("._timer").hide()
    $(".Price-mode").text("商城价")
    console.log($(".label")[0])
}


// 详情数据页切换
$(".goods-details-nav-wrap ul li").on("click",function(){
    $(".detailed-show div").eq($(this).index()).show().siblings().hide()
    $(this)[0].className = "details-active"
    for(var i = 0 ;i<($(".goods-details-nav-wrap ul li").length);i++ ){
        // console.log(i)
        $(".goods-details-nav-wrap ul li")[i].className = ""
    }
    $(this)[0].className = "details-active"
})
$(".goods-details-nav-wrap ul li").eq(0).trigger("click");