var mySwiper = new Swiper ('.swiper-container', {
    loop: true, // 循环模式选项

    speed:800,
    
    // 如果需要分页器
    pagination: {
        el: '.swiper-pagination',
        // bulletClass : 'my-bullet',
    },
    autoplay: {
        delay: 2000, //2秒切换一次
    },

    // 前进后退按钮
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    
})    

// 滑过分页器显示相应的图片
$('.swiper-container .swiper-pagination')
.on('mouseover', 'span', function (){ 
      var index = $(this).index()+1; 
      mySwiper.slideTo(index); 
});

// 鼠标滑入停止动画;
$('.swiper-slide')
.on("mouseenter",function(){
    mySwiper.autoplay.stop();
})

// 鼠标划出开始动画;
$('.swiper-slide')
.on("mouseleave",function(){
    mySwiper.autoplay.start();
})

