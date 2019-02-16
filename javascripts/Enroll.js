var username = null
var arr = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","1","2","3","4","5","6","7","8","9","0"]

// 验证用户输入手机号是否正确
$(".wrap-username input").on("blur",function(){
    username = $(".wrap-username input")[0].value
 
    var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
    if (myreg.test(username) === true) {
        console.log(true);
        $(".Verification-Code").show()
    } else {
        $(".tips").fadeToggle(400)
        var _time = setTimeout(function(){
            $(".tips").fadeToggle(400)      
        },3000)
    }
})

// 随机验证码
function randomInt(min , max){
    return min + parseInt(Math.random() * (max - min + 1));
}

var _code = arr[randomInt(0,arr.length-1)]+arr[randomInt(0,arr.length-1)]+arr[randomInt(0,arr.length-1)]+arr[randomInt(0,arr.length-1)]

$(".Verification-Code button").text(_code)

// 点击验证码更换验证码
$(".Verification-Code button").on("click",function(){
    var _time = setTimeout(function(){
        _code = arr[randomInt(0,arr.length-1)]+arr[randomInt(0,arr.length-1)]+arr[randomInt(0,arr.length-1)]+arr[randomInt(0,arr.length-1)]
        console.log(333)
        $(".Verification-Code button").text(_code)
    },400)
})

// 验证验证码是否正确
$(".Verification-Code input").on("blur",function(){
    var userCode = $(".Verification-Code input")[0].value
    // console.log(userCode)
    if(userCode !== _code){
        $(".tips p").text("验证码错误")
        $(".tips").fadeToggle(400)
        setTimeout(function(){
            $(".tips").fadeToggle(400)      
        },3000)
        
    }

})

// 手机验证码
var callCode = null
$(".wrap-Code button").on("click",function(){
    callCode = 100000 + parseInt(Math.random() * (999999 - 100000 + 1));
    $(".wrap-Code input")[0].value = callCode
    
})

// 表单提交验证
$(".btn").on("click",function(){

    if( $(".wrap-username input")[0].value === ""){
        $(".tips").fadeToggle(400)
        var _time = setTimeout(function(){
            $(".tips").fadeToggle(400)      
        },3000)
        
        return false;
    }
    
    if($(".Verification-Code input")[0].value==""){
        $(".tips p").text("验证码不能为空")
        $(".tips").fadeToggle(400)
        var _time = setTimeout(function(){
            $(".tips").fadeToggle(400)      
        },3000)
        
        return false;
    }

    if($(".wrap-Code input")[0].value == "" || $(".wrap-Code input")[0].value != callCode ){
        
        $(".tips p").text("手机验证码错误")
        $(".tips").fadeToggle(400)
        setTimeout(function(){
            $(".tips").fadeToggle(400)      
        },3000)
        return false;
    }   
    
    $(".password").show()
    if($(".password input")[0].value === ""){
       
        $(".tips p").text("请输入密码")
        $(".tips").fadeToggle(400)
        setTimeout(function(){
            $(".tips").fadeToggle(400)      
        },3000)
        return false;
    }
    
    var patrn=/^(\w){6,20}$/;  
    var password = $(".password input")[0].value
    
    if (!patrn.exec(password)){
        console.log(1)
        $(".password-tips").show()
        return false
    }else{
        $(".password-tips").hide()
    }
    
    if(!$(".wrap-agreement input")[0].checked){
       
        $(".tips p").text("请同意协议")
        $(".tips").fadeToggle(400)
        setTimeout(function(){
            $(".tips").fadeToggle(400)      
        },3000)
        return false;
    }
    
  
    
    var usn_value = $(".wrap-username input")[0].value;
    var psw_value = $(".password input")[0].value;
   
    var url = "http://localhost/ASUS/interface/Enroll.php"
            
    url += `?username=${usn_value}&password=${psw_value}`;

    _Ajex(url)
    .then(function(res){
        console.log(JSON.parse(res).errorCode)
        if(JSON.parse(res).errorCode == 4){
            $(".tips p").text("用户名已存在")
            $(".tips").fadeToggle(400)
            setTimeout(function(){
                $(".tips").fadeToggle(400)      
            },3000)
            return false;
        }

        location.href = "../page/Login.html"

    })
    
    function _Ajex(url){
        return new Promise(function(resolve,reject){

            var xhr = new XMLHttpRequest();
            xhr.open("GET",url);
            xhr.send(null);
            xhr.onreadystatechange = function(){
                if(xhr.readyState === 4 && xhr.status === 200){
                    resolve(xhr.response)
                    
                }
            }
        })
    }
    console.log("成功")
})


