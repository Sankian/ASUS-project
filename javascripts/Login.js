$(".Verification-code").on("click",function(){
    $(".Account-number").css("color","#666")
    $(".Verification-code").css("color","#00a8ff")
    $(".account").show()
    $(".Verification").hide()
    $(".Other-login").hide()
    $(".WeChat-login").show()
})
$(".Account-number").on("click",function(){
    $(".Verification-code").css("color","#666")
    $(".Account-number").css("color","#00a8ff")
    $(".account").hide()
    $(".Verification").show()
    $(".WeChat-login").hide()
    $(".Other-login").show()
})
$(".Verification-code").trigger("click");

// 登录表单提交验证






// document.cookie = "name=yanghuaizhi;expires = -1"
// document.cookie = "name=yanghuaizhi";



function _cookie(key,value,expires,path){
    var str = "";
    str = key + "=" + value +";";

    if(typeof expires === "number"){
        var d = new Date();
        d.setDate(d.getDate() + expires);
        str += "expires="+ d + ";";
    }
    str += "path=" + path + ";";
    document.cookie = str;
    return str;
}









$(".btn").on("click",function(){

    // 1. 获取 input 之中的值;
    var usn = $(".username")[0].value;
    var pwd = $(".password")[0].value;
    
    if(usn === ""){
        $(".tips").show()
        return false;
    }


    if(usn !== ""){
        console.log(pwd)
        if(pwd === ""){
            $(".tips p").text("* 请输入密码")
            $(".tips").show()
            return false;
        }
        $(".tips").hide()
        CodeLogon()


        // document.cookie = "username=" + encodeURI("abc");
        // document.cookie = "password=" + encodeURI(pwd);
        console.log(_cookie("username", + encodeURI(usn),7,"/"));
        console.log(_cookie("password", + encodeURI(pwd),7,"/"));
        





        return false;





    }

   
    

    function CodeLogon(){

        var data = {
            username : usn,
            password : pwd
        }
    
        ajaxPost("http://localhost/ASUS/interface/Login.php",data)
        .then(function(res){ 
            console.log(res)
            if(JSON.parse(res).stateCode ==="2"){
                // console.log(JSON.parse(res))
                $(".tips p").text("* 用户名不存在")
                $(".tips").show()
                return false;
            }
    
        
            if(JSON.parse(res).stateCode ==="3"){

                $(".tips p").text("* 密码错误")
                $(".tips").show()
                return false;
            }
            
           
    
            if(JSON.parse(res).stateCode ==="1"){
                location.href = "../HomePage.html"
            }
    
        })
    }
   


    
    // submit.addEventListener("click",login);



        // 2. 调用 ajax 封装 实现数据发送;

        // 根据接口文档定义的一个数据对象;
      


    function ajaxPost(url,data){

        return new Promise(function(resolve,reject){
            var xhr = new XMLHttpRequest();
            xhr.open("POST",url);
            xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");

            // 现在的data是一个对象, 但是根据我们的设置我们要把data转换成一个对象;

            var data_str = "";
            for(var attr in data){
                    if(data_str.length !== 0){
                        data_str += "&";
                    }
                    data_str += attr + "=" + data[attr];
            }
            // {username : 123456, password :12346};

            xhr.send(data_str);

            xhr.onreadystatechange = function(){
                    if(xhr.readyState === 4 && xhr.status === 200){
                        resolve(xhr.response);
                    }
            }

        })
    }

})









